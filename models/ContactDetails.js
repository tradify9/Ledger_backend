import mongoose from 'mongoose';

const contactDetailsSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  mondayHours: { type: String, required: true, default: '9:00 AM - 6:00 PM' },
  saturdayHours: { type: String, required: true, default: '10:00 AM - 4:00 PM' },
  sundayHours: { type: String, required: true, default: 'Closed' },
  whatsapp: { type: String, required: true },
  emailDescription: { type: String, default: "We'll respond within 24 hours" },
  phoneDescription: { type: String, default: 'Mon-Fri, 9am-6pm EST' },
  addressDescription: { type: String, default: 'Come say hello at our office' }
}, { timestamps: true });

export default mongoose.model('ContactDetails', contactDetailsSchema);

