-- Run this in your Supabase SQL Editor to update the registrations table

ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS transaction_id TEXT,
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending_verification',
ADD COLUMN IF NOT EXISTS screenshot_url TEXT,
ADD COLUMN IF NOT EXISTS selected_day TEXT;

-- Optional: Create an index for faster lookups by transaction_id
CREATE INDEX IF NOT EXISTS idx_registrations_transaction_id ON registrations(transaction_id);

-- =====================================================
-- STORAGE BUCKET SETUP FOR PAYMENT SCREENSHOTS
-- =====================================================
-- Run the following in your Supabase SQL Editor:

-- 1. Create the storage bucket (run this first)
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-screenshots', 'payment-screenshots', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Allow public read access to screenshots
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'payment-screenshots');

-- 3. Allow anonymous uploads (for registration without auth)
CREATE POLICY "Allow anonymous uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'payment-screenshots');

-- 4. Optional: Restrict file types and size via RLS (advanced)
-- You can add additional policies as needed
