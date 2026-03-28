import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  title: String,
  content: String,
  icon: String,
  order: Number
});

const privacyPageSchema = new mongoose.Schema({
  heroTitle: { type: String, default: 'Privacy Policy' },
  heroSubtitle: { type: String, default: 'Your privacy is our priority' },
  heroImage: { type: String, default: '' },
  sections: [sectionSchema],
  lastUpdated: { type: Date, default: Date.now },
  contactInfo: String
}, { timestamps: true });

export default mongoose.model('PrivacyPage', privacyPageSchema);
