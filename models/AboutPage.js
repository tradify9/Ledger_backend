import mongoose from 'mongoose';

// Fixed duplicate import - using ES modules


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
  name: String,
  role: String,
  image: String,
  content: String,
  rating: { type: Number, default: 5 }
});

const milestoneSchema = new mongoose.Schema({
  year: String,
  title: String,
  description: String,
  icon: { type: String, default: 'Rocket' }
});

const achievementSchema = new mongoose.Schema({
  metric: String,
  label: String,
  icon: { type: String, default: 'Heart' }
});

const aboutPageSchema = new mongoose.Schema({
  // Hero
  badgeText: { type: String, default: 'About Us' },
  heroTitle: { type: String, default: 'About Us' },
  heroSubtitle: { type: String, default: 'Leading consultancy with 15+ years experience' },
  heroImage: { type: String, default: '' },

  // Stats
  stats: [{
    value: { type: String, default: '50+' },
    label: { type: String, default: 'Projects' },
    icon: { type: String, default: 'Users' },
    color: { type: String, default: 'blue' }
  }],

  // Story
  storyTitle: { type: String, default: 'Our Story' },
  storyContent: String,
  storyHighlights: [highlightSchema],

  // Milestones
  milestones: [milestoneSchema],

  // Core Values
  values: [{
    icon: { type: String, default: 'Lightbulb' },
    title: String,
    description: String
  }],

  // Team
  teamMembers: [{
    name: String,
    role: String,
    image: String,
    specialty: String,
    bio: String
  }],

  // Achievements
  achievements: [achievementSchema],

  // Testimonials
  testimonials: [testimonialSchema],

  // CTA
  ctaTitle: { type: String, default: 'Ready to Transform Your Business?' },
  ctaSubtitle: String,
  ctaButtons: [buttonSchema]
}, { timestamps: true });

export default mongoose.model('AboutPage', aboutPageSchema);
