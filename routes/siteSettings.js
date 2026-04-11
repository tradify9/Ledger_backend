import express from 'express';
import { protect } from '../middleware/auth.js';
import { getSiteSettings, updateSiteSettings, resetSiteSettings } from '../controllers/siteSettingsController.js';

const router = express.Router();

// Public routes - anyone can read settings
router.get('/', getSiteSettings);

// Admin protected routes
router.use(protect);
router.put('/', updateSiteSettings);
router.post('/reset', resetSiteSettings);

export default router;