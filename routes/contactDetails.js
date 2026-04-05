import express from 'express';
import { protect } from '../middleware/auth.js';
import { getContactDetails, updateContactDetails } from '../controllers/contactDetailsController.js';

const router = express.Router();

router.use(protect);
router.get('/', getContactDetails);
router.put('/', updateContactDetails);

export default router;

