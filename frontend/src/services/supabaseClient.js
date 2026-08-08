import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://evgrojacrbkgpnvvhmwl.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2Z3JvamFjcmJrZ3BudnZobXdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNDQ4MjUsImV4cCI6MjA1NjgyMDgyNX0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
