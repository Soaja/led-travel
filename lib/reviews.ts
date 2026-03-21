import { supabase } from '@/lib/supabase';

export type DbReview = {
  id: string;
  name: string;
  tour: string;
  text: string;
  stars: number;
  created_at: string;
};

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export async function getReviewsForTour(slug: string): Promise<DbReview[]> {
  // 1. Fetch up to 20 reviews for this tour, shuffle, take 3
  const { data: tourReviews } = await supabase
    .from('reviews')
    .select('id, name, tour, text, stars, created_at')
    .eq('tour', slug)
    .limit(20);

  const picked = shuffleArray<DbReview>(tourReviews ?? []).slice(0, 3);

  // 2. Fill remaining spots with shuffled reviews from other tours
  if (picked.length < 3) {
    const pickedIds = new Set(picked.map(r => r.id));
    const { data: others } = await supabase
      .from('reviews')
      .select('id, name, tour, text, stars, created_at')
      .neq('tour', slug)
      .limit(20);

    const shuffledOthers = shuffleArray<DbReview>(others ?? [])
      .filter(r => !pickedIds.has(r.id))
      .slice(0, 3 - picked.length);

    picked.push(...shuffledOthers);
  }

  // 3. Final fallback: static reviews if Supabase returned nothing
  if (picked.length < 3) {
    const needed = 3 - picked.length;
    STATIC_REVIEWS.slice(0, needed).forEach(r =>
      picked.push({ id: String(r.id), name: r.name, tour: r.tour, text: r.text, stars: r.stars, created_at: '' })
    );
  }

  return picked;
}

export const STATIC_REVIEWS = [
  {
    id: 1,
    name: "Marco Ricci",
    flag: "🇮🇹",
    city: "Milano",
    tour: "Istanbul Classics Full Day",
    text: "Il miglior tour che abbia mai fatto! La guida parlava perfettamente italiano e conosceva ogni angolo di Istanbul. Un'esperienza autentica e indimenticabile.",
    avatar: "https://picsum.photos/seed/marco/100/100",
    stars: 5,
  },
  {
    id: 2,
    name: "Sofia Ferretti",
    flag: "🇮🇹",
    city: "Roma",
    tour: "Cappadocia Hot Air Balloon",
    text: "La mongolfiera all'alba è stata magica. LED Travel ha organizzato tutto perfettamente, dall'hotel al trasferimento. Prenoto già il prossimo viaggio!",
    avatar: "https://picsum.photos/seed/sofia/100/100",
    stars: 5,
  },
  {
    id: 3,
    name: "James Thompson",
    flag: "🇬🇧",
    city: "London",
    tour: "Bosphorus Sunset Cruise",
    text: "Professional, punctual, and passionate guides. This is exactly how Turkey should be experienced — intimate, authentic, and absolutely stunning.",
    avatar: "https://picsum.photos/seed/james/100/100",
    stars: 5,
  },
];
