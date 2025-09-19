import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User,
  Edit3,
  Trophy,
  MessageSquare,
  Heart,
  Calendar,
  MapPin,
  BookOpen,
  Award,
  TrendingUp,
  Target
} from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

export default function Profile() {
  const { profile, loading } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    display_name: profile?.display_name || '',
    bio: profile?.bio || '',
    english_level: profile?.english_level || 'Beginner'
  });

  const userStats = {
    posts: 147,
    replies: 289,
    likes: 156,
    points: profile?.points || 1250,
    rank: 15,
    streak: 7,
    joinDate: profile?.created_at ? new Date(profile.created_at).toLocaleDateString('pt-BR') : 'Recente'
  };

  const badges = profile?.badges || ['first-post', 'week-streak', 'helpful-member'];
  
  const badgeConfig = {
    'first-post': { name: 'First Post', color: 'bg-blue-500', icon: '📝' },
    'week-streak': { name: '7 Day Streak', color: 'bg-green-500', icon: '🔥' },
    'helpful-member': { name: 'Helpful Member', color: 'bg-purple-500', icon: '🤝' },
    'grammar-expert': { name: 'Grammar Expert', color: 'bg-yellow-500', icon: '📚' },
    'conversation-starter': { name: 'Conversation Starter', color: 'bg-pink-500', icon: '💬' }
  };

  const recentActivity = [
    { type: 'post', title: 'Dicas para melhorar pronúncia', forum: 'Speaking Practice', time: '2h ago', engagement: '12 likes' },
    { type: 'reply', title: 'Como usar phrasal verbs', forum: 'Grammar & Vocabulary', time: '1d ago', engagement: '5 replies' },
    { type: 'achievement', title: 'Conquistou badge "Week Streak"', time: '2d ago', engagement: '🏆' },
    { type: 'post', title: 'Recursos para TOEFL', forum: 'Test Preparation', time: '5d ago', engagement: '18 likes' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              {profile?.display_name?.[0]?.toUpperCase() || 'U'}
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{profile?.display_name || 'User'}</h1>
                  <p className="text-muted-foreground">@{profile?.username || 'username'}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {userStats.joinDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>Level: {profile?.english_level || 'Beginner'}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(!isEditing)}
                  className="gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </Button>
              </div>
              
              <p className="text-muted-foreground">
                {profile?.bio || 'Passionate English learner sharing the journey with the community! 🌟'}
              </p>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {badges.map((badgeKey) => {
                  const badge = badgeConfig[badgeKey as keyof typeof badgeConfig];
                  return badge ? (
                    <Badge key={badgeKey} variant="secondary" className="gap-1">
                      <span>{badge.icon}</span>
                      {badge.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{userStats.points}</div>
            <div className="text-sm text-muted-foreground">XP Points</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">#{userStats.rank}</div>
            <div className="text-sm text-muted-foreground">Global Rank</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">{userStats.streak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">{userStats.posts}</div>
            <div className="text-sm text-muted-foreground">Posts</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">{activity.title}</span>
                      {activity.forum && (
                        <>
                          <span className="text-muted-foreground">in</span>
                          <Badge variant="outline" className="text-xs">{activity.forum}</Badge>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span>{activity.time}</span>
                      <span>•</span>
                      <span>{activity.engagement}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Earned Badges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(badgeConfig).map(([key, badge]) => (
                  <div key={key} className="flex items-center gap-3 p-2 rounded-lg border">
                    <div className={`w-10 h-10 ${badge.color} rounded-lg flex items-center justify-center text-white`}>
                      {badge.icon}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{badge.name}</div>
                      <div className="text-xs text-muted-foreground">Achievement unlocked</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  Goals & Milestones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Posts this month</span>
                    <span>12/20</span>
                  </div>
                  <div className="bg-muted rounded-full h-2">
                    <div className="bg-primary rounded-full h-2" style={{ width: '60%' }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Daily streak</span>
                    <span>7/30 days</span>
                  </div>
                  <div className="bg-muted rounded-full h-2">
                    <div className="bg-green-500 rounded-full h-2" style={{ width: '23%' }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Community engagement</span>
                    <span>156/200 likes</span>
                  </div>
                  <div className="bg-muted rounded-full h-2">
                    <div className="bg-purple-500 rounded-full h-2" style={{ width: '78%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Learning Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Skill Areas</h4>
                  {[
                    { skill: 'Grammar', level: 85 },
                    { skill: 'Vocabulary', level: 72 },
                    { skill: 'Listening', level: 68 },
                    { skill: 'Speaking', level: 45 }
                  ].map((item) => (
                    <div key={item.skill} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.skill}</span>
                        <span>{item.level}%</span>
                      </div>
                      <div className="bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary rounded-full h-2 transition-all"
                          style={{ width: `${item.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Monthly Activity</h4>
                  <div className="h-32 flex items-end justify-between gap-1">
                    {[20, 35, 25, 45, 30, 50, 40, 55, 35, 60, 45, 38].map((height, index) => (
                      <div key={index} className="flex-1 bg-primary/60 rounded-t-sm" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Display Name</label>
                  <Input 
                    value={editData.display_name}
                    onChange={(e) => setEditData(prev => ({ ...prev, display_name: e.target.value }))}
                    placeholder="Enter your display name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">English Level</label>
                  <select 
                    value={editData.english_level}
                    onChange={(e) => setEditData(prev => ({ ...prev, english_level: e.target.value }))}
                    className="w-full p-2 border rounded-md bg-background"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Elementary">Elementary</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Upper-Intermediate">Upper-Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Proficient">Proficient</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <Textarea
                  value={editData.bio}
                  onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about your English learning journey..."
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2">
                <Button>Save Changes</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}