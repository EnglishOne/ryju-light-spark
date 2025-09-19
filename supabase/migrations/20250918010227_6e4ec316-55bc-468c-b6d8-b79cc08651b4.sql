-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    user_id,
    username,
    display_name,
    english_level,
    points
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', 'New User'),
    'beginner',
    0
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add unique constraint to forum names to prevent duplicates
ALTER TABLE public.forums ADD CONSTRAINT forums_name_unique UNIQUE (name);

-- Insert sample forum data
INSERT INTO public.forums (name, description, color) VALUES
  ('General Discussion', 'Talk about anything related to English learning', '#87CEEB'),
  ('Grammar Help', 'Get help with English grammar questions', '#98FB98'),
  ('Pronunciation Practice', 'Share tips and practice pronunciation', '#DDA0DD'),
  ('Business English', 'Professional English for workplace', '#F0E68C'),
  ('TOEFL/IELTS Prep', 'Test preparation discussions', '#FFB6C1');