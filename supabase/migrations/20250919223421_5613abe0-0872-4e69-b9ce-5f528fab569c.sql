-- Create forums table
CREATE TABLE public.forums (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT NOT NULL DEFAULT '#3B82F6',
  created_by UUID NOT NULL,
  topic_count INTEGER NOT NULL DEFAULT 0,
  post_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create topics table
CREATE TABLE public.topics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  forum_id UUID NOT NULL,
  user_id UUID NOT NULL,
  replies_count INTEGER NOT NULL DEFAULT 0,
  views_count INTEGER NOT NULL DEFAULT 0,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  is_locked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add english_level column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN english_level TEXT DEFAULT 'Beginner';

-- Enable Row Level Security
ALTER TABLE public.forums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;

-- Create policies for forums
CREATE POLICY "Forums are viewable by everyone" 
ON public.forums 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create forums" 
ON public.forums 
FOR INSERT 
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Forum creators can update their forums" 
ON public.forums 
FOR UPDATE 
USING (auth.uid() = created_by);

-- Create policies for topics
CREATE POLICY "Topics are viewable by everyone" 
ON public.topics 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create topics" 
ON public.topics 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Topic creators can update their topics" 
ON public.topics 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Topic creators can delete their topics" 
ON public.topics 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates on forums
CREATE TRIGGER update_forums_updated_at
BEFORE UPDATE ON public.forums
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for automatic timestamp updates on topics
CREATE TRIGGER update_topics_updated_at
BEFORE UPDATE ON public.topics
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();