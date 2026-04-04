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

const STATIC_SLUG_TO_DESTINATION: Record<string, string> = {
  'istanbul-old-city-full-day-tour': 'Istanbul',
  'istanbul-old-city-morning-tour': 'Istanbul',
  'istanbul-old-city-afternoon-tour': 'Istanbul',
  'istanbul-two-continents-tour': 'Istanbul',
  'istanbul-byzantine-ottoman-tour': 'Istanbul',
  'istanbul-old-modern-full-day-tour': 'Istanbul',
  'istanbul-old-modern-half-day-tour': 'Istanbul',
  'princes-islands-tour': 'Istanbul',
  'bosphorous-dinner-cruise': 'Istanbul',
  'morning-bosphorus-tour-with-breakfast': 'Istanbul',
  'afternoon-bosphorus-tour-with-lunch': 'Istanbul',
  'sunset-bosphorus-tour': 'Istanbul',
  'night-bosphorus-tour-with-dinner': 'Istanbul',
  'istanbul-street-food-tour': 'Istanbul',
  'istanbul-paragliding-tour': 'Istanbul',
  'topkapi-palace-grand-bazaar': 'Istanbul',
  'dolmabahce-palace-and-2-continents': 'Istanbul',
  'sapanca-masukiye-tour': 'Istanbul',
  'sile-agva-tour-from-istanbul': 'Istanbul',
  'yalova-thermal-tour-from-istanbul': 'Istanbul',
  'green-bursa-tour-from-istanbul': 'Istanbul',
  'grand-istanbul-aquarium-tour': 'Istanbul',
  'hot-air-baloon-tour': 'Cappadocia',
  'green-tour-south-cappadocia-tour': 'Cappadocia',
  'red-tour-north-cappadocia-tour': 'Cappadocia',
  'private-konya-tour-from-cappadocia': 'Cappadocia',
  'classic-car-tour': 'Cappadocia',
  'camel-back-riding': 'Cappadocia',
  'professional-photographer-tour': 'Cappadocia',
  'horse-back-riding': 'Cappadocia',
  'private-salt-lake-tour': 'Cappadocia',
  'turkish-night-in-the-cave': 'Cappadocia',
  'cappadocia-dervish-ceremony': 'Cappadocia',
  'selfie-touring-at-sunrise': 'Cappadocia',
  'atv-quad-safari-tour': 'Cappadocia',
  'off-road-safari-tour': 'Cappadocia',
  'ephesus-tour': 'Ephesus',
  'ephesus-quad-safari-tour': 'Ephesus',
  'ephesus-sky-diving-tour': 'Ephesus',
  'izmir-city-tour': 'Ephesus',
  'pamukkale-tour': 'Pamukkale',
  'pamukkale-hot-air-balloon-tour': 'Pamukkale',
  'pamukkale-tour-from-antalya': 'Pamukkale',
  'antalya-city-tour': 'Antalya',
  'combo-activity-rafting-quad-zipline': 'Antalya',
  'antalya-paramotor-tour': 'Antalya',
  'alanya-paragliding-tour': 'Antalya',
  'sagalassos-tour-from-antalya': 'Antalya',
  'perge-aspendos-side-tour': 'Antalya',
  'suluada-island-boat-tour': 'Antalya',
  'antalya-green-canyon-tour': 'Antalya',
  'demre-myra-kekova-tour': 'Antalya',
  'termessos-duden-waterfall': 'Antalya',
  'trabzon-city-tour': 'Eastern Turkey',
  'uzungol-tour-from-trabzon': 'Eastern Turkey',
  'sumela-hamsikoy-tour': 'Eastern Turkey',
  'hidirnebi-plateau-cal-cave-sera-lake': 'Eastern Turkey',
  'bork-a-karag-l-tour': 'Eastern Turkey',
  'kayabasi-hackali-baba-plateau-cal-cave': 'Eastern Turkey',
  'ayder-plateau-tour': 'Eastern Turkey',
  'firtina-valley-huser-plateau-tour': 'Eastern Turkey',
  'blue-lake-kumbet-plateau': 'Eastern Turkey',
  'gito-plateau-tour': 'Eastern Turkey',
  'pokut-plateau-waterfall-tour': 'Eastern Turkey',
};

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function getReviewsForTour(slug: string, destination: string): Promise<Review[]> {
  const staticPool = STATIC_REVIEWS_MAP[slug] ?? [];
  return shuffleArray(staticPool)
    .slice(0, 3)
    .map((r, i) => ({
      id: `static-${slug}-${i}`,
      tour_slug: slug,
      destination: destination,
      author: r.author,
      rating: r.rating,
      comment: r.comment,
      created_at: new Date().toISOString(),
      approved: true,
    }));
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

  const dbReviews: Review[] = allReviews ?? [];

  // Build static reviews as Review objects grouped by destination
  const staticByDestination: Record<string, Review[]> = {};
  for (const [slug, snippets] of Object.entries(STATIC_REVIEWS_MAP)) {
    const dest = STATIC_SLUG_TO_DESTINATION[slug];
    if (!dest) continue;
    if (!staticByDestination[dest]) staticByDestination[dest] = [];
    snippets.forEach((s, i) => {
      staticByDestination[dest].push({
        id: `static-${slug}-${i}`,
        tour_slug: slug,
        destination: dest,
        author: s.author,
        rating: s.rating,
        comment: s.comment,
        created_at: new Date(0).toISOString(),
        approved: true,
      });
    });
  }

  return DESTINATIONS.map((destination) => {
    const dbDest = dbReviews.filter((r) => r.destination === destination);
    // Use DB reviews if available, otherwise fall back to static pool
    const destReviews = dbDest.length > 0 ? dbDest : (staticByDestination[destination] ?? []);
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
