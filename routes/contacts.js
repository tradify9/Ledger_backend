// routes/contactDetailsRoutes.js
import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import { getContactDetails, updateContactDetails } from '../controllers/contactDetailsController.js';

const router = express.Router();

// Public route - anyone can view
router.get('/', getContactDetails);

// Protected admin routes
router.use(protect, admin);
router.put('/', updateContactDetails);

export default router;