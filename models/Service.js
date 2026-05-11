import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
// Basic Info
  title: { type: String, required: true },
  description: { type: String, default: '' },
  longDescription: { type: String, default: '' }, // Rich content for service detail page
  category: { type: String, default: 'General' },
  
  // Hero image (main image)
  image: { type: String, default: '' },

  // Service detail hero content
  detailHero: {
    enabled: { type: Boolean, default: true },
    badgeText: { type: String, default: 'Premium Service' },
    title: { type: String, default: 'Expert {serviceTitle} Solutions' },
    subtitle: { type: String, default: 'Transform Your Business' },
    description: { type: String, default: 'Expert {serviceTitle} solutions built for measurable results. Trusted by 500+ businesses.' },
    buttonText: { type: String, default: 'Start Project' },
    buttonLink: { type: String, default: '/contact' },
    secondaryButtonText: { type: String, default: 'Free Consultation' },
    secondaryButtonLink: { type: String, default: '/contact' },
    showStatsBar: { type: Boolean, default: true },
    showEnquiryForm: { type: Boolean, default: true },
    statsData: [{
      icon: { type: String, default: 'Users' },
      label: { type: String, default: '' },
      value: { type: String, default: '' },
      color: { type: String, default: '#2563eb' }
    }]
  },

  // Service detail page copy outside the hero
  detailContent: {
    sidebarFeaturesTitle: { type: String, default: 'Key Features' },
    featuresEyebrow: { type: String, default: 'What You Get' },
    featuresTitle: { type: String, default: 'Everything you need to succeed' },
    ctaEyebrow: { type: String, default: 'Get Started Today' },
    ctaTitle: { type: String, default: 'Ready to transform your business?' },
    ctaDescription: { type: String, default: 'Book a free consultation with our experts and take the first step toward measurable growth.' },
    ctaPrimaryText: { type: String, default: 'Book Free Consultation' },
    ctaPrimaryLink: { type: String, default: '/contact' },
    ctaSecondaryText: { type: String, default: 'Explore More Services' },
    ctaSecondaryLink: { type: String, default: '/services' },
    trustBadges: [{
      icon: { type: String, default: 'Shield' },
      text: { type: String, default: '' }
    }]
  },
  
  // Gallery images
  images: [{ type: String, default: [] }],
  
  // Pricing
  price: { type: Number, default: 0 },
  governmentFees: { type: String, default: '' },
  discount: { type: Number, default: 0, min: 0, max: 100 },
  
  // Company & Rating
  companyName: { type: String, default: '' },
  rating: { type: Number, default: 5, min: 0, max: 5 },
  estimatedTime: { type: String, default: '' },
  serviceType: {
    type: String,
    enum: ['one-time', 'subscription'],
    default: 'one-time'
  },
  deliveryFormat: {
    type: String,
    enum: ['online', 'offline', 'hybrid'],
    default: 'online'
  },
  isPopular: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  serviceColor: { type: String, default: '#2563eb' },
  
  // Pricing Cards
  pricingCards: [{
    title: { type: String, default: '' },
    value: { type: String, default: '' },
    icon: { type: String, default: 'Tag' },
    color: { type: String, default: '#10b981' }
  }],
  
  // Team/Professionals
  professionals: [{
    name: { type: String, default: '' },
    role: { type: String, default: '' },
    image: { type: String, default: '' },
    bio: { type: String, default: '' }
  }],
  
  // Features
  features: [{
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    icon: { type: String, default: 'CheckCircle' }
  }],
  
  // Benefits
  benefits: [{
    title: { type: String, default: '' },
    description: { type: String, default: '' }
  }],
  
  // Disadvantages
  disadvantages: [{
    title: { type: String, default: '' },
    description: { type: String, default: '' }
  }],
  
  // Process Steps
  process: [{
    step: { type: Number, default: 1 },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    duration: { type: String, default: '' }
  }],
  
  // Required Documents
  documents: [{
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    icon: { type: String, default: 'FileText' }
  }],
  
  // FAQ
  faq: [{
    question: { type: String, default: '' },
    answer: { type: String, default: '' }
  }],

  prerequisites: [{
    title: { type: String, default: '' },
    description: { type: String, default: '' }
  }],

  certifications: [{
    title: { type: String, default: '' },
    issuer: { type: String, default: '' },
    year: { type: String, default: '' }
  }],

  testimonials: [{
    name: { type: String, default: '' },
    role: { type: String, default: '' },
    message: { type: String, default: '' },
    rating: { type: Number, default: 5, min: 0, max: 5 }
  }],
  
  // Offers
  offers: [{
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    discount: { type: Number, default: 0 },
    validUntil: { type: Date }
  }]
  
}, { 
  timestamps: true 
});

export default mongoose.model('Service', serviceSchema);
