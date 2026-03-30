import Blog from '../models/Blog.js';
import { uploadImage, uploadContentImages } from '../utils/cloudinary.js';
import { slugify, generateUniqueSlug } from '../utils/slugify.js';

export const getBlogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 9,
      q, // search term
      category,
      status = 'published',
      tag,
      sort = 'createdAt:-1' // 'views:-1', 'readTime:1'
    } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build filter
    const filter = { status };
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { shortDescription: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ];
    }
    if (category) filter.category = category;
    if (tag) filter.tags = tag;

    const totalCount = await Blog.countDocuments(filter);

    // Parse sort
    const [sortField, sortOrder] = sort.split(':');
    const sortObj = { [sortField]: sortOrder === '-1' ? -1 : 1 };

    const blogs = await Blog.find(filter)
      .select('-__v') // Hide Mongo internals
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum)
      .lean(); // Faster for read-only

    const totalPages = Math.ceil(totalCount / limitNum);

    res.json({
      blogs,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalCount,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
        limit: limitNum
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Server error during search' });
  }
};

// SEO: GET /api/blogs/slug/:slug
export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug })
      .select('-__v')
      .lean();
      
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    
    // Increment views
    await Blog.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } }
    );
    
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Legacy ID support
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .select('-__v')
      .lean();
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    
    await Blog.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      content,
      category,
      tags = [],
      author = 'Admin',
      status = 'draft',
      seoTitle,
      seoDescription
    } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({ message: 'Title, content, and category required' });
    }

    // Parse tags array
    const tagsArray = Array.isArray(tags) ? tags : JSON.parse(tags || '[]');

    // Auto-generate unique slug
    const slug = await generateUniqueSlug(Blog, title);

    // Calculate read time
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readTime = Math.ceil(words / 250);

    // Handle featured image (file or URL)
    let featuredImage = '';
    if (req.body.image_url) {
      // Validate URL starts with http/https
    if (req.body.image_url.match(/^https?:\/\/.+/)) {
        featuredImage = req.body.image_url;
      } else {
        return res.status(400).json({ message: 'Invalid image URL format' });
      }
    } else if (req.files?.featuredImage?.[0]) {
      const result = await uploadImage(req.files.featuredImage[0].path);
      featuredImage = result.secure_url;
    }

    // Upload content images (separate field or parse from Quill HTML)
    let images = [];
    if (req.files?.images) {
      images = await uploadContentImages(req.files.images.map(f => f.path));
    }

    const blogData = {
      title,
      slug,
      shortDescription,
      content,
      category,
      tags: tagsArray,
      featuredImage,
      images,
      author,
      ...(req.body.youtubeUrl && { youtubeUrl: req.body.youtubeUrl }),
      status,
      readTime,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || shortDescription,
      ...(req.body.metaImage && { metaImage: req.body.metaImage })
    };

    const blog = await Blog.create(blogData);
    console.log('✅ Blog created:', blog.slug);
    
    // Return without _id in populate
    const { _id, ...safeBlog } = blog.toObject();
    res.status(201).json(safeBlog);
  } catch (error) {
    console.error('💥 Create ERROR:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const updateData = req.body;

    // Update slug only if title changed
    if (updateData.title && updateData.title !== blog.title) {
      updateData.slug = await generateUniqueSlug(Blog, updateData.title, blog._id);
    }

    // Update read time
    if (updateData.content) {
      const words = updateData.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
      updateData.readTime = Math.ceil(words / 250);
    }

    // Handle featured image update (file or URL)
    if (req.body.image_url) {
      if (req.body.image_url.match(/^https?:\/\/.+/)) {
        updateData.featuredImage = req.body.image_url;
      } else {
        return res.status(400).json({ message: 'Invalid image URL format' });
      }
    } else if (req.files?.featuredImage?.[0]) {
      const result = await uploadImage(req.files.featuredImage[0].path);
      updateData.featuredImage = result.secure_url;
    }

    // Handle content images
    if (req.files?.images) {
      const newImages = await uploadContentImages(req.files.images.map(f => f.path));
      updateData.images = [...(blog.images || []), ...newImages];
    }
    
    // Handle YouTube URL
    if (req.body.youtubeUrl) {
      updateData.youtubeUrl = req.body.youtubeUrl;
    }

    // Parse tags
    if (updateData.tags) {
      updateData.tags = Array.isArray(updateData.tags) 
        ? updateData.tags 
        : JSON.parse(updateData.tags);
    }

    Object.assign(blog, updateData);
    await blog.save();
    
    const { _id, ...safeBlog } = blog.toObject();
    res.json(safeBlog);
  } catch (error) {
    console.error('💥 Update ERROR:', error);
    res.status(500).json({ message: error.message });
  }
};

export const incrementViews = async (req, res) => {
  try {
    const { slug } = req.params;
    await Blog.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } }
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

