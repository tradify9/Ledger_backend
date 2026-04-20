import express from 'express';
import { getBlogSettings, updateBlogSettings } from '../controllers/blogSettingsController.js';

const router = express.Router();

router.get('/', getBlogSettings);
router.put('/', updateBlogSettings);

export default router;

