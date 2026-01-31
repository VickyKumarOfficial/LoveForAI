export interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  selectedPlan: 'free' | 'basic' | 'premium';
  transaction_id?: string;
  payment_status?: 'pending' | 'completed' | 'failed';
  created_at?: string;
}
