import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell,
  MessageSquare,
  Users,
  Trophy,
  Calendar,
  Settings,
  Check,
  Trash2,
  MoreVertical
} from 'lucide-react';

export default function Notifications() {
  const [selectedTab, setSelectedTab] = useState('all');

  const notifications = [
    {
      id: '1',
      type: 'message',
      title: 'New message from Sofia Martinez',
      description: 'Thanks for the grammar tips! They were really helpful.',
      time: '2 minutes ago',
      isRead: false,
      actionUrl: '/messages'
    },
    {
      id: '2',
      type: 'group',
      title: 'You were added to "Advanced Grammar Study"',
      description: 'Maria Santos added you to the group',
      time: '1 hour ago',
      isRead: false,
      actionUrl: '/groups'
    },
    {
      id: '3',
      type: 'achievement',
      title: 'New badge earned!',
      description: 'You unlocked the "Week Streak" badge',
      time: '3 hours ago',
      isRead: true,
      actionUrl: '/profile'
    },
    {
      id: '4',
      type: 'event',
      title: 'Upcoming: Pronunciation Practice Session',
      description: 'Starting at 7:00 PM today in Speaking Practice group',
      time: '5 hours ago',
      isRead: false,
      actionUrl: '/groups'
    },
    {
      id: '5',
      type: 'forum',
      title: 'Your post received 15 new likes',
      description: '"Tips for TOEFL Reading Section" in Test Preparation forum',
      time: '1 day ago',
      isRead: true,
      actionUrl: '/forums'
    },
    {
      id: '6',
      type: 'system',
      title: 'Weekly progress summary',
      description: 'You completed 5 posts and earned 150 XP this week',
      time: '2 days ago',
      isRead: true,
      actionUrl: '/profile'
    },
    {
      id: '7',
      type: 'message',
      title: 'New reply to your post',
      description: 'Lucas Chen replied to "Best apps for vocabulary building"',
      time: '3 days ago',
      isRead: true,
      actionUrl: '/forums'
    },
    {
      id: '8',
      type: 'group',
      title: 'Group activity reminder',
      description: 'TOEFL Warriors group has a new challenge available',
      time: '4 days ago',
      isRead: true,
      actionUrl: '/groups'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return MessageSquare;
      case 'group':
        return Users;
      case 'achievement':
        return Trophy;
      case 'event':
        return Calendar;
      case 'forum':
        return MessageSquare;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'message':
        return 'text-blue-500';
      case 'group':
        return 'text-green-500';
      case 'achievement':
        return 'text-yellow-500';
      case 'event':
        return 'text-purple-500';
      case 'forum':
        return 'text-orange-500';
      default:
        return 'text-gray-500';
    }
  };

  const filterNotifications = (filter: string) => {
    if (filter === 'all') return notifications;
    if (filter === 'unread') return notifications.filter(n => !n.isRead);
    return notifications.filter(n => n.type === filter);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    // Here you would typically update the notification status in your backend
    console.log('Marking notification as read:', id);
  };

  const markAllAsRead = () => {
    // Here you would typically mark all notifications as read in your backend
    console.log('Marking all notifications as read');
  };

  const deleteNotification = (id: string) => {
    // Here you would typically delete the notification from your backend
    console.log('Deleting notification:', id);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            Stay updated with your community activities
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="w-4 h-4 mr-2" />
            Mark all read
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{unreadCount}</div>
            <div className="text-sm text-muted-foreground">Unread</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">
              {notifications.filter(n => n.type === 'message').length}
            </div>
            <div className="text-sm text-muted-foreground">Messages</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">
              {notifications.filter(n => n.type === 'group').length}
            </div>
            <div className="text-sm text-muted-foreground">Group Activity</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-500">
              {notifications.filter(n => n.type === 'achievement').length}
            </div>
            <div className="text-sm text-muted-foreground">Achievements</div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread {unreadCount > 0 && <Badge className="ml-1 h-5 w-5 text-xs">{unreadCount}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="message">Messages</TabsTrigger>
          <TabsTrigger value="group">Groups</TabsTrigger>
          <TabsTrigger value="achievement">Achievements</TabsTrigger>
          <TabsTrigger value="event">Events</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4 mt-6">
          {filterNotifications(selectedTab).length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No notifications</h3>
                <p className="text-muted-foreground">
                  {selectedTab === 'unread' 
                    ? "You're all caught up! No unread notifications."
                    : `No ${selectedTab === 'all' ? '' : selectedTab} notifications to show.`
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {filterNotifications(selectedTab).map((notification) => {
                const IconComponent = getNotificationIcon(notification.type);
                const iconColor = getNotificationColor(notification.type);
                
                return (
                  <Card 
                    key={notification.id} 
                    className={`hover:shadow-md transition-shadow ${
                      !notification.isRead ? 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800' : ''
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-background border flex-shrink-0`}>
                          <IconComponent className={`w-5 h-5 ${iconColor}`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 mb-1">
                            <h3 className="font-medium text-sm">{notification.title}</h3>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.description}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{notification.time}</span>
                            <Badge variant="outline" className="text-xs capitalize">
                              {notification.type}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {!notification.isRead && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-3 ml-11">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}