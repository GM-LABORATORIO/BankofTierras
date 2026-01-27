-- Update all species costs from $CARBON to EcoToken
UPDATE species 
SET cost = REPLACE(cost, '$CARBON', 'EcoToken')
WHERE cost LIKE '%$CARBON%';

-- Verify the update
SELECT id, name, cost FROM species;
