/*
  # Secure reservation admin access

  1. Keep the public reservation form working with INSERT only.
  2. Link custom admin users to Supabase Auth users by email.
  3. Allow reservation SELECT / UPDATE / DELETE only for authenticated admin users.

  Important:
  - Create the admin email in Supabase Authentication > Users before applying this.
  - The email must match public.admin_users.email.
*/

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.admin_users
  ADD COLUMN IF NOT EXISTS auth_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE UNIQUE INDEX IF NOT EXISTS admin_users_auth_user_id_unique
  ON public.admin_users(auth_user_id)
  WHERE auth_user_id IS NOT NULL;

UPDATE public.admin_users admin_user
SET auth_user_id = auth_user.id
FROM auth.users auth_user
WHERE admin_user.auth_user_id IS NULL
  AND lower(admin_user.email) = lower(auth_user.email);

REVOKE SELECT, UPDATE, DELETE ON TABLE public.reservations FROM anon, public;
GRANT INSERT ON TABLE public.reservations TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON TABLE public.reservations TO authenticated;

REVOKE ALL ON TABLE public.admin_users FROM anon;
GRANT SELECT ON TABLE public.admin_users TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_login(text, text) TO authenticated;

DROP POLICY IF EXISTS "Anyone can create reservations" ON public.reservations;
DROP POLICY IF EXISTS "Authenticated users can view all reservations" ON public.reservations;
DROP POLICY IF EXISTS "Admins can view all reservations" ON public.reservations;
DROP POLICY IF EXISTS "Admins can update reservations" ON public.reservations;
DROP POLICY IF EXISTS "Anon can view all reservations" ON public.reservations;
DROP POLICY IF EXISTS "Anon can update reservations" ON public.reservations;
DROP POLICY IF EXISTS "Anon can delete reservations" ON public.reservations;
DROP POLICY IF EXISTS "Allow all operations on reservations" ON public.reservations;
DROP POLICY IF EXISTS "Client can create reservations" ON public.reservations;
DROP POLICY IF EXISTS "Admin can view reservations" ON public.reservations;
DROP POLICY IF EXISTS "Admin can update reservations" ON public.reservations;
DROP POLICY IF EXISTS "Admin can delete reservations" ON public.reservations;

DROP POLICY IF EXISTS "Admin users can manage themselves" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can view all admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can manage admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Anon can view admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Anon can insert admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Anon can update admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Anon can delete admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Allow read admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can read own admin profile" ON public.admin_users;

CREATE POLICY "Admins can read own admin profile"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = auth_user_id);

CREATE POLICY "Client can create reservations"
  ON public.reservations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can view reservations"
  ON public.reservations
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.admin_users admin_user
      WHERE admin_user.auth_user_id = (SELECT auth.uid())
        AND admin_user.role = 'admin'
    )
  );

CREATE POLICY "Admin can update reservations"
  ON public.reservations
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.admin_users admin_user
      WHERE admin_user.auth_user_id = (SELECT auth.uid())
        AND admin_user.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.admin_users admin_user
      WHERE admin_user.auth_user_id = (SELECT auth.uid())
        AND admin_user.role = 'admin'
    )
  );

CREATE POLICY "Admin can delete reservations"
  ON public.reservations
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.admin_users admin_user
      WHERE admin_user.auth_user_id = (SELECT auth.uid())
        AND admin_user.role = 'admin'
    )
  );
