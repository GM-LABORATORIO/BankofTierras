-- Add employee_count to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS employee_count INTEGER DEFAULT 0;

-- Create donations table for fiscal benefits
CREATE TABLE IF NOT EXISTS donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donor_wallet TEXT NOT NULL REFERENCES profiles(wallet_address),
    originator_id UUID NOT NULL, -- Reference to the project or originator profile
    amount_usd DECIMAL(12,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    tx_hash TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    metadata JSONB
);
