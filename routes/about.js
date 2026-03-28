import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/auth.js';
import { getAboutPage, updateAboutPage } from '../controllers/aboutController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Public read
router.get('/', getAboutPage);

// Admin protected
router.use(protect);
router.put('/', upload.fields([
  { name: 'heroImage', maxCount: 1 },
  { name: 'storyImage1', maxCount: 1 },
  { name: 'storyImage2', maxCount: 1 },
  { name: 'storyImage3', maxCount: 1 }
]), updateAboutPage);

export default router;
