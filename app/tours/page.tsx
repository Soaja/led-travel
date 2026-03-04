import { Metadata } from 'next';
import ToursList from '@/components/tour/ToursList';
import { getToursFromSheet } from '@/lib/tours';

export const metadata: Metadata = {
  title: 'All Tours | LED Travel',
  description: 'Explore our premium private tours across Turkey. Filter by destination and find your perfect experience.',
};

export default async function ToursPage() {
  const tours = await getToursFromSheet();

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-20">
      {/* Header Section */}
      <div className="bg-[#1A1A2E] text-white py-16 mb-12 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#F5A623 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-[#F5A623] font-bold tracking-wider uppercase text-sm mb-4 block">
            ■ Discover Turkey
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Explore Our Tours
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl font-light">
            From the bustling streets of Istanbul to the magical skies of Cappadocia. Find your perfect private experience.
          </p>
        </div>
      </div>

      {/* Filter and List Section */}
      <ToursList initialTours={tours} />
    </div>
  );
}
