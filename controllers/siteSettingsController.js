import SiteSetting from '../models/SiteSetting.js';

// Default settings object
const defaultSettings = {
  navbarTitle: 'ConsultancyPro',
  navbarTagline: 'Professional Consulting',
  logoUrl: '',
  heroTitle: 'Transform Your Business',
  primaryColor: '#3B82F6',
  aboutContent: 'Leading consultancy firm with proven results.',
  privacyPolicy: 'Your privacy is protected.',
  servicesHero: {
    texts: ['Strategic Planning', 'Digital Transformation', 'Growth Consulting'],
    heroSubtitle: 'Discover our premium consultancy services designed for ambitious businesses. Get expert guidance to achieve sustainable growth and success.',
    ctaTitle: 'Find Perfect Service',
    ctaSubtitle: 'Get matched with ideal consultant in 24hrs'
  },
  logoSize: 1.0
};

// Get site settings (PUBLIC)
export const getSiteSettings = async (req, res) => {
  try {
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create(defaultSettings);
    }
    res.json(settings);
  } catch (error) {
    console.error('Get site settings error:', error);
    res.status(500).json({ message: 'Failed to fetch site settings', error: error.message });
  }
};

// Update site settings (ADMIN)
export const updateSiteSettings = async (req, res) => {
  try {
    let settings = await SiteSetting.findOne();
    
    if (!settings) {
      settings = new SiteSetting();
    }
    
    // Update each field if provided
    const allowedFields = ['navbarTitle', 'navbarTagline', 'logoUrl', 'heroTitle', 'primaryColor', 'aboutContent', 'privacyPolicy', 'servicesHero', 'logoSize'];
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        if (field === 'servicesHero' && typeof req.body[field] === 'object') {
          settings.servicesHero = {
            ...settings.servicesHero,
            ...req.body[field]
          };
        } else if (field === 'logoSize') {
          const logoSize = parseFloat(req.body[field]);
          if (isNaN(logoSize) || logoSize < 0.5 || logoSize > 2.0) {
            return res.status(400).json({ message: 'logoSize must be between 0.5 and 2.0' });
          }
          settings[field] = logoSize;
        } else {
          settings[field] = req.body[field];
        }
      }
    });
    
    await settings.save();
    res.json(settings);
  } catch (error) {
    console.error('Update site settings error:', error);
    res.status(500).json({ message: 'Failed to update site settings', error: error.message });
  }
};

// Reset to default settings (ADMIN)
export const resetSiteSettings = async (req, res) => {
  try {
    let settings = await SiteSetting.findOne();
    
    if (settings) {
      Object.assign(settings, defaultSettings);
      await settings.save();
    } else {
      settings = await SiteSetting.create(defaultSettings);
    }
    
    res.json(settings);
  } catch (error) {
    console.error('Reset site settings error:', error);
    res.status(500).json({ message: 'Failed to reset site settings', error: error.message });
  }
};

