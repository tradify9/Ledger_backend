import mongoose from 'mongoose';
import BlogPage from '../models/BlogPage.js';
import dotenv from 'dotenv';

dotenv.config();

const fixBlogPage = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find existing blog page
    let blogPage = await BlogPage.findOne({ type: 'blogpage' });
    
    if (blogPage) {
      console.log('Existing blog page found:', blogPage);
      
      // Update with all fields
      blogPage.heroTitle = 'Insights That Drive Success';
      blogPage.heroHighlight = 'Drive Success';
      blogPage.heroSubtitle = 'Expert articles, industry trends, and actionable insights to help you stay ahead in the digital age.';
      
      await blogPage.save();
      console.log('Blog page updated successfully:', blogPage);
    } else {
      // Create new blog page
      blogPage = await BlogPage.create({
        type: 'blogpage',
        heroTitle: 'Insights That Drive Success',
        heroHighlight: 'Drive Success',
        heroSubtitle: 'Expert articles, industry trends, and actionable insights to help you stay ahead in the digital age.'
      });
      console.log('New blog page created:', blogPage);
    }
    
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
  }
};

fixBlogPage();