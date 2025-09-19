import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft,
  MessageSquare, 
  Search,
  Plus,
  Clock,
  ThumbsUp,
  Pin
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CreateTopicDialog } from '@/components/forums/CreateTopicDialog';

interface Topic {
  id: string;
  title: string;
  content: string;
  author_name: string;
  author_username: string;
  created_at: string;
  replies_count: number;
  likes_count: number;
  is_pinned: boolean;
  last_activity: string;
}

interface Forum {
  id: string;
  name: string;
  description: string;
  color: string;
}

export default function ForumTopics() {
  const { forumId } = useParams<{ forumId: string }>();
  const navigate = useNavigate();
  const [forum, setForum] = useState<Forum | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Mock data for demonstration
  const mockTopics: Topic[] = [
    {
      id: '1',
      title: 'Best resources for improving pronunciation',
      content: 'I\'ve been struggling with English pronunciation, especially with th sounds...',
      author_name: 'Maria Silva',
      author_username: 'maria_s',
      created_at: '2024-01-15T10:30:00Z',
      replies_count: 15,
      likes_count: 8,
      is_pinned: true,
      last_activity: '2 hours ago'
    },
    {
      id: '2',
      title: 'Grammar question: When to use "has been" vs "have been"',
      content: 'Can someone explain the difference between "has been" and "have been"?',
      author_name: 'João Santos',
      author_username: 'joao_santos',
      created_at: '2024-01-14T15:45:00Z',
      replies_count: 23,
      likes_count: 12,
      is_pinned: false,
      last_activity: '1 hour ago'
    },
    {
      id: '3',
      title: 'Weekly vocabulary challenge - Week 3',
      content: 'This week\'s theme is business vocabulary. Let\'s learn together!',
      author_name: 'Ana Costa',
      author_username: 'ana_costa',
      created_at: '2024-01-13T09:00:00Z',
      replies_count: 45,
      likes_count: 28,
      is_pinned: true,
      last_activity: '30 minutes ago'
    }
  ];

  const mockForum: Forum = {
    id: forumId || '1',
    name: 'Grammar & Vocabulary',
    description: 'Discuss grammar rules, vocabulary building, and language structure',
    color: '#3B82F6'
  };

  useEffect(() => {
    const fetchForumAndTopics = async () => {
      if (!forumId) {
        navigate('/forums');
        return;
      }

      try {
        // For now, use mock data
        setForum(mockForum);
        setTopics(mockTopics);
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to load forum topics",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchForumAndTopics();
  }, [forumId, navigate, toast]);

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pinnedTopics = filteredTopics.filter(topic => topic.is_pinned);
  const regularTopics = filteredTopics.filter(topic => !topic.is_pinned);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!forum) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Forum not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/forums')}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Forums
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ 
              backgroundColor: `${forum.color}20`,
              color: forum.color 
            }}
          >
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{forum.name}</h1>
            <p className="text-muted-foreground mt-1">{forum.description}</p>
          </div>
        </div>
        <CreateTopicDialog forumId={forum.id} onTopicCreated={() => {}} />
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search topics..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Pinned Topics */}
      {pinnedTopics.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Pin className="w-4 h-4 text-primary" />
            <h2 className="text-lg font-semibold">Pinned Topics</h2>
          </div>
          <div className="space-y-3">
            {pinnedTopics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      )}

      {/* Regular Topics */}
      <div className="space-y-4">
        {pinnedTopics.length > 0 && (
          <h2 className="text-lg font-semibold">Recent Topics</h2>
        )}
        <div className="space-y-3">
          {regularTopics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </div>

      {filteredTopics.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No topics found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Be the first to start a discussion!'}
            </p>
            <CreateTopicDialog forumId={forum.id} onTopicCreated={() => {}} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function TopicCard({ topic }: { topic: Topic }) {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/topic/${topic.id}`)}>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topic.author_username}`} />
            <AvatarFallback>{topic.author_name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-base">{topic.title}</CardTitle>
              {topic.is_pinned && (
                <Pin className="w-4 h-4 text-primary fill-current" />
              )}
            </div>
            <CardDescription className="text-sm line-clamp-2">
              {topic.content}
            </CardDescription>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span>by {topic.author_name}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{topic.last_activity}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              <span>{topic.replies_count} replies</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              <span>{topic.likes_count} likes</span>
            </div>
          </div>
          
          <Badge variant="secondary" className="text-xs">
            Active
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}