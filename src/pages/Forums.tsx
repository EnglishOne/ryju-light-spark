import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, 
  Users, 
  Search,
  Pin,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useForums } from '@/hooks/useForums';
import { CreateForumDialog } from '@/components/forums/CreateForumDialog';

export default function Forums() {
  const { forums, loading } = useForums();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const refreshForums = () => {
    // This would trigger a refetch of forums
    window.location.reload();
  };

  const mockForums = [
    {
      id: '1',
      name: 'Grammar & Vocabulary',
      description: 'Discuss grammar rules, vocabulary building, and language structure',
      color: '#3B82F6',
      topics: 156,
      replies: 1247,
      lastActivity: '2 minutos atrás',
      isActive: true
    },
    {
      id: '2', 
      name: 'Listening Practice',
      description: 'Share listening exercises, podcasts, and audio resources',
      color: '#10B981',
      topics: 89,
      replies: 567,
      lastActivity: '15 minutos atrás',
      isActive: true
    },
    {
      id: '3',
      name: 'Speaking & Pronunciation',
      description: 'Practice speaking, pronunciation tips, and conversation starters',
      color: '#F59E0B',
      topics: 134,
      replies: 892,
      lastActivity: '1 hora atrás',
      isActive: true
    },
    {
      id: '4',
      name: 'Business English',
      description: 'Professional English, job interviews, and workplace communication',
      color: '#8B5CF6',
      topics: 67,
      replies: 234,
      lastActivity: '3 horas atrás',
      isActive: false
    },
    {
      id: '5',
      name: 'TOEFL/IELTS Preparation',
      description: 'Test preparation strategies, practice tests, and study groups',
      color: '#EF4444',
      topics: 198,
      replies: 1456,
      lastActivity: '30 minutos atrás',
      isActive: true
    }
  ];

  // Transform Supabase forums to match our display format
  const transformedForums = forums && forums.length > 0 ? forums.map(forum => ({
    id: forum.id,
    name: forum.name,
    description: forum.description,
    color: forum.color || '#3B82F6',
    topics: 0, // These would need to be calculated from joins
    replies: 0,
    lastActivity: 'Recent',
    isActive: true
  })) : mockForums;

  const filteredForums = transformedForums.filter(forum =>
    forum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    forum.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Community Forums</h1>
          <p className="text-muted-foreground mt-1">
            Join discussions and share your English learning journey
          </p>
        </div>
        <CreateForumDialog onForumCreated={refreshForums} />
      </div>

      {/* Search and Stats */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search forums..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-4">
          <Card className="px-4 py-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              <div>
                <div className="text-sm font-medium">644</div>
                <div className="text-xs text-muted-foreground">Topics</div>
              </div>
            </div>
          </Card>
          <Card className="px-4 py-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-500" />
              <div>
                <div className="text-sm font-medium">4,396</div>
                <div className="text-xs text-muted-foreground">Posts</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Forums Grid */}
      <div className="grid gap-6">
        {filteredForums.map((forum) => (
          <Card key={forum.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ 
                    backgroundColor: `${forum.color}20`,
                    color: forum.color 
                  }}
                >
                  <MessageSquare className="w-6 h-6" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg">{forum.name}</CardTitle>
                    {forum.isActive && (
                      <Badge variant="secondary" className="text-xs">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                        Active
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-sm">
                    {forum.description}
                  </CardDescription>
                </div>

                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/forums/${forum.id}/topics`);
                  }}
                >
                  View Topics
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{forum.topics || 0} topics</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>{forum.replies || 0} replies</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{forum.lastActivity || 'No activity'}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => navigate(`/forums/${forum.id}/topics`)}
                  >
                    View Topics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Popular Topics Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pin className="w-5 h-5" />
            Trending Topics Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { title: "Best apps for daily English practice", forum: "Grammar & Vocabulary", replies: 23, time: "2h ago" },
              { title: "How to improve listening skills with podcasts", forum: "Listening Practice", replies: 15, time: "4h ago" },
              { title: "Common phrasal verbs in business context", forum: "Business English", replies: 31, time: "6h ago" },
              { title: "IELTS Speaking Part 2 strategies", forum: "TOEFL/IELTS Preparation", replies: 18, time: "1d ago" }
            ].map((topic, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{topic.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span>in {topic.forum}</span>
                    <span>•</span>
                    <span>{topic.replies} replies</span>
                    <span>•</span>
                    <span>{topic.time}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}