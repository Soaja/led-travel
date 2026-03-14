'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Star, Clock, Users, Globe, ArrowRight, Tag, Flame } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

export interface Tour {
  id: string;
  slug: string;
  title: string;
  region: string;
  price: number | null;
  duration: string;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  groupSize?: string;
  language?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

export default function Tours({ tours }: { tours: Tour[] }) {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    loop: false,
    breakpoints: {
      '(min-width: 1024px)': { active: false } // Disable carousel on desktop
    }
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!tours || tours.length === 0) return null;

  return (
    <section id="tours" className="py-24 bg-[#1A1A2E] text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#E63946] opacity-5 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#E63946] opacity-5 blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-5 h-5 text-[#E63946]" />
              <span className="text-[#E63946] font-bold tracking-wider uppercase text-sm">
                LIMITED TIME DEALS
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Special Offers
            </h2>
            <p className="text-gray-400 text-lg">
              Experience the magic of Turkey with our exclusive discounted packages. Book now before the offer ends!
            </p>
          </div>
          
          <div className="hidden md:block">
            <Link 
              href="/tours"
              className="inline-flex items-center gap-2 text-white hover:text-[#E63946] font-bold transition-colors duration-300"
            >
              View All Offers <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Tours Carousel/Grid */}
        <div className="embla" ref={emblaRef}>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="embla__container flex lg:grid lg:grid-cols-4 gap-6 cursor-grab active:cursor-grabbing lg:cursor-auto"
          >
            {tours.map((tour) => {
              // Calculate fake original price (20% more)
              const originalPrice = tour.price ? Math.round(tour.price * 1.25) : null;
              
              return (
                <motion.div
                  key={tour.id}
                  variants={cardVariants}
                  className="embla__slide flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-auto min-w-0 bg-[#23233D] rounded-2xl overflow-hidden shadow-2xl hover:-translate-y-2 transition-transform duration-300 flex flex-col group border border-white/5"
                >
                  {/* Image Container */}
                  <div className="relative h-60 w-full overflow-hidden">
                    <Image
                      src={tour.image || `https://picsum.photos/seed/${tour.slug}/800/600`}
                      alt={tour.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#23233D] via-transparent to-transparent opacity-80"></div>
                    
                    {/* Discount Badge */}
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 z-10">
                      <Tag className="w-3 h-3" />
                      SAVE 20%
                    </div>

                    {/* Original Badge (if any) */}
                    {tour.badge && (
                      <div className="absolute top-4 left-4 bg-[#E63946] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm z-10">
                        {tour.badge}
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-grow relative">
                    {/* Rating Row */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="flex text-[#E63946]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="font-bold text-white text-sm">{tour.rating || 4.9}</span>
                      <span className="text-gray-400 text-sm">({tour.reviews || 0})</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white line-clamp-2 mb-4 group-hover:text-[#E63946] transition-colors duration-300">
                      {tour.title}
                    </h3>

                    {/* Info Pills Row */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <div className="flex items-center gap-1.5 bg-white/5 text-gray-300 px-3 py-1.5 rounded-lg text-xs font-medium border border-white/5">
                        <Clock className="w-3.5 h-3.5 text-[#E63946]" />
                        {tour.duration || 'Full Day'}
                      </div>
                      <div className="flex items-center gap-1.5 bg-white/5 text-gray-300 px-3 py-1.5 rounded-lg text-xs font-medium border border-white/5">
                        <Users className="w-3.5 h-3.5 text-[#E63946]" />
                        {tour.groupSize || 'Max 8'}
                      </div>
                    </div>

                    {/* Price Row */}
                    <div className="mt-auto mb-6 flex items-end justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 mb-1">Special Price</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-[#E63946]">
                            €{tour.price ? tour.price.toFixed(2) : 'On request'}
                          </span>
                          {originalPrice && (
                            <span className="text-sm text-gray-500 line-through decoration-red-500/50">
                              €{originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link 
                      href={`/tours/${tour.slug}`}
                      className="w-full bg-white/10 hover:bg-[#E63946] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 border border-white/10 hover:border-transparent group/btn"
                    >
                      Claim Offer 
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        
        {/* Mobile Below Section CTA */}
        <div className="mt-10 text-center md:hidden">
          <Link 
            href="/tours"
            className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-[#E63946] hover:border-transparent px-8 py-3.5 rounded-xl font-bold transition-all duration-300"
          >
            View All Offers <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
