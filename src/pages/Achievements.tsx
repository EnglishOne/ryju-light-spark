import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Award, Star, Trophy, Target, Calendar, Users } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  badge_color: string;
  icon_url?: string;
  points_reward: number;
  requirements?: any;
  is_active: boolean;
}

interface UserAchievement {
  id: string;
  achievement_id: string;
  earned_at: string;
  achievements: Achievement;
}

export default function Achievements() {
  const { profile } = useUserProfile();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Uncomment when achievements tables are created
    // const fetchData = async () => {
    //   try {
    //     const { data: achievementsData } = await supabase
    //       .from('achievements')
    //       .select('*')
    //       .eq('is_active', true)
    //       .order('points_reward', { ascending: false });
    //
    //     let userAchievementsData = [];
    //     if (profile?.user_id) {
    //       const { data } = await supabase
    //         .from('user_achievements')
    //         .select(`*, achievements (*)`)
    //         .eq('user_id', profile.user_id);
    //       userAchievementsData = data || [];
    //     }
    //
    //     setAchievements(achievementsData || []);
    //     setUserAchievements(userAchievementsData);
    //   } catch (error) {
    //     console.error('Error fetching achievements:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchData();
    setLoading(false);
  }, [profile?.user_id]);

  const earnedAchievementIds = userAchievements.map(ua => ua.achievement_id);
  const earnedAchievements = userAchievements.map(ua => ua.achievements);
  const availableAchievements = achievements.filter(a => !earnedAchievementIds.includes(a.id));

  const getAchievementIcon = (achievement: Achievement) => {
    if (achievement.name.toLowerCase().includes('first')) return <Star className="h-6 w-6" />;
    if (achievement.name.toLowerCase().includes('master')) return <Trophy className="h-6 w-6" />;
    if (achievement.name.toLowerCase().includes('streak')) return <Calendar className="h-6 w-6" />;
    if (achievement.name.toLowerCase().includes('social')) return <Users className="h-6 w-6" />;
    return <Award className="h-6 w-6" />;
  };

  const calculateProgress = (achievement: Achievement) => {
    if (!achievement.requirements || !profile) return 0;
    
    const requirements = achievement.requirements;
    if (requirements.points && profile.points) {
      return Math.min((profile.points / requirements.points) * 100, 100);
    }
    
    return 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Trophy className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Achievements</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Track your learning progress and unlock achievements as you master English!
        </p>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{earnedAchievements.length}</div>
              <div className="text-sm text-muted-foreground">Earned</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{achievements.length}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {earnedAchievements.reduce((sum, a) => sum + a.points_reward, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Points Earned</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Earned Achievements */}
      {earnedAchievements.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Your Achievements</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {earnedAchievements.map((achievement) => {
              const userAchievement = userAchievements.find(ua => ua.achievement_id === achievement.id);
              return (
                <Card key={achievement.id} className="border-2 border-primary/20 bg-primary/5">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div 
                        className="p-3 rounded-full"
                        style={{ backgroundColor: `${achievement.badge_color}20` }}
                      >
                        <div style={{ color: achievement.badge_color }}>
                          {getAchievementIcon(achievement)}
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        +{achievement.points_reward} XP
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{achievement.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {achievement.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-xs text-muted-foreground">
                      Earned on {new Date(userAchievement?.earned_at || '').toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* Available Achievements */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Target className="h-6 w-6 text-muted-foreground" />
          <h2 className="text-2xl font-semibold text-foreground">Available Achievements</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableAchievements.map((achievement) => {
            const progress = calculateProgress(achievement);
            const isCompleted = progress >= 100;
            
            return (
              <Card key={achievement.id} className={`transition-all duration-200 ${isCompleted ? 'border-primary bg-primary/5' : 'hover:shadow-md'}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div 
                      className={`p-3 rounded-full ${isCompleted ? 'opacity-100' : 'opacity-60'}`}
                      style={{ backgroundColor: `${achievement.badge_color}20` }}
                    >
                      <div style={{ color: achievement.badge_color }}>
                        {getAchievementIcon(achievement)}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-muted-foreground">
                      +{achievement.points_reward} XP
                    </Badge>
                  </div>
                  <CardTitle className={`text-lg ${isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>
                    {achievement.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {achievement.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  {achievement.requirements && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <span className="text-xs font-medium">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      {isCompleted && (
                        <div className="text-xs text-primary font-medium">
                          Ready to claim!
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {achievements.length === 0 && (
        <div className="text-center py-12">
          <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">No Achievements Yet</h3>
          <p className="text-muted-foreground">
            Achievements will appear here as you progress in your English learning journey.
          </p>
        </div>
      )}
    </div>
  );
}