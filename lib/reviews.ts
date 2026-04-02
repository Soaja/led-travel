import { supabase } from '@/lib/supabase';
import { unstable_noStore as noStore, unstable_cache } from 'next/cache';

export type DbReview = {
  id: string;
  name: string;
  tour: string;
  text: string;
  stars: number;
  created_at: string;
};

export const REGION_KEYWORDS: Record<string, string[]> = {
  istanbul: ['istanbul'],
  cappadocia: ['cappadocia', 'balloon', 'cave', 'classic-car', 'dervish', 'quad', 'photographer', 'salt-lake', 'konya'],
  ephesus: ['ephesus'],
  pamukkale: ['pamukkale'],
  antalya: ['antalya', 'alanya', 'perge', 'aspendos', 'termessos', 'sagalassos', 'suluada', 'canyon', 'demre'],
  'eastern-turkey': ['trabzon', 'sumela', 'ayder', 'pokut', 'borkca', 'firtina', 'blue-lake', 'hidirnebi', 'kayabasi', 'uzungol'],
};

export const REGIONS = [
  { name: 'Istanbul', slug: 'istanbul', image: '/images/1.webp' },
  { name: 'Cappadocia', slug: 'cappadocia', image: '/images/2.avif' },
  { name: 'Ephesus', slug: 'ephesus', image: '/images/4.jpg' },
  { name: 'Pamukkale', slug: 'pamukkale', image: '/images/3.jpg' },
  { name: 'Antalya', slug: 'antalya', image: '/images/6.webp' },
  { name: 'Eastern Turkey', slug: 'eastern-turkey', image: '/images/8.jpeg' },
];

function slugMatchesRegion(tourSlug: string, regionSlug: string): boolean {
  const keywords = REGION_KEYWORDS[regionSlug] ?? [];
  const lower = tourSlug.toLowerCase();
  return keywords.some(k => lower.includes(k));
}

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const getReviewsByRegion = unstable_cache(
  async (region: string): Promise<DbReview[]> => {
    const keywords = REGION_KEYWORDS[region.toLowerCase()] ?? [];
    if (keywords.length === 0) return [];

    const orFilter = keywords.map(k => `tour.ilike.%${k}%`).join(',');

    const { data } = await supabase
      .from('reviews')
      .select('id, name, tour, text, stars, created_at')
      .or(orFilter)
      .order('created_at', { ascending: false });

    return data ?? [];
  },
  ['reviews-by-region'],
  { revalidate: 300, tags: ['reviews'] }
);

export const getRegionSummaries = unstable_cache(
  async () => {
    const { data: allReviews } = await supabase
      .from('reviews')
      .select('id, name, tour, text, stars, created_at')
      .order('created_at', { ascending: false });

    const reviews: DbReview[] = allReviews ?? [];

    return REGIONS.map(region => {
      const regionReviews = reviews.filter(r =>
        slugMatchesRegion(r.tour, region.slug)
      );

      const count = regionReviews.length;
      const avgRating =
        count > 0
          ? regionReviews.reduce((sum, r) => sum + r.stars, 0) / count
          : 0;
      const latestReview = regionReviews[0] ?? null;

      return { region: region.name, slug: region.slug, image: region.image, count, avgRating, latestReview };
    });
  },
  ['region-summaries'],
  { revalidate: 300, tags: ['reviews'] }
);

export async function getReviewsForTour(slug: string): Promise<DbReview[]> {
  noStore();

  const regionSlug = Object.keys(REGION_KEYWORDS).find(r =>
    slugMatchesRegion(slug, r)
  );

  // 1. Fetch up to 20 reviews for this specific tour, shuffle, take 3
  const { data: tourReviews } = await supabase
    .from('reviews')
    .select('id, name, tour, text, stars, created_at')
    .eq('tour', slug)
    .limit(20);

  const picked = shuffleArray<DbReview>(tourReviews ?? []).slice(0, 3);

  // 2. Fill remaining spots with reviews from the same region
  if (picked.length < 3 && regionSlug) {
    const keywords = REGION_KEYWORDS[regionSlug];
    const orFilter = keywords.map(k => `tour.ilike.%${k}%`).join(',');
    const pickedIds = new Set(picked.map(r => r.id));

    const { data: regionReviews } = await supabase
      .from('reviews')
      .select('id, name, tour, text, stars, created_at')
      .or(orFilter)
      .neq('tour', slug)
      .limit(20);

    const shuffledRegion = shuffleArray<DbReview>(regionReviews ?? [])
      .filter(r => !pickedIds.has(r.id))
      .slice(0, 3 - picked.length);

    picked.push(...shuffledRegion);
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
  {
    id: 4,
    name: "Elena Rossi",
    flag: "🇮🇹",
    city: "Napoli",
    tour: "Istanbul Old City Tour",
    text: "La Moschea Blu e Santa Sofia mi hanno lasciata senza parole. La guida è stata eccezionale, piena di aneddoti storici e curiosità su Istanbul.",
    avatar: "https://picsum.photos/seed/elena/100/100",
    stars: 5,
  },
  {
    id: 5,
    name: "Giulia Marchetti",
    flag: "🇮🇹",
    city: "Firenze",
    tour: "Pamukkale Full Day Tour",
    text: "Le terrazze di travertino bianco di Pamukkale sono un sogno ad occhi aperti. Un luogo assolutamente unico al mondo, da non perdere assolutamente!",
    avatar: "https://picsum.photos/seed/giulia/100/100",
    stars: 5,
  },
  {
    id: 6,
    name: "Emma Williams",
    flag: "🇬🇧",
    city: "Manchester",
    tour: "Ephesus Full Day Tour",
    text: "Walking through ancient Ephesus was like stepping back in time. Our guide brought every ruin to life with fascinating stories about Roman history.",
    avatar: "https://picsum.photos/seed/emma/100/100",
    stars: 5,
  },
  {
    id: 7,
    name: "Lena Schmidt",
    flag: "🇩🇪",
    city: "München",
    tour: "Izmir City and Agora Tour",
    text: "Izmir hat mich komplett überrascht — lebhafte Atmosphäre, wunderschöner Hafen und die antiken Ruinen von Ephesus direkt vor der Tür. Unvergesslich!",
    avatar: "https://picsum.photos/seed/lena/100/100",
    stars: 5,
  },
  {
    id: 8,
    name: "Sophie Bernard",
    flag: "🇫🇷",
    city: "Lyon",
    tour: "Antalya Old Town and Waterfalls",
    text: "Antalya est une ville magnifique — la vieille ville Kaleiçi, les chutes d'eau et la mer turquoise. LED Travel a rendu cette journée parfaite.",
    avatar: "https://picsum.photos/seed/sophie/100/100",
    stars: 5,
  },
  {
    id: 9,
    name: "Pierre Dubois",
    flag: "🇫🇷",
    city: "Paris",
    tour: "Troy and Gallipoli Day Trip",
    text: "Visiter Troie était un rêve d'enfance réalisé. Notre guide connaissait l'Iliade sur le bout des doigts — une expérience historique inoubliable.",
    avatar: "https://picsum.photos/seed/pierre/100/100",
    stars: 5,
  },
  {
    id: 10,
    name: "Carlos García",
    flag: "🇪🇸",
    city: "Madrid",
    tour: "Cappadocia Valley Hike",
    text: "Los paisajes de Capadocia parecen de otro planeta. Los valles, las chimeneas de hadas y los pueblos en roca son simplemente increíbles.",
    avatar: "https://picsum.photos/seed/carlos/100/100",
    stars: 5,
  },
];
