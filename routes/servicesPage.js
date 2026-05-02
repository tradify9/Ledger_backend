import express from 'express';
import { protect } from '../middleware/auth.js';
import { 
  getServicesPage, 
  updateServicesPage,
  saveAllServicesPageSettings,
  resetServicesPage
} from '../controllers/servicesPageController.js';

const router = express.Router();

// Public: Get all services page settings (hero, cardSettings, detailHero, detailSettings)
router.get('/', getServicesPage);

// Admin: Update specific section (for partial updates)
router.put('/', protect, updateServicesPage);

// Admin: Save all settings at once
router.post('/save-all', protect, saveAllServicesPageSettings);

// Admin: Reset to defaults
router.post('/reset', protect, resetServicesPage);

export default router;
