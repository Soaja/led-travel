import { supabase } from '@/lib/supabase';

export type DbReview = {
  id: string;
  name: string;
  tour: string;
  text: string;
  stars: number;
  created_at: string;
};

export async function getReviewsForTour(slug: string): Promise<DbReview[]> {
  // 1. Fetch up to 3 reviews for this tour
  const { data: tourReviews } = await supabase
    .from('reviews')
    .select('id, name, tour, text, stars, created_at')
    .eq('tour', slug)
    .order('created_at', { ascending: false })
    .limit(3);

  const reviews: DbReview[] = tourReviews ?? [];

  // 2. Fill remaining spots with reviews from other tours
  if (reviews.length < 3) {
    const { data: others } = await supabase
      .from('reviews')
      .select('id, name, tour, text, stars, created_at')
      .neq('tour', slug)
      .order('created_at', { ascending: false })
      .limit(3 - reviews.length);

    if (others) reviews.push(...others);
  }

  // 3. Final fallback: use static reviews if Supabase returned nothing
  if (reviews.length < 3) {
    const needed = 3 - reviews.length;
    STATIC_REVIEWS.slice(0, needed).forEach(r =>
      reviews.push({ id: String(r.id), name: r.name, tour: r.tour, text: r.text, stars: r.stars, created_at: '' })
    );
  }

  return reviews.slice(0, 3);
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
