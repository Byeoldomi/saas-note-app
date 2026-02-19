-- Drop existing constraint if exists and update it to reference auth.users instead of public.users
alter table public.payments 
  drop constraint if exists payments_user_id_fkey;

alter table public.payments
  add constraint payments_user_id_fkey 
  foreign key (user_id) 
  references auth.users(id) 
  on delete cascade;
