import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  // Hero image (backward compat)
  image: { type: String, default: '' },
  category: { type: String, default: 'General' },
  
  // Pricing
  price: { type: Number },
  governmentFees: { type: String },
  pricingCards: [{
    title: { type: String },
    value: { type: String }, 
    icon: { type: String, default: 'Tag' },
    color: { type: String, default: '#10b981' }
  }],
  
  // Metadata
  discount: { type: Number, default: 0, min: 0, max: 100 },
  companyName: { type: String, default: '' },
  rating: { type: Number, min: 0, max: 5 },
  professionals: [{
    name: { type: String, default: '' },
    role: { type: String, default: '' },
    image: { type: String, default: '' },
    bio: { type: String, default: '' }
  }],
  
  // Gallery
  images: [{ type: String, default: [] }],
  
  // Rich content arrays (JSON strings or objects)
  features: [{
    title: String,
    description: String,
    icon: String 
  }], 
  benefits: [{
    title: String,
    description: String
  }],
  disadvantages: [{
    title: String,
    description: String
  }],
  process: [{
    step: Number,
    title: String,
    description: String,
    duration: String
  }],
  documents: [{
    title: { type: String },
    description: { type: String, default: '' },
    icon: { type: String, default: 'FileText' }
  }],
  
  // FAQ
  faq: [{
    question: String,
    answer: String
  }],
  
  // Offers/Promos
  offers: [{
    title: String,
    description: String,
    discount: Number,
    validUntil: Date
  }]
}, { 
  timestamps: true 
});

export default mongoose.model('Service', serviceSchema);

