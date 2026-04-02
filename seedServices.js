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
    governmentFees: '₹7,000 (approx)',
    discount: 10,
    companyName: 'GrowEasy Corporate Solutions Pvt Ltd',
    rating: 4.9,
    pricingCards: [
      { title: 'Basic', value: '₹14,999', icon: 'Sparkles', color: '#10b981' },
      { title: 'Standard', value: '₹19,999', icon: 'Crown', color: '#f59e0b' },
      { title: 'Premium', value: '₹24,999', icon: 'Diamond', color: '#8b5cf6' }
    ],
    professionals: [
      { name: 'Priya Sharma', role: 'Company Secretary', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300', bio: 'CS qualified, 8+ years MCA filings' },
      { name: 'Rohan Gupta', role: 'CA Consultant', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300', bio: 'Chartered Accountant, 10+ years experience' }
    ],
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
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800'
    ]
  },
  {
    title: 'Private Limited Company Registration',
    description: 'Fast track Pvt Ltd incorporation for 2+ directors. SPICe+ filing, DSC/DIN, MoA/AoA. Starting ₹6,999 + Govt fees.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
    category: 'Company Registration',
    price: 6999,
    governmentFees: '₹9,000 (approx)',
    discount: 15,
    companyName: 'CorpLegal Solutions LLP',
    rating: 4.8,
    pricingCards: [
      { title: 'Basic', value: '₹6,999', icon: 'Briefcase', color: '#3b82f6' },
      { title: 'Pro', value: '₹9,999', icon: 'Star', color: '#eab308' },
      { title: 'Enterprise', value: '₹14,999', icon: 'Rocket', color: '#ec4899' }
    ],
    professionals: [
      { name: 'Amit Patel', role: 'MCA Expert', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', bio: '12 years corporate filings, 500+ companies incorporated' }
    ],
    features: [
      { title: '2 Names RUN', description: 'Auto MCA name approval', icon: 'CheckCircle' },
      { title: 'DSC/DIN 1 Day', description: 'Instant digital approvals', icon: 'Clock' },
      { title: 'SPICe+ One Shot', description: 'PAN/TAN/EPFO/ESIC/EIN', icon: 'Lightning' },
      { title: 'Bank Account', description: 'Intro letter + compliance kit', icon: 'Banknotes' },
      { title: 'Free Consultation', description: '1hr post-incorporation call', icon: 'Phone' }
    ],
    benefits: [
      { title: 'Limited Liability', description: 'Shareholders protected up to investment' },
      { title: 'Fundraising Ready', description: 'VC/PE/Angel investor compliant' },
      { title: 'Global Credibility', description: 'International business recognition' }
    ],
    process: [
      { step: 1, title: 'Digital Setup', description: 'DSC/DIN procurement', duration: '1 day' },
      { step: 2, title: 'Documents Draft', description: 'INC-9, MoA/AoA customization', duration: '2 days' },
      { step: 3, title: 'SPICe+ Submit', description: 'Integrated company filing', duration: '5 days' },
      { step: 4, title: 'COI Receive', description: 'Certificate + PAN/TAN', duration: '2 days' }
    ],
    documents: [
      'PAN/Aadhaar directors',
      'Proof of office',
      'Board resolution'
    ],
    faq: [
      { question: 'Minimum directors?', answer: '2 directors, 2 shareholders required' },
      { question: 'Capital required?', answer: 'No minimum capital since 2015 amendment' }
    ],
    images: [
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
    ]
  },
  {
    title: 'LLP Registration',
    description: 'Limited Liability Partnership - flexible structure for professionals. DSC, DPIN, FiLLiP form. Starting ₹4,999 + Govt fees.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop',
    category: 'Partnership',
    price: 4999,
    governmentFees: '₹5,000 (approx)',
    discount: 20,
    companyName: 'ProPartners Legal LLP',
    rating: 4.7,
    pricingCards: [
      { title: 'Starter', value: '₹4,999', icon: 'Handshake', color: '#059669' },
      { title: 'Growth', value: '₹6,999', icon: 'TrendingUp', color: '#f97316' },
      { title: 'Scale', value: '₹9,999', icon: 'Scale', color: '#7c3aed' }
    ],
    professionals: [
      { name: 'Neha Rao', role: 'LLP Specialist', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300', bio: 'LLP conversions expert, CA + CS dual qualified' }
    ],
    features: [
      { title: 'Flexible Partners', description: 'Min 2 partners, no max limit', icon: 'Users' },
      { title: 'No Annual Audit', description: 'Turnover <40L exempt', icon: 'ShieldCheck' },
      { title: 'Easy Exit', description: 'Partner can resign without dissolution', icon: 'ArrowRight' },
      { title: 'Foreign Nationals', description: 'FDI allowed in LLP', icon: 'Globe' }
    ],
    benefits: [
      { title: 'Limited Liability', description: 'Partners liability to contribution only' },
      { title: 'Less Compliance', description: 'No ROC filings except Form 8/11' },
      { title: 'Professional Friendly', description: 'CA/CS/Lawyers preferred structure' }
    ],
    process: [
      { step: 1, title: 'DPIN/DSC', description: 'Designated partner approvals', duration: '1 day' },
      { step: 2, title: 'FiLLiP-FiN', description: 'Name + incorporation form', duration: '3 days' },
      { step: 3, title: 'LLP Agreement', description: 'Profit sharing deed drafting', duration: '2 days' },
      { step: 4, title: 'CO-LLP', description: 'Certificate issuance', duration: '3 days' }
    ],
    documents: [
      'PAN/Aadhaar partners',
      'LLP agreement draft',
      'Proof of address'
    ],
    faq: [
      { question: 'Difference from partnership?', answer: 'Limited liability + easy compliance' },
      { question: 'Tax benefits?', answer: 'Pass-through taxation, no DDT' }
    ],
    images: [
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800'
    ]
  },
  {
    title: 'GST Registration',
    description: 'PAN based GSTIN within 3 days. Regular/composition scheme. Free HSN/SAC classification. Starting ₹999 only.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
    category: 'Tax Compliance',
    price: 999,
    governmentFees: 'Free',
    discount: 0,
    companyName: 'TaxSimple Solutions',
    rating: 4.9,
    pricingCards: [
      { title: 'Basic', value: '₹999', icon: 'Receipt', color: '#ef4444' },
      { title: 'Pro + Returns', value: '₹2,999', icon: 'FileCheck', color: '#10b981' },
      { title: 'Enterprise', value: '₹4,999', icon: 'BuildingOffice', color: '#3b82f6' }
    ],
    professionals: [
      { name: 'Vikram Singh', role: 'GST Expert', image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=300', bio: 'Certified GST practitioner, 2000+ registrations' }
    ],
    features: [
      { title: '3 Day Delivery', description: 'Express GSTIN issuance', icon: 'Clock' },
      { title: 'Free Classification', description: 'HSN/SAC lookup service', icon: 'Search' },
      { title: 'Composition Scheme', description: 'Eligibility analysis included', icon: 'Calculator' },
      { title: 'Input Tax Credit', description: 'Registration for ITC benefits', icon: 'Banknotes' }
    ],
    benefits: [
      { title: 'Legal Compliance', description: 'Avoid ₹10k-25k penalties', icon: 'ShieldCheck' },
      { title: 'Input Credit', description: 'Claim GST paid on purchases', icon: 'ArrowDown' },
      { title: 'Business Expansion', description: 'Interstate sales enabled' }
    ],
    process: [
      { step: 1, title: 'Document Verify', description: 'PAN, Bank, Address proof', duration: '1 day' },
      { step: 2, title: 'ARN Generate', description: 'Application reference number', duration: '1 day' },
      { step: 3, title: 'GSTIN Issue', description: '15 digit GST number', duration: '1 day' },
      { step: 4, title: 'Login Setup', description: 'GST portal credentials', duration: '1 hour' }
    ],
    documents: [
      'PAN',
      'Bank cancellation cheque',
      'Address proof',
      'Photo'
    ],
    faq: [
      { question: 'Mandatory threshold?', answer: '₹20L interstate, ₹10L special states' },
      { question: 'E-commerce?', answer: 'Mandatory even below threshold' }
    ],
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800'
    ]
  },
  {
    title: 'Trademark Registration',
    description: 'Brand protection across 45 classes. Complete filing + prosecution. Objection response included. Starting ₹9,999 + Govt fees.',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=600&fit=crop',
    category: 'Intellectual Property',
    price: 9999,
    governmentFees: '₹4,500 per class',
    discount: 10,
    companyName: 'IPGuard Legal Services',
    rating: 4.6,
    pricingCards: [
      { title: 'Single Class', value: '₹9,999', icon: 'Tag', color: '#8b5cf6' },
      { title: '3 Classes', value: '₹24,999', icon: 'Tags', color: '#f59e0b' },
      { title: '10 Classes', value: '₹69,999', icon: 'Layers', color: '#10b981' }
    ],
    professionals: [
      { name: 'Sonia Mehra', role: 'IP Attorney', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300', bio: 'Trademark specialist, 80% success rate' }
    ],
    features: [
      { title: '45 Class Coverage', description: 'Goods/services classification', icon: 'Grid' },
      { title: 'Similarity Search', description: 'TM registry check', icon: 'MagnifyingGlass' },
      { title: 'Objection Handling', description: 'Response drafting + hearing', icon: 'Gavel' },
      { title: 'Renewal Reminders', description: '10 year protection tracking', icon: 'Calendar' }
    ],
    benefits: [
      { title: 'Brand Monopoly', description: 'Exclusive rights 10 years', icon: 'Crown' },
      { title: 'Legal Protection', description: 'Sue for infringement', icon: 'Shield' },
      { title: 'Business Value', description: 'Intangible asset creation' }
    ],
    process: [
      { step: 1, title: 'Trademark Search', description: 'Availability analysis', duration: '2 days' },
      { step: 2, title: 'Form TM-A', description: 'Application filing', duration: '1 day' },
      { step: 3, title: 'Examination Report', description: '18 months processing', duration: '18 months' },
      { step: 4, title: 'Publication/Registration', description: 'Certificate issuance', duration: '4 months' }
    ],
    documents: [
      'Logo/MS Word mark',
      'POA signed',
      'MSME certificate'
    ],
    faq: [
      { question: 'How long protection?', answer: '10 years renewable indefinitely' },
      { question: 'Classes needed?', answer: 'One per goods/services category' }
    ],
    images: [
      'https://images.unsplash.com/photo-1542744173-8e7f37783b3b?w=800',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800'
    ]
  },
  {
    title: 'Private Limited Annual Compliance',
    description: 'Form AOC-4, MGT-7, MBP-1, DPT-3, MSME-1. Director KYC + reconciliations. Starting ₹12,999.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
    category: 'Compliance',
    price: 12999,
    governmentFees: '₹3,000 (approx)',
    discount: 5,
    companyName: 'CompliancePro Services',
    rating: 4.8,
    pricingCards: [
      { title: 'Essential', value: '₹12,999', icon: 'Checklist', color: '#f97316' },
      { title: 'Statutory', value: '₹19,999', icon: 'DocumentCheck', color: '#3b82f6' },
      { title: 'Advanced', value: '₹29,999', icon: 'ShieldCheck', color: '#059669' }
    ],
    professionals: [
      { name: 'Rajesh Kumar', role: 'Compliance Officer', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', bio: 'CS + 15 years ROC compliance' }
    ],
    features: [
      { title: '15+ Forms Filed', description: 'Complete ROC annual cycle', icon: 'Forms' },
      { title: 'Director KYC', description: 'DIR-3 KYC automation', icon: 'Identification' },
      { title: 'MSME Half Yearly', description: 'Form MSME-1 filing', icon: 'Calculator' },
      { title: 'Reconciliation', description: 'Books + MCA match', icon: 'Scale' }
    ],
    benefits: [
      { title: 'Strikeoff Protection', description: 'Avoid company deactivation', icon: 'Lock' },
      { title: 'Director DIN Active', description: 'DSC validity maintained', icon: 'Key' },
      { title: 'Loan Eligibility', description: 'Clean compliance record' }
    ],
    process: [
      { step: 1, title: 'Document Collect', description: 'Financials, board resolutions', duration: '3 days' },
      { step: 2, title: 'Form Prep AOC4/MGT7', description: 'Financial statements', duration: '5 days' },
      { step: 3, title: 'Director Forms', description: 'MBP1, DIR3, DPT3', duration: '2 days' },
      { step: 4, title: 'File & Certify', description: 'SRN + payment', duration: '2 days' }
    ],
    documents: [
      'Audited financials',
      'Board meeting minutes',
      'DSC certificates'
    ],
    faq: [
      { question: 'Due dates?', answer: 'AOC4/MGT7: 30th Sep, DPT3: 30th Jun' },
      { question: 'Penalties?', answer: '₹100/day per form delay' }
    ],
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
    ]
  },
  {
    title: 'Startup India Registration',
    description: 'DPIIT recognition certificate + benefits. Turnover <100cr eligible. Tax exemption + funding priority. ₹4,999 only.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    category: 'Government Schemes',
    price: 4999,
    governmentFees: 'Free',
    discount: 0,
    companyName: 'Startup Accelerator Pvt Ltd',
    rating: 4.9,
    pricingCards: [
      { title: 'Recognition', value: '₹4,999', icon: 'Star', color: '#eab308' },
      { title: 'Recognition + IP', value: '₹9,999', icon: 'Bulb', color: '#8b5cf6' },
      { title: 'Full Package', value: '₹19,999', icon: 'Rocket', color: '#ec4899' }
    ],
    professionals: [
      { name: 'Ankit Sharma', role: 'Startup Mentor', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300', bio: 'Assisted 150+ DPIIT recognitions' }
    ],
    features: [
      { title: 'DPIIT Certificate', description: 'Official startup status', icon: 'Award' },
      { title: '80% Angel Tax Exemption', description: 'Section 56(2)(viib)', icon: 'Percent' },
      { title: '3 Year Tax Holiday', description: 'Profit tax exemption', icon: 'Clock' },
      { title: 'Fast IP Filing', description: '80% fee reduction', icon: 'Lightning' },
      { title: 'Govt Tender Priority', description: '5% purchase preference', icon: 'Truck' }
    ],
    benefits: [
      { title: 'Funding Priority', description: 'SIDBI Fund of Funds', icon: 'Banknotes' },
      { title: 'IPR Fast Track', description: 'Priority examination', icon: 'FastForward' },
      { title: 'Incubation Support', description: 'NIDHI, ASPIRE schemes' }
    ],
    process: [
      { step: 1, title: 'Eligibility Check', description: '<10 years, turnover <100cr', duration: '1 day' },
      { step: 2, title: 'Profile Create', description: 'Startup India portal', duration: '1 day' },
      { step: 3, title: 'Document Upload', description: 'Incorporation, pitch deck', duration: '2 days' },
      { step: 4, title: 'DPIIT Approval', description: 'Recognition number', duration: '15 days' }
    ],
    documents: [
      'COI/PAN',
      'Pitch deck',
      'Proof of innovation'
    ],
    faq: [
      { question: 'Innovation required?', answer: 'Product/service/product must be new/improved' },
      { question: 'Benefits duration?', answer: '10 years from incorporation' }
    ],
    images: [
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800'
    ]
  },
  {
    title: 'MSME Udyam Registration',
    description: 'Free Udyam certificate + priority lending. Micro/small/medium classification. Benefits worth ₹5 lakhs/year. Free service.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
    category: 'Government Schemes',
    price: 0,
    governmentFees: 'Free',
    discount: 0,
    companyName: 'MSME Helper Services',
    rating: 5.0,
    pricingCards: [
      { title: 'Micro', value: 'Free', icon: 'CircleStack', color: '#6b7280' },
      { title: 'Small', value: 'Free', icon: 'SquareStack', color: '#10b981' },
      { title: 'Medium', value: 'Free', icon: 'CubeStack', color: '#3b82f6' }
    ],
    professionals: [
      { name: 'Govind Das', role: 'MSME Consultant', image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=300', bio: 'Government scheme specialist' }
    ],
    features: [
      { title: 'Aadhaar Based', description: 'PAN auto-populated', icon: 'Fingerprint' },
      { title: '4-6% Interest Subvention', description: 'CGTMSE loan guarantee', icon: 'Percent' },
      { title: '50% Credit Guarantee', description: 'Collateral free loans', icon: 'Shield' },
      { title: 'Priority Tenders', description: 'Govt procurement preference', icon: 'Star' }
    ],
    benefits: [
      { title: '₹1cr Credit Guarantee', description: 'Collateral free up to 1cr', icon: 'Banknotes' },
      { title: 'Machinery Subsidy', description: '15% CLCSS subsidy', icon: 'Gift' },
      { title: 'ISO Reimbursement', description: '75% certification cost' }
    ],
    process: [
      { step: 1, title: 'Aadhaar Login', description: 'Udyam portal', duration: '5 min' },
      { step: 2, title: 'PAN Verify', description: 'Investment/turnover auto-fill', duration: '2 min' },
      { step: 3, title: 'Submit Udyam', description: 'Instant certificate', duration: '1 min' },
      { step: 4, title: 'Download PDF', description: 'Permanent registration', duration: 'Instant' }
    ],
    documents: [
      'Aadhaar',
      'PAN'
    ],
    faq: [
      { question: 'Eligibility?', answer: 'All non-corporate businesses' },
      { question: 'EM-I replaced?', answer: 'Yes, Udyam is perpetual registration' }
    ],
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800'
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

