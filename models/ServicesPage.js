import mongoose from 'mongoose';

const servicesHeroSchema = new mongoose.Schema({
  enabled: {
    type: Boolean,
    default: true
  },
  badgeText: {
    type: String,
    default: 'Trusted by 500+ businesses'
  },
  title: {
    type: String,
    default: 'Our Services'
  },
  subtitle: {
    type: String,
    default: 'Transform Your Business'
  },
  description: {
    type: String,
    default: 'Discover our premium consultancy services designed for ambitious businesses. Get expert guidance to achieve sustainable growth and success.'
  },
  buttonText: {
    type: String,
    default: 'Explore Services'
  },
  buttonLink: {
    type: String,
    default: '/services'
  },
  secondaryButtonText: {
    type: String,
    default: 'Free Consultation'
  },
  secondaryButtonLink: {
    type: String,
    default: '/contact'
  },
  rotatingTexts: {
    type: [String],
    default: ['Strategic Planning', 'Digital Transformation', 'Growth Consulting']
  }
}, { _id: false });

const servicesPageSchema = new mongoose.Schema({
  hero: {
    type: servicesHeroSchema,
    default: () => ({})
  }
}, {
  timestamps: true
});

export default mongoose.model('ServicesPage', servicesPageSchema);

