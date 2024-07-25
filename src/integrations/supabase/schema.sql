-- Create the public.user_preferences table
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  background TEXT DEFAULT 'default',
  font TEXT DEFAULT 'default',
  layout TEXT DEFAULT 'default',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create a trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_preferences_updated_at
BEFORE UPDATE ON public.user_preferences
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create an RLS policy to allow users to access only their own preferences
CREATE POLICY user_preferences_policy ON public.user_preferences
  FOR ALL USING (auth.uid() = user_id);

-- Enable RLS on the user_preferences table
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;