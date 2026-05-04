import BlogPage from '../models/BlogPage.js';
import { protect } from '../middleware/auth.js';

export const getBlogSettings = async (req, res) => {
  try {
    const blogPage = await BlogPage.getBlogPage();
    if (!blogPage) {
      return res.status(404).json({ message: 'Blog page settings not found' });
    }
    // Return the full blogPage object with all fields
    res.json(blogPage);
  } catch (error) {
    console.error('Get blog settings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateBlogSettings = [
  protect,
  async (req, res) => {
    try {
      const { heroTitle, heroHighlight, heroSubtitle } = req.body;
      
      console.log('Received update request:', { heroTitle, heroHighlight, heroSubtitle });
      
      if (!heroTitle || heroHighlight === undefined || !heroSubtitle) {
        return res.status(400).json({ 
          message: 'heroTitle, heroHighlight, and heroSubtitle are required',
          received: { heroTitle, heroHighlight, heroSubtitle }
        });
      }

      // Find and update the blog page
      const blogPage = await BlogPage.findOneAndUpdate(
        { type: 'blogpage' },
        { 
          heroTitle, 
          heroHighlight, 
          heroSubtitle 
        },
        { 
          new: true,  // Return updated document
          runValidators: true,
          upsert: true  // Create if doesn't exist
        }
      );

      if (!blogPage) {
        return res.status(404).json({ message: 'Blog page settings not found' });
      }

      console.log('Updated blog page:', blogPage);

      res.json({
        success: true,
        message: 'Blog hero updated successfully',
        data: blogPage
      });
    } catch (error) {
      console.error('Update blog settings error:', error);
      res.status(500).json({ message: 'Server error: ' + error.message });
    }
  }
];