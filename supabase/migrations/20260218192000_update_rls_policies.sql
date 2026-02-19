-- 1. Secure User Profile Updates
-- Prevent users from updating their own 'is_pro' or 'storage_limit' fields via client API.
-- Only allow updating specific fields like full_name, avatar_url.

DROP POLICY IF EXISTS "Users can update their own profile." ON public.users;

CREATE POLICY "Users can update their own profile basic info"
ON public.users FOR UPDATE
USING ( auth.uid() = id )
WITH CHECK ( auth.uid() = id );
-- Note: Supabase RLS 'USING' checks if the row is visible/updatable. 
-- To strictly limit COLUMNS, we usually need a Trigger or separate API.
-- However, for now, we rely on the fact that we will NOT expose is_pro in the updateable area of the client.
-- But to be safe, valid approach is to use a Trigger to revert sensitive columns if changed by non-service-role, 
-- OR just trust that we don't have code that updates it. 
-- A better RLS approach for columns isn't natively supported directly in 'CREATE POLICY' without pg functions.
-- Let's stick to the standard policy but implementing a trigger is safer for 'is_pro'.

-- Trigger to protect is_pro column from being changed by authenticated users (non-service role)
CREATE OR REPLACE FUNCTION public.protect_sensitive_columns()
RETURNS TRIGGER AS $$
BEGIN
  -- If the user is determining their own fate (authenticated user), prevent changing is_pro
  IF (auth.role() = 'authenticated') THEN
    IF (NEW.is_pro IS DISTINCT FROM OLD.is_pro) THEN
      RAISE EXCEPTION 'You cannot update your subscription status directly.';
    END IF;
     IF (NEW.storage_limit IS DISTINCT FROM OLD.storage_limit) THEN
      RAISE EXCEPTION 'You cannot update your storage limit directly.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_protect_sensitive_columns ON public.users;
CREATE TRIGGER tr_protect_sensitive_columns
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.protect_sensitive_columns();


-- 2. Note Permissions & Rate Limiting
-- Drop existing broad policy
DROP POLICY IF EXISTS "Users can perform CRUD on their own notes." ON public.notes;

-- Allow Read, Update, Delete for Owners (Unrestricted)
CREATE POLICY "Users can view their own notes"
ON public.notes FOR SELECT
USING ( auth.uid() = user_id );

CREATE POLICY "Users can update their own notes"
ON public.notes FOR UPDATE
USING ( auth.uid() = user_id );

CREATE POLICY "Users can delete their own notes"
ON public.notes FOR DELETE
USING ( auth.uid() = user_id );

-- Allow Insert with Rate Limit for Free Users
CREATE POLICY "Users can create notes with daily limit"
ON public.notes FOR INSERT
WITH CHECK (
  auth.uid() = user_id AND (
    -- Case 1: User is PRO (No Limit)
    (SELECT is_pro FROM public.users WHERE id = auth.uid()) = true
    OR
    -- Case 2: User is Free AND has created fewer than 5 notes in last 24h
    (
      SELECT count(*)
      FROM public.notes
      WHERE user_id = auth.uid()
      AND created_at > (now() - interval '24 hours')
    ) < 5
  )
);
