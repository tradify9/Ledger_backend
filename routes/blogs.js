import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/auth.js';
import { getBlogs, getBlog, createBlog, updateBlog, deleteBlog } from '../controllers/blogsController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Public
router.get('/', getBlogs);
router.get('/:id', getBlog);

// Protected
router.use(protect);
router.post('/', upload.single('image'), createBlog);
router.put('/:id', upload.single('image'), updateBlog);
router.delete('/:id', deleteBlog);

export default router;
