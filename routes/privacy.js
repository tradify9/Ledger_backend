import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/auth.js';
import { getPrivacyPage, updatePrivacyPage, updatePrivacyPageJson } from '../controllers/privacyController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Public read
router.get('/', getPrivacyPage);

// Admin protected routes
router.use(protect);
router.put('/', upload.fields([
  { name: 'heroImage', maxCount: 1 }
]), updatePrivacyPage);

router.put('/json', updatePrivacyPageJson);

export default router;