-- Add type column to teams table to differentiate between startup and competition
ALTER TABLE public.teams 
ADD COLUMN type text NOT NULL DEFAULT 'startup' CHECK (type IN ('startup', 'competition'));