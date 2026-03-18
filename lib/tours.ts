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
}

const ALLOWED_DESTINATIONS = [
  'Istanbul',
  'Cappadocia',
  'Ephesus',
  'Pamukkale',
  'Bodrum',
  'Antalya',
  'Troy',
  'Eastern Turkey',
];

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

      // Normalize region
      const lowerRegion = region.toLowerCase().trim();
      if (lowerRegion === 'bordum') region = 'Bodrum';
      else {
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

      return {
        id, slug, region, title, price, priceNote,
        startTime, endTime, durationStr, meals,
        includes, itinerary, highlights, notIncluded, whatToBring,
        shortDescription, metaDescription, coverImage, galleryImages, websiteUrl,
        activeOnSite, duration, rating, reviews, image, badge,
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
