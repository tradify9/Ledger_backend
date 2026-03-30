import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  shortDescription: { type: String, required: true }, 
  content: { type: String, required: true }, 
  category: { type: String, required: true },
  tags: [{ type: String }],
  featuredImage: { type: String, default: '' }, 
  youtubeUrl: { type: String, default: '' },
  images: [{ type: String }], 
  author: { type: String, default: 'Admin' },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  views: { type: Number, default: 0 },
  readTime: { type: Number, default: 5 }, 
  seoTitle: String,
  seoDescription: String,
  metaImage: String
}, { timestamps: true });

// Compound indexes for performance (removed duplicate slug:1)
blogSchema.index({ category: 1, status: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ createdAt: -1 });
blogSchema.index({ views: -1, createdAt: -1 });

export default mongoose.model('Blog', blogSchema);

