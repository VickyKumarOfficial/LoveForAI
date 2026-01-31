# 📧 Email Automation Setup Guide - LoveForAi Conference 2026

## ✅ What's Been Set Up

All the code for automated email notifications has been implemented! Here's what you now have:

### 1. Backend Email Service
- **File**: `backend/src/services/emailService.ts`
- Beautiful HTML email template with:
  - LoveForAi logo and branding
  - Personal details section
  - Payment details in a table
  - Event details
  - One-click "Add to Google Calendar" button
  - Kit & Goodies notice

### 2. API Endpoint
- **Route**: `POST /api/email/registration`
- **File**: `backend/src/controllers/emailController.ts`
- Validates data and sends email

### 3. Frontend Integration
- **File**: `pages/PricingPage.tsx`
- Automatically calls email API after successful registration

---

## 🚀 Setup Instructions

### Step 1: Configure Gmail for Sending Emails

You need to set up Gmail to allow your app to send emails.

#### Option A: Using Gmail with App Password (Recommended)

1. **Go to your Google Account**: https://myaccount.google.com/

2. **Enable 2-Step Verification** (if not already enabled):
   - Go to Security → 2-Step Verification
   - Follow the prompts to enable it

3. **Create an App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it: "LoveForAi Conference"
   - Click "Generate"
   - **Copy the 16-character password** (you'll use this in the .env file)

4. **Update `backend/.env` file**:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-actual-email@gmail.com
   SMTP_PASSWORD=xxxx xxxx xxxx xxxx  # The 16-char app password (remove spaces)
   ```

#### Option B: Using a Different Email Service

**For Outlook/Hotmail:**
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASSWORD=your-password
```

**For custom SMTP (like Zoho, ProtonMail, etc.):**
- Check your email provider's SMTP settings
- Update the .env accordingly

---

### Step 2: Update Event Details

Edit the email template with your actual event details:

**File**: `backend/src/services/emailService.ts`

1. **Update Google Calendar Link** (lines ~72-80):
   ```typescript
   const eventDetails = {
     text: 'LoveForAi Conference 2026',
     dates: '20260315T090000/20260315T180000', // Update with actual date/time
     details: 'Join us for an amazing AI conference...', // Update description
     location: 'Your Actual Venue Name, City, Address', // Update location
   };
   ```

2. **Update Event Details in Email** (lines ~230-250):
   ```html
   <td>March 15, 2026</td>  <!-- Update date -->
   <td>9:00 AM - 6:00 PM</td>  <!-- Update time -->
   <td>Conference Venue, City</td>  <!-- Update location -->
   ```

3. **Update Support Email** (line ~280):
   ```html
   <a href="mailto:your-actual-email@gmail.com">your-actual-email@gmail.com</a>
   ```

---

### Step 3: Start the Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
🚀 Server running on port 5000
📍 Environment: development
🌐 Frontend URL: http://localhost:3000
```

---

### Step 4: Test the Email System

1. **Make sure your frontend is running**:
   ```bash
   npm run dev
   ```

2. **Register with a test email** (use your own email to receive it)

3. **Check the backend logs** for email status:
   - ✅ Success: `"✅ Email sent successfully: <message-id>"`
   - ❌ Error: `"❌ Error sending email: <error message>"`

4. **Check your email inbox** for the confirmation email

---

## 🎨 Email Preview

Your users will receive a beautiful email with:

```
┌─────────────────────────────────────┐
│     LoveForAi Conference 2026       │
│        (Crimson gradient bg)        │
└─────────────────────────────────────┘

        ✓ Registration Confirmed!
      Welcome aboard, [Name]! 🎉

┌─────────────────────────────────────┐
│ 👤 Personal Details                 │
│ • Name: John Doe                    │
│ • Email: john@example.com           │
│ • Phone: +91 98765 43210            │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 💳 Payment Details                  │
│ • Selected Plan: PREMIUM            │
│ • Transaction ID: UTR123456         │
│ • Payment Status: PENDING           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 📅 Event Details                    │
│ • Date: March 15, 2026              │
│ • Time: 9:00 AM - 6:00 PM           │
│ • Location: Conference Venue        │
└─────────────────────────────────────┘

    [📅 Add to Google Calendar]

┌─────────────────────────────────────┐
│ 🎁 Kit & Goodies: Payment will be  │
│    collected on-spot at the event   │
└─────────────────────────────────────┘
```

---

## 🔧 Troubleshooting

### Issue 1: "Authentication failed" or "Invalid login"
**Solution**: 
- Make sure you're using an App Password (not your regular Gmail password)
- Check that 2-Step Verification is enabled
- Verify the email and password in `.env` are correct (no spaces in app password)

### Issue 2: Email not sending
**Solution**:
- Check backend logs for error messages
- Verify SMTP settings in `.env`
- Test with a simple Gmail first, then switch to business email
- Make sure port 587 is not blocked by firewall

### Issue 3: Email goes to spam
**Solution**:
- Add a proper "from" name and email
- Consider using a professional email service like SendGrid, Mailgun, or AWS SES for production
- Add SPF/DKIM records to your domain (for production)

### Issue 4: Google Calendar link not working
**Solution**:
- Update the date format: `YYYYMMDDTHHMMSS` (e.g., `20260315T090000`)
- Make sure there's a `/` between start and end dates
- Test the link manually by copying it to your browser

---

## 🚀 Production Recommendations

For production deployment, consider these improvements:

### 1. Use a Professional Email Service
Instead of Gmail, use:
- **SendGrid** (12,000 free emails/month)
- **Mailgun** (5,000 free emails/month)
- **AWS SES** (very cheap, reliable)
- **Resend** (modern, developer-friendly)

### 2. Add Email Queue
For handling bulk emails:
```bash
npm install bull redis
```

### 3. Add Email Templates
Store templates separately for easy editing

### 4. Add Retry Logic
Retry failed emails automatically

### 5. Track Email Opens/Clicks
Use email service analytics

---

## 📝 Customization Guide

### Change Email Colors
Edit `backend/src/services/emailService.ts`:
- **Primary Color**: `#dc143c` (crimson) → Change to your brand color
- **Background**: `#0a0a0a` (black) → Change to your preferred dark color
- **Card Background**: `#252525` → Adjust for lighter/darker

### Add More Fields to Email
1. Update `backend/src/types/registration.ts` to add new fields
2. Update the email template in `emailService.ts`
3. Pass the new fields from frontend in `PricingPage.tsx`

### Change Email Subject
Line ~56 in `emailService.ts`:
```typescript
subject: '🎉 Your Custom Subject Here',
```

---

## ✅ Quick Test Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] SMTP credentials in backend/.env
- [ ] Event details updated in emailService.ts
- [ ] Test registration with your email
- [ ] Check email received in inbox
- [ ] Test Google Calendar link works
- [ ] Test "Add to Calendar" button

---

## 🎯 Next Steps

1. **Test with different email providers** (Gmail, Outlook, Yahoo, etc.)
2. **Customize the email template** with your exact branding
3. **Update event date, time, and venue**
4. **Add your actual support email**
5. **Consider setting up a professional email service** for production

---

## 📞 Need Help?

Common questions answered:
- **Q**: Can I use a custom domain email?
  - **A**: Yes! Just update SMTP settings with your domain's SMTP server

- **Q**: How many emails can I send?
  - **A**: Gmail: ~500/day, Professional services: thousands to millions

- **Q**: Can I add attachments (PDF tickets)?
  - **A**: Yes! Add attachments using nodemailer's `attachments` option

---

**Everything is ready! Just configure your email credentials and test it out! 🚀**
