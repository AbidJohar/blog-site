import express from 'express';
import { register,login } from '../controllers/auth.controller.js';
import { validateLogin, validateRegister } from '../validators/auth.validator.js';

const router = express.Router();

// POST /auth/register
router.post('/register', validateRegister, register);

// POST /auth/login
router.post('/login', validateLogin, login);

export default router
