-- Drop existing policies to start fresh and avoid conflicts
DROP POLICY IF EXISTS "Users can view their own subscriptions." ON public.subscriptions;
DROP POLICY IF EXISTS "Users can update their own subscriptions." ON public.subscriptions;
DROP POLICY IF EXISTS "Users can insert their own subscriptions." ON public.subscriptions;

-- Enable RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- 1. VIEW Policy
CREATE POLICY "Users can view their own subscriptions."
  ON public.subscriptions FOR SELECT
  USING ( auth.uid() = user_id );

-- 2. INSERT Policy
-- Users should be able to insert their own subscription data
CREATE POLICY "Users can insert their own subscriptions."
  ON public.subscriptions FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

-- 3. UPDATE Policy
-- Users should be able to update their own subscription (e.g. canceling)
CREATE POLICY "Users can update their own subscriptions."
  ON public.subscriptions FOR UPDATE
  USING ( auth.uid() = user_id )
  WITH CHECK ( auth.uid() = user_id );
