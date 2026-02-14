-- CPX REPUTATION SYSTEM (BIG DATA)
-- Tracks behavioral signals to generate an immutable score.

CREATE TABLE IF NOT EXISTS reputation_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_address TEXT NOT NULL REFERENCES profiles(wallet_address),
    action_type TEXT NOT NULL, -- 'purchase', 'burn', 'donation', 'governance_vote', 'external_verification'
    points INTEGER DEFAULT 0,
    impact_metrics JSONB DEFAULT '{}'::jsonb, -- e.g. {"co2_grams": 500, "trees": 1}
    payment_method TEXT, -- 'web3', 'co2pay_fiat'
    tx_hash TEXT, -- For web3 transactions
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Index for performance on profile dashboards
CREATE INDEX IF NOT EXISTS idx_reputation_wallet ON reputation_history(wallet_address);

-- RLS
ALTER TABLE reputation_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read for transparency" ON reputation_history
    FOR SELECT USING (true);

CREATE POLICY "Allow system insertions" ON reputation_history
    FOR INSERT WITH CHECK (true);

-- Function to calculate CPX Score and Map to Range
-- This can be used in a View or called by the frontend.
CREATE OR REPLACE VIEW user_reputation_summary AS
SELECT 
    wallet_address,
    SUM(points) as total_score,
    COUNT(*) as total_actions
FROM reputation_history
GROUP BY wallet_address;
