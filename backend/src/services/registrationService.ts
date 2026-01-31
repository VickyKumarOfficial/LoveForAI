import { supabase } from '../config/supabase';
import { RegistrationData } from '../types';

export class RegistrationService {
  async createRegistration(data: RegistrationData) {
    const { data: registration, error } = await supabase
      .from('registrations')
      .insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          college: data.college,
          year: data.year,
          plan_title: data.plan_title,
          plan_price: data.plan_price,
          razorpay_order_id: data.razorpay_order_id || null,
          payment_status: data.payment_status,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create registration: ${error.message}`);
    }

    return registration;
  }

  async updatePaymentStatus(
    registrationId: string,
    paymentId: string,
    signature: string,
    status: 'success' | 'failed'
  ) {
    const { data, error } = await supabase
      .from('registrations')
      .update({
        razorpay_payment_id: paymentId,
        razorpay_signature: signature,
        payment_status: status,
      })
      .eq('id', registrationId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update payment status: ${error.message}`);
    }

    return data;
  }

  async getRegistrationById(id: string) {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`Failed to fetch registration: ${error.message}`);
    }

    return data;
  }

  async getAllRegistrations() {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch registrations: ${error.message}`);
    }

    return data;
  }
}
