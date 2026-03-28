import mongoose from 'mongoose';

const siteSettingSchema = new mongoose.Schema({
  navbarTitle: { type: String, default: 'ConsultancyPro' },
  navbarTagline: { type: String, default: 'Professional Consulting' },
  logoUrl: { type: String, default: '' },
  heroTitle: { type: String, default: 'Transform Your Business' },
  primaryColor: { type: String, default: '#3B82F6' },
  aboutContent: { type: String, default: 'Leading consultancy firm with proven results.' },
  privacyPolicy: { type: String, default: 'Your privacy is protected.' }
}, { timestamps: true });

export default mongoose.model('SiteSetting', siteSettingSchema);

