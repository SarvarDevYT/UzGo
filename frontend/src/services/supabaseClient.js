import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== 'undefined') {
    console.warn('Supabase URL or Anon Key missing in environment variables (.env.local)');
  }
}

export const supabase = createClient(
  supabaseUrl || 'https://evgrojacrbkgpnvvhmwl.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2Z3JvamFjcmJrZ3BudnZobXdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNDQ4MjUsImV4cCI6MjA1NjgyMDgyNX0'
);
