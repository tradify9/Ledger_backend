import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },

  slug: { 
    type: String, 
    required: true, 
    unique: true 
  },

  // ✅ FIXED: optional + auto generate
  shortDescription: {
    type: String,
    default: function () {
      return this.content ? this.content.substring(0, 150) : "";
    }
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
    default: function () {
      if (!this.content) return 1;
      const words = this.content.split(/\s+/).length;
      return Math.ceil(words / 200); // avg reading speed
    }
  },

  // SEO Fields
  seoTitle: { type: String, default: '' },

  seoDescription: {
    type: String,
    default: function () {
      return this.shortDescription || "";
    }
  },

  metaImage: { type: String, default: '' }

}, { timestamps: true });


// ✅ INDEXES (Performance optimized)
blogSchema.index({ category: 1, status: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ createdAt: -1 });
blogSchema.index({ views: -1, createdAt: -1 });

export default mongoose.model('Blog', blogSchema);