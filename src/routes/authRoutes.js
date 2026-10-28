import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { registerValidator, loginValidator } from '../validators/authValidators.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = Router();

// Registration endpoint
router.post('/register', registerValidator, validateRequest, register);

// Login endpoint
router.post('/login', loginValidator, validateRequest, login);

export default router;
