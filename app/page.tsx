import Hero from '@/components/Hero';
import Destinations from '@/components/Destinations';
import Tours from '@/components/Tours';
import WhyUs from '@/components/WhyUs';
import Extras from '@/components/Extras';
import Reviews from '@/components/Reviews';
import Newsletter from '@/components/Newsletter';
import { getToursFromSheet } from '@/lib/tours';

const STATIC_DESTINATIONS = [
  { name: 'Istanbul',       slug: 'istanbul',        image: 'https://media.cntraveller.com/photos/68ff3db8e7084c26e7744dee/1:1/w_2160,h_2160,c_limit/1480863367' },
  { name: 'Cappadocia',     slug: 'cappadocia',      image: 'https://static.independent.co.uk/2025/07/30/13/15/iStock-1339814820.jpeg' },
  { name: 'Pamukkale',      slug: 'pamukkale',       image: 'https://dynamic-media.tadaq.com/media/photo-o/2f/b9/be/51/caption.jpg?w=2400&h=-1&s=1' },
  { name: 'Ephesus',        slug: 'ephesus',         image: 'https://idsb.tmgrup.com.tr/ly/uploads/images/2020/06/16/41171.jpg' },
  { name: 'Bodrum',         slug: 'bodrum',          image: 'https://www.spotblue.com/app/uploads/2018/10/Bodrum-in-Turkey.jpg' },
  { name: 'Antalya',        slug: 'antalya',         image: 'https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt21155ac1ca63f676/687f9d115903b3a04b04e07c/BCC-2024-EXPLORER-ANTALYA-FREE_THINGS_TO_DO-HEADER-MOBILE.jpg?fit=crop&disable=upscale&auto=webp&quality=60&crop=smart' },
  { name: 'Troy',           slug: 'troy',            image: 'https://www.tripass.com.tr/resources/assets/images/attractions/Canakkale_Troy_Ancient_City_Ticket/1_670x350.jpg' },
  { name: 'Eastern Turkey', slug: 'eastern-turkey',  image: 'https://blog.obilet.com/wp-content/uploads/2024/05/ana-gorsel-min-2-scaled.jpeg' },
];

export default async function Home() {
  const tours = await getToursFromSheet();

  // Count tours and find lowest price per destination
  const statsMap = new Map<string, { tours: number; startingFrom: number }>();
  STATIC_DESTINATIONS.forEach(d => statsMap.set(d.name.toLowerCase(), { tours: 0, startingFrom: Infinity }));

  tours.forEach(tour => {
    if (!tour.region) return;
    let key = tour.region.toLowerCase().trim();
    if (key === 'bordum') key = 'bodrum';
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
