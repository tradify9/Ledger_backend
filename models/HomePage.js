import mongoose from 'mongoose';

const buttonSchema = new mongoose.Schema({
  text: String,
  url: String,
  variant: { type: String, enum: ['primary', 'secondary'], default: 'primary' }
});

const testimonialSchema = new mongoose.Schema({
  quote: String,
  author: String,
  role: String,
  avatar: { type: String, default: '' },
  rating: { type: Number, default: 5 }
});

const statSchema = new mongoose.Schema({
  value: String,
  icon: String,
  label: String,
  description: String
});

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String
});

const homePageSchema = new mongoose.Schema({
  // Hero Section
  badgeText: { type: String, default: 'Trusted by 500+ businesses worldwide' },
  heroTitle: { type: String, default: 'Transform Your Business' },
  heroImage: { type: String, default: '' }, // Sidebar hero enquiry image
  
  // Rotating hero subtitles
  heroTexts: [{
    type: String,
    default: ['Strategic Business Consulting', 'Digital Transformation Experts', 'Growth Strategy Partners']
  }],

  // Stats
  stats: [statSchema],

  // Testimonials
  testimonials: [testimonialSchema],

  // FAQs
  faqs: [faqSchema],

  // CTA Buttons (if needed)
  ctaButtons: [buttonSchema]

}, { timestamps: true });

export default mongoose.model('HomePage', homePageSchema);

