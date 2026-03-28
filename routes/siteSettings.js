import express from 'express';
import { protect } from '../middleware/auth.js';
import { getSiteSettings, updateSiteSettings } from '../controllers/siteSettingsController.js';

const router = express.Router();

router.get('/', getSiteSettings);
router.use(protect);
router.put('/', updateSiteSettings);

export default router;

