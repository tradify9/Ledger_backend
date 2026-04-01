import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/auth.js';
import { getServices, getService, createService, updateService, deleteService } from '../controllers/servicesController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Public routes
router.get('/', getServices);
router.get('/:id', getService);

// Protected admin routes
router.use(protect);

// Multi-file upload: 'image' for hero, 'images' for gallery (max 10)
const adminUpload = upload.fields([
  { name: 'image', maxCount: 1 },  // Hero/main image (backward compat)
  { name: 'images', maxCount: 10 } // Gallery images
]);

router.post('/', adminUpload, createService);
router.put('/:id', adminUpload, updateService);
router.delete('/:id', deleteService);

export default router;
