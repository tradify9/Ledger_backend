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

const defaultDetailHero = {
  enabled: true,
  badgeText: 'Premium Service',
  title: 'Expert {serviceTitle} Solutions',
  subtitle: 'Transform Your Business',
  description: 'Expert {serviceTitle} solutions built for measurable results. Trusted by 500+ businesses.',
  buttonText: 'Start Project',
  buttonLink: '/contact',
  secondaryButtonText: 'Free Consultation',
  secondaryButtonLink: '/contact',
  showStatsBar: true,
  showEnquiryForm: true,
  statsData: [
    { icon: 'Users', label: 'Happy Clients', value: '500+', color: '#059669' },
    { icon: 'Award', label: 'Years Exp.', value: '10+', color: '#2563eb' },
    { icon: 'Briefcase', label: 'Projects', value: '1,200+', color: '#d97706' },
    { icon: 'CheckCircle', label: 'Success Rate', value: '98%', color: '#0284c7' }
  ]
};

const defaultDetailContent = {
  sidebarFeaturesTitle: 'Key Features',
  featuresEyebrow: 'What You Get',
  featuresTitle: 'Everything you need to succeed',
  ctaEyebrow: 'Get Started Today',
  ctaTitle: 'Ready to transform your business?',
  ctaDescription: 'Book a free consultation with our experts and take the first step toward measurable growth.',
  ctaPrimaryText: 'Book Free Consultation',
  ctaPrimaryLink: '/contact',
  ctaSecondaryText: 'Explore More Services',
  ctaSecondaryLink: '/services',
  trustBadges: [
    { icon: 'Shield', text: 'ISO-certified processes' },
    { icon: 'Zap', text: 'Results within 30 days' },
    { icon: 'Users', text: '500+ satisfied clients' }
  ]
};

const parseDetailHero = (data) => {
  if (!data) return undefined;
  try {
    const parsed = typeof data === 'string' ? JSON.parse(data) : data;
    if (!parsed || typeof parsed !== 'object') return undefined;
    return {
      ...defaultDetailHero,
      ...parsed,
      statsData: Array.isArray(parsed.statsData)
        ? parsed.statsData.map(stat => ({
            icon: stat.icon || 'Users',
            label: stat.label || '',
            value: stat.value || '',
            color: stat.color || '#2563eb'
          }))
        : defaultDetailHero.statsData
    };
  } catch (err) {
    console.error('Parse detail hero error:', err.message);
    return undefined;
  }
};

const parseDetailContent = (data) => {
  if (!data) return undefined;
  try {
    const parsed = typeof data === 'string' ? JSON.parse(data) : data;
    if (!parsed || typeof parsed !== 'object') return undefined;
    return {
      ...defaultDetailContent,
      ...parsed,
      trustBadges: Array.isArray(parsed.trustBadges)
        ? parsed.trustBadges.map(badge => ({
            icon: badge.icon || 'Shield',
            text: badge.text || ''
          })).filter(badge => badge.text)
        : defaultDetailContent.trustBadges
    };
  } catch (err) {
    console.error('Parse detail content error:', err.message);
    return undefined;
  }
};

const parseBoolean = (value, defaultValue = false) => {
  if (value === undefined || value === null || value === '') return defaultValue;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === 'true' || value === '1';
  return Boolean(value);
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
      title, description, longDescription, category, price, discount, 
      companyName, governmentFees, rating, estimatedTime, serviceType,
      deliveryFormat, isPopular, isFeatured, serviceColor
    } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({ message: 'Service title is required' });
    }

    // Handle rich content (longDescription) - can be HTML from Quill editor
    const richContent = (typeof longDescription === 'string') ? longDescription : '';

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
    const prerequisites = parseStructuredArray(req.body.prerequisites, { title: '', description: '' });
    const certifications = parseStructuredArray(req.body.certifications, { title: '', issuer: '', year: '' });
    const testimonials = parseStructuredArray(req.body.testimonials, { name: '', role: '', message: '', rating: 5 });
    const offers = parseStructuredArray(req.body.offers, { title: '', description: '', discount: 0 });

// Create service object
    const serviceData = {
      title: title || '',
      description: description || '',
      longDescription: richContent || '',
      category: category || 'General',
      image: image,
      images: images,
      price: Number(price) || 0,
      governmentFees: governmentFees || '',
      discount: Number(discount) || 0,
      companyName: companyName || '',
      rating: Number(rating) || 5,
      estimatedTime: estimatedTime || '',
      serviceType: ['one-time', 'subscription'].includes(serviceType) ? serviceType : 'one-time',
      deliveryFormat: ['online', 'offline', 'hybrid'].includes(deliveryFormat) ? deliveryFormat : 'online',
      isPopular: parseBoolean(isPopular),
      isFeatured: parseBoolean(isFeatured),
      serviceColor: serviceColor || '#2563eb',
      detailHero: parseDetailHero(req.body.detailHero) || {
        ...defaultDetailHero,
        title: `Expert ${title || '{serviceTitle}'} Solutions`,
        description: `Expert ${title || '{serviceTitle}'} solutions built for measurable results. Trusted by 500+ businesses.`
      },
      detailContent: parseDetailContent(req.body.detailContent) || defaultDetailContent,
      pricingCards: pricingCards,
      professionals: professionals,
      features: features,
      benefits: benefits,
      disadvantages: disadvantages,
      process: process,
      documents: documents,
      faq: faq,
      prerequisites: prerequisites,
      certifications: certifications,
      testimonials: testimonials,
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
      title, description, longDescription, category, price, discount,
      companyName, governmentFees, rating, estimatedTime, serviceType,
      deliveryFormat, isPopular, isFeatured, serviceColor
    } = req.body;

    // Update basic fields
    if (title !== undefined) service.title = title;
    if (description !== undefined) service.description = description;
    if (longDescription !== undefined) service.longDescription = longDescription;
    if (category !== undefined) service.category = category;
    if (price !== undefined) service.price = Number(price) || 0;
    if (discount !== undefined) service.discount = Number(discount) || 0;
    if (companyName !== undefined) service.companyName = companyName;
    if (governmentFees !== undefined) service.governmentFees = governmentFees;
    if (rating !== undefined) service.rating = Number(rating) || 5;
    if (estimatedTime !== undefined) service.estimatedTime = estimatedTime;
    if (serviceType !== undefined && ['one-time', 'subscription'].includes(serviceType)) service.serviceType = serviceType;
    if (deliveryFormat !== undefined && ['online', 'offline', 'hybrid'].includes(deliveryFormat)) service.deliveryFormat = deliveryFormat;
    if (isPopular !== undefined) service.isPopular = parseBoolean(isPopular);
    if (isFeatured !== undefined) service.isFeatured = parseBoolean(isFeatured);
    if (serviceColor !== undefined) service.serviceColor = serviceColor || '#2563eb';
    if (req.body.detailHero !== undefined) {
      const detailHero = parseDetailHero(req.body.detailHero);
      if (detailHero) service.detailHero = detailHero;
    }
    if (req.body.detailContent !== undefined) {
      const detailContent = parseDetailContent(req.body.detailContent);
      if (detailContent) service.detailContent = detailContent;
    }

    // Handle main image update
    if (req.files && req.files.image && req.files.image[0]) {
      const result = await uploadImage(req.files.image[0].path);
      service.image = result.secure_url;
    } else if (req.file) {
      const result = await uploadImage(req.file.path);
      service.image = result.secure_url;
    } else if (req.body.image_url && req.body.image_url.match(/^https?:\/\/.+/)) {
      service.image = req.body.image_url;
    } else if (parseBoolean(req.body.removeImage)) {
      service.image = '';
    }

    // Handle gallery images (replace retained URLs, then append new uploads)
    if (req.body.images !== undefined) {
      service.images = safeParseArray(req.body.images);
    }

    if (req.files && req.files.images && req.files.images.length > 0) {
      const imagePaths = req.files.images.map(file => file.path);
      const newImages = await uploadServiceImages(imagePaths);
      service.images = [...(service.images || []), ...newImages];
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
    if (req.body.prerequisites !== undefined) {
      service.prerequisites = parseStructuredArray(req.body.prerequisites, { title: '', description: '' });
    }
    if (req.body.certifications !== undefined) {
      service.certifications = parseStructuredArray(req.body.certifications, { title: '', issuer: '', year: '' });
    }
    if (req.body.testimonials !== undefined) {
      service.testimonials = parseStructuredArray(req.body.testimonials, { name: '', role: '', message: '', rating: 5 });
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

// Update only service detail hero (ADMIN)
export const updateServiceDetailHero = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const detailHero = parseDetailHero(req.body.detailHero || req.body);
    if (!detailHero) {
      return res.status(400).json({ message: 'Invalid detail hero data' });
    }

    service.detailHero = detailHero;
    await service.save();
    res.status(200).json(service);
  } catch (error) {
    console.error('Update service detail hero error:', error);
    res.status(500).json({ message: 'Failed to update service detail hero', error: error.message });
  }
};

// Update only service detail content (ADMIN)
export const updateServiceDetailContent = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const detailContent = parseDetailContent(req.body.detailContent || req.body);
    if (!detailContent) {
      return res.status(400).json({ message: 'Invalid detail content data' });
    }

    service.detailContent = detailContent;
    await service.save();
    res.status(200).json(service);
  } catch (error) {
    console.error('Update service detail content error:', error);
    res.status(500).json({ message: 'Failed to update service detail content', error: error.message });
  }
};

// Update only service detail features / "What You Get" cards (ADMIN)
export const updateServiceDetailFeatures = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const featuresInput = req.body.features !== undefined ? req.body.features : req.body;
    const features = Array.isArray(featuresInput)
      ? featuresInput.map(item => ({
          title: item?.title || '',
          description: item?.description || '',
          icon: item?.icon || 'CheckCircle'
        }))
      : parseStructuredArray(featuresInput, { title: '', description: '', icon: 'CheckCircle' });

    service.features = features;
    await service.save();
    res.status(200).json(service);
  } catch (error) {
    console.error('Update service detail features error:', error);
    res.status(500).json({ message: 'Failed to update service detail features', error: error.message });
  }
};
