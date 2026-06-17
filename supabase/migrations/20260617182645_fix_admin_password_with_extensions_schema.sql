-- Fix: use extensions.crypt to match the admin_login function
UPDATE admin_users
SET password_hash = extensions.crypt('Reda1029', extensions.gen_salt('bf'))
WHERE email = 'kertous.r@gmail.com';
