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

// Service Section Settings
const serviceSectionSchema = new mongoose.Schema({
  title: { type: String, default: 'Our Services' },
  subtitle: { type: String, default: 'Premium services powered by cutting-edge technology and deep industry expertise' },
  showSection: { type: Boolean, default: true },
  maxServicesToShow: { type: Number, default: 6 }
});

// Blog Section Settings
const blogSectionSchema = new mongoose.Schema({
  title: { type: String, default: 'Latest Insights' },
  subtitle: { type: String, default: 'Fresh business insights and industry trends from our expert consultants' },
  showSection: { type: Boolean, default: true },
  maxBlogsToShow: { type: Number, default: 3 }
});

// Testimonial Section Settings
const testimonialSectionSchema = new mongoose.Schema({
  title: { type: String, default: 'What Our Clients Say' },
  subtitle: { type: String, default: 'Trusted by industry leaders and innovative startups worldwide' },
  showSection: { type: Boolean, default: true }
});

// FAQ Section Settings
const faqSectionSchema = new mongoose.Schema({
  title: { type: String, default: 'Frequently Asked Questions' },
  subtitle: { type: String, default: 'Everything you need to know about our consulting services' },
  showSection: { type: Boolean, default: true }
});

// Stats Section Settings
const statsSectionSchema = new mongoose.Schema({
  title: { type: String, default: 'Our Impact' },
  subtitle: { type: String, default: 'Making a measurable difference for our clients worldwide' },
  showSection: { type: Boolean, default: true }
});

// Hero Section Settings
const heroSectionSchema = new mongoose.Schema({
  showSection: { type: Boolean, default: true },
  badgeText: { type: String, default: 'Trusted by 500+ businesses worldwide' },
  title: { type: String, default: 'Transform Your Business' },
  titleHighlight: { type: String, default: 'with Smart Digital' },
  titleEnd: { type: String, default: 'Solutions' },
  description: { type: String, default: 'Consultancy services for ambitious businesses. We craft intelligent digital strategies that drive measurable growth and sustainable success.' },
  primaryButtonText: { type: String, default: 'Get Free Consultation' },
  primaryButtonLink: { type: String, default: '#enquiry-form' },
  secondaryButtonText: { type: String, default: 'Explore Services' },
  secondaryButtonLink: { type: String, default: '#services' },
  heroImage: { type: String, default: '' },
  heroTexts: [{ type: String, default: ['Strategic Business Consulting', 'Digital Transformation Experts', 'Growth Strategy Partners'] }]
});

const homePageSchema = new mongoose.Schema({
  // Hero Section
  hero: { type: heroSectionSchema, default: () => ({}) },
  
  // Stats Section
  statsSection: { type: statsSectionSchema, default: () => ({}) },
  stats: [statSchema],

  // Services Section
  servicesSection: { type: serviceSectionSchema, default: () => ({}) },

  // Blog Section
  blogSection: { type: blogSectionSchema, default: () => ({}) },

  // Testimonials Section
  testimonialsSection: { type: testimonialSectionSchema, default: () => ({}) },
  testimonials: [testimonialSchema],

  // FAQ Section
  faqSection: { type: faqSectionSchema, default: () => ({}) },
  faqs: [faqSchema],

  // Enquiry Form Section
  enquiryFormSection: {
    showSection: { type: Boolean, default: true },
    title: { type: String, default: 'Ready to Transform Your Business?' },
    subtitle: { type: String, default: 'Fill out the form below and our expert consultants will contact you within 24 hours with a personalized strategy.' },
    buttonText: { type: String, default: 'Send Enquiry Now' },
    successMessage: { type: String, default: 'Your enquiry has been sent successfully. Our team will contact you within 24 hours.' }
  },

  // Footer CTA Buttons
  ctaButtons: [buttonSchema]

}, { timestamps: true });

export default mongoose.model('HomePage', homePageSchema);