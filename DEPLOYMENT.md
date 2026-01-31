# Vercel Deployment Checklist

## ✅ Completed
- [x] GitHub repository created and pushed
- [x] vercel.json configuration added
- [x] Supabase Edge Function deployed
- [x] Email webhook configured

## 🚀 Next Steps

### 1. Deploy to Vercel (Choose One Method)

#### Method A: Vercel CLI (Fastest)
```bash
npm i -g vercel
vercel login
vercel --prod
```

#### Method B: Vercel Dashboard
1. Go to https://vercel.com/new
2. Import: `VickyKumarOfficial/LoveForAI`
3. Add Environment Variables:
   - `VITE_SUPABASE_URL` = https://yinepyembgpioltaomcp.supabase.co
   - `VITE_SUPABASE_ANON_KEY` = [your key from .env]
   - `VITE_RAZORPAY_KEY_ID` = [your razorpay key]
4. Click "Deploy"

### 2. Add Custom Domain

**In Vercel:**
- Settings → Domains → Add Domain
- Enter: `conference.klh.edu.in`

**In Your DNS Provider:**
```
Type: CNAME
Name: conference
Value: cname.vercel-dns.com
TTL: Auto
```

### 3. DNS Records Summary (For IT Department)

**For Resend (Email):**
```
Type: TXT
Name: resend._domainkey
Content: p=MIGfMA0GCSqGSIb3DQEB... [from Resend dashboard]

Type: MX
Name: send
Content: feedback-smtp.ap-northeast-1.resend.com
Priority: 10

Type: TXT
Name: send
Content: v=spf1 include:amazonses.com ~all
```

**For Vercel (Website):**
```
Type: CNAME
Name: conference
Value: cname.vercel-dns.com
```

### 4. After Domain Verification

Update edge function:
```typescript
from: 'LoveForAi Conference <noreply@klh.edu.in>',
to: [registration.email],
```

Redeploy:
```bash
npx supabase functions deploy send-registration-email
```

## 📍 Final URLs

- **Website**: https://conference.klh.edu.in
- **Edge Function**: https://yinepyembgpioltaomcp.supabase.co/functions/v1/send-registration-email
- **Database**: https://supabase.com/dashboard/project/yinepyembgpioltaomcp

## 🎯 Suggested Domain Names

1. ✅ **conference.klh.edu.in** (Recommended)
2. loveforai.klh.edu.in
3. aiconf.klh.edu.in
4. ai-conference.klh.edu.in
5. conf2026.klh.edu.in
