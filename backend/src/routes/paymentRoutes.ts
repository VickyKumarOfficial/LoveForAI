import { Router } from 'express';
import { PaymentController } from '../controllers/paymentController';

const router = Router();
const paymentController = new PaymentController();

// POST /api/payment/create-order - Create Razorpay order
router.post('/create-order', (req, res) => paymentController.createOrder(req, res));

// POST /api/payment/verify - Verify payment
router.post('/verify', (req, res) => paymentController.verifyPayment(req, res));

export default router;
