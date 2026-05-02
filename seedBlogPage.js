import mongoose from 'mongoose';
import dotenv from 'dotenv';
import BlogPage from './models/BlogPage.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('🔗 MongoDB Connected for BlogPage seed');

    // Create or update blog page settings
    const blogPage = await BlogPage.findOne({ type: 'blogpage' });
    
if (!blogPage) {
      await BlogPage.create({
        type: 'blogpage',
        heroTitle: 'Insights That',
        heroHighlight: 'Drive Success',
        heroSubtitle: 'Expert articles, industry trends, and actionable insights to help you stay ahead in the digital age.'
      });
      console.log('✅ BlogPage document created');
    } else {
      console.log('ℹ️ BlogPage document already exists');
    }


    console.log('🎉 BlogPage seeding complete!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Seed error:', err);
    process.exit(1);
  });

