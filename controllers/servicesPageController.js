import ServicesPage from '../models/ServicesPage.js';

// Helper to get default settings
const getDefaultSettings = () => ({
  hero: {
    enabled: true,
    badgeText: 'Trusted by 500+ businesses',
    title: 'Our Services',
    subtitle: 'Transform Your Business',
    description: 'Discover our premium consultancy services designed for ambitious businesses. Get expert guidance to achieve sustainable growth and success.',
    buttonText: 'Explore Services',
    buttonLink: '/services',
    secondaryButtonText: 'Free Consultation',
    secondaryButtonLink: '/contact',
    rotatingTexts: ['Strategic Planning', 'Digital Transformation', 'Growth Consulting']
  },
  cardSettings: {
    showCategory: true,
    showCompanyName: true,
    showRating: true,
    showPrice: true,
    showDiscount: true,
    showDescription: false,
    cardStyle: 'rounded',
    cardShadow: 'soft',
    imageHeight: 'medium'
  },
  detailHero: {
    enabled: true,
    title: 'Expert {serviceTitle} Solutions',
    subtitle: 'Transform Your Business',
    description: 'Expert {serviceTitle} solutions built for measurable results. Trusted by 500+ businesses.',
    badgeText: 'Premium Service',
    buttonText: 'Start Project',
    buttonLink: '/contact',
    secondaryButtonText: 'Free Consultation',
    secondaryButtonLink: '/contact',
    showStatsBar: true,
    showEnquiryForm: true,
    statsData: [
      { icon: 'Users', label: 'Happy Clients', value: '500+', color: '#059669' },
      { icon: 'Award', label: 'Years Exp.', value: '10+', color: '#2563eb' },
      { icon: 'Briefcase', label: 'Projects', value: '1,200+', color: '#d97706' },
      { icon: 'CheckCircle', label: 'Success Rate', value: '98%', color: '#0284c7' }
    ]
  },
  detailSettings: {
    showStatsBar: true,
    showProcessTimeline: true,
    showFeaturesGrid: true,
    showBenefitsSection: true,
    showFAQSection: true,
    showTeamSection: true,
    showRelatedServices: true,
    showCTABanner: true,
    sidebarPosition: 'right',
    formStyle: 'modern'
  }
});

// Get services page settings (PUBLIC)
export const getServicesPage = async (req, res) => {
  try {
    // Find or create with defaults
    const servicesPage = await ServicesPage.findOneAndUpdate(
      {},
      {},
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Return all settings, filling in defaults where needed
    res.status(200).json({
      hero: servicesPage.hero || getDefaultSettings().hero,
      cardSettings: servicesPage.cardSettings || getDefaultSettings().cardSettings,
      detailHero: servicesPage.detailHero || getDefaultSettings().detailHero,
      detailSettings: servicesPage.detailSettings || getDefaultSettings().detailSettings
    });
  } catch (error) {
    console.error('Get services page error:', error);
    res.status(500).json({
      message: 'Failed to fetch services page settings',
      error: error.message,
      ...getDefaultSettings() // Return defaults on error
    });
  }
};

// Update services page settings (ADMIN)
export const updateServicesPage = async (req, res) => {
  try {
    const updateData = req.body;

    // Build update object - only update fields that are provided
    const updateObj = {};

    // Update hero settings if provided
    if (updateData.hero) {
      updateObj.hero = updateData.hero;
    }

    // Update card settings if provided
    if (updateData.cardSettings) {
      updateObj.cardSettings = updateData.cardSettings;
    }

    // Update detail hero settings if provided
    if (updateData.detailHero) {
      updateObj.detailHero = updateData.detailHero;
    }

    // Update detail settings if provided
    if (updateData.detailSettings) {
      updateObj.detailSettings = updateData.detailSettings;
    }

    // If no valid update data, return error
    if (Object.keys(updateObj).length === 0) {
      return res.status(400).json({ message: 'No valid settings provided' });
    }

    // Update with upsert
    const servicesPage = await ServicesPage.findOneAndUpdate(
      {},
      { $set: updateObj },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(200).json({
      message: 'Services page updated successfully',
      hero: servicesPage.hero,
      cardSettings: servicesPage.cardSettings,
      detailHero: servicesPage.detailHero,
      detailSettings: servicesPage.detailSettings
    });
  } catch (error) {
    console.error('Update services page error:', error);
    res.status(500).json({ message: 'Failed to update services page', error: error.message });
  }
};

// Save all services page settings at once (ADMIN)
export const saveAllServicesPageSettings = async (req, res) => {
  try {
    const { hero, cardSettings, detailHero, detailSettings } = req.body;

    // Build complete update object
    const updateObj = {};

    if (hero) updateObj.hero = hero;
    if (cardSettings) updateObj.cardSettings = cardSettings;
    if (detailHero) updateObj.detailHero = detailHero;
    if (detailSettings) updateObj.detailSettings = detailSettings;

    // Ensure at least one section is being updated
    if (Object.keys(updateObj).length === 0) {
      return res.status(400).json({ message: 'No settings provided' });
    }

    // Perform update
    const servicesPage = await ServicesPage.findOneAndUpdate(
      {},
      { $set: updateObj },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(200).json({
      message: 'All settings saved successfully',
      hero: servicesPage.hero,
      cardSettings: servicesPage.cardSettings,
      detailHero: servicesPage.detailHero,
      detailSettings: servicesPage.detailSettings
    });
  } catch (error) {
    console.error('Save all settings error:', error);
    res.status(500).json({ message: 'Failed to save settings', error: error.message });
  }
};

// Reset services page to defaults (ADMIN)
export const resetServicesPage = async (req, res) => {
  try {
    const defaults = getDefaultSettings();

    const servicesPage = await ServicesPage.findOneAndUpdate(
      {},
      { $set: defaults },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: 'Services page reset to defaults',
      hero: servicesPage.hero,
      cardSettings: servicesPage.cardSettings,
      detailHero: servicesPage.detailHero,
      detailSettings: servicesPage.detailSettings
    });
  } catch (error) {
    console.error('Reset services page error:', error);
    res.status(500).json({ message: 'Failed to reset services page', error: error.message });
  }
};
