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
  limits: {
    fileSize: 50 * 1024 * 1024,
    fieldSize: 100 * 1024 * 1024,
    fields: 80,
    files: 25
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only images allowed'), false);
  }
});

const handleUploadError = (err, req, res, next) => {
  if (!err) return next();
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'Image file too large. Maximum size is 50MB.' });
    }
    if (err.code === 'LIMIT_FIELD_VALUE') {
      return res.status(400).json({ message: 'Blog content is too large for one request.' });
    }
    return res.status(400).json({ message: err.message });
  }
  return res.status(400).json({ message: err.message || 'Upload failed' });
};

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
  { name: 'images', maxCount: 20 }
]), handleUploadError, createBlog);

router.put('/:id', upload.fields([
  { name: 'featuredImage', maxCount: 1 },
  { name: 'images', maxCount: 20 }
]), handleUploadError, updateBlog);

router.delete('/:id', deleteBlog);

export default router;

