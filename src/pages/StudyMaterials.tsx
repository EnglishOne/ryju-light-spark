import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PDFViewer } from '@/components/materials/PDFViewer';
import { PDFUpload } from '@/components/materials/PDFUpload';
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
  Upload
} from 'lucide-react';

const StudyMaterials = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [currentPDFUrl, setCurrentPDFUrl] = useState('');
  const [currentPDFTitle, setCurrentPDFTitle] = useState('');
  const [showUpload, setShowUpload] = useState<number | null>(null);
  const [materialPDFs, setMaterialPDFs] = useState<Record<number, string>>({});

  const materials = [
    {
      id: 1,
      title: 'English Grammar Fundamentals',
      type: 'text',
      level: 'beginner',
      duration: '45 min',
      rating: 4.8,
      author: 'Dr. Sarah Wilson',
      description: 'Complete guide to English grammar basics including tenses, articles, and sentence structure.',
      topics: ['Grammar', 'Tenses', 'Articles'],
      downloadUrl: '#',
      hasPDF: false
    },
    {
      id: 2,
      title: 'Business English Conversations',
      type: 'audio',
      level: 'intermediate',
      duration: '30 min',
      rating: 4.6,
      author: 'Prof. Michael Chen',
      description: 'Practice common business scenarios with authentic conversations and vocabulary.',
      topics: ['Business', 'Conversations', 'Vocabulary'],
      downloadUrl: '#',
      hasPDF: false
    },
    {
      id: 3,
      title: 'IELTS Speaking Practice',
      type: 'video',
      level: 'advanced',
      duration: '60 min',
      rating: 4.9,
      author: 'Emma Thompson',
      description: 'Comprehensive IELTS speaking preparation with sample questions and strategies.',
      topics: ['IELTS', 'Speaking', 'Test Prep'],
      downloadUrl: '#',
      hasPDF: false
    },
    {
      id: 4,
      title: 'Phrasal Verbs Handbook',
      type: 'text',
      level: 'intermediate',
      duration: '25 min',
      rating: 4.5,
      author: 'James Rodriguez',
      description: 'Essential phrasal verbs with examples and exercises for daily communication.',
      topics: ['Phrasal Verbs', 'Vocabulary', 'Communication'],
      downloadUrl: '#',
      hasPDF: false
    }
  ];

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

  const handleStudyNow = (material: any) => {
    const pdfUrl = materialPDFs[material.id];
    if (pdfUrl) {
      setCurrentPDFUrl(pdfUrl);
      setCurrentPDFTitle(material.title);
      setShowPDFViewer(true);
    } else {
      setShowUpload(material.id);
    }
  };

  const handlePDFUploadSuccess = (url: string, materialId: number) => {
    setMaterialPDFs(prev => ({ ...prev, [materialId]: url }));
    setShowUpload(null);
  };

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLevel = selectedLevel === 'all' || material.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Study Materials</h1>
          <p className="text-muted-foreground">Access curated learning resources to improve your English skills</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Tabs value={selectedLevel} onValueChange={setSelectedLevel} className="w-auto">
            <TabsList>
              <TabsTrigger value="all">All Levels</TabsTrigger>
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
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
                <p className="text-sm text-muted-foreground">Total Materials</p>
                <p className="text-2xl font-bold">{materials.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Video className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Video Lessons</p>
                <p className="text-2xl font-bold">{materials.filter(m => m.type === 'video').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Headphones className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Audio Content</p>
                <p className="text-2xl font-bold">{materials.filter(m => m.type === 'audio').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Documents</p>
                <p className="text-2xl font-bold">{materials.filter(m => m.type === 'text').length}</p>
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
                  {getTypeIcon(material.type)}
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
                  <BookOpen className="h-4 w-4 mr-2" />
                  {materialPDFs[material.id] ? 'Study Now' : 'Add PDF'}
                </Button>
                {materialPDFs[material.id] && (
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                )}
                {!materialPDFs[material.id] && (
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setShowUpload(material.id)}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No materials found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
        </div>
      )}

      {/* PDF Upload Modal */}
      {showUpload !== null && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="absolute -top-2 -right-2 z-10 h-8 w-8 rounded-full p-0"
              onClick={() => setShowUpload(null)}
            >
              ×
            </Button>
            <PDFUpload
              materialId={showUpload}
              onUploadSuccess={(url) => handlePDFUploadSuccess(url, showUpload)}
            />
          </div>
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