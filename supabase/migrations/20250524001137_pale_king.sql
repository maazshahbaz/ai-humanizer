/*
  # Initial Schema Setup

  1. New Tables
    - `users`: Stores user profile information
    - `user_credits`: Tracks credit balance for each user
    - `rewrites`: Stores rewrite history
    - `plans`: Available subscription plans

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create plans table
CREATE TABLE IF NOT EXISTS plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  credit_limit integer NOT NULL,
  price decimal NOT NULL,
  features text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read plans"
  ON plans
  FOR SELECT
  TO public
  USING (true);

-- Create user_credits table
CREATE TABLE IF NOT EXISTS user_credits (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  credit_balance integer NOT NULL DEFAULT 50,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own credits"
  ON user_credits
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own credits"
  ON user_credits
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create rewrites table
CREATE TABLE IF NOT EXISTS rewrites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  original_text text NOT NULL,
  rewritten_text text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rewrites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own rewrites"
  ON rewrites
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own rewrites"
  ON rewrites
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Insert default plans
INSERT INTO plans (name, credit_limit, price, features)
VALUES 
  ('Free', 50, 0, ARRAY['50 humanization credits', 'Standard humanization quality', 'Basic support', '7-day history']),
  ('Pro', 150, 19, ARRAY['150 humanization credits', 'High-quality humanization', 'Priority support', '30-day history', 'API access']),
  ('Premium', 999, 49, ARRAY['Unlimited humanization credits', 'Premium humanization quality', '24/7 priority support', 'Unlimited history', 'API access with higher rate limits', 'Advanced settings'])
ON CONFLICT DO NOTHING;