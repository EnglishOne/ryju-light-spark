import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreateGroupDialog } from '@/components/groups/CreateGroupDialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Users,
  Search,
  Plus,
  Lock,
  Globe,
  MessageCircle,
  Calendar,
  Star,
  Crown,
  BookOpen
} from 'lucide-react';

export default function Groups() {
  const [searchTerm, setSearchTerm] = useState('');
  const [myGroups, setMyGroups] = useState([
    {
      id: '1',
      name: 'Advanced Grammar Study',
      description: 'Deep dive into complex grammar structures and usage',
      members: 24,
      isPrivate: false,
      role: 'Admin',
      theme: 'grammar',
      lastActivity: '2h ago',
      unreadMessages: 3
    },
    {
      id: '2',
      name: 'TOEFL Warriors',
      description: 'Preparing together for TOEFL success',
      members: 156,
      isPrivate: true,
      role: 'Member',
      theme: 'test-prep',
      lastActivity: '1d ago',
      unreadMessages: 12
    }
  ]);
  const navigate = useNavigate();
  const { toast } = useToast();


  const availableGroups = [
    {
      id: '3',
      name: 'Pronunciation Practice Circle',
      description: 'Weekly voice practice sessions and feedback',
      members: 45,
      isPrivate: false,
      category: 'Speaking',
      theme: 'pronunciation',
      rating: 4.8,
      weeklyActivity: 'High'
    },
    {
      id: '4',
      name: 'Business English Pros',
      description: 'Professional English for career advancement',
      members: 89,
      isPrivate: true,
      category: 'Business',
      theme: 'business',
      rating: 4.9,
      weeklyActivity: 'Very High'
    },
    {
      id: '5',
      name: 'English Movie Club',
      description: 'Learn through films and TV shows',
      members: 167,
      isPrivate: false,
      category: 'Entertainment',
      theme: 'entertainment',
      rating: 4.7,
      weeklyActivity: 'Medium'
    },
    {
      id: '6',
      name: 'Beginner Support Circle',
      description: 'Safe space for English learning beginners',
      members: 234,
      isPrivate: false,
      category: 'Support',
      theme: 'beginner',
      rating: 4.6,
      weeklyActivity: 'High'
    }
  ];

  const groupThemes = {
    grammar: { color: 'bg-blue-500', icon: BookOpen },
    'test-prep': { color: 'bg-red-500', icon: Star },
    pronunciation: { color: 'bg-green-500', icon: MessageCircle },
    business: { color: 'bg-purple-500', icon: Crown },
    entertainment: { color: 'bg-pink-500', icon: Users },
    beginner: { color: 'bg-yellow-500', icon: Users }
  };

  const activityColors = {
    'Very High': 'text-green-600 bg-green-100',
    'High': 'text-blue-600 bg-blue-100',
    'Medium': 'text-yellow-600 bg-yellow-100',
    'Low': 'text-gray-600 bg-gray-100'
  };

  const handleGroupCreated = (newGroup: any) => {
    setMyGroups(prev => [...prev, newGroup]);
  };

  const handleJoinGroup = async (groupId: string, isPrivate: boolean) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: isPrivate ? 'Request sent!' : 'Joined successfully!',
        description: isPrivate 
          ? 'Your request to join the group has been sent to the admin.'
          : 'Welcome to the group!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleEnterGroup = (groupId: string) => {
    navigate(`/groups/${groupId}`);
  };

  // Filter groups based on search term
  const filteredAvailableGroups = availableGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMyGroups = myGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Study Groups</h1>
          <p className="text-muted-foreground mt-1">
            Join focused study groups and learn together
          </p>
        </div>
        <CreateGroupDialog onGroupCreated={handleGroupCreated} />
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search groups..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="my-groups" className="space-y-6">
        <TabsList>
          <TabsTrigger value="my-groups">My Groups ({filteredMyGroups.length})</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
        </TabsList>

        <TabsContent value="my-groups" className="space-y-4">
          {filteredMyGroups.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No groups yet</h3>
                <p className="text-muted-foreground mb-4">Join your first study group to start learning together</p>
                <Button>Browse Groups</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {filteredMyGroups.map((group) => {
                const theme = groupThemes[group.theme as keyof typeof groupThemes];
                const IconComponent = theme?.icon || Users;
                
                return (
                  <Card key={group.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 ${theme?.color || 'bg-primary'} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-lg">{group.name}</CardTitle>
                            {group.isPrivate ? (
                              <Lock className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <Globe className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                          <CardDescription>{group.description}</CardDescription>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant={group.role === 'Admin' ? 'default' : 'secondary'}>
                              {group.role}
                            </Badge>
                            {group.unreadMessages > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {group.unreadMessages} new
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{group.members} members</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{group.lastActivity}</span>
                          </div>
                        </div>
                        <Button size="sm" onClick={() => handleEnterGroup(group.id)}>
                          Enter Group
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="discover" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAvailableGroups.map((group) => {
              const theme = groupThemes[group.theme as keyof typeof groupThemes];
              const IconComponent = theme?.icon || Users;
              
              return (
                <Card key={group.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 ${theme?.color || 'bg-primary'} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-base">{group.name}</CardTitle>
                          {group.isPrivate ? (
                            <Lock className="w-3 h-3 text-muted-foreground" />
                          ) : (
                            <Globe className="w-3 h-3 text-muted-foreground" />
                          )}
                        </div>
                        <CardDescription className="text-sm">{group.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{group.members} members</span>
                        </div>
                        <Badge variant="outline">{group.category}</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{group.rating}/5.0</span>
                        </div>
                        <Badge 
                          className={`text-xs ${activityColors[group.weeklyActivity as keyof typeof activityColors] || activityColors.Low}`}
                        >
                          {group.weeklyActivity} Activity
                        </Badge>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="w-full"
                        variant={group.isPrivate ? 'outline' : 'default'}
                        onClick={() => handleJoinGroup(group.id, group.isPrivate)}
                      >
                        {group.isPrivate ? 'Request to Join' : 'Join Group'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="space-y-4">
          <div className="grid gap-4">
            {availableGroups
              .sort((a, b) => b.members - a.members)
              .map((group, index) => {
                const theme = groupThemes[group.theme as keyof typeof groupThemes];
                const IconComponent = theme?.icon || Users;
                
                return (
                  <Card key={group.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-muted-foreground w-8">
                          #{index + 1}
                        </div>
                        
                        <div className={`w-12 h-12 ${theme?.color || 'bg-primary'} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{group.name}</h3>
                            {group.isPrivate ? (
                              <Lock className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <Globe className="w-4 h-4 text-muted-foreground" />
                            )}
                            <Badge variant="outline">{group.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{group.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{group.members} members</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span>{group.rating}/5.0</span>
                            </div>
                            <Badge 
                              className={`text-xs ${activityColors[group.weeklyActivity as keyof typeof activityColors] || activityColors.Low}`}
                            >
                              {group.weeklyActivity}
                            </Badge>
                          </div>
                        </div>
                        
                        <Button 
                          variant={group.isPrivate ? 'outline' : 'default'}
                          onClick={() => handleJoinGroup(group.id, group.isPrivate)}
                        >
                          {group.isPrivate ? 'Request Access' : 'Join Group'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}