import { MetadataRoute } from 'next';
import { getToursFromSheet } from '@/lib/tours';

const BASE_URL = 'https://ledtravel.net';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tours = await getToursFromSheet();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/tours`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/reviews`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/extras/clinics`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/extras/hammam`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];

  const destinations = ['istanbul', 'cappadocia', 'ephesus', 'pamukkale', 'antalya', 'eastern-turkey'];
  const reviewPages: MetadataRoute.Sitemap = destinations.map(dest => ({
    url: `${BASE_URL}/reviews/${dest}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const tourPages: MetadataRoute.Sitemap = tours.map(tour => ({
    url: `${BASE_URL}/tours/${tour.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...reviewPages, ...tourPages];
}
