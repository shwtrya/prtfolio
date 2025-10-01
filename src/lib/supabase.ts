import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface VisitorStat {
  id: string;
  stat_type: 'visitors' | 'views';
  count: number;
  updated_at: string;
}

export interface VisitorSession {
  id: string;
  session_id: string;
  first_visit: string;
  last_visit: string;
  page_views: number;
}
