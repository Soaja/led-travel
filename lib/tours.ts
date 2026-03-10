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
  ticketType: string;
  meals: string;
  includes: string;
  highlights: string;
  notIncluded: string;
  whatToBring: string;
  shortDescription: string;
  metaDescription: string;
  coverImage: string;
  galleryImages: string;
  websiteUrl: string;
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
  'Izmir',
  'Troy',
  'Pergamon',
  'Marmaris',
  'Fethiye',
  'Eastern Turkey'
];

export async function getToursFromSheet(): Promise<Tour[]> {
  const url = 'https://docs.google.com/spreadsheets/d/1ud-VcJwwAeo9cNkUD_NWihcd8cHueRvw8K9EVKl78a8/export?format=csv';
  
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
    if (!res.ok) throw new Error('Failed to fetch sheet');
    
    const csvText = await res.text();
    
    // Parse CSV
    const result = Papa.parse(csvText, {
      header: false,
      skipEmptyLines: true,
    });

    // The first 2 rows are headers/meta. Let's skip them and find the actual header row.
    // Row 0: IT IS TURKEY ...
    // Row 1: Source: itisturkey.com ...
    // Row 2: ID, Region, Tour Name...
    
    const rows = result.data as string[][];
    const dataRows = rows.slice(3); // Skip the first 3 rows (0, 1, 2)
    
    const tours: Tour[] = dataRows.map((row) => {
      const id = row[0] || '';
      let region = row[1] || '';
      const title = row[2] || '';
      const priceStr = row[3] || '';
      const priceNote = row[4] || '';
      const startTime = row[5] || '';
      const endTime = row[6] || '';
      const durationStr = row[7] || '';
      const ticketType = row[8] || '';
      const meals = row[9] || '';
      const includes = row[10] || '';
      const highlights = row[11] || '';
      const notIncluded = row[12] || '';
      const whatToBring = row[13] || '';
      const shortDescription = row[14] || '';
      const metaDescription = row[15] || '';
      const coverImage = row[16] || '';
      const galleryImages = row[17] || '';
      const websiteUrl = row[19] || '';

      // Normalize region
      const lowerRegion = region.toLowerCase().trim();
      if (lowerRegion === 'bordum') region = 'Bodrum';
      else {
        const matchedRegion = ALLOWED_DESTINATIONS.find(d => d.toLowerCase() === lowerRegion);
        if (matchedRegion) region = matchedRegion;
      }

      // Parse price
      let price = null;
      if (priceStr && priceStr.includes('€')) {
        price = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
      }

      // Generate a slug from title
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      // Calculate duration roughly if both exist
      let duration = durationStr || 'Flexible';
      if (!durationStr && startTime && endTime) {
        const start = parseInt(startTime.split(':')[0]);
        const end = parseInt(endTime.split(':')[0]);
        if (!isNaN(start) && !isNaN(end)) {
          duration = `${end - start} Hours`;
        }
      } else if (!durationStr && startTime) {
        duration = `Starts at ${startTime}`;
      }

      // Mock images and ratings since they aren't in the sheet
      const mockId = parseInt(id) || 1;
      const image = coverImage || `https://picsum.photos/seed/tour${mockId}/800/600`;
      const rating = 4.5 + (mockId % 5) * 0.1;
      const reviews = 50 + (mockId * 7) % 200;
      
      let badge = '';
      if (mockId % 7 === 0) badge = 'Best Seller';
      else if (mockId % 11 === 0) badge = 'Must Do';

      return {
        id,
        slug,
        region,
        title,
        price,
        priceNote,
        startTime,
        endTime,
        durationStr,
        ticketType,
        meals,
        includes,
        highlights,
        notIncluded,
        whatToBring,
        shortDescription,
        metaDescription,
        coverImage,
        galleryImages,
        websiteUrl,
        duration,
        rating: Number(rating.toFixed(1)),
        reviews,
        image,
        badge
      };
    });

    return tours.filter(t => t.title && ALLOWED_DESTINATIONS.includes(t.region)); // Return all tours that have a title and are in allowed destinations
  } catch (error) {
    console.error('Error fetching tours:', error);
    return [];
  }
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  const tours = await getToursFromSheet();
  return tours.find(t => t.slug === slug) || null;
}
