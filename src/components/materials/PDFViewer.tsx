import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  pdfUrl: string;
  title: string;
  onClose: () => void;
}

export const PDFViewer = ({ pdfUrl, title, onClose }: PDFViewerProps) => {
  const [zoom, setZoom] = useState(100);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoadError(null);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full h-full max-w-6xl max-h-[90vh] flex flex-col">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground min-w-[50px] text-center">
              {zoom}%
            </span>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <div className="w-full h-full bg-muted/50 rounded-lg overflow-auto p-4">
            {loadError ? (
              <div className="h-full flex items-center justify-center text-sm text-destructive">
                Falha ao carregar o PDF.
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="underline ml-1">
                  Abrir em nova aba
                </a>
              </div>
            ) : (
              <Document
                file={{ url: pdfUrl }}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={() => setLoadError('Erro ao carregar PDF')}
                loading={<div className="p-6 text-sm text-muted-foreground">Carregando PDF...</div>}
              >
                {Array.from(new Array(numPages || 0), (_el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    scale={zoom / 100}
                    renderAnnotationLayer={false}
                    renderTextLayer={true}
                    className="mx-auto my-4 rounded-md shadow"
                  />
                ))}
              </Document>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};