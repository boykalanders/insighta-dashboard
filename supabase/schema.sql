-- ─── Enums ─────────────────────────────────────────────────────────────────

create type campaign_channel as enum (
  'paid_search', 'paid_social', 'email', 'organic', 'display', 'affiliate'
);

create type campaign_status as enum ('active', 'paused', 'completed', 'draft');

-- ─── Profiles ────────────────────────────────────────────────────────────────
-- One row per authenticated user. Created automatically via trigger.

create table public.profiles (
  id           uuid references auth.users on delete cascade primary key,
  email        text not null,
  full_name    text,
  avatar_url   text,
  organization text,
  role         text not null default 'analyst' check (role in ('admin', 'analyst', 'viewer')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Automatically create a profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── Campaigns ───────────────────────────────────────────────────────────────

create table public.campaigns (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  channel     campaign_channel not null,
  status      campaign_status not null default 'draft',
  budget      numeric not null default 0,
  spend       numeric not null default 0,
  impressions bigint not null default 0,
  clicks      bigint not null default 0,
  conversions integer not null default 0,
  revenue     numeric not null default 0,
  start_date  date not null,
  end_date    date,
  created_by  uuid references public.profiles(id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ─── Channel Metrics ─────────────────────────────────────────────────────────

create table public.channel_metrics (
  id          uuid primary key default gen_random_uuid(),
  channel     campaign_channel not null,
  date        date not null,
  sessions    integer not null default 0,
  conversions integer not null default 0,
  revenue     numeric not null default 0,
  cost        numeric not null default 0,
  created_at  timestamptz not null default now(),
  unique (channel, date)
);

-- ─── Row Level Security ──────────────────────────────────────────────────────

alter table public.profiles       enable row level security;
alter table public.campaigns      enable row level security;
alter table public.channel_metrics enable row level security;

-- Profiles: users can only read/update their own profile
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Campaigns: any authenticated user can read; only admins/analysts can write
create policy "Authenticated users can read campaigns"
  on public.campaigns for select using (auth.role() = 'authenticated');

create policy "Analysts and admins can manage campaigns"
  on public.campaigns for all using (
    auth.uid() in (
      select id from public.profiles where role in ('admin', 'analyst')
    )
  );

-- Channel metrics: read-only for all authenticated users
create policy "Authenticated users can read channel metrics"
  on public.channel_metrics for select using (auth.role() = 'authenticated');

-- ─── Updated_at trigger ──────────────────────────────────────────────────────

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create trigger set_campaigns_updated_at
  before update on public.campaigns
  for each row execute procedure public.set_updated_at();
