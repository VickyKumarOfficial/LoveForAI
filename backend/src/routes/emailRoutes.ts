import express from 'express';
import { sendRegistrationEmail } from '../controllers/emailController';

const router = express.Router();

// POST /api/email/registration
router.post('/registration', sendRegistrationEmail);

export default router;
