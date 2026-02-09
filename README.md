# LoveForAi Conference 2026 🎯

A modern, interactive conference website built with React, TypeScript, Vite, and Supabase.

## 🚀 Features

- ✨ Modern UI with smooth animations
- 🎟️ Online registration with Razorpay integration
- 📧 Automated email confirmations via Supabase Edge Functions
- 📱 Fully responsive design
- 🎨 Custom components and interactive elements

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend API
- **Payment**: Razorpay
- **Hosting**: Vercel

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/VickyKumarOfficial/LoveForAI.git

# Navigate to project directory
cd loveforai-conference-2026

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your credentials
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
# VITE_RAZORPAY_KEY_ID=your_razorpay_key_id

# Run development server
npm run dev
```

## 🌐 Vercel Deployment

### 1. Push to GitHub (Already Done ✅)
```bash
git push origin master
```

### 2. Deploy to Vercel

#### Option A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository: `VickyKumarOfficial/LoveForAI`
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_RAZORPAY_KEY_ID=your_razorpay_key
   ```
6. Click **"Deploy"**

### 3. Add Custom Domain (conference.klh.edu.in)

**After deployment:**

1. **In Vercel Dashboard:**
   - Go to your project → **"Settings"** → **"Domains"**
   - Click **"Add"**
   - Enter: `conference.klh.edu.in`
   - Vercel will show DNS records to add

2. **Add DNS Records to klh.edu.in:**
   ```
   Type: CNAME
   Name: conference
   Value: cname.vercel-dns.com
   TTL: Auto
   ```

3. **Wait for DNS propagation** (5-60 minutes)
4. Your site will be live at: **https://conference.klh.edu.in** 🎉

### 4. Suggested Subdomain Names

Choose one:
- ✅ **conference.klh.edu.in** (Recommended - clear & professional)
- loveforai.klh.edu.in
- aiconf.klh.edu.in
- ai-conference.klh.edu.in
- conf2026.klh.edu.in

## 📧 Email Setup

### Update Edge Function for Production

Once **klh.edu.in** domain is verified in Resend:

```typescript
// Update: supabase/functions/send-registration-email/index.ts
from: 'LoveForAi Conference <noreply@klh.edu.in>',
to: [registration.email],  // Send to actual user email
```

Then redeploy:
```bash
npx supabase functions deploy send-registration-email
```

## 🗄️ Database Schema

### `registrations` table
```sql
- id: uuid (primary key)
- name: text
- email: text
- phone: text
- plan_title: text
- transaction_id: text
- payment_status: text
- created_at: timestamp
```

### Webhook Configuration
- **Table**: registrations
- **Event**: INSERT
- **URL**: https://yinepyembgpioltaomcp.supabase.co/functions/v1/send-registration-email

## 🔑 Environment Variables

Create a `.env` file with:

```env
# Supabase
VITE_SUPABASE_URL=https://yinepyembgpioltaomcp.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Razorpay
VITE_RAZORPAY_KEY_ID=your_razorpay_key_here
```

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🎨 Project Structure

```
loveforai-conference-2026/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── SpeakerGrid.tsx
│   └── ...
├── pages/              # Page components
│   ├── HomePage.tsx
│   └── PricingPage.tsx
├── supabase/
│   └── functions/      # Edge Functions
├── assets/             # Images, icons
├── .env                # Environment variables
├── vercel.json         # Vercel configuration
└── package.json
```

## 📞 Support

For issues or questions:
- Email: loveforai@klh.edu.in
- GitHub: [@VickyKumarOfficial](https://github.com/VickyKumarOfficial)

## 📄 License

MIT License - feel free to use this for your own events!

---

Built with ❤️ for KL University by the LoveForAi Team
