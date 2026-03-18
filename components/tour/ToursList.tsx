'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Tour } from '@/lib/tours';

// ---------------------------------------------------------------------------
// CardImageCarousel
// ---------------------------------------------------------------------------
function CardImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef<number>(0);

  const go = (next: number, e?: React.MouseEvent) => {
    e?.preventDefault();
    const newIndex = (next + images.length) % images.length;
    setDirection(newIndex > index ? 1 : -1);
    setIndex(newIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) go(index + (diff > 0 ? 1 : -1));
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir >= 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir >= 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div
      className="relative h-64 w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt={alt}
            fill
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          {/* Left arrow */}
          <button
            onClick={(e) => go(index - 1, e)}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 transition-all duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Right arrow */}
          <button
            onClick={(e) => go(index + 1, e)}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 transition-all duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => go(i, e)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ToursList
// ---------------------------------------------------------------------------
const locations = [
  'All',
  'Istanbul',
  'Cappadocia',
  'Pamukkale',
  'Ephesus',
  'Bodrum',
  'Antalya',
  'Troy',
  'Eastern Turkey',
];

export default function ToursList({ initialTours }: { initialTours: Tour[] }) {
  const searchParams = useSearchParams();
  const regionParam = searchParams.get('region');
  const [activeFilter, setActiveFilter] = useState(regionParam || 'All');

  useEffect(() => {
    setActiveFilter(regionParam || 'All');
  }, [regionParam]);

  const allowedRegions = new Set(['Istanbul', 'Cappadocia', 'Pamukkale', 'Ephesus', 'Bodrum', 'Antalya', 'Troy', 'Eastern Turkey']);

  const filteredTours = (activeFilter === 'All'
    ? initialTours
    : initialTours.filter(tour => tour.region === activeFilter)
  ).filter(tour => allowedRegions.has(tour.region));

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
                ? 'bg-[#E63946] text-white shadow-lg shadow-[#E63946]/30'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {location}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredTours.map((tour) => {
            const gallery = tour.galleryImages
              ? tour.galleryImages.split('|').map(s => s.trim()).filter(Boolean)
              : [];
            const images = tour.image && !gallery.includes(tour.image)
              ? [tour.image, ...gallery]
              : gallery.length > 0 ? gallery : [tour.image];

            return (
              <motion.div
                key={tour.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100 group flex flex-col"
              >
                {/* Image carousel */}
                <div className="relative">
                  <CardImageCarousel images={images} alt={tour.title} />

                  {tour.badge && (
                    <div className="absolute top-4 left-4 z-10 bg-[#E63946] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md pointer-events-none">
                      {tour.badge}
                    </div>
                  )}
                  <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-bold shadow-sm pointer-events-none">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    {tour.rating}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-[#E63946]" />
                      {tour.region}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-[#E63946]" />
                      {tour.duration}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-[#E63946] transition-colors">
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
                      className="flex items-center gap-2 bg-gray-900 hover:bg-[#E63946] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors duration-300"
                    >
                      View Details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filteredTours.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No tours found for this destination.</p>
          <button
            onClick={() => setActiveFilter('All')}
            className="mt-4 text-[#E63946] font-bold hover:underline"
          >
            View all tours
          </button>
        </div>
      )}
    </div>
  );
}
