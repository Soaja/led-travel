import Papa from 'papaparse';

export interface Tour {
  id: string;
  slug: string;
  region: string;
  title: string;
  price: number | null;
  priceNote: string;
  startTime: string;
  endTime: string;
  durationStr: string;
  meals: string;
  includes: string;
  itinerary: string;
  highlights: string;
  notIncluded: string;
  whatToBring: string;
  shortDescription: string;
  metaDescription: string;
  coverImage: string;
  galleryImages: string;
  websiteUrl: string;
  activeOnSite: boolean;
  // Computed fields for UI
  duration: string;
  rating: number;
  reviews: number;
  image: string;
  badge: string;
  searchKeywords: string[];
}

// Sub-destination keywords per region — used for keyword search
// Add new places here to make them searchable without creating new routes
export const REGION_KEYWORDS: Record<string, string[]> = {
  'Istanbul':      ['bursa', 'yalova', 'sapanca', 'bosphorus', 'galata', 'sultanahmet', 'hagia sophia', 'grand bazaar', 'topkapi', 'princes islands', 'buyukada', 'kadikoy', 'ortakoy', 'beyoglu'],
  'Cappadocia':    ['goreme', 'urgup', 'avanos', 'uchisar', 'hot air balloon', 'fairy chimneys', 'underground city', 'derinkuyu', 'kaymakli'],
  'Izmir-Ephesus': ['ephesus', 'kusadasi', 'pergamon', 'selcuk', 'house of virgin mary', 'izmir', 'sirince'],
  'Pamukkale':     ['hierapolis', 'cotton castle', 'travertine', 'denizli', 'laodikeia', 'aphrodisias'],
  'Antalya':       ['side', 'aspendos', 'perge', 'alanya', 'olympos', 'kemer', 'termessos', 'phaselis', 'manavgat'],
  'Troy':          ['canakkale', 'gallipoli', 'anzac', 'dardanelles', 'assos', 'truva'],
  'Other Tours':    [],
};

const ALLOWED_DESTINATIONS = [
  'Istanbul',
  'Cappadocia',
  'Izmir-Ephesus',
  'Pamukkale',
  'Antalya',
  'Troy',
  'Other Tours',
];

// Maps legacy/sheet values to canonical display names
const REGION_ALIASES: Record<string, string> = {
  'ephesus':        'Izmir-Ephesus',
  'izmir':          'Izmir-Ephesus',
  'izmir-ephesus':  'Izmir-Ephesus',
  'eastern turkey': 'Other Tours',
};

// New sheet: https://docs.google.com/spreadsheets/d/1keSjydbWk0VhMx3WcLsPvwU-MyI6GlcG_sM2Ggw_PKY
// Column layout (0-indexed):
// 0  ID
// 1  Destination
// 2  Region (Source)
// 3  Tour Name
// 4  Price (EUR)
// 5  Price Note
// 6  Start Time
// 7  End Time
// 8  Duration
// 9  Meal Included
// 10 What's Included
// 11 Itinerary
// 12 Highlights
// 13 What's NOT Included
// 14 What to Bring
// 15 Short Description
// 16 Meta Description
// 17 Cover Image URL
// 18 Gallery Images
// 19 Website URL
// 20 Active on Site

export async function getToursFromSheet(): Promise<Tour[]> {
  const url = 'https://docs.google.com/spreadsheets/d/1keSjydbWk0VhMx3WcLsPvwU-MyI6GlcG_sM2Ggw_PKY/export?format=csv';

  try {
    const res = await fetch(url, { next: { revalidate: 60 } }); // Refresh every 60 seconds
    if (!res.ok) throw new Error('Failed to fetch sheet');

    const csvText = await res.text();

    const result = Papa.parse(csvText, {
      header: false,
      skipEmptyLines: true,
    });

    const rows = result.data as string[][];
    const dataRows = rows.slice(3); // Skip rows 0 (title), 1 (subtitle), 2 (column headers)

    const tours: Tour[] = dataRows.map((row) => {
      const id          = row[0]  || '';
      let   region      = row[1]  || '';
      const title       = row[3]  || '';
      const priceStr    = row[4]  || '';
      const priceNote   = row[5]  || '';
      const startTime   = row[6]  || '';
      const endTime     = row[7]  || '';
      const durationStr = row[8]  || '';
      const meals       = row[9]  || '';
      const includes    = row[10] || '';
      const itinerary   = row[11] || '';
      const highlights  = row[12] || '';
      const notIncluded = row[13] || '';
      const whatToBring = row[14] || '';
      const shortDescription = row[15] || '';
      const metaDescription  = row[16] || '';
      const coverImage       = row[17] || '';
      const galleryImages    = row[18] || '';
      const websiteUrl       = row[19] || '';
      const activeOnSite     = (row[20] || '').trim().toUpperCase() === 'YES';

      // Normalize region — resolve aliases first, then match canonical names
      const lowerRegion = region.toLowerCase().trim();
      if (REGION_ALIASES[lowerRegion]) {
        region = REGION_ALIASES[lowerRegion];
      } else {
        const matched = ALLOWED_DESTINATIONS.find(d => d.toLowerCase() === lowerRegion);
        if (matched) region = matched;
      }

      // Parse price
      let price: number | null = null;
      if (priceStr && priceStr.includes('€')) {
        price = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
      }

      // Slug from title
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      // Duration
      let duration = durationStr || 'Flexible';
      if (!durationStr && startTime && endTime) {
        const start = parseInt(startTime.split(':')[0]);
        const end   = parseInt(endTime.split(':')[0]);
        if (!isNaN(start) && !isNaN(end)) duration = `${end - start} Hours`;
      } else if (!durationStr && startTime) {
        duration = `Starts at ${startTime}`;
      }

      const mockId = parseInt(id) || 1;
      const image  = coverImage || `https://picsum.photos/seed/tour${mockId}/800/600`;
      const rating = Number((4.5 + (mockId % 5) * 0.1).toFixed(1));
      const reviews = 50 + (mockId * 7) % 200;

      let badge = '';
      if (mockId % 7 === 0) badge = 'Best Seller';
      else if (mockId % 11 === 0) badge = 'Must Do';

      // Title-based badge overrides — takes priority over ID-based logic
      const BADGE_OVERRIDES: Array<[RegExp, string]> = [
        [/sapanca/i,  'Most Liked'],
        [/masukiye/i, 'Most Liked'],
      ];
      for (const [pattern, label] of BADGE_OVERRIDES) {
        if (pattern.test(title)) { badge = label; break; }
      }

      const searchKeywords = [
        ...(REGION_KEYWORDS[region] ?? []),
        region.toLowerCase(),
        title.toLowerCase(),
        shortDescription.toLowerCase(),
      ];

      return {
        id, slug, region, title, price, priceNote,
        startTime, endTime, durationStr, meals,
        includes, itinerary, highlights, notIncluded, whatToBring,
        shortDescription, metaDescription, coverImage, galleryImages, websiteUrl,
        activeOnSite, duration, rating, reviews, image, badge, searchKeywords,
      };
    });

    return tours.filter(t =>
      t.title &&
      t.activeOnSite &&
      ALLOWED_DESTINATIONS.includes(t.region)
    );
  } catch (error) {
    console.error('Error fetching tours:', error);
    return [];
  }
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  const tours = await getToursFromSheet();
  return tours.find(t => t.slug === slug) || null;
}
