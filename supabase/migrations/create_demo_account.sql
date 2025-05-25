-- Create a demo user account in auth.users table
-- This needs to be run in the Supabase SQL Editor

-- 1. Insert the user into auth.users table with email confirmed
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  uuid_generate_v4(), -- Generate a new UUID for the user
  'authenticated',
  'authenticated',
  'demo@aihumanizer.com', -- Demo email
  crypt('DemoPass123!', gen_salt('bf')), -- Password: DemoPass123!
  now(),
  null,
  null,
  '{"provider": "email", "providers": ["email"], "email_confirmed": true}',
  '{"name": "Demo User"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- 2. Store the user ID from the insert (need to replace this with actual UUID from previous insert)
-- You'll need to look up the UUID of the user you just created with:
-- SELECT id FROM auth.users WHERE email = 'demo@aihumanizer.com';
-- Then use that UUID in the next statement:

-- 3. Insert 100 credits for the demo user
INSERT INTO user_credits (user_id, credit_balance, updated_at)
SELECT id, 100, now()
FROM auth.users
WHERE email = 'demo@aihumanizer.com';

-- Demo Account Credentials:
-- Email: demo@aihumanizer.com
-- Password: DemoPass123!
