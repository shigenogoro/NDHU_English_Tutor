import express from 'express';
import userController from '../controllers/auth.js';

const router = express.Router();

/**
 * Routes: API Endpoints
 */
router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/reset-password', userController.resetPassword);

export default router;