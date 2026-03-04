'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Star, Clock, Users, Globe, Check, ArrowRight } from 'lucide-react';

interface Tour {
  id: number;
  badge: string;
  badgeColor: string;
  image: string;
  rating: number;
  reviewCount: number;
  title: string;
  duration: string;
  groupSize: string;
  language: string;
  price: number;
  currency: string;
  priceLabel: string;
  cancellation: string;
  confirmation: string;
  slug: string;
}

const tours: Tour[] = [
  {
    id: 1, badge: "Best Seller", badgeColor: "bg-orange-500",
    image: "https://picsum.photos/seed/istanbul-old-city/800/600",
    rating: 4.9, reviewCount: 128,
    title: "Istanbul Classics: Full Day Old City Experience",
    duration: "8h", groupSize: "Max 8 people", language: "IT/EN available",
    price: 85, currency: "€", priceLabel: "per person",
    cancellation: "Free cancellation", confirmation: "Instant",
    slug: "istanbul-classics-full-day"
  },
  {
    id: 2, badge: "Bucket List", badgeColor: "bg-purple-500",
    image: "https://picsum.photos/seed/cappadocia-balloon/800/600",
    rating: 4.9, reviewCount: 89,
    title: "Cappadocia Hot Air Balloon Flight at Dawn",
    duration: "3h", groupSize: "Max 20 people", language: "IT/EN available",
    price: 180, currency: "€", priceLabel: "per person",
    cancellation: "Free cancellation", confirmation: "Instant",
    slug: "cappadocia-hot-air-balloon"
  },
  {
    id: 3, badge: "Popular", badgeColor: "bg-blue-500",
    image: "https://picsum.photos/seed/bosphorus-sunset/800/600",
    rating: 4.8, reviewCount: 203,
    title: "Bosphorus Sunset Cruise on Luxury Yacht",
    duration: "2.5h", groupSize: "Max 12 people", language: "IT/EN available",
    price: 65, currency: "€", priceLabel: "per person",
    cancellation: "Free cancellation", confirmation: "Instant",
    slug: "bosphorus-sunset-cruise"
  },
  {
    id: 4, badge: "Foodie Choice", badgeColor: "bg-green-500",
    image: "https://picsum.photos/seed/two-continents/800/600",
    rating: 4.9, reviewCount: 67,
    title: "Taste of Two Continents: Asia & Europe in One Day",
    duration: "Full Day", groupSize: "Max 8 people", language: "IT/EN available",
    price: 95, currency: "€", priceLabel: "per person",
    cancellation: "Free cancellation", confirmation: "Instant",
    slug: "two-continents-istanbul"
  }
];

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

export default function Tours() {
  return (
    <section id="tours" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#F5A623] font-bold tracking-wider uppercase mb-3 block text-sm">
            FOR AVID EXPERIENCES
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Best Selling Tours
          </h2>
          <p className="text-gray-500 text-lg">
            Handpicked favorites that deliver unforgettable memories
          </p>
        </div>

        {/* Tours Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {tours.map((tour) => (
            <motion.div
              key={tour.id}
              variants={cardVariants}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Badge */}
                <div className={`absolute top-4 left-4 ${tour.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm`}>
                  {tour.badge}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-grow">
                {/* Rating Row */}
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-gray-900 text-sm">{tour.rating}</span>
                  <span className="text-gray-500 text-sm">({tour.reviewCount} reviews)</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-4">
                  {tour.title}
                </h3>

                {/* Info Pills Row */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {tour.duration}
                  </div>
                  <div className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-medium">
                    <Users className="w-3.5 h-3.5" />
                    {tour.groupSize}
                  </div>
                  <div className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-medium">
                    <Globe className="w-3.5 h-3.5" />
                    {tour.language}
                  </div>
                </div>

                {/* Price Row */}
                <div className="mt-auto mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-gray-500">From</span>
                    <span className="text-2xl font-bold text-[#F5A623]">
                      {tour.currency}{tour.price}
                    </span>
                    <span className="text-xs text-gray-400">{tour.priceLabel}</span>
                  </div>
                </div>

                {/* Checkmarks Row */}
                <div className="flex flex-col gap-1.5 mb-5">
                  <div className="flex items-center gap-2 text-green-600 text-xs font-medium">
                    <Check className="w-4 h-4" />
                    {tour.cancellation}
                  </div>
                  <div className="flex items-center gap-2 text-green-600 text-xs font-medium">
                    <Check className="w-4 h-4" />
                    {tour.confirmation}
                  </div>
                </div>

                {/* CTA Button */}
                <Link 
                  href={`/tours/${tour.slug}`}
                  className="w-full bg-[#F5A623] hover:bg-orange-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
                >
                  Book Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Below Section CTA */}
        <div className="mt-12 text-center">
          <Link 
            href="/tours"
            className="inline-flex items-center gap-2 border-2 border-[#F5A623] text-[#F5A623] hover:bg-[#F5A623] hover:text-white px-8 py-3 rounded-lg font-bold transition-colors duration-300"
          >
            View All Tours <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
