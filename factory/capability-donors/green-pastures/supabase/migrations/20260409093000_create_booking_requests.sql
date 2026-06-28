create extension if not exists pgcrypto;

create table if not exists public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(trim(full_name)) >= 2),
  email text not null,
  departure_window text not null,
  route_slug text not null,
  group_size text not null,
  travel_style text not null,
  addons text[] not null default '{}',
  notes text,
  status text not null default 'new',
  source text not null default 'web',
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists booking_requests_created_at_idx
  on public.booking_requests (created_at desc);

create index if not exists booking_requests_route_slug_idx
  on public.booking_requests (route_slug);

alter table public.booking_requests enable row level security;

drop policy if exists "Public can insert booking requests" on public.booking_requests;
create policy "Public can insert booking requests"
on public.booking_requests
for insert
to anon, authenticated
with check (true);
