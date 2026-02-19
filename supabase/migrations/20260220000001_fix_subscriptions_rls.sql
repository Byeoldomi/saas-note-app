-- Users can update their own subscriptions (e.g. cancel)
-- Drop existing policy if it conflicts or just replace
DROP POLICY IF EXISTS "Users can update their own subscriptions." ON public.subscriptions;

CREATE POLICY "Users can update their own subscriptions."
  ON public.subscriptions FOR UPDATE
  USING ( auth.uid() = user_id )
  WITH CHECK ( auth.uid() = user_id );
  
-- Also ensure insert policy exists if not already (upsert might need it)
DROP POLICY IF EXISTS "Users can insert their own subscriptions." ON public.subscriptions;

CREATE POLICY "Users can insert their own subscriptions."
  ON public.subscriptions FOR INSERT
  WITH CHECK ( auth.uid() = user_id );
