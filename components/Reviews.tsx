'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Star, Quote, ArrowRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const reviews = [
  {
    id: 1,
    name: "Marco Ricci",
    flag: "🇮🇹",
    city: "Milano",
    tour: "Istanbul Classics Full Day",
    text: "Il miglior tour che abbia mai fatto! La guida parlava perfettamente italiano e conosceva ogni angolo di Istanbul. Un'esperienza autentica e indimenticabile.",
    avatar: "https://picsum.photos/seed/marco/100/100",
    stars: 5
  },
  {
    id: 2,
    name: "Sofia Ferretti",
    flag: "🇮🇹",
    city: "Roma",
    tour: "Cappadocia Hot Air Balloon",
    text: "La mongolfiera all'alba è stata magica. LED Travel ha organizzato tutto perfettamente, dall'hotel al trasferimento. Prenoto già il prossimo viaggio!",
    avatar: "https://picsum.photos/seed/sofia/100/100",
    stars: 5
  },
  {
    id: 3,
    name: "James Thompson",
    flag: "🇬🇧",
    city: "London",
    tour: "Bosphorus Sunset Cruise",
    text: "Professional, punctual, and passionate guides. This is exactly how Turkey should be experienced — intimate, authentic, and absolutely stunning.",
    avatar: "https://picsum.photos/seed/james/100/100",
    stars: 5
  }
];

export default function Reviews() {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    loop: false,
    breakpoints: {
      '(min-width: 768px)': { active: false }
    }
  });

  return (
    <section id="reviews" className="py-20 bg-[#FDF8F2] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="w-10 h-10 text-[#F5A623] fill-current" />
            <span className="text-5xl font-bold text-[#F5A623]">4.9</span>
          </div>
          <p className="text-gray-500 text-sm mb-6">Based on 1,847 verified reviews</p>
          
          {/* Logo Row */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-1 text-gray-700 font-bold text-lg">
              <span className="text-blue-500 text-2xl">G</span>oogle
            </div>
            <div className="flex items-center gap-1 text-gray-700 font-bold text-lg">
              <span className="text-green-500 text-2xl">O</span>TripAdvisor
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900">What Our Travelers Say</h2>
        </div>

        {/* Reviews Carousel/Grid */}
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex md:grid md:grid-cols-3 gap-6 md:gap-8 cursor-grab active:cursor-grabbing md:cursor-auto">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="embla__slide flex-[0_0_90%] min-w-0 md:flex-auto bg-white p-6 rounded-2xl shadow-md relative flex flex-col"
              >
                <Quote className="absolute top-6 right-6 w-12 h-12 text-[#F5A623] opacity-20 rotate-180" />
                
                {/* Top: Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                {/* Quote Text */}
                <p className="text-gray-700 text-base leading-relaxed italic line-clamp-4 flex-grow">
                  &quot;{review.text}&quot;
                </p>
                
                {/* Divider */}
                <div className="border-t border-gray-100 my-4"></div>
                
                {/* Bottom Row */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="font-bold text-gray-900 flex items-center gap-1.5">
                      {review.name} <span className="text-sm">{review.flag}</span>
                    </div>
                    <div className="text-sm text-gray-500 mb-0.5">{review.city}</div>
                    <div className="text-xs text-[#F5A623] font-medium">Tour: {review.tour}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Link */}
        <div className="mt-12 text-center flex flex-col items-center">
          <Link 
            href="/reviews"
            className="inline-flex items-center gap-2 text-[#F5A623] font-bold hover:text-orange-600 transition-colors duration-300 mb-6"
          >
            Read all 1,847 reviews <ArrowRight className="w-4 h-4" />
          </Link>
          
          {/* Small Logos */}
          <div className="flex items-center justify-center gap-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            <div className="text-xs font-bold flex items-center gap-1">
              <span className="text-blue-500">G</span> Google Reviews
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
            <div className="text-xs font-bold flex items-center gap-1">
              <span className="text-green-500">O</span> TripAdvisor
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
