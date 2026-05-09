import Service from '../models/Service.js';
import Blog from '../models/Blog.js';
import Contact from '../models/Contact.js';

export const getDashboardStats = async (req, res) => {
  try {
    const [servicesCount, blogsCount, contactsCount, publishedBlogs, draftBlogs] = await Promise.all([
      Service.countDocuments(),
      Blog.countDocuments(),
      Contact.countDocuments(),
      Blog.countDocuments({ status: 'published' }),
      Blog.countDocuments({ status: 'draft' })
    ]);

    const recentBlogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title createdAt status slug')
      .lean();

    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(4)
      .select('name email phone message createdAt status')
      .lean();

    res.json({
      totalServices: servicesCount,
      totalBlogs: blogsCount,
      totalContacts: contactsCount,
      totalUsers: 0,
      publishedBlogs,
      draftBlogs,
      recentBlogs,
      recentContacts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
