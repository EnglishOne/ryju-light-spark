import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare,
  Search,
  Plus,
  Send,
  MoreVertical,
  Pin,
  Archive,
  Trash2
} from 'lucide-react';

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const conversations = [
    {
      id: '1',
      participant: 'Sofia Martinez',
      lastMessage: 'Thanks for the grammar tips! They were really helpful.',
      time: '2m ago',
      unread: 2,
      avatar: 'SM',
      online: true
    },
    {
      id: '2',
      participant: 'Lucas Chen',
      lastMessage: 'Are you joining the pronunciation practice session tomorrow?',
      time: '15m ago',
      unread: 0,
      avatar: 'LC',
      online: true
    },
    {
      id: '3',
      participant: 'Maria Santos',
      lastMessage: 'I found this great podcast for listening practice...',
      time: '2h ago',
      unread: 1,
      avatar: 'MS',
      online: false
    },
    {
      id: '4',
      participant: 'João Silva',
      lastMessage: 'Could you help me with this TOEFL question?',
      time: '1d ago',
      unread: 0,
      avatar: 'JS',
      online: false
    },
    {
      id: '5',
      participant: 'English Study Group',
      lastMessage: 'New weekly challenge posted!',
      time: '2d ago',
      unread: 5,
      avatar: 'ESG',
      online: false,
      isGroup: true
    }
  ];

  const messages = [
    {
      id: '1',
      sender: 'Sofia Martinez',
      content: 'Hi! I saw your post about modal verbs. Could you explain the difference between "should" and "ought to"?',
      time: '10:30 AM',
      isMe: false
    },
    {
      id: '2',
      sender: 'You',
      content: 'Sure! Both "should" and "ought to" express advice or recommendation, but "should" is more common in everyday conversation. "Ought to" is a bit more formal.',
      time: '10:35 AM',
      isMe: true
    },
    {
      id: '3',
      sender: 'You',
      content: 'For example: "You should study more" vs "You ought to study more" - same meaning, different formality levels.',
      time: '10:36 AM',
      isMe: true
    },
    {
      id: '4',
      sender: 'Sofia Martinez',
      content: 'That makes so much sense! I always wondered why some textbooks used "ought to" and others used "should".',
      time: '10:40 AM',
      isMe: false
    },
    {
      id: '5',
      sender: 'Sofia Martinez',
      content: 'Thanks for the grammar tips! They were really helpful.',
      time: '10:42 AM',
      isMe: false
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.participant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Conversations List */}
      <div className="w-80 flex flex-col">
        <Card className="flex-1 flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Messages</CardTitle>
              <Button size="sm" variant="outline" className="gap-1">
                <Plus className="w-4 h-4" />
                New
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search conversations..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          
          <ScrollArea className="flex-1">
            <div className="p-4 pt-0 space-y-2">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-3 rounded-lg cursor-pointer border transition-colors ${
                    selectedConversation === conversation.id 
                      ? 'bg-primary/10 border-primary/20' 
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                        {conversation.avatar}
                      </div>
                      {conversation.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm truncate">
                          {conversation.participant}
                        </span>
                        {conversation.isGroup && (
                          <Badge variant="secondary" className="text-xs">Group</Badge>
                        )}
                        <span className="text-xs text-muted-foreground ml-auto">
                          {conversation.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground truncate flex-1">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread > 0 && (
                          <Badge variant="destructive" className="text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConv ? (
          <Card className="flex-1 flex flex-col">
            {/* Chat Header */}
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {selectedConv.avatar}
                    </div>
                    {selectedConv.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedConv.participant}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedConv.online ? 'Online' : 'Last seen recently'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Pin className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Archive className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${message.isMe ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`p-3 rounded-lg ${
                          message.isMe
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className={`text-xs text-muted-foreground mt-1 ${
                        message.isMe ? 'text-right' : 'text-left'
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <CardContent className="pt-3">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="min-h-[40px] max-h-32 resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="self-end"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">
                Choose a conversation from the left to start messaging
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}