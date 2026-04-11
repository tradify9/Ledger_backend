import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  icon: { type: String, default: 'Shield' },
  order: { type: Number, default: 0 }
});

const privacyPageSchema = new mongoose.Schema({
  // Hero Section
  hero: {
    showSection: { type: Boolean, default: true },
    badgeText: { type: String, default: 'Legal Document' },
    title: { type: String, default: 'Privacy Policy' },
    titleHighlight: { type: String, default: 'Policy' },
    description: { type: String, default: 'Your trust is our top priority. Learn how we protect your data and privacy.' },
    heroImage: { type: String, default: '' }
  },
  
  // Compliance Badges
  complianceBadges: {
    showBadges: { type: Boolean, default: true },
    badges: [{
      text: { type: String, default: 'GDPR Compliant' },
      icon: { type: String, default: 'CheckCircle' }
    }]
  },
  
  // Sections
  sections: [sectionSchema],
  
  // Contact Section
  contactSection: {
    showSection: { type: Boolean, default: true },
    title: { type: String, default: 'Questions about our policy?' },
    subtitle: { type: String, default: "We're here to help." },
    buttonText: { type: String, default: 'Contact Support' },
    buttonLink: { type: String, default: '/contact' },
    email: { type: String, default: 'imran.ledgeradvisory@gmail.com' },
    phone: { type: String, default: '+91 9599239791' }
  },
  
  // Footer
  footer: {
    showLastUpdated: { type: Boolean, default: true },
    footerText: { type: String, default: 'Last updated' }
  }
}, { timestamps: true });

export default mongoose.model('PrivacyPage', privacyPageSchema);