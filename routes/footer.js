import express from 'express';
import { protect } from '../middleware/auth.js';
import { getFooter, updateFooter } from '../controllers/footerController.js';

const router = express.Router();

router.use(protect);
router.get('/', getFooter);
router.put('/', updateFooter);

export default router;

