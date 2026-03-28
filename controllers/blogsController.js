import Blog from '../models/Blog.js';
import { uploadImage } from '../utils/cloudinary.js';

export const getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    const totalCount = await Blog.countDocuments();
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      blogs,
      currentPage: page,
      totalPages,
      totalCount,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      limit
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    console.log('📝 Creating blog:', { title: req.body.title, hasFile: !!req.file, filePath: req.file?.path });
    
    const { title, excerpt, content, readTime: readTimeStr } = req.body;
    
    // Parse readTime: "5 min" → 5
    let readTimeNum = 5;
    if (readTimeStr) {
      readTimeNum = parseInt(readTimeStr.match(/\\d+/)?.[0] || '5', 10);
    }
    
    let image = '';
    if (req.file) {
      const result = await uploadImage(req.file.path);
      image = result.secure_url;
    }
    
    const blogData = { title, excerpt, content, image, readTime: readTimeNum };
    console.log('💾 Saving blog data:', blogData);
    
    const blog = await Blog.create(blogData);
    console.log('✅ Blog created:', blog._id);
    res.status(201).json(blog);
  } catch (error) {
    console.error('💥 Blog create ERROR:', error.message);
    console.error('Full stack:', error.stack);
    console.error('req.body:', req.body);
    console.error('req.file:', req.file);
    res.status(500).json({ message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    console.log('✏️ Updating blog:', req.params.id);
    
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    
    const { title, excerpt, content, readTime: readTimeStr } = req.body;
    
    if (title) blog.title = title;
    if (excerpt) blog.excerpt = excerpt;
    if (content) blog.content = content;
    if (readTimeStr) {
      blog.readTime = parseInt(readTimeStr.match(/\\d+/)?.[0] || blog.readTime.toString(), 10);
    }
    
    if (req.file) {
      const result = await uploadImage(req.file.path);
      blog.image = result.secure_url;
    }
    
    await blog.save();
    console.log('✅ Blog updated:', blog._id);
    res.json(blog);
  } catch (error) {
    console.error('💥 Blog update ERROR:', error.message);
    console.error('Full stack:', error.stack);
    res.status(500).json({ message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
