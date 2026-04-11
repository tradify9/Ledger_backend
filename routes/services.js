import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { protect } from '../middleware/auth.js';
import { 
  getServices, 
  getService, 
  createService, 
  updateService, 
  deleteService 
} from '../controllers/servicesController.js';

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, webp, gif)'), false);
  }
};

// Configure multer with limits
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit per file
  }
});

// Configure multi-file upload fields
const adminUpload = upload.fields([
  { name: 'image', maxCount: 1 },   // Hero/main image
  { name: 'images', maxCount: 10 }  // Gallery images
]);

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'FILE_TOO_LARGE') {
      return res.status(400).json({ message: 'File too large. Maximum size is 5MB' });
    }
    return res.status(400).json({ message: err.message });
  }
  if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};

// ==================== PUBLIC ROUTES (No Authentication) ====================
router.get('/', getServices);
router.get('/:id', getService);

// ==================== ADMIN ROUTES (Authentication Required) ====================
// Apply authentication middleware to all routes below
router.use(protect);

// Create new service
router.post('/', adminUpload, handleMulterError, createService);

// Update existing service
router.put('/:id', adminUpload, handleMulterError, updateService);

// Delete service
router.delete('/:id', deleteService);

// Optional: Delete specific gallery image from a service
router.delete('/:id/images/:imageIndex', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    const imageIndex = parseInt(req.params.imageIndex);
    if (isNaN(imageIndex) || imageIndex < 0 || imageIndex >= service.images.length) {
      return res.status(400).json({ message: 'Invalid image index' });
    }
    
    // Remove the image from array
    service.images.splice(imageIndex, 1);
    await service.save();
    
    res.status(200).json({ message: 'Image removed successfully', images: service.images });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ message: 'Failed to delete image', error: error.message });
  }
});

export default router;