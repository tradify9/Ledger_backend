import PrivacyPage from '../models/PrivacyPage.js';
import { uploadImage } from '../utils/cloudinary.js';

export const getPrivacyPage = async (req, res) => {
  try {
    let page = await PrivacyPage.findOne();
    if (!page) {
      page = new PrivacyPage({
        heroTitle: 'Privacy Policy',
        heroSubtitle: 'Your privacy is our priority',
        sections: [{
          title: 'Introduction',
          content: 'Welcome to our Privacy Policy...'
        }]
      });
      await page.save();
    }
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePrivacyPage = async (req, res) => {
  try {
    let page = await PrivacyPage.findOne();
    if (!page) page = new PrivacyPage();
    
    Object.assign(page, req.body);
    
    if (req.file) {
      const result = await uploadImage(req.file.path);
      page.heroImage = result.secure_url;
    }
    
    await page.save();
    res.json(page);
  } catch (error) {
    console.error('Privacy update error:', error);
    res.status(500).json({ message: error.message });
  }
};
