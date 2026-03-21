import Hero from '@/components/Hero';
import Destinations from '@/components/Destinations';
import Tours from '@/components/Tours';
import WhyUs from '@/components/WhyUs';
import Extras from '@/components/Extras';
import Reviews from '@/components/Reviews';
import Newsletter from '@/components/Newsletter';
import { getToursFromSheet } from '@/lib/tours';

const STATIC_DESTINATIONS = [
  { name: 'Istanbul',       slug: 'istanbul',       image: '/images/1.webp'  },
  { name: 'Cappadocia',     slug: 'cappadocia',     image: '/images/2.avif'  },
  { name: 'Pamukkale',      slug: 'pamukkale',      image: '/images/3.jpg'   },
  { name: 'Izmir-Ephesus',  slug: 'ephesus',        image: '/images/4.jpg'   },
  { name: 'Antalya',        slug: 'antalya',        image: '/images/6.webp'  },
  { name: 'Troy',           slug: 'troy',           image: '/images/7.jpg'   },
  { name: 'Other Tours',     slug: 'eastern-turkey', image: '/images/8.jpeg'  },
];

export default async function Home() {
  const tours = await getToursFromSheet();

  // Count tours and find lowest price per destination
  const statsMap = new Map<string, { tours: number; startingFrom: number }>();
  STATIC_DESTINATIONS.forEach(d => statsMap.set(d.name.toLowerCase(), { tours: 0, startingFrom: Infinity }));

  tours.forEach(tour => {
    if (!tour.region) return;
    let key = tour.region.toLowerCase().trim();
    if (statsMap.has(key)) {
      const s = statsMap.get(key)!;
      s.tours += 1;
      if (tour.price && tour.price < s.startingFrom) s.startingFrom = tour.price;
    }
  });

  const destinations = STATIC_DESTINATIONS.map(d => {
    const s = statsMap.get(d.name.toLowerCase())!;
    return {
      ...d,
      tours: s.tours,
      startingFrom: s.startingFrom === Infinity ? 0 : s.startingFrom,
    };
  });

  const bestSellingTours = tours.slice(0, 4);

  return (
    <>
      <Hero initialTours={tours} />
      <Destinations destinations={destinations} />
      <Tours tours={bestSellingTours} />
      <WhyUs />
      <Extras />
      <Reviews />
      <Newsletter />
    </>
  );
}
