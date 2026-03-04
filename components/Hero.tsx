'use client';

import HeroBackground from './HeroBackground';
import { motion } from 'motion/react';
import { MapPin, Calendar, Compass, ArrowRight, Star, Users, ShieldCheck, Zap, Plane, Mail } from 'lucide-react';

export default function Hero() {
  const headlineWords = "Light up your holidays".split(" ");
  
  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9] as const,
      },
    }),
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <HeroBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/70 via-transparent to-[#1A1A2E]/50" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center w-full max-w-6xl mt-12">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#F5A623]/20 border border-[#F5A623]/50 text-[#F5A623] px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase mb-6 flex items-center gap-2 backdrop-blur-sm"
        >
          <Plane className="w-4 h-4" />
          Guided Private Experiences
        </motion.div>
        
        {/* Headline */}
        <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-5xl leading-tight">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={wordVariants}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
          <motion.span
            custom={headlineWords.length}
            initial="hidden"
            animate="visible"
            variants={wordVariants}
            className="text-white italic inline-block"
          >
            in Turkey
          </motion.span>
        </h1>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: (headlineWords.length + 1) * 0.2 }}
          className="text-xl text-white opacity-90 mb-10 max-w-2xl font-light"
        >
          Private tours in Istanbul, Cappadocia &amp; beyond — guided by locals
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: (headlineWords.length + 1) * 0.2 + 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto"
        >
          <button className="bg-[#F5A623] hover:bg-[#e0961f] text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#F5A623]/20">
            Explore Tours <ArrowRight className="w-5 h-5" />
          </button>
          <button className="bg-transparent border-2 border-white hover:bg-white hover:text-[#1A1A2E] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2">
            <Mail className="w-5 h-5" /> Get free itinerary
          </button>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="w-full bg-white rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col md:flex-row gap-4 items-center mb-10"
        >
          <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-0 w-full border-b md:border-b-0 md:border-r border-gray-200">
            <MapPin className="text-[#F5A623] w-6 h-6 shrink-0" />
            <div className="flex flex-col items-start w-full">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Destination</span>
              <select className="w-full outline-none text-[#1A1A2E] font-medium bg-transparent cursor-pointer appearance-none">
                <option value="all">All Destinations</option>
                <option value="istanbul">Istanbul</option>
                <option value="cappadocia">Cappadocia</option>
                <option value="antalya">Antalya</option>
                <option value="ephesus">Ephesus</option>
                <option value="pamukkale">Pamukkale</option>
              </select>
            </div>
          </div>
          
          <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-0 w-full border-b md:border-b-0 md:border-r border-gray-200">
            <Calendar className="text-[#F5A623] w-6 h-6 shrink-0" />
            <div className="flex flex-col items-start w-full">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Date</span>
              <input 
                type="date" 
                placeholder="When do you want to go?" 
                className="w-full outline-none text-[#1A1A2E] font-medium placeholder:text-gray-400 bg-transparent cursor-pointer"
              />
            </div>
          </div>

          <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-0 w-full border-b md:border-b-0 md:border-r md:border-transparent border-gray-200">
            <Compass className="text-[#F5A623] w-6 h-6 shrink-0" />
            <div className="flex flex-col items-start w-full">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Tour Type</span>
              <select className="w-full outline-none text-[#1A1A2E] font-medium bg-transparent cursor-pointer appearance-none">
                <option value="all">All Tours</option>
                <option value="private">Private</option>
                <option value="group">Group</option>
                <option value="day-trip">Day Trip</option>
                <option value="multi-day">Multi-day</option>
              </select>
            </div>
          </div>

          <button className="w-full md:w-auto bg-[#F5A623] hover:bg-[#e0961f] text-white px-8 py-4 md:py-5 rounded-xl font-bold transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#F5A623]/20 shrink-0 h-full">
            <span>Find Tours</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10 w-full"
        >
          <div className="flex items-center gap-2 text-white text-sm font-medium">
            <Star className="w-5 h-5 text-[#F5A623] fill-[#F5A623]" />
            <span>4.9 Rating</span>
          </div>
          <div className="flex items-center gap-2 text-white text-sm font-medium">
            <Users className="w-5 h-5 text-[#F5A623]" />
            <span>61K+ Happy Guests</span>
          </div>
          <div className="flex items-center gap-2 text-white text-sm font-medium">
            <ShieldCheck className="w-5 h-5 text-[#F5A623]" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2 text-white text-sm font-medium">
            <Zap className="w-5 h-5 text-[#F5A623]" />
            <span>Instant Confirmation</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
