import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema({
  icon: { type: String, default: 'CheckCircle' },
  title: String,
  description: String
});

const buttonSchema = new mongoose.Schema({
  text: String,
  url: String,
  variant: { type: String, enum: ['primary', 'secondary'], default: 'primary' }
});

const testimonialSchema = new mongoose.Schema({
  author: String,
  role: String,
  avatar: String,
  quote: String,
  rating: { type: Number, default: 5 }
});

const milestoneSchema = new mongoose.Schema({
  year: String,
  title: String,
  description: String,
  icon: { type: String, default: 'Rocket' }
});

const statSchema = new mongoose.Schema({
  value: String,
  label: String,
  icon: String,
  color: { type: String, default: 'blue' }
});

const valueSchema = new mongoose.Schema({
  icon: { type: String, default: 'Lightbulb' },
  title: String,
  description: String
});

const achievementSchema = new mongoose.Schema({
  metric: String,
  label: String,
  icon: { type: String, default: 'Heart' }
});

const teamMemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  image: String,
  specialty: String,
  bio: String
});

const aboutPageSchema = new mongoose.Schema({
  // Hero Section
  badgeText: { type: String, default: 'About Us' },
  heroTitle: { type: String, default: 'Transforming Businesses Since 2009' },
  heroSubtitle: { type: String, default: "We're a team of passionate experts dedicated to helping businesses achieve their full potential through innovative solutions and strategic guidance." },
  heroImage: { type: String, default: '' },

  // Stats Section
  stats: [statSchema],

  // Story Section
  storyTitle: { type: String, default: 'Our Story' },
  storyContent: { type: String, default: 'Founded in 2009 with a vision to transform business consulting.' },
  storyImage1: { type: String, default: '' },
  storyImage2: { type: String, default: '' },
  storyImage3: { type: String, default: '' },
  storyHighlights: [highlightSchema],

  // Journey/Milestones Section
  journeyTitle: { type: String, default: '15 Years of Excellence' },
  journeySubtitle: { type: String, default: 'Key milestones that shaped our path to becoming industry leaders' },
  milestones: [milestoneSchema],

  // Core Values Section
  valuesTitle: { type: String, default: 'Core Values That Drive Us' },
  valuesSubtitle: { type: String, default: 'The principles that guide everything we do' },
  values: [valueSchema],

  // Impact/Achievements Section
  achievements: [achievementSchema],
  
  // Impact Section Title/Subtitle
  impactTitle: { type: String, default: 'Our Impact in Numbers' },
  impactSubtitle: { type: String, default: 'Making a measurable difference for our clients worldwide' },

  // Testimonials Section
  testimonialsTitle: { type: String, default: 'What Our Clients Say' },
  testimonialsSubtitle: { type: String, default: 'Trusted by industry leaders across India' },
  testimonials: [testimonialSchema],

  // CTA Section
  ctaTitle: { type: String, default: 'Ready to Transform Your Business?' },
  ctaSubtitle: { type: String, default: "Let's work together to achieve your goals. Contact us today for a free consultation and grow faster." },
  ctaButtons: [buttonSchema]
}, { timestamps: true });

export default mongoose.model('AboutPage', aboutPageSchema);