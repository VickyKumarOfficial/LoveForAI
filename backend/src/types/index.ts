export interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  plan_title: string;
  plan_price: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  payment_status: 'pending' | 'success' | 'failed';
}

export interface PaymentOrderRequest {
  amount: number;
  currency: string;
  receipt: string;
}

export interface PaymentVerificationRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  registration_id: string;
}
