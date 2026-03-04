import Hero from '@/components/Hero';
import Destinations from '@/components/Destinations';
import Tours from '@/components/Tours';
import WhyUs from '@/components/WhyUs';
import Reviews from '@/components/Reviews';
import Newsletter from '@/components/Newsletter';
import { getToursFromSheet } from '@/lib/tours';

export default async function Home() {
  const tours = await getToursFromSheet();
  
  const regionMap = new Map();
  tours.forEach(tour => {
    if (!tour.region) return;
    if (!regionMap.has(tour.region)) {
      regionMap.set(tour.region, {
        name: tour.region,
        tours: 0,
        startingFrom: tour.price || Infinity,
        slug: tour.region.toLowerCase().replace(/\s+/g, '-'),
        image: tour.image || `https://picsum.photos/seed/${tour.region}/800/600`
      });
    }
    const dest = regionMap.get(tour.region);
    dest.tours += 1;
    if (tour.price && tour.price < dest.startingFrom) {
      dest.startingFrom = tour.price;
    }
  });
  
  const destinations = Array.from(regionMap.values()).map(d => ({
    ...d,
    startingFrom: d.startingFrom === Infinity ? 0 : d.startingFrom
  }));

  // Get top 4 tours for the Best Selling Tours section
  const bestSellingTours = tours.slice(0, 4);

  return (
    <>
      <Hero />
      <Destinations destinations={destinations} />
      <Tours tours={bestSellingTours} />
      <WhyUs />
      <Reviews />
      <Newsletter />
    </>
  );
}
