import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: '' }, // Cloudinary URL
  category: { type: String, default: 'General' }
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);
