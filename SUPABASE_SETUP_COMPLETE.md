# 🚀 Supabase + Resend Email Setup Guide

## ✅ Files Created

- `supabase/functions/send-registration-email/index.ts` - Edge function for sending emails
- `supabase/config.toml` - Supabase configuration

---

## 📋 Step-by-Step Setup (15 minutes)

### Step 1: Get Resend API Key (2 minutes)

1. **Sign up for Resend**: https://resend.com/signup
2. **Verify your email**
3. **Get API Key**:
   - Go to: https://resend.com/api-keys
   - Click "Create API Key"
   - Name it: "LoveForAi Conference"
   - Copy the API key (starts with `re_...`)
   - **Save it somewhere safe!** You'll need it in Step 3

---

### Step 2: Login to Supabase & Link Project (2 minutes)

```bash
# Use npx to avoid permission issues
npx supabase login
```

This will:
- Open your browser for authentication
- Login with your Supabase credentials

Then link your project:

```bash
# Find your project reference ID from Supabase Dashboard → Settings → General
npx supabase link --project-ref YOUR_PROJECT_REF
```

**To find your project reference:**
1. Go to: https://supabase.com/dashboard/project/_/settings/general
2. Look for "Reference ID" (e.g., `yinepyembgpioltaomcp`)

---

### Step 3: Set Resend API Key as Secret (1 minute)

```bash
npx supabase secrets set RESEND_API_KEY=re_your_actual_api_key_here
```

Replace `re_your_actual_api_key_here` with the API key you copied from Resend.

---

### Step 4: Deploy the Edge Function (2 minutes)

```bash
npx supabase functions deploy send-registration-email
```

You should see:
```
Deploying send-registration-email (project ref: your-project-ref)
✓ Deployed send-registration-email
```

---

### Step 5: Create Database Trigger (5 minutes)

Go to your Supabase Dashboard → SQL Editor and run this SQL:

```sql
-- Enable the http extension if not already enabled
CREATE EXTENSION IF NOT EXISTS http WITH SCHEMA extensions;

-- Create a function to call the edge function
CREATE OR REPLACE FUNCTION public.handle_new_registration()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  request_id bigint;
  function_url text;
  service_role_key text;
BEGIN
  -- Get your project reference and construct the function URL
  -- Replace YOUR_PROJECT_REF with your actual project reference
  function_url := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-registration-email';
  
  -- Get service role key from vault (automatically available in Supabase)
  service_role_key := current_setting('app.settings.service_role_key', true);
  
  -- Make async HTTP POST request to edge function
  SELECT http_post(
    function_url,
    jsonb_build_object('record', row_to_json(NEW)),
    'application/json',
    ARRAY[
      http_header('Authorization', 'Bearer ' || service_role_key)
    ]
  ) INTO request_id;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the insert
    RAISE WARNING 'Failed to send email: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_registration_created ON public.registrations;

-- Create the trigger
CREATE TRIGGER on_registration_created
  AFTER INSERT ON public.registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_registration();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON FUNCTION public.handle_new_registration() TO postgres, anon, authenticated, service_role;
```

**Important:** Replace `YOUR_PROJECT_REF` with your actual project reference (e.g., `yinepyembgpioltaomcp`)

Click **RUN** to execute the SQL.

---

### Step 6: Test the Setup! (2 minutes)

1. **Go to your website**: http://localhost:3000/pricing
2. **Register with your own email** (use a real email you can check)
3. **Wait 5-10 seconds**
4. **Check your email inbox!** 📧

---

## 🔧 Troubleshooting

### Issue 1: "Failed to deploy function"

**Solution:**
```bash
# Make sure you're logged in
npx supabase login

# Verify you're linked to the correct project
npx supabase projects list

# Try deploying again
npx supabase functions deploy send-registration-email --no-verify-jwt
```

### Issue 2: "Email not received"

**Check these:**

1. **Check Supabase Logs**:
   - Dashboard → Edge Functions → send-registration-email → Logs
   - Look for errors

2. **Check Database Logs**:
   - Dashboard → Logs → Postgres Logs
   - Look for trigger errors

3. **Verify Trigger Exists**:
   ```sql
   SELECT * FROM pg_trigger WHERE tgname = 'on_registration_created';
   ```

4. **Test Edge Function Manually**:
   ```bash
   curl -X POST \
     https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-registration-email \
     -H "Authorization: Bearer YOUR_ANON_KEY" \
     -H "Content-Type: application/json" \
     -d '{"record":{"name":"Test User","email":"your-email@example.com","phone":"1234567890","plan_title":"Free","payment_status":"completed"}}'
   ```

### Issue 3: "Permission denied" when deploying

**Solution:**
```bash
# Use npx instead of global install
npx supabase functions deploy send-registration-email
```

### Issue 4: Email in Spam folder

**Solution:**
- Resend's default email (`onboarding@resend.dev`) may go to spam
- **Verify your domain** in Resend to use your own email address
- Or use Gmail/Outlook for testing

---

## 🎨 Customize Email Template

Edit: `supabase/functions/send-registration-email/index.ts`

### Change Event Details (Lines 68-71):
```typescript
dates: '20260315T090000/20260315T180000', // Your date in YYYYMMDDTHHmmss
details: 'Your event description',
location: 'Your Venue Name, Full Address',
```

### Change Email Body (Lines 230-250):
```html
<td>March 15, 2026</td>  <!-- Your date -->
<td>9:00 AM - 6:00 PM</td>  <!-- Your time -->
<td>Your Venue, City</td>  <!-- Your location -->
```

### Change Colors:
- `#dc143c` → Your primary color
- `#0a0a0a` → Background color
- `#252525` → Card background

**After making changes:**
```bash
npx supabase functions deploy send-registration-email
```

---

## 📊 Monitor Emails

### View Logs in Supabase:
1. Dashboard → Edge Functions → send-registration-email
2. Click on "Logs" tab
3. See all email sending attempts with success/failure status

### View Emails in Resend:
1. Go to: https://resend.com/emails
2. See all sent emails
3. Check delivery status, open rates, etc.

---

## 💰 Pricing (Both Free!)

**Resend Free Tier:**
- ✅ 3,000 emails/month
- ✅ 100 emails/day
- ✅ Perfect for conferences

**Supabase:**
- ✅ Edge Functions included in free tier
- ✅ 500,000 function invocations/month
- ✅ More than enough

---

## 🚀 Production Checklist

Before going live:

- [ ] Update event date and time in `generateGoogleCalendarLink()`
- [ ] Update venue location with full address
- [ ] Update support email address
- [ ] **Verify your domain in Resend** to use `noreply@yourdomain.com`
- [ ] Test email with multiple email providers (Gmail, Outlook, Yahoo)
- [ ] Check spam folder on different providers
- [ ] Update `from` email in line 39 after domain verification
- [ ] Set up email monitoring/alerts

---

## 🔒 Security Notes

- ✅ Resend API key is stored securely in Supabase secrets
- ✅ Edge function runs with proper authentication
- ✅ Database trigger uses SECURITY DEFINER for safe execution
- ✅ Error handling prevents registration failure if email fails

---

## 📞 Need Help?

**Common Issues:**

**Q: How do I verify my domain in Resend?**
A: Go to Resend → Domains → Add Domain → Follow DNS setup instructions

**Q: Can I use my own SMTP instead of Resend?**
A: Yes! Replace the Resend API call with your SMTP service (SendGrid, Mailgun, etc.)

**Q: How do I add attachments (like tickets)?**
A: Add to Resend API payload:
```typescript
attachments: [{
  filename: 'ticket.pdf',
  content: base64Content
}]
```

**Q: Can I send different emails for different plans?**
A: Yes! Add conditional logic in `generateEmailTemplate()` based on `data.plan_title`

---

## ✅ You're All Set!

Your email automation is now:
- ✅ Fully automated via Supabase triggers
- ✅ Scalable to thousands of emails
- ✅ Properly monitored and logged
- ✅ Professional and reliable

**Test it now by registering on your site!** 🎉
