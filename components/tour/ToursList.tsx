'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Star, ArrowRight } from 'lucide-react';

const toursData = [
  {
    id: 1,
    slug: 'istanbul-classics-full-day',
    title: 'Ultimate Istanbul Private Tour: Old City Classics',
    location: 'Istanbul',
    duration: '8 Hours',
    rating: 4.9,
    reviews: 128,
    price: 85,
    image: 'https://picsum.photos/seed/ist1/800/600',
    badge: 'Best Seller'
  },
  {
    id: 2,
    slug: 'cappadocia-hot-air-balloon',
    title: 'Cappadocia Sunrise Hot Air Balloon Flight',
    location: 'Cappadocia',
    duration: '3 Hours',
    rating: 5.0,
    reviews: 342,
    price: 150,
    image: 'https://picsum.photos/seed/cap1/800/600',
    badge: 'Must Do'
  },
  {
    id: 3,
    slug: 'bosphorus-sunset-cruise',
    title: 'Bosphorus Sunset Cruise on Private Yacht',
    location: 'Istanbul',
    duration: '2.5 Hours',
    rating: 4.8,
    reviews: 95,
    price: 120,
    image: 'https://picsum.photos/seed/ist2/800/600',
    badge: 'Romantic'
  },
  {
    id: 4,
    slug: 'taste-of-two-continents',
    title: 'Taste of Two Continents: Istanbul Food Tour',
    location: 'Istanbul',
    duration: '5 Hours',
    rating: 4.9,
    reviews: 210,
    price: 75,
    image: 'https://picsum.photos/seed/ist_food/800/600',
    badge: ''
  },
  {
    id: 5,
    slug: 'ephesus-ancient-city',
    title: 'Ephesus Ancient City & House of Virgin Mary',
    location: 'Ephesus',
    duration: '7 Hours',
    rating: 4.7,
    reviews: 84,
    price: 95,
    image: 'https://picsum.photos/seed/eph1/800/600',
    badge: 'History'
  },
  {
    id: 6,
    slug: 'antalya-coastal-retreat',
    title: 'Antalya Coastal Retreat & Waterfalls',
    location: 'Antalya',
    duration: '6 Hours',
    rating: 4.8,
    reviews: 112,
    price: 65,
    image: 'https://picsum.photos/seed/ant1/800/600',
    badge: ''
  }
];

import { Tour } from '@/lib/tours';

export default function ToursList({ initialTours }: { initialTours: Tour[] }) {
  const searchParams = useSearchParams();
  const regionParam = searchParams.get('region');
  const [activeFilter, setActiveFilter] = useState(regionParam || 'All');

  useEffect(() => {
    if (regionParam) {
      setActiveFilter(regionParam);
    } else {
      setActiveFilter('All');
    }
  }, [regionParam]);

  // Extract unique regions for filters
  const locations = [
    'All',
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

  const filteredTours = activeFilter === 'All' 
    ? initialTours 
    : initialTours.filter(tour => tour.region === activeFilter);

  return (
    <div className="container mx-auto px-4 md:px-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {locations.map((location) => (
          <button
            key={location}
            onClick={() => setActiveFilter(location)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
              activeFilter === location
                ? 'bg-[#F5A623] text-white shadow-lg shadow-[#F5A623]/30'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {location}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredTours.map((tour) => (
            <motion.div
              key={tour.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100 group flex flex-col"
            >
              {/* Image */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image 
                  src={tour.image} 
                  alt={tour.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                {tour.badge && (
                  <div className="absolute top-4 left-4 bg-[#F5A623] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                    {tour.badge}
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-bold shadow-sm">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  {tour.rating}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#F5A623]" />
                    {tour.region}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#F5A623]" />
                    {tour.duration}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-[#F5A623] transition-colors">
                  {tour.title}
                </h3>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 block">From</span>
                    <span className="text-xl font-bold text-gray-900">
                      {tour.price ? `€${tour.price}` : 'On request'}
                    </span>
                  </div>
                  <Link 
                    href={`/tours/${tour.slug}`}
                    className="flex items-center gap-2 bg-gray-900 hover:bg-[#F5A623] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors duration-300"
                  >
                    View Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredTours.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No tours found for this destination.</p>
          <button 
            onClick={() => setActiveFilter('All')}
            className="mt-4 text-[#F5A623] font-bold hover:underline"
          >
            View all tours
          </button>
        </div>
      )}
    </div>
  );
}
