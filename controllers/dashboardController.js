import Service from '../models/Service.js';
import Blog from '../models/Blog.js';
import Contact from '../models/Contact.js';

export const getDashboardStats = async (req, res) => {
  try {
    const [servicesCount, blogsCount, contactsCount] = await Promise.all([
      Service.countDocuments(),
      Blog.countDocuments(),
      Contact.countDocuments()
    ]);

    const recentBlogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title createdAt published')
      .lean();

    res.json({
      totalServices: servicesCount,
      totalBlogs: blogsCount,
      totalContacts: contactsCount,
      totalUsers: 0,
      recentBlogs
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
