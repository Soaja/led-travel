import { supabase } from '@/lib/supabase';
import { STATIC_REVIEWS_MAP } from '@/lib/staticReviews';

export type Review = {
  id: string;
  tour_slug: string;
  destination: string;
  author: string;
  rating: number;
  comment: string;
  created_at: string;
  approved: boolean;
};

const DESTINATIONS = [
  'Istanbul',
  'Cappadocia',
  'Ephesus',
  'Pamukkale',
  'Antalya',
  'Eastern Turkey',
] as const;

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function getReviewsForTour(slug: string, destination: string): Promise<Review[]> {
  const { data: tourReviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('tour_slug', slug)
    .eq('approved', true);

  const picked = shuffleArray<Review>(tourReviews ?? []).slice(0, 3);

  if (picked.length < 3 && destination) {
    const pickedIds = new Set(picked.map((r) => r.id));
    const { data: destReviews } = await supabase
      .from('reviews')
      .select('*')
      .eq('destination', destination)
      .eq('approved', true)
      .neq('tour_slug', slug);

    const shuffledDest = shuffleArray<Review>(destReviews ?? [])
      .filter((r) => !pickedIds.has(r.id))
      .slice(0, 3 - picked.length);

    picked.push(...shuffledDest);
  }

  return picked;
}

export async function getReviewsByDestination(destination: string): Promise<Review[]> {
  const { data } = await supabase
    .from('reviews')
    .select('*')
    .eq('destination', destination)
    .eq('approved', true)
    .order('created_at', { ascending: false });

  return data ?? [];
}

export async function getDestinationSummaries(): Promise<
  {
    destination: string;
    count: number;
    avgRating: number;
    latestComment: string;
    latestAuthor: string;
  }[]
> {
  const { data: allReviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('approved', true)
    .order('created_at', { ascending: false });

  const reviews: Review[] = allReviews ?? [];

  return DESTINATIONS.map((destination) => {
    const destReviews = reviews.filter((r) => r.destination === destination);
    const count = destReviews.length;
    const avgRating =
      count > 0 ? destReviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;
    const latest = destReviews[0] ?? null;

    return {
      destination,
      count,
      avgRating,
      latestComment: latest?.comment ?? '',
      latestAuthor: latest?.author ?? '',
    };
  });
}

export async function addReview(data: {
  tour_slug: string;
  destination: string;
  author: string;
  rating: number;
  comment: string;
}): Promise<void> {
  await supabase.from('reviews').insert([{ ...data, approved: true }]);
}

export async function getAllReviewsMap(): Promise<
  Record<string, { author: string; comment: string; rating: number }>
> {
  const { data } = await supabase
    .from('reviews')
    .select('tour_slug, author, comment, rating')
    .eq('approved', true);

  // Group DB reviews by tour slug
  const dbReviews = data ?? [];
  const grouped: Record<string, { author: string; comment: string; rating: number }[]> = {};
  for (const r of dbReviews) {
    if (!grouped[r.tour_slug]) grouped[r.tour_slug] = [];
    grouped[r.tour_slug].push({ author: r.author, comment: r.comment, rating: r.rating });
  }

  // Build final map: prefer DB reviews, fall back to static pool
  const map: Record<string, { author: string; comment: string; rating: number }> = {};

  // Cover all slugs present in either DB or static map
  const allSlugs = new Set([
    ...Object.keys(grouped),
    ...Object.keys(STATIC_REVIEWS_MAP),
  ]);

  for (const slug of allSlugs) {
    const pool = grouped[slug]?.length
      ? grouped[slug]
      : STATIC_REVIEWS_MAP[slug] ?? [];

    if (pool.length === 0) continue;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    map[slug] = pick;
  }

  return map;
}
