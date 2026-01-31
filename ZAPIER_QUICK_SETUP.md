# 🚀 Quick Setup: Auto-Email with Zapier (5 Minutes)

## Easiest Method - No Coding Required!

### Step 1: Create Zapier Account (1 min)
👉 Go to: https://zapier.com/sign-up
- Sign up (it's free)
- Verify your email

### Step 2: Create a New Zap (2 mins)

1. **Click "Create Zap"** button
2. **Set Trigger**:
   - Search for "Webhooks by Zapier"
   - Choose "Catch Hook"
   - Click "Continue"
   - **Copy the webhook URL** (looks like: `https://hooks.zapier.com/hooks/catch/...`)
   - Click "Continue"
   - Leave it waiting for data

### Step 3: Connect to Supabase (1 min)

1. **Open Supabase Dashboard**: https://supabase.com/dashboard
2. Go to: **Database** → **Webhooks** (in left sidebar)
3. Click **"Create a new hook"**
4. Fill in:
   - **Name**: `send_registration_email`
   - **Table**: `registrations`
   - **Events**: Check ☑️ **INSERT** only
   - **Type**: `HTTP Request`
   - **Method**: `POST`
   - **URL**: Paste the Zapier webhook URL you copied
   - **HTTP Headers**: 
     ```
     Content-Type: application/json
     ```
5. Click **"Confirm"**

### Step 4: Test the Connection (30 seconds)

1. **Register on your website** with a test email
2. **Go back to Zapier** - it should show "Test successful! We found a request"
3. You'll see all the registration data (name, email, phone, plan, etc.)
4. Click **"Continue with selected record"**

### Step 5: Set Up Email Action (1 min)

1. **Click "+" to add an action**
2. **Search for**:
   - "Gmail" (if you have Gmail)
   - OR "Email by Zapier" (simpler, works with any email)
3. **Choose**: "Send Email"
4. **Configure**:
   - **To**: Click in field → Select `email` from Supabase data
   - **From Name**: `LoveForAi Conference`
   - **Subject**: `🎉 Registration Confirmed - LoveForAi Conference 2026`
   - **Body Type**: `HTML`
   - **Body**: Use this template:

```html
<div style="font-family: Arial; max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #fff; padding: 40px; border-radius: 16px;">
  <div style="background: linear-gradient(135deg, #dc143c, #8b0000); padding: 30px; text-align: center; border-radius: 12px; margin-bottom: 30px;">
    <h1 style="margin: 0; font-size: 32px; letter-spacing: 2px;">LOVEFORAI</h1>
    <p style="margin: 10px 0 0; font-size: 16px;">Conference 2026</p>
  </div>

  <div style="text-align: center; margin-bottom: 30px;">
    <div style="display: inline-block; background: #22c55e; width: 60px; height: 60px; line-height: 60px; border-radius: 50%; font-size: 30px; margin-bottom: 20px;">✓</div>
    <h2 style="margin: 0; font-size: 28px;">Registration Confirmed!</h2>
    <p style="color: #9ca3af; margin-top: 10px;">Welcome, {{name}}! 🎉</p>
  </div>

  <div style="background: #252525; padding: 20px; border-left: 4px solid #dc143c; border-radius: 8px; margin-bottom: 20px;">
    <h3 style="margin: 0 0 15px; font-size: 18px;">👤 Personal Details</h3>
    <p style="margin: 5px 0;"><span style="color: #9ca3af;">Name:</span> <strong>{{name}}</strong></p>
    <p style="margin: 5px 0;"><span style="color: #9ca3af;">Email:</span> <strong>{{email}}</strong></p>
    <p style="margin: 5px 0;"><span style="color: #9ca3af;">Phone:</span> <strong>{{phone}}</strong></p>
  </div>

  <div style="background: #252525; padding: 20px; border-left: 4px solid #dc143c; border-radius: 8px; margin-bottom: 20px;">
    <h3 style="margin: 0 0 15px; font-size: 18px;">💳 Payment Details</h3>
    <p style="margin: 5px 0;"><span style="color: #9ca3af;">Plan:</span> <strong>{{plan_title}}</strong></p>
    <p style="margin: 5px 0;"><span style="color: #9ca3af;">Transaction ID:</span> <strong>{{transaction_id}}</strong></p>
    <p style="margin: 5px 0;"><span style="color: #9ca3af;">Status:</span> <span style="background: #f59e0b; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold;">{{payment_status}}</span></p>
  </div>

  <div style="background: #252525; padding: 20px; border-left: 4px solid #dc143c; border-radius: 8px; margin-bottom: 20px;">
    <h3 style="margin: 0 0 15px; font-size: 18px;">📅 Event Details</h3>
    <p style="margin: 5px 0;"><span style="color: #9ca3af;">Date:</span> <strong>March 15, 2026</strong></p>
    <p style="margin: 5px 0;"><span style="color: #9ca3af;">Time:</span> <strong>9:00 AM - 6:00 PM</strong></p>
    <p style="margin: 5px 0;"><span style="color: #9ca3af;">Location:</span> <strong>Conference Venue, City</strong></p>
  </div>

  <div style="text-align: center; margin: 30px 0;">
    <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=LoveForAi+Conference+2026&dates=20260315T090000/20260315T180000&details=Join+us+for+an+amazing+AI+conference&location=Conference+Venue" style="display: inline-block; background: linear-gradient(135deg, #dc143c, #8b0000); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: bold;">📅 Add to Google Calendar</a>
  </div>

  <div style="background: rgba(220, 20, 60, 0.1); border: 2px solid rgba(220, 20, 60, 0.3); padding: 16px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
    <p style="margin: 0;">🎁 <strong>Kit & Goodies:</strong> Payment will be collected on-spot</p>
  </div>

  <div style="text-align: center; border-top: 1px solid #333; padding-top: 20px;">
    <p style="color: #9ca3af;">See you at the conference! 🚀</p>
    <p style="color: #6b7280; font-size: 12px;">Questions? Email <a href="mailto:support@loveforai.com" style="color: #dc143c;">support@loveforai.com</a></p>
  </div>
</div>
```

**Note**: The `{{name}}`, `{{email}}`, etc. placeholders will automatically be replaced with actual data from Supabase!

5. **Click "Continue"**
6. **Click "Test & Continue"** - Check your email!
7. **Click "Publish"** - Turn on your Zap!

---

## ✅ You're Done!

Now every time someone registers on your website:
1. ✅ Data is saved to Supabase
2. ✅ Webhook triggers Zapier instantly  
3. ✅ Email is sent automatically
4. ✅ User receives beautiful confirmation email

---

## 🎨 Customize Your Email

To change colors or text:
1. Go to your Zap
2. Click on the "Send Email" action
3. Edit the HTML body
4. Change:
   - `#dc143c` → Your color
   - `March 15, 2026` → Your date
   - `Conference Venue` → Your location
5. Save and test!

---

## 📊 Monitor Emails

In Zapier Dashboard:
- See how many emails sent
- Check for any failures
- View email history
- Get alerts if something fails

---

## 💰 Pricing

**Zapier Free Plan:**
- ✅ 100 tasks/month (emails)
- ✅ Perfect for small/medium conferences
- ✅ 15-minute check intervals

**Need More?**
- Starter Plan: $19.99/month (750 tasks)
- OR use Resend directly (3,000 free emails/month)

---

## 🆘 Troubleshooting

**Email not sending?**
1. Check Zapier → Zap History for errors
2. Make sure Zap is "ON" (toggle in top right)
3. Test registration again
4. Check spam folder

**Wrong data in email?**
1. Go to Zapier → Edit Zap
2. Click "Retest trigger" to get fresh data
3. Remap the fields in email body

---

**That's it! Simplest email automation ever! 🎉**

No backend server needed, no coding, just works!
