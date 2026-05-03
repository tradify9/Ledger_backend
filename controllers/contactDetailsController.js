// controllers/contactDetailsController.js
import ContactDetails from '../models/ContactDetails.js';

export const getContactDetails = async (req, res) => {
  try {
    let details = await ContactDetails.findOne();
    if (!details) {
      // Create default if none exists with all fields
      details = await ContactDetails.create({
        // Hero Section
        heroHeading: 'Get In Touch',
        heroSubheading: "Let's Build Together",
        heroDescription: 'Ready to start your transformation journey? Connect with us and take your business to the next level 🚀',
        heroButton1: 'Contact Now',
        heroButton2: 'Learn More',
        
        // Contact Info
        email: 'contact@ledgeradvisory.in',
        phone: '+91 9599239791',
        address: 'New Delhi, India',
        whatsapp: '+91 9599239791',
        
        // Descriptions
        emailDescription: "We'll respond within 24 hours",
        phoneDescription: 'Mon-Fri, 9am-6pm EST',
        addressDescription: 'Come say hello at our office',
        
        // Business Hours
        businessHoursTitle: 'Business Hours',
        mondayHours: '9:00 AM - 6:00 PM',
        saturdayHours: '10:00 AM - 4:00 PM',
        sundayHours: 'Closed',
        
        // Form Section
        formHeading: 'Send us a Message',
        formDescription: 'Fill out the form and our team will respond within 24 hours',
        
        // Contact Info Section
        contactInfoHeading: 'Contact Information',
        contactInfoDescription: "We'd love to hear from you. Here's how you can reach us.",
        
        // Connect Section
        connectWithUsTitle: 'Connect With Us',
        
        // Success Message
        successMessageTitle: 'Thank You!',
        successMessageText: 'Your message has been sent successfully. We\'ll get back to you within 24 hours.',
        
        // SEO
        metaTitle: 'Contact Us | Ledger Advisory',
        metaDescription: 'Get in touch with Ledger Advisory for business consulting, accounting, and financial advisory services.',
        
        // Map
        showMap: false,
        mapEmbedUrl: '',
        
        // Social Links
        socialLinks: [
          { platform: 'email', url: 'mailto:contact@ledgeradvisory.in', label: 'Email', isActive: true },
          { platform: 'phone', url: 'tel:+919599239791', label: 'Phone', isActive: true },
          { platform: 'location', url: 'https://maps.google.com/?q=New+Delhi,+India', label: 'Location', isActive: true }
        ]
      });
    }
    res.json(details);
  } catch (error) {
    console.error('Error fetching contact details:', error);
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
    res.json({ message: 'Contact details updated successfully', details });
  } catch (error) {
    console.error('Error updating contact details:', error);
    res.status(500).json({ message: error.message });
  }
};