# Supabase Setup Guide

## 1. Environment Variables

Create a `.env` file in the root of your project with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 2. Database Schema

Run the following SQL in your Supabase SQL Editor to create the registrations table:

```sql
create table registrations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  phone text,
  college text,
  year text,
  plan_title text,
  plan_price text,
  status text default 'registered'
);

-- Optional: Enable Row Level Security (RLS)
alter table registrations enable row level security;

-- Allow public inserts (for the registration form)
create policy "Allow public inserts"
on registrations for insert
with check (true);
```

## 3. Automated Emails (Recommended Approach)

To send emails automatically when a user registers, the best practice with Supabase is to use **Database Webhooks** or **Edge Functions**.

### Option A: Supabase Edge Function (Best for developers)
1. Create a Supabase Edge Function named `send-email`.
2. Configure a Database Webhook to trigger this function on `INSERT` events to the `registrations` table.
3. In the function, use an email provider API (like Resend, SendGrid, or AWS SES) to send the mail.

**Example Edge Function (`supabase/functions/send-email/index.ts`):**

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  const { record } = await req.json()
  
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from: 'Conference <noreply@yourdomain.com>',
      to: record.email,
      subject: 'Registration Confirmed - LoveForAI Conference',
      html: `<h1>Hi ${record.name}!</h1><p>Thanks for registering for the ${record.plan_title}.</p>`
    })
  })

  return new Response("Email sent", { status: 200 })
})
```

### Option B: Third-party integration (No-code)
Use a service like **Zapier** or **Make.com**:
1. Connect Zapier to your Supabase project.
2. Create a trigger for "New Row" in `registrations` table.
3. Add an action to send an email via Gmail or Outlook.
