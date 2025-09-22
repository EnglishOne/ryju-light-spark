import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  title: string;
  onClose: () => void;
}

export const PDFViewer = ({ pdfUrl, title, onClose }: PDFViewerProps) => {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

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
          <div className="w-full h-full bg-muted/50 rounded-lg overflow-hidden">
            <object
              data={`${pdfUrl}#view=FitH&toolbar=0&navpanes=0&scrollbar=1`}
              type="application/pdf"
              className="w-full h-full"
              style={{ 
                minHeight: '500px',
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top left',
                width: `${10000 / zoom}%`,
                height: `${10000 / zoom}%`
              }}
            >
              <iframe
                src={`${pdfUrl}#view=FitH&toolbar=0&navpanes=0&scrollbar=1`}
                className="w-full h-full border-0"
                title={title}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                allow="fullscreen"
                style={{ 
                  minHeight: '500px',
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: 'top left',
                  width: `${10000 / zoom}%`,
                  height: `${10000 / zoom}%`
                }}
              >
                <p>Seu navegador não suporta a visualização de PDFs. 
                   <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                     Clique aqui para abrir em uma nova aba.
                   </a>
                </p>
              </iframe>
            </object>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};