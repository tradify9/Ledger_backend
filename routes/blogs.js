import express from 'express';
import multer from 'multer';
import path from 'path';
import { protect } from '../middleware/auth.js';
import { 
  getBlogs, 
  getBlogBySlug, 
  getBlogById, 
  createBlog, 
  updateBlog, 
  deleteBlog, 
  incrementViews 
} from '../controllers/blogsController.js';

const router = express.Router();
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + path.extname(file.originalname));
  }
});
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only images allowed'), false);
  }
});

// Public APIs
router.get('/', getBlogs);                           // ?q=term&category=bus&status=pub&page=1
router.get('/slug/:slug', getBlogBySlug);            // SEO URLs
router.get('/id/:id', getBlogById);                  // Legacy ID
router.get('/increment-views/:slug', incrementViews); // Track views

// Protected CRUD (admin)
router.use(protect);

// Multi-file upload: featuredImage + images[]
router.post('/', upload.fields([
  { name: 'featuredImage', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]), createBlog);

router.put('/:id', upload.fields([
  { name: 'featuredImage', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]), updateBlog);

router.delete('/:id', deleteBlog);

export default router;

