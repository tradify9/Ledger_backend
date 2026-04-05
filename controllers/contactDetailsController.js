import ContactDetails from '../models/ContactDetails.js';

export const getContactDetails = async (req, res) => {
  try {
    let details = await ContactDetails.findOne();
    if (!details) {
      // Create default if none exists
      details = await ContactDetails.create({
        email: 'imran.ledgeradvisory@gmail.com',
        phone: '+91 9599239791',
        address: 'New Delhi, India',
        mondayHours: '9:00 AM - 6:00 PM',
        saturdayHours: '10:00 AM - 4:00 PM',
        sundayHours: 'Closed',
        whatsapp: '+91 9599239791',
        emailDescription: "We'll respond within 24 hours",
        phoneDescription: 'Mon-Fri, 9am-6pm EST',
        addressDescription: 'Come say hello at our office'
      });
    }
    res.json(details);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContactDetails = async (req, res) => {
  try {
    let details = await ContactDetails.findOne();
    if (!details) {
      details = await ContactDetails.create(req.body);
    } else {
      details = await ContactDetails.findByIdAndUpdate(details._id, req.body, { 
        new: true, 
        runValidators: true 
      });
    }
    res.json({ message: 'Contact details updated', details });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

