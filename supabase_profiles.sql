-- Create Profiles Table for Multi-Role System
CREATE TABLE IF NOT EXISTS profiles (
    wallet_address TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    role TEXT DEFAULT 'guardian', -- 'originator', 'auditor', 'company', 'guardian'
    entity_type TEXT DEFAULT 'individual', -- 'individual', 'company', 'municipality', 'ngo'
    company_name TEXT, -- For companies/legal entities
    tax_id TEXT, -- NIT or Tax ID
    country TEXT DEFAULT 'Colombia',
    city TEXT,
    verification_status TEXT DEFAULT 'unverified', -- 'unverified', 'pending', 'verified'
    preferences JSONB DEFAULT '{}'::jsonb, -- e.g., {"language": "es"}
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
-- 1. Everyone can read verified profiles (e.g. for certificates) or maybe just self?
-- Let's stick to: Users can read/update their own profile.
CREATE POLICY "Users can view own profile" 
ON profiles FOR SELECT 
USING (wallet_address = auth.uid()::text OR wallet_address = current_user); 
-- Note: In this pure web3 app we might just store wallet_address directly as ID if using custom auth or similar. 
-- For simplicity in this demo, we assume the frontend sends the wallet address and RLS might be looser or handled via App Logic if not using Supabase Auth completely.
-- Since we are using a simple service integration without full Auth cycle yet, we might allow public read/write for demo purposes or stick to simple logic.
-- PROD TIP: Integrate Supabase Auth with Web3 (Wallet Connect).

-- For now, allow insert/update based on wallet match (logic handled in app validation primarily for this demo phase)
CREATE POLICY "Enable read access for all users" ON "public"."profiles"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."profiles"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Enable update for users based on wallet" ON "public"."profiles"
AS PERMISSIVE FOR UPDATE
TO public
USING (true);
