
-- Reset admin password for kertous.r@gmail.com to Reda1029
UPDATE admin_users
SET password_hash = crypt('Reda1029', gen_salt('bf'))
WHERE email = 'kertous.r@gmail.com';

-- If user doesn't exist, insert it
INSERT INTO admin_users (email, password_hash, name, role)
SELECT 'kertous.r@gmail.com', crypt('Reda1029', gen_salt('bf')), 'Admin', 'admin'
WHERE NOT EXISTS (
  SELECT 1 FROM admin_users WHERE email = 'kertous.r@gmail.com'
);
