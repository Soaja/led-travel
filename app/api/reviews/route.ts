import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith('http')
  ? process.env.NEXT_PUBLIC_SUPABASE_URL
  : 'https://nyilqjqhosvkjhrvzrez.supabase.co';

// Service role key bypasses RLS — keep this server-side only (no NEXT_PUBLIC_ prefix)
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.startsWith('eyJ')
  ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55aWxxanFob3N2a2pocnZ6cmV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMzAxMzcsImV4cCI6MjA4ODkwNjEzN30.IJy-ZbCcCmjqnJWreKdYHYYU4ywoNv75yt7zPsijYI4';

const supabaseAdmin = createClient(supabaseUrl, serviceKey ?? anonKey);

const SLUG_TO_LABEL: Record<string, string> = {
  istanbul: 'Istanbul',
  cappadocia: 'Cappadocia',
  ephesus: 'Ephesus',
  pamukkale: 'Pamukkale',
  antalya: 'Antalya',
  'eastern-turkey': 'Eastern Turkey',
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, location, text, rating } = body;

    if (!name || !location || !text || !rating) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const destination = SLUG_TO_LABEL[location];
    if (!destination) {
      return NextResponse.json({ error: 'Invalid destination.' }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from('reviews').insert([{
      tour_slug: location,
      destination,
      author: name,
      rating: Number(rating),
      comment: text,
      approved: true,
    }]);

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, destination: location });
  } catch (err) {
    console.error('Review submission error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
