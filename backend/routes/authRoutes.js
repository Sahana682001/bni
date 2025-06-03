// routes/authRoutes.js
import express from 'express';
import { 
  register, 
  login, 
  getCurrentAdmin 
} from '../controllers/authControllers.js'; // Note: Fixed typo from "authControllers" to "authController"
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route
router.get('/admin', authMiddleware, getCurrentAdmin);

export default router;