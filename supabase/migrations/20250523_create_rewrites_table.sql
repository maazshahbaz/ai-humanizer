-- Create rewrites table
CREATE TABLE IF NOT EXISTS public.rewrites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  original_text TEXT NOT NULL,
  rewritten_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Add row level security policies
ALTER TABLE public.rewrites ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see only their own rewrites
CREATE POLICY "Users can view their own rewrites" 
  ON public.rewrites 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own rewrites
CREATE POLICY "Users can insert their own rewrites" 
  ON public.rewrites 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_rewrites_user_id ON public.rewrites(user_id);
