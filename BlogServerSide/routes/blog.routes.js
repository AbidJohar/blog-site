import express from 'express';
import { createBlog, deleteBlog, getAllBlogs, getBlogById, getUserBlogs, updateBlog } from '../controllers/blog.controller.js'
import authMiddleware from '../middleware/auth.middleware.js';
import { validateBlog} from '../validators/blog.validator.js';

const router = express.Router();
 
// ______( Public endpoints )__________
router.get('/get-all-blogs', getAllBlogs);
router.get('/get-blog-ById/:id', getBlogById);


// ______( Authenticated endpoints )__________
router.post('/create-blog', authMiddleware, validateBlog, createBlog);

// ______( Owner only endpoints )__________ 
router.put('/update-blog-ById/:id', authMiddleware, validateBlog, updateBlog);
router.get('/get-user-blogs',authMiddleware, getUserBlogs);
router.delete('/delete-blog-ById/:id', authMiddleware, deleteBlog);

export default router;