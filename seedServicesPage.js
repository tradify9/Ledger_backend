import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ServicesPage from './models/ServicesPage.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('🔗 Connected to MongoDB');
    
    // Delete existing
    await ServicesPage.deleteMany({});
    console.log('🗑️  Cleared existing ServicesPage data');
    
    // Create default
    const defaultServicesPage = {
      hero: {
        enabled: true,
        badgeText: 'Trusted by 500+ businesses',
        title: 'Our Services',
        subtitle: 'Transform Your Business',
        description: 'Discover our premium consultancy services designed for ambitious businesses. Get expert guidance to achieve sustainable growth and success.',
        buttonText: 'Explore Services',
        buttonLink: '/services',
        secondaryButtonText: 'Free Consultation',
        secondaryButtonLink: '/contact',
        rotatingTexts: ['Strategic Planning', 'Digital Transformation', 'Growth Consulting']
      }
    };
    
    await ServicesPage.create(defaultServicesPage);
    console.log('✅ Created default ServicesPage with hero settings');
    
    console.log('🎉 ServicesPage seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });

