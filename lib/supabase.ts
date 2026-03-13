import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith('http') 
  ? process.env.NEXT_PUBLIC_SUPABASE_URL 
  : 'https://nyilqjqhosvkjhrvzrez.supabase.co';

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.startsWith('eyJ')
  ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55aWxxanFob3N2a2pocnZ6cmV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMzAxMzcsImV4cCI6MjA4ODkwNjEzN30.IJy-ZbCcCmjqnJWreKdYHYYU4ywoNv75yt7zPsijYI4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
