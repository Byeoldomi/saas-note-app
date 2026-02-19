-- Create a table for public profiles using Supabase code structure
create table public.users (
  id uuid not null references auth.users on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  storage_usage bigint default 0,
  storage_limit bigint default 10737418240, -- 10GB
  is_pro boolean default false,

  primary key (id)
);

alter table public.users enable row level security;

create policy "Users can view their own profile."
  on public.users for select
  using ( auth.uid() = id );

create policy "Users can update their own profile."
  on public.users for update
  using ( auth.uid() = id );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Notes table
create table public.notes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references public.users(id) on delete cascade,
  title text,
  content text,
  is_pinned boolean default false,
  is_favorite boolean default false,
  in_trash boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

alter table public.notes enable row level security;

create policy "Users can perform CRUD on their own notes."
  on public.notes for all
  using ( auth.uid() = user_id );

-- Tags table
create table public.tags (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  color text,
  created_at timestamptz default now()
);

alter table public.tags enable row level security;

create policy "Users can perform CRUD on their own tags."
  on public.tags for all
  using ( auth.uid() = user_id );

-- Note Tags (Many-to-Many)
create table public.note_tags (
  note_id uuid not null references public.notes(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (note_id, tag_id)
);

alter table public.note_tags enable row level security;

create policy "Users can perform CRUD on their own note tags."
  on public.note_tags for all
  using (
    exists (
      select 1 from public.notes
      where public.notes.id = note_tags.note_id
      and public.notes.user_id = auth.uid()
    )
  );

-- Updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger update_users_updated_at
before update on public.users
for each row execute procedure update_updated_at_column();

create trigger update_notes_updated_at
before update on public.notes
for each row execute procedure update_updated_at_column();
