-- Create storage bucket for PDFs
INSERT INTO storage.buckets (id, name, public) VALUES ('pdfs', 'pdfs', true);

-- Create policies for PDF bucket
CREATE POLICY "PDFs are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'pdfs');

CREATE POLICY "Authenticated users can upload PDFs" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'pdfs' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update PDFs" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'pdfs' AND auth.role() = 'authenticated');