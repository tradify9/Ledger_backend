import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/auth.js';
import { getHomePage, updateHomePage } from '../controllers/homeController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Public read
router.get('/', getHomePage);

// Admin protected
router.use(protect);
router.put('/', upload.fields([
  { name: 'heroImage', maxCount: 1 }
]), updateHomePage);

export default router;

