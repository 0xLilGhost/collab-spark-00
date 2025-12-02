-- Add new columns to profiles table for comprehensive onboarding

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS impressive_accomplishment text,
ADD COLUMN IF NOT EXISTS is_technical boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS gender text,
ADD COLUMN IF NOT EXISTS birthdate date,
ADD COLUMN IF NOT EXISTS social_media_url text,
ADD COLUMN IF NOT EXISTS has_startup_idea text, -- 'committed', 'exploring', 'open'
ADD COLUMN IF NOT EXISTS startup_ideas text,
ADD COLUMN IF NOT EXISTS has_cofounder boolean,
ADD COLUMN IF NOT EXISTS fulltime_availability text, -- 'already', 'ready', 'within_year', 'no_plans'
ADD COLUMN IF NOT EXISTS responsibility_areas text[],
ADD COLUMN IF NOT EXISTS equity_expectation text,
ADD COLUMN IF NOT EXISTS hobbies text,
ADD COLUMN IF NOT EXISTS life_path text,
ADD COLUMN IF NOT EXISTS additional_info text,
ADD COLUMN IF NOT EXISTS cofounder_idea_preference text, -- 'has_idea', 'no_idea', 'no_preference'
ADD COLUMN IF NOT EXISTS cofounder_technical_preference text, -- 'technical', 'non_technical', 'no_preference'
ADD COLUMN IF NOT EXISTS cofounder_timing_preference text, -- 'match_only', 'prefer_match', 'no_preference'
ADD COLUMN IF NOT EXISTS cofounder_location_preference text, -- 'nearby', 'country', 'region', 'no_preference'
ADD COLUMN IF NOT EXISTS cofounder_location_distance integer,
ADD COLUMN IF NOT EXISTS cofounder_age_preference text, -- 'range', 'no_preference'
ADD COLUMN IF NOT EXISTS cofounder_age_min integer,
ADD COLUMN IF NOT EXISTS cofounder_age_max integer,
ADD COLUMN IF NOT EXISTS cofounder_responsibility_areas text[],
ADD COLUMN IF NOT EXISTS cofounder_interest_preference text, -- 'match_only', 'prefer_match', 'no_preference'
ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS onboarding_step integer DEFAULT 0;

-- Create education table
CREATE TABLE IF NOT EXISTS public.education (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  school text NOT NULL,
  degree text,
  field_of_study text,
  graduation_year integer,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own education" ON public.education
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own education" ON public.education
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own education" ON public.education
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own education" ON public.education
  FOR DELETE USING (auth.uid() = user_id);

-- Create employment table
CREATE TABLE IF NOT EXISTS public.employment (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  employer text NOT NULL,
  position text,
  start_date date,
  end_date date,
  is_current boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.employment ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own employment" ON public.employment
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own employment" ON public.employment
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own employment" ON public.employment
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own employment" ON public.employment
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_education_user_id ON public.education(user_id);
CREATE INDEX IF NOT EXISTS idx_employment_user_id ON public.employment(user_id);