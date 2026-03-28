import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/auth.js';
import { getPrivacyPage, updatePrivacyPage } from '../controllers/privacyController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Public read
router.get('/', getPrivacyPage);

// Admin protected
router.use(protect);
router.put('/', upload.single('heroImage'), updatePrivacyPage);

export default router;
