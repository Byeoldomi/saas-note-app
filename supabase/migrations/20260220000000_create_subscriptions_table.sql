create table public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references public.users(id) on delete cascade,
  billing_key text not null,
  customer_key text not null,
  amount numeric not null,
  next_payment_date timestamptz not null,
  status text not null check (status in ('ACTIVE', 'PAUSED', 'CANCELED', 'FAILED')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.subscriptions enable row level security;

-- Users can view their own subscriptions
create policy "Users can view their own subscriptions."
  on public.subscriptions for select
  using ( auth.uid() = user_id );

-- Users can update their own subscriptions (e.g. cancel)
create policy "Users can update their own subscriptions."
  on public.subscriptions for update
  using ( auth.uid() = user_id );
