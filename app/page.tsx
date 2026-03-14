import Hero from '@/components/Hero';
import Destinations from '@/components/Destinations';
import Tours from '@/components/Tours';
import WhyUs from '@/components/WhyUs';
import Extras from '@/components/Extras';
import Reviews from '@/components/Reviews';
import Newsletter from '@/components/Newsletter';
import { getToursFromSheet } from '@/lib/tours';

export default async function Home() {
  const tours = await getToursFromSheet();
  
  const desiredDestinations = [
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

  const regionMap = new Map();
  
  desiredDestinations.forEach(dest => {
    regionMap.set(dest.toLowerCase(), {
      name: dest,
      tours: 0,
      startingFrom: Infinity,
      slug: dest.toLowerCase().replace(/\s+/g, '-'),
      image: `https://picsum.photos/seed/${dest.toLowerCase().replace(/\s+/g, '-')}/800/600`
    });
  });

  tours.forEach(tour => {
    if (!tour.region) return;
    
    let regionKey = tour.region.toLowerCase().trim();
    if (regionKey === 'bordum') regionKey = 'bodrum';
    
    if (regionMap.has(regionKey)) {
      const dest = regionMap.get(regionKey);
      dest.tours += 1;
      if (tour.price && tour.price < dest.startingFrom) {
        dest.startingFrom = tour.price;
      }
    }
  });
  
  const destinations = desiredDestinations.map(dest => {
    const d = regionMap.get(dest.toLowerCase());
    return {
      ...d,
      startingFrom: d.startingFrom === Infinity ? 0 : d.startingFrom
    };
  });

  // Get top 4 tours for the Best Selling Tours section
  const bestSellingTours = tours.slice(0, 4);

  return (
    <>
      <Hero />
      <Destinations destinations={destinations} />
      <Tours tours={bestSellingTours} />
      <WhyUs />
      <Extras />
      <Reviews />
      <Newsletter />
    </>
  );
}
