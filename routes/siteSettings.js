import express from 'express';
import { protect } from '../middleware/auth.js';
import { getSiteSettings, updateSiteSettings } from '../controllers/siteSettingsController.js';

const router = express.Router();

// Public route - anyone can read settings
router.get('/', getSiteSettings);

// Admin protected route - only admin can update
router.use(protect);
router.put('/', updateSiteSettings);

export default router;