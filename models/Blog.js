import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },

  slug: { 
    type: String, 
    required: true, 
    unique: true 
  },

  // ✅ optional field
  shortDescription: {
    type: String,
    default: ''
  },

  content: { 
    type: String, 
    required: true 
  },

  category: { 
    type: String, 
    required: true 
  },

  tags: [{ type: String }],

  featuredImage: { 
    type: String, 
    default: '' 
  },

  youtubeUrl: { 
    type: String, 
    default: '' 
  },

  images: [{ type: String }],

  author: { 
    type: String, 
    default: 'Admin' 
  },

  status: { 
    type: String, 
    enum: ['draft', 'published', 'archived'], 
    default: 'draft' 
  },

  views: { 
    type: Number, 
    default: 0 
  },

  readTime: { 
    type: Number, 
    default: 1
  },

  seoTitle: { type: String, default: '' },

  seoDescription: { 
    type: String, 
    default: '' 
  },

  metaImage: { type: String, default: '' }

}, { timestamps: true });


// 🔥 AUTO HANDLE BEFORE SAVE (MOST IMPORTANT FIX)
blogSchema.pre('save', function(next) {

  // ✅ shortDescription auto generate
  if (!this.shortDescription && this.content) {
    const plainText = this.content.replace(/<[^>]*>/g, '').trim();
    this.shortDescription = plainText.substring(0, 150);
  }

  // ✅ readTime auto calculate
  if (this.content) {
    const words = this.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    this.readTime = Math.ceil(words / 200);
  }

  // ✅ SEO fallback
  if (!this.seoDescription) {
    this.seoDescription = this.shortDescription;
  }

  if (!this.seoTitle) {
    this.seoTitle = this.title;
  }

  next();
});


// ✅ INDEXES
blogSchema.index({ category: 1, status: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ createdAt: -1 });
blogSchema.index({ views: -1, createdAt: -1 });

export default mongoose.model('Blog', blogSchema);