import mongoose from 'mongoose';

const footerSchema = new mongoose.Schema({
  logoUrl: { type: String, required: true, default: 'https://i.ibb.co/XrZdC1yb/Whats-App-Image-2026-03-28-at-2-29-07-PM-removebg-preview.png' },
  companyName: { type: String, required: true, default: 'LEDGER ADVISORY' },
  description: { type: String, required: true, default: 'Premium consulting & digital services for high-growth businesses.' },
  quickLinks: [{ type: String, default: ['Home', 'Services', 'Blogs', 'About', 'Contact', 'Privacy'] }],
  contactItems: [{
    icon: { type: String, required: true },
    text: { type: String, required: true }
  }, {
    icon: { type: String, default: 'Mail' },
    text: { type: String, default: 'imran.ledgeradvisory@gmail.com' }
  }, {
    icon: { type: String, default: 'Phone' },
    text: { type: String, default: '9599239791' }
  }, {
    icon: { type: String, default: 'MapPin' },
    text: { type: String, default: 'Delhi, India' }
  }],
  whatsappText: { type: String, default: 'WhatsApp' },
  newsletterPlaceholder: { type: String, default: 'Enter email' },
  newsletterButtonText: { type: String, default: 'Subscribe' },
  copyrightText: { type: String, default: 'LEDGER ADVISORY. All rights reserved. | Back to Top' },
  // Blog Hero Section Fields
  blogSectionTitle: { type: String, default: 'Tax & Compliance Insights' },
  blogSectionSubtitle: { type: String, default: 'Drive Success' },
  blogSectionDescription: { type: String, default: 'Expert articles and updates to help you stay compliant and informed' }
}, { timestamps: true });

export default mongoose.model('Footer', footerSchema);

