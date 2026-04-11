import mongoose from 'mongoose';

const servicesHeroSchema = new mongoose.Schema({
  texts: {
    type: [String],
    default: ['Strategic Planning', 'Digital Transformation', 'Growth Consulting']
  },
  heroSubtitle: {
    type: String,
    default: 'Discover our premium consultancy services designed for ambitious businesses. Get expert guidance to achieve sustainable growth and success.'
  },
  ctaTitle: {
    type: String,
    default: 'Find Perfect Service'
  },
  ctaSubtitle: {
    type: String,
    default: 'Get matched with ideal consultant in 24hrs'
  }
});

const siteSettingSchema = new mongoose.Schema({
  navbarTitle: {
    type: String,
    default: 'ConsultancyPro'
  },
  navbarTagline: {
    type: String,
    default: 'Professional Consulting'
  },
  logoUrl: {
    type: String,
    default: ''
  },
  heroTitle: {
    type: String,
    default: 'Transform Your Business'
  },
  primaryColor: {
    type: String,
    default: '#3B82F6',
    match: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  },
  aboutContent: {
    type: String,
    default: 'Leading consultancy firm with proven results.'
  },
  privacyPolicy: {
    type: String,
    default: 'Your privacy is protected.'
  },
  servicesHero: {
    type: servicesHeroSchema,
    default: () => ({})
  },
  logoSize: {
    type: Number,
    default: 1.0,
    min: 0.5,
    max: 2.0
  }
}, {
  timestamps: true
});

export default mongoose.model('SiteSetting', siteSettingSchema);