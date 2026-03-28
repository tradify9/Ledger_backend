import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, default: '' }, // Cloudinary URL
  readTime: { type: String, default: '5 min' } // e.g. "5 min"
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
