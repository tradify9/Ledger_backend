import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';
import Service from './models/Service.js';
import Blog from './models/Blog.js';
import AboutPage from './models/AboutPage.js';
import SiteSetting from './models/SiteSetting.js';
import { slugify, generateUniqueSlug } from './utils/slugify.js';

dotenv.config();

const seedComplete = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected for complete seeding');

    // 1. SEED SERVICES (12 detailed services)
    const servicesData = [
      {
        title: 'Strategic Business Consulting',
        description: 'Comprehensive business strategy development including market analysis, competitive positioning, and growth roadmaps. Transform your vision into actionable plans.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        category: 'Strategy'
      },
      {
        title: 'Digital Transformation',
        description: 'Complete digital roadmap implementation from cloud migration to AI integration. Reduce costs by 40% and increase efficiency.',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
        category: 'Digital'
      },
      {
        title: 'Financial Advisory & CFO Services',
        description: 'Fractional CFO services, financial modeling, fundraising strategy, and cash flow optimization for scaling businesses.',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
        category: 'Finance'
      },
      {
        title: 'Sales & Marketing Optimization',
        description: 'Complete go-to-market strategy including sales process optimization, marketing automation, and customer acquisition systems.',
        image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop',
        category: 'Growth'
      },
      {
        title: 'HR & Talent Strategy',
        description: 'Executive search, organizational design, culture development, and leadership coaching for high-growth companies.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
        category: 'People'
      },
      {
        title: 'Technology Implementation',
        description: 'CRM, ERP, and custom software implementation with change management and user adoption training.',
        image: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=800&h=600&fit=crop',
        category: 'Technology'
      },
      {
        title: 'Mergers & Acquisitions Advisory',
        description: 'Full M&A lifecycle support from target identification to post-merger integration.',
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
        category: 'M&A'
      },
      {
        title: 'Risk Management & Compliance',
        description: 'Enterprise risk assessment, compliance framework development, and cybersecurity strategy.',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
        category: 'Risk'
      },
      {
        title: 'Operational Excellence',
        description: 'Lean operations, supply chain optimization, and process reengineering for cost reduction and efficiency.',
        image: 'https://images.unsplash.com/photo-1558522539-0f32813bd3c9?w=800&h=600&fit=crop',
        category: 'Operations'
      },
      {
        title: 'Innovation & Product Development',
        description: 'New product launch strategy, innovation workshop facilitation, and go-to-market execution.',
        image: 'https://images.unsplash.com/photo-1513110381350-9e6f4a6dc63b?w=800&h=600&fit=crop',
        category: 'Innovation'
      },
      {
        title: 'Executive Coaching & Leadership',
        description: '1:1 executive coaching, leadership team alignment, and succession planning.',
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d6495f5?w=800&h=600&fit=crop',
        category: 'Leadership'
      },
      {
        title: 'Sustainability & ESG Consulting',
        description: 'ESG framework development, sustainability reporting, and green transformation strategy.',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop',
        category: 'Sustainability'
      }
    ];

    await Service.deleteMany({});
    console.log('🗑️ Cleared services');
    
    for (const serviceData of servicesData) {
      await Service.create(serviceData);
      console.log(`✅ Seeded: ${serviceData.title}`);
    }

    // 2. SEED SITE SETTINGS
    await SiteSetting.deleteMany({});
    await SiteSetting.create({
      navbarTitle: 'Ledger Advisory',
      navbarTagline: 'Strategic Business Consulting',
      logoUrl: 'https://i.ibb.co/MD7xP0Kv/Whats-App-Image-2026-03-28-at-2-29-07-PM-removebg-preview.png',
      heroTitle: 'Transform Your Business with Proven Strategies',
      primaryColor: '#1e293b',
      aboutContent: 'Leading consultancy with 15+ years of experience delivering measurable results for ambitious organizations.',
      privacyPolicy: 'We respect your privacy and protect your data according to GDPR standards.'
    });
    console.log('✅ Seeded Site Settings');

    // 3. SEED ABOUT PAGE (rich data)
    await AboutPage.deleteMany({});
    await AboutPage.create({
      badgeText: 'Our Story',
      heroTitle: 'Trusted Partners in Business Transformation',
      heroSubtitle: '15+ Years | 200+ Clients | $500M+ Value Created',
      heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop',

      stats: [
        { value: '200+', label: 'Projects Delivered', icon: 'Briefcase', color: 'blue' },
        { value: '50+', label: 'Industries Served', icon: 'Globe', color: 'green' },
        { value: '98%', label: 'Client Satisfaction', icon: 'Star', color: 'yellow' },
        { value: '$500M+', label: 'Value Created', icon: 'DollarSign', color: 'purple' }
      ],

      storyTitle: 'Our Journey',
      storyContent: 'Founded in 2008 during the global financial crisis, we started as a boutique consultancy helping SMEs survive. Today, we partner with Fortune 500 companies and high-growth startups to unlock their full potential.',
      storyHighlights: [
        { icon: 'MapPin', title: 'Global Reach', description: 'Serving clients in 30+ countries across 5 continents' },
        { icon: 'Users', title: 'Expert Team', description: '40+ senior consultants with avg 15+ years experience' },
        { icon: 'Award', title: 'Award Winning', description: 'Recognized by Forbes, Deloitte, and industry peers' }
      ],

      milestones: [
        { year: '2008', title: 'Founded', description: 'Started with 3 founders during financial crisis', icon: 'Building' },
        { year: '2012', title: 'First 50 Clients', description: 'Reached profitability within 4 years', icon: 'Users' },
        { year: '2018', title: 'Global Expansion', description: 'Opened offices in 5 countries', icon: 'Globe' },
        { year: '2024', title: '500+ Projects', description: 'Celebrating 15 years of transformation', icon: 'Star' }
      ],

      values: [
        { icon: 'Heart', title: 'Client Success First', description: 'Your goals are our mission' },
        { icon: 'Rocket', title: 'Results Driven', description: 'Measurable ROI or we don\'t charge' },
        { icon: 'Shield', title: 'Trusted Partners', description: 'Long-term relationships built on trust' },
        { icon: 'Lightbulb', title: 'Innovative Solutions', description: 'Cutting-edge strategies for modern challenges' }
      ],

      teamMembers: [
        { name: 'Johnathan Doe', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop', specialty: 'Strategy', bio: '25+ years leading Fortune 500 transformations' },
        { name: 'Sarah Johnson', role: 'Chief Strategy Officer', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop', specialty: 'Digital', bio: 'Ex-McKinsey partner, digital transformation expert' },
        { name: 'Michael Chen', role: 'CFO Services Lead', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop', specialty: 'Finance', bio: 'CFA charterholder, scaled 20+ startups' }
      ],

      achievements: [
        { metric: '200+', label: 'Happy Clients', icon: 'Users' },
        { metric: '15+', label: 'Years Experience', icon: 'Clock' },
        { metric: '98%', label: 'Success Rate', icon: 'CheckCircle' }
      ],

      testimonials: [
        { name: 'David Lee', role: 'CEO @ TechCorp', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', content: "Ledger Advisory transformed our stagnant $5M business into a $25M growth machine. Exceptional partners.", rating: 5 },
        { name: 'Emma Wilson', role: 'Founder @ ScaleUp', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop', content: 'Best investment we ever made. ROI exceeded expectations 5x.', rating: 5 }
      ],

      ctaTitle: 'Ready to Transform Your Business?',
      ctaSubtitle: 'Lets discuss how we can unlock your organization\'s full potential.',
      ctaButtons: [
        { text: 'Free Consultation', url: '/contact', variant: 'primary' },
        { text: 'View Case Studies', url: '/services', variant: 'secondary' }
      ]
    });
    console.log('✅ Seeded About Page');

    console.log('\\n🎉 COMPLETE SEED SUCCESS!');
    console.log('✅ 12 Services | ✅ Site Settings | ✅ Rich About Page');
    console.log('🌐 Frontend: cd forntend && npm run dev');
    console.log('🔧 Test: http://localhost:5173/about, /services, /');

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Seed Error:', error.message);
    process.exit(1);
  }
};

seedComplete();

