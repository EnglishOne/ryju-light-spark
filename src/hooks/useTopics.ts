import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type Topic = Tables<'topics'>;
type Profile = Tables<'profiles'>;

type TopicWithAuthor = Topic & {
  author_name?: string;
  author_username?: string;
};

export function useTopics() {
  const [topics, setTopics] = useState<TopicWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        // First get topics
        const { data: topicsData, error: topicsError } = await supabase
          .from('topics')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);

        if (topicsError) {
          console.error('Error fetching topics:', topicsError);
          setTopics([]);
          return;
        }

        // Then get profile data for each topic author
        const topicsWithAuthors = await Promise.all(
          (topicsData || []).map(async (topic) => {
            const { data: profile } = await supabase
              .from('profiles')
              .select('display_name, username')
              .eq('user_id', topic.user_id)
              .single();

            return {
              ...topic,
              author_name: profile?.display_name || 'Anonymous',
              author_username: profile?.username || 'user'
            };
          })
        );

        setTopics(topicsWithAuthors);
      } catch (error) {
        console.error('Error in fetchTopics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  return { topics, loading };
}