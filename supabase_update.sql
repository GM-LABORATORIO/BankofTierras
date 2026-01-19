-- Script para actualizar la tabla 'projects' en Supabase
-- Agrega la columna 'token_id' para almacenar el ID de la blockchain

ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS token_id TEXT;

-- Opcional: Si quieres que sea un número grande (int8) en lugar de texto
-- ALTER TABLE projects ADD COLUMN IF NOT EXISTS token_id int8;

COMMENT ON COLUMN projects.token_id IS 'ID del proyecto en el Smart Contract (Blockchain)';
