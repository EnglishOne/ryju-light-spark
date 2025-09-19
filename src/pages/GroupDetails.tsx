import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  Users,
  MessageCircle,
  Calendar,
  Star,
  Settings,
  UserPlus,
  Crown,
  Lock,
  Globe,
  BookOpen,
  MoreHorizontal
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function GroupDetails() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMember, setIsMember] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  // Mock data - in real app, this would come from Supabase
  const group = {
    id: groupId,
    name: 'Advanced Grammar Study',
    description: 'Deep dive into complex grammar structures and usage patterns in English. We focus on advanced topics like subjunctive mood, complex conditionals, and formal written English.',
    members: 24,
    isPrivate: false,
    theme: 'grammar',
    category: 'Grammar',
    rating: 4.8,
    weeklyActivity: 'High',
    createdAt: '2024-01-15',
    adminId: 'user1'
  };

  const members = [
    { id: '1', name: 'Sarah Chen', role: 'Admin', avatar: '', joinedAt: '2024-01-15', lastActive: '2h ago' },
    { id: '2', name: 'Mike Johnson', role: 'Moderator', avatar: '', joinedAt: '2024-01-20', lastActive: '1d ago' },
    { id: '3', name: 'Anna Rodriguez', role: 'Member', avatar: '', joinedAt: '2024-02-01', lastActive: '3h ago' },
    { id: '4', name: 'David Kim', role: 'Member', avatar: '', joinedAt: '2024-02-05', lastActive: '5h ago' },
    { id: '5', name: 'Lisa Wang', role: 'Member', avatar: '', joinedAt: '2024-02-10', lastActive: '1d ago' },
  ];

  const recentActivity = [
    { id: '1', type: 'discussion', title: 'New topic: Complex Conditionals', author: 'Sarah Chen', time: '2h ago' },
    { id: '2', type: 'resource', title: 'Shared: Advanced Grammar Exercises', author: 'Mike Johnson', time: '1d ago' },
    { id: '3', type: 'member', title: 'Lisa Wang joined the group', author: 'System', time: '2d ago' },
    { id: '4', type: 'discussion', title: 'Weekly Challenge: Subjunctive Mood', author: 'Sarah Chen', time: '3d ago' },
  ];

  const handleJoinGroup = async () => {
    setIsJoining(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsMember(true);
      toast({
        title: 'Welcome to the group!',
        description: `You've successfully joined ${group.name}`,
      });
    } catch (error) {
      toast({
        title: 'Error joining group',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsJoining(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-800';
      case 'Moderator': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/groups')}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Groups
        </Button>
      </div>

      {/* Group Info */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-2xl">{group.name}</CardTitle>
                  {group.isPrivate ? (
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Globe className="w-5 h-5 text-muted-foreground" />
                  )}
                  <Badge variant="outline">{group.category}</Badge>
                </div>
                <CardDescription className="text-base mb-3">
                  {group.description}
                </CardDescription>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{group.members} members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{group.rating}/5.0</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Created {new Date(group.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!isMember ? (
                <Button onClick={handleJoinGroup} disabled={isJoining}>
                  {isJoining ? 'Joining...' : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      {group.isPrivate ? 'Request to Join' : 'Join Group'}
                    </>
                  )}
                </Button>
              ) : (
                <>
                  <Button variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members ({members.length})</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Activity Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800">
                    {group.weeklyActivity}
                  </Badge>
                  <span className="text-sm text-muted-foreground">activity</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Very active group with daily discussions and weekly challenges.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Group Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Total Members</span>
                  <span className="font-medium">{group.members}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Active Today</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Weekly Posts</span>
                  <span className="font-medium">47</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Group Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Stay on topic (grammar focus)</li>
                  <li>• Be respectful and supportive</li>
                  <li>• Share resources when helpful</li>
                  <li>• Participate in weekly challenges</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <div className="grid gap-4">
            {members.map((member) => (
              <Card key={member.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{member.name}</h4>
                          <Badge className={getRoleColor(member.role)}>
                            {member.role === 'Admin' && <Crown className="w-3 h-3 mr-1" />}
                            {member.role}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Joined {new Date(member.joinedAt).toLocaleDateString()} • Last active {member.lastActive}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <Card key={activity.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <h4 className="font-medium">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        by {activity.author} • {activity.time}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}