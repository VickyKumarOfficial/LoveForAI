import crypto from 'crypto';
import { razorpayInstance } from '../config/razorpay';
import { config } from '../config';

export class PaymentService {
  async createOrder(amount: number, currency: string, receipt: string) {
    try {
      const options = {
        amount: amount * 100, // Razorpay expects amount in paise
        currency,
        receipt,
      };

      const order = await razorpayInstance.orders.create(options);
      return order;
    } catch (error: any) {
      throw new Error(`Failed to create Razorpay order: ${error.message}`);
    }
  }

  verifyPaymentSignature(
    orderId: string,
    paymentId: string,
    signature: string
  ): boolean {
    const text = `${orderId}|${paymentId}`;
    const generated_signature = crypto
      .createHmac('sha256', config.razorpay.keySecret)
      .update(text)
      .digest('hex');

    return generated_signature === signature;
  }
}
