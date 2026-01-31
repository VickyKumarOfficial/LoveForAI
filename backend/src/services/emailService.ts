import nodemailer from 'nodemailer';
import { RegistrationData } from '../types/registration';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    const config: EmailConfig = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASSWORD || '',
      },
    };

    this.transporter = nodemailer.createTransport(config);
  }

  async sendRegistrationConfirmation(registrationData: RegistrationData): Promise<boolean> {
    try {
      const {
        name,
        email,
        phone,
        selectedPlan,
        transaction_id,
        payment_status,
      } = registrationData;

      // Generate Google Calendar link
      const calendarLink = this.generateGoogleCalendarLink();

      const htmlContent = this.generateEmailTemplate({
        name,
        email,
        phone,
        selectedPlan,
        transaction_id: transaction_id || 'N/A',
        payment_status: payment_status || 'pending',
        calendarLink,
      });

      const mailOptions = {
        from: `"LoveForAi Conference 2026" <${process.env.SMTP_USER}>`,
        to: email,
        subject: '🎉 Registration Confirmed - LoveForAi Conference 2026',
        html: htmlContent,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully:', info.messageId);
      return true;
    } catch (error) {
      console.error('❌ Error sending email:', error);
      return false;
    }
  }

  private generateGoogleCalendarLink(): string {
    const eventDetails = {
      text: 'LoveForAi Conference 2026',
      dates: '20260315T090000/20260315T180000', // Format: YYYYMMDDTHHMMSS/YYYYMMDDTHHMMSS
      details: 'Join us for an amazing AI conference with industry leaders and innovators.',
      location: 'Conference Venue, City Name', // Update with actual venue
    };

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: eventDetails.text,
      dates: eventDetails.dates,
      details: eventDetails.details,
      location: eventDetails.location,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }

  private generateEmailTemplate(data: {
    name: string;
    email: string;
    phone: string;
    selectedPlan: string;
    transaction_id: string;
    payment_status: string;
    calendarLink: string;
  }): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0a; color: #ffffff;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 90%; background-color: #1a1a1a; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">
          
          <!-- Header with Logo -->
          <tr>
            <td style="background: linear-gradient(135deg, #dc143c 0%, #8b0000 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">
                LoveForAi
              </h1>
              <p style="margin: 10px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
                Conference 2026
              </p>
            </td>
          </tr>

          <!-- Success Message -->
          <tr>
            <td style="padding: 40px 30px 20px; text-align: center;">
              <div style="display: inline-block; background-color: #22c55e; border-radius: 50%; width: 60px; height: 60px; line-height: 60px; margin-bottom: 20px;">
                <span style="font-size: 30px;">✓</span>
              </div>
              <h2 style="margin: 0 0 10px 0; color: #ffffff; font-size: 28px; font-weight: 600;">
                Registration Confirmed!
              </h2>
              <p style="margin: 0; color: #9ca3af; font-size: 16px;">
                Welcome aboard, ${data.name}! 🎉
              </p>
            </td>
          </tr>

          <!-- Personal Details -->
          <tr>
            <td style="padding: 20px 30px;">
              <div style="background-color: #252525; border-left: 4px solid #dc143c; border-radius: 8px; padding: 20px;">
                <h3 style="margin: 0 0 15px 0; color: #ffffff; font-size: 18px; font-weight: 600;">
                  👤 Personal Details
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Name:</td>
                    <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right; font-weight: 500;">
                      ${data.name}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Email:</td>
                    <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right; font-weight: 500;">
                      ${data.email}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Phone:</td>
                    <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right; font-weight: 500;">
                      ${data.phone}
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Payment Details -->
          <tr>
            <td style="padding: 20px 30px;">
              <div style="background-color: #252525; border-left: 4px solid #dc143c; border-radius: 8px; padding: 20px;">
                <h3 style="margin: 0 0 15px 0; color: #ffffff; font-size: 18px; font-weight: 600;">
                  💳 Payment Details
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Selected Plan:</td>
                    <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right; font-weight: 500;">
                      ${data.selectedPlan.toUpperCase()}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Transaction ID:</td>
                    <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right; font-weight: 500;">
                      ${data.transaction_id}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Payment Status:</td>
                    <td style="padding: 8px 0; text-align: right;">
                      <span style="background-color: ${data.payment_status === 'completed' ? '#22c55e' : '#f59e0b'}; color: #ffffff; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; text-transform: uppercase;">
                        ${data.payment_status}
                      </span>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Event Details -->
          <tr>
            <td style="padding: 20px 30px;">
              <div style="background-color: #252525; border-left: 4px solid #dc143c; border-radius: 8px; padding: 20px;">
                <h3 style="margin: 0 0 15px 0; color: #ffffff; font-size: 18px; font-weight: 600;">
                  📅 Event Details
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Date:</td>
                    <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right; font-weight: 500;">
                      March 15, 2026
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Time:</td>
                    <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right; font-weight: 500;">
                      9:00 AM - 6:00 PM
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Location:</td>
                    <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right; font-weight: 500;">
                      Conference Venue, City
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Calendar Button -->
          <tr>
            <td style="padding: 20px 30px; text-align: center;">
              <a href="${data.calendarLink}" style="display: inline-block; background: linear-gradient(135deg, #dc143c 0%, #8b0000 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(220, 20, 60, 0.3);">
                📅 Add to Google Calendar
              </a>
            </td>
          </tr>

          <!-- Kit & Goodies Notice -->
          <tr>
            <td style="padding: 20px 30px;">
              <div style="background-color: rgba(220, 20, 60, 0.1); border: 2px solid rgba(220, 20, 60, 0.3); border-radius: 8px; padding: 16px; text-align: center;">
                <p style="margin: 0; color: #ffffff; font-size: 14px;">
                  🎁 <strong>Kit & Goodies:</strong> Payment will be collected on-spot at the event
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; text-align: center; border-top: 1px solid #333333;">
              <p style="margin: 0 0 10px 0; color: #9ca3af; font-size: 14px;">
                See you at the conference! 🚀
              </p>
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                For any queries, reach out to us at <a href="mailto:support@loveforai.com" style="color: #dc143c; text-decoration: none;">support@loveforai.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
  }
}

export default new EmailService();
