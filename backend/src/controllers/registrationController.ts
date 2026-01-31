import { Request, Response } from 'express';
import { RegistrationService } from '../services/registrationService';

const registrationService = new RegistrationService();

export class RegistrationController {
  async createRegistration(req: Request, res: Response) {
    try {
      const { name, email, phone, college, year, plan_title, plan_price } = req.body;

      // Validate required fields
      if (!name || !email || !phone || !college || !year || !plan_title || !plan_price) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required',
        });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format',
        });
      }

      // Phone validation (10 digits)
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({
          success: false,
          message: 'Phone number must be 10 digits',
        });
      }

      const registration = await registrationService.createRegistration({
        name,
        email,
        phone,
        college,
        year,
        plan_title,
        plan_price,
        payment_status: 'pending',
      });

      res.status(201).json({
        success: true,
        message: 'Registration created successfully',
        data: registration,
      });
    } catch (error: any) {
      console.error('Create registration error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to create registration',
      });
    }
  }

  async getRegistrationById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const registration = await registrationService.getRegistrationById(id);

      res.status(200).json({
        success: true,
        data: registration,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'Registration not found',
      });
    }
  }

  async getAllRegistrations(req: Request, res: Response) {
    try {
      const registrations = await registrationService.getAllRegistrations();

      res.status(200).json({
        success: true,
        count: registrations.length,
        data: registrations,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch registrations',
      });
    }
  }
}
