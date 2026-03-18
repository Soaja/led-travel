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
  
  const destinationImages: Record<string, string> = {
    Istanbul:         'https://media.cntraveller.com/photos/68ff3db8e7084c26e7744dee/1:1/w_2160,h_2160,c_limit/1480863367',
    Cappadocia:       'https://static.independent.co.uk/2025/07/30/13/15/iStock-1339814820.jpeg',
    Pamukkale:        'https://dynamic-media.tacdn.com/media/photo-o/2f/b9/be/51/caption.jpg?w=2400&h=-1&s=1',
    Ephesus:          'https://ids.bmgroup.com.tr/uploads/images/2020/06/16/41171.jpg',
    Izmir:            'https://ids.bmgroup.com.tr/uploads/images/2020/06/16/41171.jpg',
    Bodrum:           'https://www.spotblue.com/app/uploads/2018/10/Bodrum-in-Turkey.jpg',
    Antalya:          'https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt21155ac1ca63f676/687f9d115903b3a04b04e07c/BCC-2024-EXPLORER-ANTALYA-FREE_THINGS_TO_DO-HEADER-MOBILE.jpg?fit=crop&disable=upscale&auto=webp&quality=60&crop=smart',
    Troy:             'https://www.tripass.com.tr/resources/assets/images/attractions/Canakkale_Troy_Ancient_City_Ticket/1_670x350.jpg',
    'Eastern Turkey': 'https://blog.obilet.com/wp-content/uploads/2024/05/ana-gorsel-min-2-scaled.jpeg',
  };

  desiredDestinations.forEach(dest => {
    regionMap.set(dest.toLowerCase(), {
      name: dest,
      tours: 0,
      startingFrom: Infinity,
      slug: dest.toLowerCase().replace(/\s+/g, '-'),
      image: destinationImages[dest] ?? `https://picsum.photos/seed/${dest.toLowerCase().replace(/\s+/g, '-')}/800/600`
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
