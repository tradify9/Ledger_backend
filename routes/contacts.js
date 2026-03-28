import express from 'express';
import { protect } from '../middleware/auth.js';
import { submitContact, getContacts, updateContactReply, deleteContact } from '../controllers/contactsController.js';

const router = express.Router();

// Public submit
router.post('/', submitContact);

// Protected admin
router.use(protect);
router.get('/', getContacts);
router.put('/:id/reply', updateContactReply);
router.delete('/:id', deleteContact);

export default router;
