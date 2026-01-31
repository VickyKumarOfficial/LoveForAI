# 📧 Supabase Email Automation Guide

## 🎯 Best Approach: Use Resend with Supabase Webhooks

Instead of running a separate backend, we'll use:
1. **Resend** - Modern email API (100 emails/day free)
2. **Supabase Database Webhooks** - Automatically trigger when new registration is inserted

---

## 🚀 Quick Setup (10 minutes)

### Option 1: Using Resend (Recommended - Easiest)

#### Step 1: Create Resend Account
1. Go to: https://resend.com/signup
2. Sign up (it's free - 100 emails/day, 3,000/month)
3. Verify your email
4. Get your API key from: https://resend.com/api-keys

#### Step 2: Create Edge Function for Email

Create this file: `supabase/functions/send-registration-email/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

interface RegistrationData {
  name: string
  email: string
  phone: string
  plan_title: string
  transaction_id?: string
  payment_status: string
}

serve(async (req) => {
  try {
    const { record } = await req.json()
    const registration: RegistrationData = record

    // Generate Google Calendar link
    const calendarLink = generateGoogleCalendarLink()

    // Send email using Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'LoveForAi Conference <onboarding@resend.dev>', // Change after domain verification
        to: [registration.email],
        subject: '🎉 Registration Confirmed - LoveForAi Conference 2026',
        html: generateEmailTemplate(registration, calendarLink),
      }),
    })

    const data = await res.json()

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

function generateGoogleCalendarLink(): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'LoveForAi Conference 2026',
    dates: '20260315T090000/20260315T180000',
    details: 'Join us for an amazing AI conference with industry leaders.',
    location: 'Conference Venue, City Name',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function generateEmailTemplate(data: RegistrationData, calendarLink: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:#0a0a0a;color:#fff">
  <table style="width:100%;border-collapse:collapse">
    <tr>
      <td align="center" style="padding:40px 0">
        <table style="width:600px;max-width:90%;background:#1a1a1a;border-radius:16px;overflow:hidden">
          
          <tr>
            <td style="background:linear-gradient(135deg,#dc143c 0%,#8b0000 100%);padding:40px 30px;text-align:center">
              <h1 style="margin:0;color:#fff;font-size:32px;font-weight:700;text-transform:uppercase;letter-spacing:2px">LoveForAi</h1>
              <p style="margin:10px 0 0;color:rgba(255,255,255,0.9);font-size:16px">Conference 2026</p>
            </td>
          </tr>

          <tr>
            <td style="padding:40px 30px 20px;text-align:center">
              <div style="display:inline-block;background:#22c55e;border-radius:50%;width:60px;height:60px;line-height:60px;margin-bottom:20px">
                <span style="font-size:30px">✓</span>
              </div>
              <h2 style="margin:0 0 10px;color:#fff;font-size:28px;font-weight:600">Registration Confirmed!</h2>
              <p style="margin:0;color:#9ca3af;font-size:16px">Welcome aboard, ${data.name}! 🎉</p>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 30px">
              <div style="background:#252525;border-left:4px solid #dc143c;border-radius:8px;padding:20px">
                <h3 style="margin:0 0 15px;color:#fff;font-size:18px;font-weight:600">👤 Personal Details</h3>
                <table style="width:100%;border-collapse:collapse">
                  <tr>
                    <td style="padding:8px 0;color:#9ca3af;font-size:14px">Name:</td>
                    <td style="padding:8px 0;color:#fff;font-size:14px;text-align:right;font-weight:500">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#9ca3af;font-size:14px">Email:</td>
                    <td style="padding:8px 0;color:#fff;font-size:14px;text-align:right;font-weight:500">${data.email}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#9ca3af;font-size:14px">Phone:</td>
                    <td style="padding:8px 0;color:#fff;font-size:14px;text-align:right;font-weight:500">${data.phone}</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 30px">
              <div style="background:#252525;border-left:4px solid #dc143c;border-radius:8px;padding:20px">
                <h3 style="margin:0 0 15px;color:#fff;font-size:18px;font-weight:600">💳 Payment Details</h3>
                <table style="width:100%;border-collapse:collapse">
                  <tr>
                    <td style="padding:8px 0;color:#9ca3af;font-size:14px">Selected Plan:</td>
                    <td style="padding:8px 0;color:#fff;font-size:14px;text-align:right;font-weight:500">${data.plan_title.toUpperCase()}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#9ca3af;font-size:14px">Transaction ID:</td>
                    <td style="padding:8px 0;color:#fff;font-size:14px;text-align:right;font-weight:500">${data.transaction_id || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#9ca3af;font-size:14px">Payment Status:</td>
                    <td style="padding:8px 0;text-align:right">
                      <span style="background:${data.payment_status === 'completed' ? '#22c55e' : '#f59e0b'};color:#fff;padding:4px 12px;border-radius:12px;font-size:12px;font-weight:600;text-transform:uppercase">${data.payment_status}</span>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 30px">
              <div style="background:#252525;border-left:4px solid #dc143c;border-radius:8px;padding:20px">
                <h3 style="margin:0 0 15px;color:#fff;font-size:18px;font-weight:600">📅 Event Details</h3>
                <table style="width:100%;border-collapse:collapse">
                  <tr>
                    <td style="padding:8px 0;color:#9ca3af;font-size:14px">Date:</td>
                    <td style="padding:8px 0;color:#fff;font-size:14px;text-align:right;font-weight:500">March 15, 2026</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#9ca3af;font-size:14px">Time:</td>
                    <td style="padding:8px 0;color:#fff;font-size:14px;text-align:right;font-weight:500">9:00 AM - 6:00 PM</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#9ca3af;font-size:14px">Location:</td>
                    <td style="padding:8px 0;color:#fff;font-size:14px;text-align:right;font-weight:500">Conference Venue, City</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 30px;text-align:center">
              <a href="${calendarLink}" style="display:inline-block;background:linear-gradient(135deg,#dc143c 0%,#8b0000 100%);color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:600;font-size:16px">📅 Add to Google Calendar</a>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 30px">
              <div style="background:rgba(220,20,60,0.1);border:2px solid rgba(220,20,60,0.3);border-radius:8px;padding:16px;text-align:center">
                <p style="margin:0;color:#fff;font-size:14px">🎁 <strong>Kit & Goodies:</strong> Payment will be collected on-spot</p>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:30px;text-align:center;border-top:1px solid #333">
              <p style="margin:0 0 10px;color:#9ca3af;font-size:14px">See you at the conference! 🚀</p>
              <p style="margin:0;color:#6b7280;font-size:12px">Questions? Email <a href="mailto:support@loveforai.com" style="color:#dc143c;text-decoration:none">support@loveforai.com</a></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}
```

#### Step 3: Deploy the Edge Function

Run these commands:

```bash
# Login to Supabase
npx supabase login

# Link your project
npx supabase link --project-ref your-project-ref

# Set the Resend API key
npx supabase secrets set RESEND_API_KEY=re_your_api_key_here

# Deploy the function
npx supabase functions deploy send-registration-email
```

#### Step 4: Create Database Trigger

Go to your Supabase Dashboard → SQL Editor and run:

```sql
-- Create a function to call the edge function
CREATE OR REPLACE FUNCTION public.handle_new_registration()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the edge function
  PERFORM
    net.http_post(
      url := 'https://your-project-ref.supabase.co/functions/v1/send-registration-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
      ),
      body := jsonb_build_object('record', row_to_json(NEW))
    );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS on_registration_created ON public.registrations;
CREATE TRIGGER on_registration_created
  AFTER INSERT ON public.registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_registration();
```

---

## Option 2: Simpler Approach - Database Webhook (No Code Needed!)

This is the EASIEST method - no coding required!

### Step 1: Create a Simple Email Service Endpoint

We'll use **Zapier** or **Make.com** (formerly Integromat) as the webhook receiver:

1. **Sign up for Zapier** (free): https://zapier.com
2. Create a new Zap:
   - Trigger: **Webhooks by Zapier** → Catch Hook
   - Action: **Gmail** → Send Email (or use any email service)
3. Copy the webhook URL

### Step 2: Configure Supabase Webhook

1. Go to **Supabase Dashboard** → **Database** → **Webhooks**
2. Click **Create a new hook**
3. Configure:
   - **Name**: Send Registration Email
   - **Table**: registrations
   - **Events**: INSERT
   - **Type**: HTTP Request
   - **Method**: POST
   - **URL**: [Your Zapier webhook URL]
   - **Headers**: `Content-Type: application/json`

4. **Save**

### Step 3: Configure Zapier Action

In Zapier, set up the email action:
- **To**: Use the `email` field from webhook data
- **Subject**: 🎉 Registration Confirmed - LoveForAi Conference 2026
- **Body**: Create your email template (Zapier has a visual editor)

**Done!** Every time a new registration is inserted, Zapier will automatically send an email!

---

## Option 3: Keep Using Backend (Current Setup)

If you prefer to keep the backend approach with Nodemailer (which we already set up), you can trigger it from Supabase using a webhook:

### Create Database Webhook in Supabase:

1. Go to **Supabase Dashboard** → **Database** → **Webhooks**
2. Click **Create a new hook**
3. Configure:
   - **Name**: Trigger Email Backend
   - **Table**: registrations
   - **Events**: INSERT
   - **Type**: HTTP Request
   - **Method**: POST
   - **URL**: `http://localhost:5000/api/email/registration` (use your production URL when deployed)
   - **Headers**: `Content-Type: application/json`

4. The payload will automatically include the new row data

### Update Backend Endpoint

The backend endpoint we already created will work! Just make sure it can handle the Supabase webhook format:

```typescript
// backend/src/controllers/emailController.ts
export const sendRegistrationEmail = async (req: Request, res: Response) => {
  try {
    // Supabase sends data in this format
    const { record, type } = req.body
    
    if (type === 'INSERT') {
      const registration = record
      
      await emailService.sendRegistrationConfirmation({
        name: registration.name,
        email: registration.email,
        phone: registration.phone,
        selectedPlan: registration.plan_title.toLowerCase(),
        transaction_id: registration.transaction_id,
        payment_status: registration.payment_status,
      })
    }

    return res.status(200).json({ success: true })
  } catch (error: any) {
    console.error('Error:', error)
    return res.status(500).json({ error: error.message })
  }
}
```

---

## 📊 Comparison

| Method | Difficulty | Cost | Scalability | Best For |
|--------|-----------|------|-------------|----------|
| **Resend + Edge Function** | Medium | Free (100/day) | High | Production apps |
| **Zapier Webhook** | Easy | Free (100 tasks/month) | Medium | Quick setup, MVP |
| **Backend + Webhook** | Medium | Free (hosting cost) | High | Full control |

---

## 🎯 My Recommendation

For your conference registration:

**Start with: Zapier Webhook** (takes 5 minutes, zero coding)
- Perfect for getting emails working immediately
- Easy to customize in Zapier's visual editor
- Free tier is enough for most conferences

**Upgrade to: Resend + Edge Function** (if you need more control)
- When you need custom branding
- When you outgrow Zapier's free tier
- When you want everything in Supabase

---

## ✅ Quick Zapier Setup (5 Minutes)

1. **Create Zapier Account**: https://zapier.com/sign-up
2. **Create New Zap**:
   - Trigger: "Webhooks by Zapier" → "Catch Hook"
   - Copy the webhook URL
3. **Add to Supabase**:
   - Dashboard → Database → Webhooks → Create Hook
   - Table: `registrations`, Event: `INSERT`
   - Paste webhook URL
4. **Test**: Register on your site
5. **Configure Email**: In Zapier, add "Gmail" or "Email by Zapier" action
6. **Map Fields**: Use webhook data to populate email template

**Done! Emails will send automatically!** 🎉

---

**Want me to help you set up any of these methods? Just let me know which one you prefer!**
