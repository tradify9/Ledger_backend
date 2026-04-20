import mongoose from 'mongoose';

const blogPageSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'blogpage',
    required: true,
    unique: true
  },
  heroTitle: { 
    type: String, 
    required: true,
    default: 'Insights That Drive Success'
  },
  heroSubtitle: { 
    type: String, 
    required: true,
    default: 'Expert articles, industry trends, and actionable insights to help you stay ahead in the digital age.'
  }
}, { 
  collection: 'blogpages',
  timestamps: true 
});

// Single document pattern - static method to get the blog page
blogPageSchema.statics.getBlogPage = async function() {
  let blogPage = await this.findOne({ type: 'blogpage' });
  
  if (!blogPage) {
    // Create default if not exists
    blogPage = await this.create({
      type: 'blogpage',
      heroTitle: 'Insights That Drive Success',
      heroSubtitle: 'Expert articles, industry trends, and actionable insights to help you stay ahead in the digital age.'
    });
  }
  
  return blogPage;
};

export default mongoose.model('BlogPage', blogPageSchema);


