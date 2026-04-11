import SiteSetting from '../models/SiteSetting.js';

export const getSiteSettings = async (req, res) => {
  try {
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create({});
    }
    res.json(settings);
  } catch (error) {
    console.error('Get site settings error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateSiteSettings = async (req, res) => {
  try {
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create(req.body);
    } else {
      Object.assign(settings, req.body);
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    console.error('Update site settings error:', error);
    res.status(500).json({ message: error.message });
  }
};