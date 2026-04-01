import Service from '../models/Service.js';
import { uploadImage, uploadServiceImages } from '../utils/cloudinary.js';

export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    // Parse form data
    const {
      title, description, category, price, governmentFees, rating,
      features, benefits, disadvantages, process, documents, faq, offers
    } = req.body;

    // Hero image (backward compat)
    let image = '';
    if (req.body.image_url && req.body.image_url.match(/^https?:\/\/.+/)) {
      image = req.body.image_url;
    } else if (req.file?.image) {
      const result = await uploadImage(req.file.image.path);
      image = result.secure_url;
    }

    // Gallery images
    let images = [];
    if (req.files?.images) {
      images = await uploadServiceImages(req.files.images.map(f => f.path));
    } else if (req.body.images) {
      try {
        images = JSON.parse(req.body.images);
      } catch {}
    }

    // Parse array fields (expect JSON strings from form)
    const parseArray = (field) => {
      try {
        return JSON.parse(field || '[]');
      } catch {
        return [];
      }
    };

    const serviceData = {
      title, description, category, price: Number(price), governmentFees, rating: Number(rating),
      image,
      images,
      features: parseArray(features),
      benefits: parseArray(benefits),
      disadvantages: parseArray(disadvantages),
      process: parseArray(process),
      documents: parseArray(documents),
      faq: parseArray(faq),
      offers: parseArray(offers),
      professionals: parseArray(req.body.professionals)
    };

    const service = await Service.create(serviceData);
    res.status(201).json(service);
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    
    // Parse form data
    const {
      title, description, category, price, governmentFees, rating,
      features, benefits, disadvantages, process, documents, faq, offers
    } = req.body;

    // Update basic fields
    if (title !== undefined) service.title = title;
    if (description !== undefined) service.description = description;
    if (category !== undefined) service.category = category;
    if (price !== undefined) service.price = Number(price);
    if (governmentFees !== undefined) service.governmentFees = governmentFees;
    if (rating !== undefined) service.rating = Number(rating);

    // Hero image
    if (req.body.image_url && req.body.image_url.match(/^https?:\/\/.+/)) {
      service.image = req.body.image_url;
    } else if (req.file?.image) {
      const result = await uploadImage(req.file.image.path);
      service.image = result.secure_url;
    }

    // Gallery images
    if (req.files?.images) {
      const newImages = await uploadServiceImages(req.files.images.map(f => f.path));
      service.images = [...(service.images || []), ...newImages];
    } else if (req.body.images) {
      try {
        const newImages = JSON.parse(req.body.images);
        service.images = [...(service.images || []), ...newImages];
      } catch {}
    }

    // Parse and merge arrays
    const parseArray = (field) => {
      try {
        return JSON.parse(field || '[]');
      } catch {
        return service[field] || [];
      }
    };

    if (features !== undefined) service.features = parseArray(features);
    if (benefits !== undefined) service.benefits = parseArray(benefits);
    if (disadvantages !== undefined) service.disadvantages = parseArray(disadvantages);
    if (process !== undefined) service.process = parseArray(process);
    if (documents !== undefined) service.documents = parseArray(documents);
    if (faq !== undefined) service.faq = parseArray(faq);
    if (offers !== undefined) service.offers = parseArray(offers);
    if (req.body.professionals !== undefined) service.professionals = parseArray(req.body.professionals);

    await service.save();
    res.json(service);
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
