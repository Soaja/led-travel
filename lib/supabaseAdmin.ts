import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith('http')
  ? process.env.NEXT_PUBLIC_SUPABASE_URL
  : 'https://nyilqjqhosvkjhrvzrez.supabase.co';

const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55aWxxanFob3N2a2pocnZ6cmV6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzMzMDEzNywiZXhwIjoyMDg4OTA2MTM3fQ.nVmRKyJfSY0u0tvrtoWWx3yCpOLNIuhiqyLDyJBNW7E';

// Server-side only — bypasses RLS. Never import this in client components.
export const supabaseAdmin = createClient(supabaseUrl, serviceKey);
