# ✅ Supabase Email Setup - Quick Checklist

## 🎯 Follow These Steps in Order

### 1️⃣ Get Resend API Key
- [ ] Sign up at https://resend.com/signup
- [ ] Go to https://resend.com/api-keys
- [ ] Create API key
- [ ] Copy the key (starts with `re_...`)

### 2️⃣ Login & Link Supabase
```bash
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
```
- [ ] Replace `YOUR_PROJECT_REF` with your project ID from Supabase Dashboard

### 3️⃣ Set API Key Secret
```bash
npx supabase secrets set RESEND_API_KEY=re_your_key_here
```
- [ ] Paste your actual Resend API key

### 4️⃣ Deploy Edge Function
```bash
npx supabase functions deploy send-registration-email
```
- [ ] Wait for "✓ Deployed" message

### 5️⃣ Create Database Trigger
- [ ] Go to Supabase Dashboard → SQL Editor
- [ ] Copy SQL from `SUPABASE_SETUP_COMPLETE.md` (Step 5)
- [ ] Replace `YOUR_PROJECT_REF` in the SQL
- [ ] Click **RUN**

### 6️⃣ Test It!
- [ ] Register on your site with your real email
- [ ] Check your inbox (wait 5-10 seconds)
- [ ] Check spam folder if not in inbox

---

## 📝 Customization (Optional)

### Update Event Details
Edit: `supabase/functions/send-registration-email/index.ts`

**Line 68-71** - Google Calendar:
```typescript
dates: '20260315T090000/20260315T180000', // Your date
location: 'Your Venue, Full Address',
```

**Line 235-245** - Email body:
```html
<td>March 15, 2026</td>
<td>9:00 AM - 6:00 PM</td>
<td>Your Venue, City</td>
```

**After changes:**
```bash
npx supabase functions deploy send-registration-email
```

---

## 🆘 Quick Troubleshooting

**Email not received?**
1. Check Supabase → Edge Functions → Logs
2. Check spam folder
3. Verify trigger exists in SQL Editor:
   ```sql
   SELECT * FROM pg_trigger WHERE tgname = 'on_registration_created';
   ```

**Deploy failed?**
```bash
npx supabase login
npx supabase functions deploy send-registration-email --no-verify-jwt
```

---

## 📞 All Setup Steps in SUPABASE_SETUP_COMPLETE.md

Read the full guide for detailed explanations!
