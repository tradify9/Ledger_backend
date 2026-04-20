import ServicesPage from '../models/ServicesPage.js';

// Get or create services page settings (PUBLIC)
export const getServicesPage = async (req, res) => {
  try {
    // Find or create with defaults
    const servicesPage = await ServicesPage.findOneAndUpdate(
      {}, 
      {}, 
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    
    res.status(200).json(servicesPage);
  } catch (error) {
    console.error('Get services page error:', error);
    res.status(500).json({ message: 'Failed to fetch services page settings', error: error.message });
  }
};

// Update services page settings (ADMIN)
export const updateServicesPage = async (req, res) => {
  try {
    const updateData = req.body;
    
    // Validate required fields
    if (!updateData.hero) {
      return res.status(400).json({ message: 'hero object is required' });
    }

    const servicesPage = await ServicesPage.findOneAndUpdate(
      {}, 
      { 
        $set: { 
          hero: updateData.hero 
        } 
      },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: 'Services page updated successfully',
      servicesPage
    });
  } catch (error) {
    console.error('Update services page error:', error);
    res.status(500).json({ message: 'Failed to update services page', error: error.message });
  }
};

