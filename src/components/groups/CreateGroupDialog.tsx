import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, BookOpen, Star, MessageCircle, Crown, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(3, 'Group name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  theme: z.string().min(1, 'Please select a theme'),
  category: z.string().min(1, 'Please select a category'),
  isPrivate: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

interface CreateGroupDialogProps {
  onGroupCreated?: (group: any) => void;
}

const groupThemes = [
  { value: 'grammar', label: 'Grammar', icon: BookOpen, color: 'bg-blue-500' },
  { value: 'test-prep', label: 'Test Preparation', icon: Star, color: 'bg-red-500' },
  { value: 'pronunciation', label: 'Pronunciation', icon: MessageCircle, color: 'bg-green-500' },
  { value: 'business', label: 'Business English', icon: Crown, color: 'bg-purple-500' },
  { value: 'entertainment', label: 'Entertainment', icon: Users, color: 'bg-pink-500' },
  { value: 'beginner', label: 'Beginner Support', icon: Users, color: 'bg-yellow-500' },
];

const categories = [
  'Speaking',
  'Writing', 
  'Reading',
  'Listening',
  'Grammar',
  'Vocabulary',
  'Business',
  'Academic',
  'Test Preparation',
  'Entertainment',
  'Support',
  'General'
];

export function CreateGroupDialog({ onGroupCreated }: CreateGroupDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      theme: '',
      category: '',
      isPrivate: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulated group creation - in real app, this would call Supabase
      const newGroup = {
        id: Date.now().toString(),
        ...data,
        members: 1,
        role: 'Admin',
        lastActivity: 'just now',
        unreadMessages: 0,
        rating: 5.0,
        weeklyActivity: 'High'
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      onGroupCreated?.(newGroup);
      
      toast({
        title: 'Group created successfully!',
        description: `${data.name} has been created and you are now the admin.`,
      });

      form.reset();
      setOpen(false);
    } catch (error) {
      toast({
        title: 'Error creating group',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedTheme = groupThemes.find(theme => theme.value === form.watch('theme'));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Study Group</DialogTitle>
          <DialogDescription>
            Create a focused study group where members can learn together and support each other.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Advanced Grammar Circle" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe what your group focuses on and what members can expect..."
                      className="resize-none"
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Theme</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {groupThemes.map((theme) => {
                          const IconComponent = theme.icon;
                          return (
                            <SelectItem key={theme.value} value={theme.value}>
                              <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 ${theme.color} rounded flex items-center justify-center`}>
                                  <IconComponent className="w-2.5 h-2.5 text-white" />
                                </div>
                                {theme.label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isPrivate"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Private Group</FormLabel>
                    <FormDescription>
                      Private groups require approval to join
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {selectedTheme && (
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-6 h-6 ${selectedTheme.color} rounded flex items-center justify-center`}>
                    <selectedTheme.icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="font-medium">Preview</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your group will use the {selectedTheme.label.toLowerCase()} theme with this icon and color.
                </p>
              </div>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Group'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}