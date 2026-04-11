import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  // Basic Info
  title: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, default: 'General' },
  
  // Hero image (main image)
  image: { type: String, default: '' },
  
  // Gallery images
  images: [{ type: String, default: [] }],
  
  // Pricing
  price: { type: Number, default: 0 },
  governmentFees: { type: String, default: '' },
  discount: { type: Number, default: 0, min: 0, max: 100 },
  
  // Company & Rating
  companyName: { type: String, default: '' },
  rating: { type: Number, default: 5, min: 0, max: 5 },
  
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