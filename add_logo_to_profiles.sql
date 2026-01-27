-- Add company_logo column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS company_logo TEXT;
