import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type Forum = Tables<'forums'>;
export type Topic = Tables<'topics'> & {
  profiles?: Tables<'profiles'>;
};

export function useForums() {
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const { data, error } = await supabase
          .from('forums')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;
        setForums(data || []);
      } catch (error: any) {
        setError(error.message);
        console.error('Error fetching forums:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForums();
  }, []);

  return { forums, loading, error };
}

export function usePopularTopics() {
  const [topics, setTopics] = useState<Tables<'topics'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularTopics = async () => {
      try {
        const { data, error } = await supabase
          .from('topics')
          .select('*')
          .order('replies_count', { ascending: false })
          .limit(4);

        if (error) throw error;
        setTopics(data || []);
      } catch (error: any) {
        setError(error.message);
        console.error('Error fetching popular topics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularTopics();
  }, []);

  return { topics, loading, error };
}