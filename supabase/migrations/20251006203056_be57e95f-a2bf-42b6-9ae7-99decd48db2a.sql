-- Create storage bucket for study materials PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('study-materials', 'study-materials', true);

-- Create study_materials table
CREATE TABLE public.study_materials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  duration TEXT NOT NULL,
  author TEXT NOT NULL,
  topics TEXT[] NOT NULL DEFAULT '{}',
  pdf_url TEXT NOT NULL,
  rating NUMERIC DEFAULT 0,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.study_materials ENABLE ROW LEVEL SECURITY;

-- Policies for study_materials
CREATE POLICY "Anyone can view study materials"
ON public.study_materials
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can create materials"
ON public.study_materials
FOR INSERT
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own materials"
ON public.study_materials
FOR UPDATE
USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own materials"
ON public.study_materials
FOR DELETE
USING (auth.uid() = created_by);

-- Storage policies for study-materials bucket
CREATE POLICY "Anyone can view study materials files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'study-materials');

CREATE POLICY "Authenticated users can upload study materials"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'study-materials' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own files"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'study-materials' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete their own files"
ON storage.objects
FOR DELETE
USING (bucket_id = 'study-materials' AND auth.uid() IS NOT NULL);

-- Trigger for updated_at
CREATE TRIGGER update_study_materials_updated_at
BEFORE UPDATE ON public.study_materials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();