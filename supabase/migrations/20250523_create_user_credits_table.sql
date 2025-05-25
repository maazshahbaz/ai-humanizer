-- Create user_credits table
CREATE TABLE IF NOT EXISTS public.user_credits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) UNIQUE NOT NULL,
  credit_balance INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Add row level security policies
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see only their own credit balance
CREATE POLICY "Users can view their own credit balance" 
  ON public.user_credits 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy to allow users to update their own credit balance
CREATE POLICY "Users can update their own credit balance" 
  ON public.user_credits 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_user_credits_user_id ON public.user_credits(user_id);
