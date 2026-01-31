-- Run this in your Supabase SQL Editor to update the registrations table

ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS transaction_id TEXT,
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending_verification';

-- Optional: Create an index for faster lookups by transaction_id
CREATE INDEX IF NOT EXISTS idx_registrations_transaction_id ON registrations(transaction_id);
