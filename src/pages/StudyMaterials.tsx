import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PDFViewer } from '@/components/materials/PDFViewer';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  Video, 
  FileText, 
  Headphones,
  Search,
  Star,
  Clock,
  User,
  Download,
  FileCheck,
  Loader2
} from 'lucide-react';

interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  rating: number;
  author: string;
  topics: string[];
  pdf_url: string;
  created_at: string;
  updated_at: string;
  created_by: string;
}

const StudyMaterials = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [currentPDFUrl, setCurrentPDFUrl] = useState('');
  const [currentPDFTitle, setCurrentPDFTitle] = useState('');
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('study_materials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setMaterials(data || []);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Não foi possível carregar os materiais.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'audio': return <Headphones className="h-4 w-4" />;
      case 'text': return <FileText className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const handleStudyNow = (material: StudyMaterial) => {
    setCurrentPDFUrl(material.pdf_url);
    setCurrentPDFTitle(material.title);
    setShowPDFViewer(true);
  };

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLevel = selectedLevel === 'all' || material.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  if (loading) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Materiais de Estudo</h1>
          <p className="text-muted-foreground">Acesse recursos de aprendizagem selecionados para melhorar suas habilidades em inglês</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar materiais..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Tabs value={selectedLevel} onValueChange={setSelectedLevel} className="w-auto">
            <TabsList>
              <TabsTrigger value="all">Todos os Níveis</TabsTrigger>
              <TabsTrigger value="beginner">Iniciante</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediário</TabsTrigger>
              <TabsTrigger value="advanced">Avançado</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total de Materiais</p>
                <p className="text-2xl font-bold">{materials.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileCheck className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">PDFs Disponíveis</p>
                <p className="text-2xl font-bold">{materials.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Avaliação Média</p>
                <p className="text-2xl font-bold">4.7</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Horas de Conteúdo</p>
                <p className="text-2xl font-bold">4.5h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
          <Card key={material.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <Badge className={getLevelColor(material.level)}>
                    {material.level}
                  </Badge>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-muted-foreground">{material.rating}</span>
                </div>
              </div>
              <CardTitle className="text-lg">{material.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{material.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{material.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{material.author}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {material.topics.map((topic) => (
                  <Badge key={topic} variant="secondary" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>

              <div className="flex space-x-2">
                <Button 
                  className="flex-1" 
                  onClick={() => handleStudyNow(material)}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Abrir PDF
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => window.open(material.pdf_url, '_blank')}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Nenhum material encontrado</h3>
          <p className="text-muted-foreground">Tente ajustar sua busca ou filtros.</p>
        </div>
      )}

      {/* PDF Viewer */}
      {showPDFViewer && (
        <PDFViewer
          pdfUrl={currentPDFUrl}
          title={currentPDFTitle}
          onClose={() => setShowPDFViewer(false)}
        />
      )}
    </div>
  );
};

export default StudyMaterials;