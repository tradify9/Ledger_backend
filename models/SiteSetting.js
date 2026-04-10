import mongoose from 'mongoose';

const siteSettingSchema = new mongoose.Schema({
  navbarTitle: { type: String, default: 'ConsultancyPro' },
  navbarTagline: { type: String, default: 'Professional Consulting' },
  logoUrl: { type: String, default: '' },
  heroTitle: { type: String, default: 'Transform Your Business' },
  primaryColor: { type: String, default: '#3B82F6' },
  aboutContent: { type: String, default: 'Leading consultancy firm with proven results.' },
  privacyPolicy: { type: String, default: 'Your privacy is protected.' },
  servicesHero: {
    texts: [{ type: String, default: 'Strategic Planning' }, { type: String, default: 'Digital Transformation' }, { type: String, default: 'Growth Consulting' }],
    heroSubtitle: { type: String, default: 'Discover our premium consultancy services designed for ambitious businesses. Get expert guidance to achieve sustainable growth and success.' },
    ctaTitle: { type: String, default: 'Find Perfect Service' },
    ctaSubtitle: { type: String, default: 'Get matched with ideal consultant in 24hrs' }
  }
}, { timestamps: true });

export default mongoose.model('SiteSetting', siteSettingSchema);

