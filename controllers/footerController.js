import Footer from '../models/Footer.js';

export const getFooter = async (req, res) => {
  try {
    let footer = await Footer.findOne();
    if (!footer) {
      // Create default if none exists
      footer = await Footer.create({
        logoUrl: 'https://i.ibb.co/XrZdC1yb/Whats-App-Image-2026-03-28-at-2-29-07-PM-removebg-preview.png',
        companyName: 'LEDGER ADVISORY',
        description: 'Premium consulting & digital services for high-growth businesses.',
        quickLinks: ['Home', 'Services', 'Blogs', 'About', 'Contact', 'Privacy'],
        contactItems: [
          { icon: 'Mail', text: 'imran.ledgeradvisory@gmail.com' },
          { icon: 'Phone', text: '9599239791' },
          { icon: 'MapPin', text: 'Delhi, India' }
        ],
        whatsappText: 'WhatsApp',
        newsletterPlaceholder: 'Enter email',
        newsletterButtonText: 'Subscribe',
        copyrightText: 'LEDGER ADVISORY. All rights reserved. | Back to Top',
        blogSectionTitle: 'Tax & Compliance Insights',
        blogSectionSubtitle: 'Drive Success',
        blogSectionDescription: 'Expert articles and updates to help you stay compliant and informed'
      });
    }
    res.json(footer);
  } catch (error) {
    console.error('Footer fetch error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateFooter = async (req, res) => {
  try {
    let footer = await Footer.findOne();
    if (!footer) {
      footer = await Footer.create(req.body);
    } else {
      footer = await Footer.findByIdAndUpdate(footer._id, req.body, { 
        new: true, 
        runValidators: true 
      });
    }
    // Return the footer directly to match getFooter response format
    res.json(footer);
  } catch (error) {
    console.error('Footer update error:', error);
    res.status(500).json({ message: error.message });
  }
};

