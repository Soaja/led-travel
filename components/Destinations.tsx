'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const destinations = [
  { name: "Istanbul", tours: 24, startingFrom: 65, image: "istanbul", slug: "istanbul" },
  { name: "Cappadocia", tours: 12, startingFrom: 85, image: "cappadocia", slug: "cappadocia" },
  { name: "Antalya", tours: 8, startingFrom: 45, image: "antalya", slug: "antalya" },
  { name: "Ephesus", tours: 6, startingFrom: 55, image: "ephesus", slug: "ephesus" },
  { name: "Pamukkale", tours: 5, startingFrom: 70, image: "pamukkale", slug: "pamukkale" },
  { name: "Bodrum", tours: 7, startingFrom: 50, image: "bodrum", slug: "bodrum" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
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

export default function Destinations() {
  return (
    <section id="destinations" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-[#F5A623] font-bold tracking-wider uppercase mb-3 block text-sm">
              TOP DESTINATIONS
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Turkey&apos;s Most Beautiful Places
            </h2>
            <p className="text-gray-500 text-lg">
              From historic Istanbul to the fairy chimneys of Cappadocia
            </p>
          </div>
          <Link 
            href="/destinations" 
            className="flex items-center gap-2 text-[#F5A623] font-semibold hover:text-[#e0961f] transition-colors duration-300 group"
          >
            View all destinations
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Destinations Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {destinations.map((dest) => (
            <motion.div
              key={dest.slug}
              variants={cardVariants}
              className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/3] shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={`/images/destinations/${dest.slug}.jpg`}
                alt={dest.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-colors duration-300 group-hover:from-black/90 group-hover:via-black/30" />
              
              {/* Top Left Badge */}
              <div className="absolute top-4 left-4 bg-[#F5A623] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                {dest.tours} Tours
              </div>
              
              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 flex items-end justify-between">
                <div>
                  <h3 className="text-white text-2xl font-bold mb-1">
                    {dest.name}
                  </h3>
                  <p className="text-[#F5A623] text-lg font-semibold">
                    From €{dest.startingFrom}
                  </p>
                </div>
                
                {/* Hover Button */}
                <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <button className="bg-[#F5A623] text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-1 text-sm">
                    Explore <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
