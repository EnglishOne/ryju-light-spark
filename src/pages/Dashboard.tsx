import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Users, 
  Heart,
  MessageCircle,
  BarChart3,
  Target,
  Bell
} from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { usePopularTopics } from '@/hooks/useForums';

export default function Dashboard() {
  console.log('Dashboard component loaded');
  const { profile } = useUserProfile(); 
  const { topics: popularTopics } = usePopularTopics();
  
  const [stats] = useState({
    postsToday: 127,
    commentsToday: 89,
    repliesWeek: 15,
    likesWeek: 7,
    weeklyProgress: 100
  });

  // Use real data from popularTopics, fallback to mock data if no real data
  const displayedPosts = popularTopics && popularTopics.length > 0 ? popularTopics.map((topic) => ({
    id: topic.id,
    title: topic.title,
    author: "Por Usuário",
    category: "Community",
    likes: Math.floor(Math.random() * 30) + 10, // Mock likes for now
    comments: topic.replies_count || 0,
    tag: "Discussão"
  })) : [
    {
      id: 1,
      title: "Como melhorar o listening em inglês?",
      author: "Por Martin",
      category: "Listening", 
      likes: 24,
      comments: 6,
      tag: "Dicas"
    },
    {
      id: 2,
      title: "Phrasal Verbs essenciais para o dia a dia",
      author: "Por Marina",
      category: "Grammar",
      likes: 18,
      comments: 9,
      tag: "Aprendizado"
    },
    {
      id: 3,
      title: "Dicas para entrevistas em inglês",
      author: "Por Maria", 
      category: "Business",
      likes: 32,
      comments: 12,
      tag: "Profissional"
    },
    {
      id: 4,
      title: "Expressões idiomáticas mais usadas",
      author: "Por Roberto José",
      category: "Vocabulary",
      likes: 27,
      comments: 8,
      tag: "Vocabulário"
    }
  ];

  const [recentActivities] = useState([
    {
      id: 1,
      user: "Sofia Martinez",
      action: "completou o desafio",
      detail: "30 Day Vocabulary",
      time: "há 15 minutos",
      type: "challenge"
    },
    {
      id: 2,
      user: "Lucas Chen",
      action: "criou um novo post",
      detail: "Dicas de Pronúncia",
      time: "há 32 minutos",
      type: "post"
    },
    {
      id: 3,
      user: "Maria Santos",
      action: "entrou no grupo",
      detail: "Advanced Grammar",
      time: "há 1 hora",
      type: "group"
    },
    {
      id: 4,
      user: "João Silva",
      action: "alcançou nível",
      detail: "Intermediate",
      time: "há 2 horas",
      type: "achievement"
    }
  ]);

  const [suggestedGroups] = useState([
    {
      id: 1,
      name: "Pronunciation Practice",
      members: "12 membros",
      category: "Pronúncia",
      status: "Ativo"
    },
    {
      id: 2,
      name: "TOEFL Preparation",
      members: "28 membros",
      category: "Exames",
      status: "Seletivo"
    },
    {
      id: 3,
      name: "English Movies Club",
      members: "45 membros",
      category: "Entretenimento",
      status: "Seletivo"
    }
  ]);

  const [monthlyRanking] = useState([
    { position: 1, name: "Sophie Martinez", points: "2,847 XP", medal: "🥇" },
    { position: 2, name: "Lucas Thompson", points: "2,756 XP", medal: "🥈" },
    { position: 3, name: "Isabella Chen", points: "2,623 XP", medal: "🥉" },
    { position: 15, name: profile?.display_name || "Você", points: `${profile?.points || 0} XP`, medal: "", highlight: true }
  ]);

  return (
    <div className="flex gap-6 min-h-full">
      {/* Left Sidebar */}
      <div className="w-80 space-y-6">
        {/* Personal Summary Card */}
        <Card className="bg-gradient-to-br from-sky-400 to-sky-500 text-white border-0">
          <CardHeader>
            <CardTitle className="text-lg text-white">Resumo Pessoal</CardTitle>
            <div className="text-xs text-sky-100">Última atualização: Hoje</div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold">{stats.postsToday}</div>
                <div className="text-xs text-sky-100">posts hoje</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{stats.commentsToday}</div>
                <div className="text-xs text-sky-100">comentários</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.repliesWeek}</div>
                <div className="text-xs text-sky-100">respostas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.likesWeek}</div>
                <div className="text-xs text-sky-100">curtidas</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso Semanal</span>
                <span>{stats.weeklyProgress}%</span>
              </div>
              <div className="bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all"
                  style={{ width: `${stats.weeklyProgress}%` }}
                />
              </div>
            </div>

            <Button variant="secondary" className="w-full mt-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              <BarChart3 className="w-4 h-4 mr-2" />
              Ver Estatísticas Completas
            </Button>
          </CardContent>
        </Card>

        {/* Important Notifications */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" />
              Notificações Importantes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-medium text-sm">Novo desafio disponível</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Complete 10 posts hoje e ganhe 50 XP extra
              </p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
              <h4 className="font-medium text-sm">Meta diária cumprida</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Você já fez 127 posts hoje. Continue assim!
              </p>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-medium text-sm">Evento ao vivo</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Aula de conversação às 19h hoje
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 space-y-6">
        {/* Dashboard Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Dashboard de Atividades</h1>
        </div>

        {/* Activity Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Weekly Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Atividade Semanal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 flex items-end justify-between gap-2">
                {[40, 65, 45, 80, 55, 70, 85].map((height, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-primary/60 rounded-t-sm transition-all hover:bg-primary"
                      style={{ height: `${height}%` }}
                    />
                    <div className="text-xs text-muted-foreground mt-2">
                      {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][index]}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  <span>Listening</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-secondary rounded-full" />
                  <span>Grammar</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent rounded-full" />
                  <span>Vocabulary</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress by Category */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Progresso por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-32">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full border-8 border-primary/20" />
                  <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-primary border-r-primary transform rotate-45" />
                  <div className="absolute inset-2 rounded-full border-4 border-secondary/60 border-t-transparent transform -rotate-90" />
                  <div className="absolute inset-4 flex items-center justify-center">
                    <span className="text-lg font-bold">75%</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  <span>Listening</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-secondary rounded-full" />
                  <span>Grammar</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent rounded-full" />
                  <span>Vocabulary</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Posts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Posts Mais Populares da Semana</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              Ver todos
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {popularTopics && popularTopics.length > 0 ? popularTopics.map((topic) => (
                <div key={topic.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm leading-tight">{topic.title}</h4>
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Discussion
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    Tópico • {new Date(topic.created_at).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      <span>{Math.floor(Math.random() * 30) + 5}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{topic.replies_count || 0}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-auto h-6 px-2 text-xs">
                      Ver mais
                    </Button>
                  </div>
                </div>
              )) : displayedPosts.map((post) => (
                <div key={post.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm leading-tight">{post.title}</h4>
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {post.tag}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {post.author} • {post.category}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{post.comments}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-auto h-6 px-2 text-xs">
                      Aprendizado
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Community Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5" />
              Atividades Recentes da Comunidade
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm">
                    <span className="font-medium">{activity.user}</span>
                    <span className="text-muted-foreground"> {activity.action} </span>
                    <span className="font-medium">"{activity.detail}"</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                  Compartilhar
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Community Participation CTA */}
        <Card className="bg-gradient-to-r from-sky-400 to-sky-500 border-0 text-white">
          <CardContent className="text-center py-8">
            <h3 className="text-xl font-bold mb-2">Participe da comunidade!</h3>
            <p className="text-sky-100 mb-4">Compartilhe seu progresso e inspire outros estudantes 📚</p>
            <Button variant="secondary" className="bg-white text-sky-600 hover:bg-sky-50">
              Criar Nova Atividade
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 space-y-6">
        {/* Suggested Groups */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-4 h-4" />
              Grupos Sugeridos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {suggestedGroups.map((group) => (
              <div key={group.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm">{group.name}</h4>
                  <p className="text-xs text-muted-foreground">{group.members}</p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {group.category}
                  </Badge>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  {group.status}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Monthly Ranking */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ranking Mensal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {monthlyRanking.map((user) => (
              <div 
                key={user.position} 
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  user.highlight ? 'bg-primary/10 border border-primary/20' : ''
                }`}
              >
                <div className="flex items-center justify-center w-8 h-8 text-sm font-bold">
                  {user.medal || user.position}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.points}</div>
                </div>
                {user.highlight && (
                  <Badge variant="secondary" className="text-xs">
                    Você
                  </Badge>
                )}
              </div>
            ))}
            
            <div className="mt-4 p-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
              <p className="text-sm font-medium text-center">Continue participando para subir no ranking! 📈</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}