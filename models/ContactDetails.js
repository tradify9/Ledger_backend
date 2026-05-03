// models/ContactDetails.js
import mongoose from 'mongoose';

const contactDetailsSchema = new mongoose.Schema({
  // Hero Section Fields
  heroHeading: { type: String, default: 'Get In Touch' },
  heroSubheading: { type: String, default: "Let's Build Together" },
  heroDescription: { type: String, default: 'Ready to start your transformation journey? Connect with us and take your business to the next level 🚀' },
  heroButton1: { type: String, default: 'Contact Now' },
  heroButton2: { type: String, default: 'Learn More' },
  
  // Contact Info Fields
  email: { type: String, required: true, default: 'contact@ledgeradvisory.in' },
  phone: { type: String, required: true, default: '+91 9599239791' },
  address: { type: String, required: true, default: 'New Delhi, India' },
  whatsapp: { type: String, required: true, default: '+91 9599239791' },
  
  // Descriptions
  emailDescription: { type: String, default: "We'll respond within 24 hours" },
  phoneDescription: { type: String, default: 'Mon-Fri, 9am-6pm EST' },
  addressDescription: { type: String, default: 'Come say hello at our office' },
  
  // Business Hours
  businessHoursTitle: { type: String, default: 'Business Hours' },
  mondayHours: { type: String, default: '9:00 AM - 6:00 PM' },
  saturdayHours: { type: String, default: '10:00 AM - 4:00 PM' },
  sundayHours: { type: String, default: 'Closed' },
  
  // Form Section
  formHeading: { type: String, default: 'Send us a Message' },
  formDescription: { type: String, default: 'Fill out the form and our team will respond within 24 hours' },
  
  // Contact Info Section Headings
  contactInfoHeading: { type: String, default: 'Contact Information' },
  contactInfoDescription: { type: String, default: "We'd love to hear from you. Here's how you can reach us." },
  
  // Connect Section
  connectWithUsTitle: { type: String, default: 'Connect With Us' },
  
  // Social Links
  socialLinks: {
    type: [{
      platform: { type: String, enum: ['email', 'phone', 'location', 'facebook', 'twitter', 'linkedin', 'instagram', 'youtube' ], default: 'email' },
      url: { type: String, default: '' },
      icon: { type: String, default: '' },
      label: { type: String, default: '' },
      isActive: { type: Boolean, default: true }
    }],
    default: [
      { platform: 'email', url: 'mailto:contact@ledgeradvisory.in', label: 'Email', isActive: true },
      { platform: 'phone', url: 'tel:+919599239791', label: 'Phone', isActive: true },
      { platform: 'location', url: 'https://maps.google.com', label: 'Location', isActive: true }
    ]
  },
  
  // Map Settings
  mapEmbedUrl: { type: String, default: '' },
  showMap: { type: Boolean, default: false },
  
  // SEO & Meta
  metaTitle: { type: String, default: 'Contact Us | Ledger Advisory' },
  metaDescription: { type: String, default: 'Get in touch with Ledger Advisory for business consulting, accounting, and financial advisory services.' },
  
  // Success Message
  successMessageTitle: { type: String, default: 'Thank You!' },
  successMessageText: { type: String, default: 'Your message has been sent successfully. We\'ll get back to you within 24 hours.' }
}, { timestamps: true });

export default mongoose.model('ContactDetails', contactDetailsSchema);