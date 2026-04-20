import express from 'express';
import { protect } from '../middleware/auth.js';
import { 
  getServicesPage, 
  updateServicesPage 
} from '../controllers/servicesPageController.js';

const router = express.Router();

// Public: Get services page settings
router.get('/', getServicesPage);

// Admin: Update services page settings
router.put('/', protect, updateServicesPage);

export default router;

