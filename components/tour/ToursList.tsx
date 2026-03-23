'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Star, ArrowRight, ChevronLeft, ChevronRight, Search, X, Quote } from 'lucide-react';
import type { Tour } from '@/lib/tours';
import { STATIC_REVIEWS } from '@/lib/reviews';

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
            unoptimized
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
  'Izmir-Ephesus',
  'Antalya',
  'Troy',
  'Other Tours',
];

const ALLOWED_REGIONS = new Set(['Istanbul', 'Cappadocia', 'Pamukkale', 'Izmir-Ephesus', 'Antalya', 'Troy', 'Other Tours']);

function scoreTour(tour: Tour, q: string): number {
  const titleL  = tour.title.toLowerCase();
  const regionL = tour.region.toLowerCase();

  if (titleL.startsWith(q))                                    return 100;
  if (regionL.startsWith(q))                                   return 90;
  if (titleL.includes(q))                                      return 70;
  if (regionL.includes(q))                                     return 60;
  if (tour.shortDescription?.toLowerCase().includes(q))        return 40;
  if (tour.includes?.toLowerCase().includes(q))                return 35;
  if (tour.highlights?.toLowerCase().includes(q))              return 30;
  if (tour.searchKeywords?.some(kw => kw.startsWith(q)))       return 20;
  if (tour.searchKeywords?.some(kw => kw.includes(q)))         return 10;
  return 0;
}

export default function ToursList({ initialTours }: { initialTours: Tour[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const regionParam = searchParams.get('region');
  const qParam = searchParams.get('q');
  const [activeFilter, setActiveFilter] = useState(regionParam || 'All');
  const [query, setQuery] = useState(qParam || '');
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setActiveFilter(regionParam || 'All');
  }, [regionParam]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Results shown in the dropdown while typing
  const dropdownResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return [];
    return initialTours
      .filter(tour => ALLOWED_REGIONS.has(tour.region))
      .map(tour => ({ tour, score: scoreTour(tour, q) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ tour }) => tour)
      .slice(0, 7);
  }, [initialTours, query]);

  // Tours shown in the main grid
  const filteredTours = useMemo(() => {
    const base = initialTours.filter(tour => ALLOWED_REGIONS.has(tour.region));
    const q = query.trim().toLowerCase();
    if (q && q.length >= 2) {
      return base
        .map(tour => ({ tour, score: scoreTour(tour, q) }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .map(({ tour }) => tour);
    }
    return activeFilter === 'All' ? base : base.filter(t => t.region === activeFilter);
  }, [initialTours, query, activeFilter]);

  const handleQueryChange = (val: string) => {
    setQuery(val);
    if (val.trim()) setActiveFilter('All');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsFocused(false);
      inputRef.current?.blur();
    }
    if (e.key === 'Escape') {
      setQuery('');
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const showDropdown = isFocused;
  const destinations = locations.filter(l => l !== 'All');

  return (
    <div className="container mx-auto px-4 md:px-6">
      {/* Search */}
      <div className="max-w-2xl mx-auto mb-10 relative" ref={searchContainerRef}>
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => handleQueryChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search tours or destinations… e.g. Bursa, Istanbul, Cappadocia"
            className="w-full pl-12 pr-10 py-4 rounded-2xl border border-gray-200 bg-white text-gray-800 text-sm shadow-md placeholder:text-gray-400 focus:outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/15 transition"
          />
          {query && (
            <button
              onMouseDown={() => { setQuery(''); setActiveFilter('All'); inputRef.current?.focus(); }}
              className="absolute right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
            {!query ? (
              /* — Destinations panel — */
              <div className="p-5">
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                  Browse by destination
                </p>
                <div className="flex flex-wrap gap-2">
                  {destinations.map(dest => (
                    <button
                      key={dest}
                      onMouseDown={() => {
                        setActiveFilter(dest);
                        setQuery('');
                        setIsFocused(false);
                        router.push(`/tours?region=${encodeURIComponent(dest)}`);
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50 hover:bg-[#E63946] hover:text-white text-gray-700 text-sm font-medium border border-gray-100 hover:border-[#E63946] transition-all duration-200 group"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#E63946] group-hover:text-white transition-colors" />
                      {dest}
                    </button>
                  ))}
                </div>
              </div>
            ) : dropdownResults.length === 0 ? (
              /* — No results — */
              <div className="p-6 text-center text-gray-400 text-sm">
                No tours found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              /* — Tour results — */
              <div className="py-2 max-h-[420px] overflow-y-auto">
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 px-4 pt-2 pb-3">
                  {dropdownResults.length} tour{dropdownResults.length !== 1 ? 's' : ''} found
                </p>
                {dropdownResults.map(tour => (
                  <button
                    key={tour.id}
                    onMouseDown={() => {
                      router.push(`/tours/${tour.slug}`);
                      setIsFocused(false);
                      setQuery('');
                    }}
                    className="w-full flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 line-clamp-1">{tour.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center gap-1 text-xs text-[#E63946] font-medium">
                          <MapPin className="w-3 h-3" />{tour.region}
                        </span>
                        <span className="text-gray-300">·</span>
                        <span className="text-xs text-gray-500">
                          {tour.price ? `From €${tour.price}` : 'On request'}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

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
                onClick={() => router.push(`/tours/${tour.slug}`)}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100 group flex flex-col cursor-pointer"
              >
                {/* Image carousel */}
                <div className="relative">
                  <CardImageCarousel images={images} alt={tour.title} />

                  {tour.badge && (
                    <div className="absolute top-4 left-4 z-10 bg-[#E63946] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md pointer-events-none ring-2 ring-white ring-offset-1 ring-offset-[#E63946]">
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

                  {/* Review snippet */}
                  {(() => {
                    const review = STATIC_REVIEWS[(parseInt(tour.id) || 0) % STATIC_REVIEWS.length];
                    return (
                      <div className="flex items-start gap-2 mb-4 bg-gray-50 rounded-xl px-3 py-2.5">
                        <Quote className="w-3.5 h-3.5 text-[#E63946] shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500 italic line-clamp-2 leading-relaxed">
                            {review.text}
                          </p>
                          <p className="text-xs font-semibold text-gray-700 mt-1.5 flex items-center gap-1">
                            {review.name} {review.flag}
                            <span className="text-yellow-400 ml-1">{'★'.repeat(review.stars)}</span>
                          </p>
                        </div>
                      </div>
                    );
                  })()}

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
          <p className="text-gray-500 text-lg">
            {query
              ? `No tours found for "${query}".`
              : 'No tours found for this destination.'}
          </p>
          <button
            onClick={() => { setQuery(''); setActiveFilter('All'); }}
            className="mt-4 text-[#E63946] font-bold hover:underline"
          >
            View all tours
          </button>
        </div>
      )}
    </div>
  );
}
