import BlogPage from '../models/BlogPage.js';
import { protect } from '../middleware/auth.js';

export const getBlogSettings = async (req, res) => {
  try {
    const blogPage = await BlogPage.getBlogPage();
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
      
      if (!heroTitle || !heroHighlight || !heroSubtitle) {
        return res.status(400).json({ message: 'heroTitle, heroHighlight, and heroSubtitle are required' });
      }

      const blogPage = await BlogPage.findOneAndUpdate(
        { type: 'blogpage' },
        { heroTitle, heroHighlight, heroSubtitle },
        { new: true, runValidators: true }
      );

      if (!blogPage) {
        return res.status(404).json({ message: 'Blog page settings not found' });
      }

      res.json({
        message: 'Blog hero updated successfully',
        blogPage
      });
    } catch (error) {
      console.error('Update blog settings error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
];


