import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import { 
  submitContact, 
  getContacts, 
  updateContactReply, 
  deleteContact,
  updateContact 
} from '../controllers/contactsController.js';

const router = express.Router();

// Public route - submit contact form
router.post('/', submitContact);

// Protected admin routes
router.use(protect, admin);
router.get('/', getContacts);
router.put('/:id', updateContact);
router.put('/:id/reply', updateContactReply);
router.delete('/:id', deleteContact);

export default router;
