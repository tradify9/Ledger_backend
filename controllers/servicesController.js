import Service from '../models/Service.js';
import { uploadImage, uploadServiceImages } from '../utils/cloudinary.js';

// Helper function to safely parse JSON arrays
const safeParseArray = (data, defaultValue = []) => {
  if (!data) return defaultValue;
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : defaultValue;
  } catch (err) {
    console.error('Parse array error:', err.message);
    return defaultValue;
  }
};

// Helper function to parse array with specific item structure
const parseStructuredArray = (data, defaultStructure = {}) => {
  if (!data) return [];
  try {
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(item => {
      if (typeof item === 'object' && item !== null) {
        return { ...defaultStructure, ...item };
      }
      return { ...defaultStructure, title: String(item) };
    });
  } catch (err) {
    console.error('Parse structured array error:', err.message);
    return [];
  }
};

// Get all services (PUBLIC)
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ message: 'Failed to fetch services', error: error.message });
  }
};

// Get single service by ID (PUBLIC)
export const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({ message: 'Failed to fetch service', error: error.message });
  }
};

// Create new service (ADMIN)
export const createService = async (req, res) => {
  try {
    // Extract basic fields
    const {
      title, description, category, price, discount, 
      companyName, governmentFees, rating
    } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({ message: 'Service title is required' });
    }

    // Handle main image upload
    let image = '';
    
    // Check for uploaded file in req.files.image (multer fields)
    if (req.files && req.files.image && req.files.image[0]) {
      const result = await uploadImage(req.files.image[0].path);
      image = result.secure_url;
    } 
    // Check for single file upload (backward compatibility)
    else if (req.file) {
      const result = await uploadImage(req.file.path);
      image = result.secure_url;
    }
    // Check for image URL
    else if (req.body.image_url && req.body.image_url.match(/^https?:\/\/.+/)) {
      image = req.body.image_url;
    }

    // Handle gallery images
    let images = [];
    if (req.files && req.files.images && req.files.images.length > 0) {
      const imagePaths = req.files.images.map(file => file.path);
      images = await uploadServiceImages(imagePaths);
    } else if (req.body.images) {
      const parsedImages = safeParseArray(req.body.images);
      if (Array.isArray(parsedImages)) {
        images = parsedImages;
      }
    }

    // Parse all JSON arrays
    const pricingCards = parseStructuredArray(req.body.pricingCards, { title: '', value: '', icon: 'Tag', color: '#10b981' });
    const professionals = parseStructuredArray(req.body.professionals, { name: '', role: '', image: '', bio: '' });
    const features = parseStructuredArray(req.body.features, { title: '', description: '', icon: 'CheckCircle' });
    const benefits = parseStructuredArray(req.body.benefits, { title: '', description: '' });
    const disadvantages = parseStructuredArray(req.body.disadvantages, { title: '', description: '' });
    const process = parseStructuredArray(req.body.process, { step: 1, title: '', description: '', duration: '' });
    const documents = parseStructuredArray(req.body.documents, { title: '', description: '', icon: 'FileText' });
    const faq = parseStructuredArray(req.body.faq, { question: '', answer: '' });
    const offers = parseStructuredArray(req.body.offers, { title: '', description: '', discount: 0 });

    // Create service object
    const serviceData = {
      title: title || '',
      description: description || '',
      category: category || 'General',
      image: image,
      images: images,
      price: Number(price) || 0,
      governmentFees: governmentFees || '',
      discount: Number(discount) || 0,
      companyName: companyName || '',
      rating: Number(rating) || 5,
      pricingCards: pricingCards,
      professionals: professionals,
      features: features,
      benefits: benefits,
      disadvantages: disadvantages,
      process: process,
      documents: documents,
      faq: faq,
      offers: offers
    };

    const service = await Service.create(serviceData);
    res.status(201).json(service);
    
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ message: 'Failed to create service', error: error.message });
  }
};

// Update service (ADMIN)
export const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Extract basic fields
    const {
      title, description, category, price, discount,
      companyName, governmentFees, rating
    } = req.body;

    // Update basic fields
    if (title !== undefined) service.title = title;
    if (description !== undefined) service.description = description;
    if (category !== undefined) service.category = category;
    if (price !== undefined) service.price = Number(price) || 0;
    if (discount !== undefined) service.discount = Number(discount) || 0;
    if (companyName !== undefined) service.companyName = companyName;
    if (governmentFees !== undefined) service.governmentFees = governmentFees;
    if (rating !== undefined) service.rating = Number(rating) || 5;

    // Handle main image update
    if (req.files && req.files.image && req.files.image[0]) {
      const result = await uploadImage(req.files.image[0].path);
      service.image = result.secure_url;
    } else if (req.file) {
      const result = await uploadImage(req.file.path);
      service.image = result.secure_url;
    } else if (req.body.image_url && req.body.image_url.match(/^https?:\/\/.+/)) {
      service.image = req.body.image_url;
    }

    // Handle gallery images (append new ones)
    if (req.files && req.files.images && req.files.images.length > 0) {
      const imagePaths = req.files.images.map(file => file.path);
      const newImages = await uploadServiceImages(imagePaths);
      service.images = [...(service.images || []), ...newImages];
    } else if (req.body.images) {
      try {
        const newImages = JSON.parse(req.body.images);
        if (Array.isArray(newImages)) {
          service.images = [...(service.images || []), ...newImages];
        }
      } catch (err) {
        console.error('Parse images error:', err.message);
      }
    }

    // Parse and update JSON arrays if provided
    if (req.body.pricingCards !== undefined) {
      service.pricingCards = parseStructuredArray(req.body.pricingCards, { title: '', value: '', icon: 'Tag', color: '#10b981' });
    }
    if (req.body.professionals !== undefined) {
      service.professionals = parseStructuredArray(req.body.professionals, { name: '', role: '', image: '', bio: '' });
    }
    if (req.body.features !== undefined) {
      service.features = parseStructuredArray(req.body.features, { title: '', description: '', icon: 'CheckCircle' });
    }
    if (req.body.benefits !== undefined) {
      service.benefits = parseStructuredArray(req.body.benefits, { title: '', description: '' });
    }
    if (req.body.disadvantages !== undefined) {
      service.disadvantages = parseStructuredArray(req.body.disadvantages, { title: '', description: '' });
    }
    if (req.body.process !== undefined) {
      service.process = parseStructuredArray(req.body.process, { step: 1, title: '', description: '', duration: '' });
    }
    if (req.body.documents !== undefined) {
      service.documents = parseStructuredArray(req.body.documents, { title: '', description: '', icon: 'FileText' });
    }
    if (req.body.faq !== undefined) {
      service.faq = parseStructuredArray(req.body.faq, { question: '', answer: '' });
    }
    if (req.body.offers !== undefined) {
      service.offers = parseStructuredArray(req.body.offers, { title: '', description: '', discount: 0 });
    }

    await service.save();
    res.status(200).json(service);
    
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ message: 'Failed to update service', error: error.message });
  }
};

// Delete service (ADMIN)
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ message: 'Failed to delete service', error: error.message });
  }
};