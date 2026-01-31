import { Request, Response } from 'express';
import { PaymentService } from '../services/paymentService';
import { RegistrationService } from '../services/registrationService';

const paymentService = new PaymentService();
const registrationService = new RegistrationService();

export class PaymentController {
  async createOrder(req: Request, res: Response) {
    try {
      const { amount, currency, registrationId } = req.body;

      if (!amount || !currency || !registrationId) {
        return res.status(400).json({
          success: false,
          message: 'Amount, currency, and registration ID are required',
        });
      }

      // Create Razorpay order
      const order = await paymentService.createOrder(
        amount,
        currency,
        `receipt_${registrationId}_${Date.now()}`
      );

      res.status(200).json({
        success: true,
        data: {
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
        },
      });
    } catch (error: any) {
      console.error('Create order error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to create payment order',
      });
    }
  }

  async verifyPayment(req: Request, res: Response) {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, registration_id } =
        req.body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !registration_id) {
        return res.status(400).json({
          success: false,
          message: 'Missing required payment verification parameters',
        });
      }

      // Verify signature
      const isValid = paymentService.verifyPaymentSignature(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      );

      if (isValid) {
        // Update registration with payment details
        const updatedRegistration = await registrationService.updatePaymentStatus(
          registration_id,
          razorpay_payment_id,
          razorpay_signature,
          'success'
        );

        res.status(200).json({
          success: true,
          message: 'Payment verified successfully',
          data: updatedRegistration,
        });
      } else {
        // Update registration as failed
        await registrationService.updatePaymentStatus(
          registration_id,
          razorpay_payment_id,
          razorpay_signature,
          'failed'
        );

        res.status(400).json({
          success: false,
          message: 'Payment verification failed - Invalid signature',
        });
      }
    } catch (error: any) {
      console.error('Verify payment error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to verify payment',
      });
    }
  }
}
