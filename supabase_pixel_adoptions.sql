-- ============================================
-- LIFE MAP: PIXEL ADOPTIONS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS pixel_adoptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pixel_id TEXT NOT NULL,          -- Formato: CELL-X-Y
    buyer_wallet TEXT NOT NULL,
    plan_id TEXT NOT NULL,           -- tier/plan (Basic, Gold, etc.)
    duration_months INTEGER,         -- 0 para perpetuo
    amount_bot DECIMAL NOT NULL,
    tx_hash TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    expires_at TIMESTAMP,            -- NULL para perpetuo
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_adoptions_pixel ON pixel_adoptions(pixel_id);
CREATE INDEX IF NOT EXISTS idx_adoptions_buyer ON pixel_adoptions(buyer_wallet);

-- RLS
ALTER TABLE pixel_adoptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view adoptions" ON pixel_adoptions
    FOR SELECT USING (true);

CREATE POLICY "System can insert adoptions" ON pixel_adoptions
    FOR INSERT WITH CHECK (true); -- In a production app, we'd verify via edge function or server
