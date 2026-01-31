import { Request, Response } from 'express';
import emailService from '../services/emailService';
import { RegistrationData } from '../types/registration';

export const sendRegistrationEmail = async (req: Request, res: Response) => {
  try {
    const registrationData: RegistrationData = req.body;

    // Validate required fields
    if (!registrationData.name || !registrationData.email || !registrationData.selectedPlan) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, or selectedPlan',
      });
    }

    // Send email
    const emailSent = await emailService.sendRegistrationConfirmation(registrationData);

    if (emailSent) {
      return res.status(200).json({
        success: true,
        message: 'Registration email sent successfully',
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Failed to send registration email',
      });
    }
  } catch (error: any) {
    console.error('Error in sendRegistrationEmail controller:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};
