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
router.post('/', upload.single('image'), createService);
router.put('/:id', upload.single('image'), updateService);
router.delete('/:id', deleteService);

export default router;
