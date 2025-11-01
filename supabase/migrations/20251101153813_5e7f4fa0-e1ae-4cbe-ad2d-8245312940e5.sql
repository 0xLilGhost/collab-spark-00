-- Create enum for user types
create type public.user_type as enum ('competition', 'startup', 'both');

-- Create enum for experience levels
create type public.experience_level as enum ('beginner', 'intermediate', 'experienced');

-- Create profiles table
create table public.profiles (
  id uuid not null references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  user_type user_type default 'both',
  role text,
  school text,
  graduation_year integer,
  location text,
  timezone text,
  languages text[] default '{}',
  skills text[] default '{}',
  interests text[] default '{}',
  bio text,
  avatar_url text,
  experience_level experience_level default 'beginner',
  availability text,
  hours_per_week integer,
  linkedin_url text,
  github_url text,
  portfolio_url text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Profiles are viewable by everyone
create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

-- Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Users can insert their own profile
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Create teams table
create table public.teams (
  id uuid not null default gen_random_uuid() primary key,
  name text not null,
  description text,
  founder_id uuid not null references auth.users on delete cascade,
  stage text,
  industry text,
  location text,
  team_size integer default 1,
  open_roles text[] default '{}',
  logo_url text,
  website_url text,
  pitch_deck_url text,
  looking_for text,
  equity_offered boolean default false,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Enable RLS on teams
alter table public.teams enable row level security;

-- Teams are viewable by everyone
create policy "Teams are viewable by everyone"
  on public.teams for select
  using (true);

-- Users can create teams
create policy "Users can create teams"
  on public.teams for insert
  with check (auth.uid() = founder_id);

-- Users can update their own teams
create policy "Users can update own teams"
  on public.teams for update
  using (auth.uid() = founder_id);

-- Users can delete their own teams
create policy "Users can delete own teams"
  on public.teams for delete
  using (auth.uid() = founder_id);

-- Create function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

-- Create trigger for new user signups
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Create function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Create triggers for updated_at
create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger handle_teams_updated_at
  before update on public.teams
  for each row execute function public.handle_updated_at();