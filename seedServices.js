import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './models/Service.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('🔗 MongoDB connected for seeding'))
  .catch(err => console.error('❌ MongoDB connection failed:', err));

const servicesData = [
  {
    title: 'One Person Company Registration',
    description: 'Complete OPC incorporation with expert guidance. MCA filing, DIN, DSC, name approval, MoA/AoA drafting. Starting ₹14,999 + Govt fees.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    category: 'Company Registration',
    
    price: 14999,
    discount: 10,
    companyName: 'GrowEasy Corporate Solutions Pvt Ltd',
    governmentFees: '₹7,000 (approx)',
    rating: 4.9,
    
    features: [
      { title: 'Complete Documentation', description: 'MoA, AoA, INC-9, SPICe+ forms', icon: 'FileText' },
      { title: 'Government Approvals', description: 'MCA name approval, DSC/DIN issuance', icon: 'Award' },
      { title: 'Compliance Setup', description: 'GST, PAN, TAN, bank account opening', icon: 'CheckCircle' },
      { title: 'Post-Incorporation Support', description: 'EPF, ESIC, statutory audit guidance', icon: 'Users' },
      { title: 'Free Amendments', description: '1 free name/director change within 6 months', icon: 'Sparkles' }
    ],
    
    benefits: [
      { title: 'Limited Liability Protection', description: 'Separate legal entity protects personal assets' },
      { title: 'Single Ownership', description: '100% control, no partner conflicts' },
      { title: 'Perpetual Succession', description: 'Business continues despite owner changes' },
      { title: 'Credibility Boost', description: 'Private limited status attracts clients/investors' }
    ],
    
    disadvantages: [
      { title: 'Annual Compliance', description: 'Mandatory MCA filings, board meetings, audits' },
      { title: 'Conversion Limit', description: 'Must convert to Pvt Ltd when turnover >40L' },
      { title: 'Minimum Capital', description: '₹1L minimum authorized capital requirement' }
    ],
    
    process: [
      { step: 1, title: 'Name Approval', description: '2 unique names submitted to MCA', duration: '2 days' },
      { step: 2, title: 'DSC & DIN', description: 'Digital signatures + director identification', duration: '1 day' },
      { step: 3, title: 'SPICe+ Filing', description: 'Integrated incorporation form submission', duration: '3 days' },
      { step: 4, title: 'MoA/AoA Drafting', description: 'Memorandum & Articles of Association', duration: '1 day' },
      { step: 5, title: 'COI Issuance', description: 'Certificate of Incorporation from MCA', duration: '2 days' }
    ],
    
    documents: [
      'PAN Card of director',
      'Aadhaar Card',
      'Address proof',
      'Bank statement',
      'Passport size photos'
    ],
    
    faq: [
      { question: 'How long does OPC registration take?', answer: 'Complete in 7-10 working days from document submission.' },
      { question: 'Can I be sole owner?', answer: 'Yes, OPC is designed for single owner with nominee requirement.' },
      { question: 'What are government fees?', answer: 'Approx ₹7,000 including stamp duty and MCA fees.' }
    ],
    
    professionals: [
      { name: 'Priya Sharma', role: 'Company Secretary', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300', bio: 'CS qualified, 8+ years MCA filings' }
    ],
    
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800'
    ]
  }
];

const seedServices = async () => {
  try {
    await Service.deleteMany({});
    console.log('🗑️ Cleared services');

    for (const serviceData of servicesData) {
      await Service.create(serviceData);
      console.log(`✅ Seeded: ${serviceData.title}`);
    }

    console.log('\n🎉 SERVICES SEED COMPLETE!');
    console.log('📊 1 rich OPC example with all fields');
    console.log('🌐 Test: /services → admin create more → /services/:id');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seedServices();

