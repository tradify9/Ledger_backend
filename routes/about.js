import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/auth.js';
import { getAboutPage, updateAboutPage, updateAboutPageJson } from '../controllers/aboutController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Public read
router.get('/', getAboutPage);

// Admin protected routes
router.use(protect);
router.put('/', upload.fields([
  { name: 'heroImage', maxCount: 1 },
  { name: 'storyImage1', maxCount: 1 },
  { name: 'storyImage2', maxCount: 1 },
  { name: 'storyImage3', maxCount: 1 }
]), updateAboutPage);

router.put('/json', updateAboutPageJson);

export default router;