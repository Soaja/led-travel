'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Compass, Heart, Shield, Users, Award, Map, ArrowRight } from 'lucide-react';

const stats = [
  { label: 'Years of Experience', value: '10+' },
  { label: 'Happy Travelers', value: '15,000+' },
  { label: 'Expert Local Guides', value: '50+' },
  { label: 'Average Rating', value: '4.9/5' },
];

const values = [
  {
    icon: <Compass className="w-8 h-8 text-[#F5A623]" />,
    title: 'Authentic Experiences',
    description: 'We go beyond the tourist traps to show you the real Turkey, connecting you with local culture and hidden gems.'
  },
  {
    icon: <Shield className="w-8 h-8 text-[#F5A623]" />,
    title: 'Uncompromising Quality',
    description: 'From luxury transport to hand-picked boutique hotels, every detail of your journey is meticulously planned.'
  },
  {
    icon: <Heart className="w-8 h-8 text-[#F5A623]" />,
    title: 'Personalized Care',
    description: 'Your journey is unique. We tailor every itinerary to your specific interests, pace, and travel style.'
  }
];

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center pt-24 overflow-hidden bg-[#1A1A2E]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#F5A623 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F5A623] text-sm font-bold tracking-wider uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse"></span>
                Our Story
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] to-yellow-300">Unforgettable</span> Turkish Journeys
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
                We are a team of passionate locals dedicated to showing you the authentic heart of Turkey through premium, private experiences.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl shadow-black/50"
            >
              <Image 
                src="https://picsum.photos/seed/turkey_about/1200/1600" 
                alt="Hot air balloons in Cappadocia" 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-transparent to-transparent opacity-80"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS SECTION (Overlapping) */}
      <section className="relative z-20 -mt-16 container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-gray-100">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-black text-[#1A1A2E] mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-gray-500 font-medium uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* OUR MISSION */}
      <section className="py-24 container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[600px] rounded-3xl overflow-hidden"
          >
            <Image 
              src="https://picsum.photos/seed/istanbul_street/800/1200" 
              alt="Istanbul Street" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 border-4 border-white/20 rounded-3xl m-4 z-10 pointer-events-none"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A2E] mb-6">More Than Just a Tour Agency</h2>
            <div className="w-20 h-2 bg-[#F5A623] mb-8"></div>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                LED Travel was born from a simple belief: the best way to experience a country is through the eyes of a local friend. We started as a small group of passionate Istanbulites who wanted to share the hidden courtyards, secret rooftop views, and authentic flavors that big bus tours always miss.
              </p>
              <p>
                Today, we are proud to be one of Turkey&apos;s leading boutique travel agencies. We don&apos;t just sell tours; we design experiences. Whether you are marveling at the ancient ruins of Ephesus, floating above the fairy chimneys of Cappadocia, or sailing the Bosphorus at sunset, we ensure every moment is magical.
              </p>
              <p className="font-medium text-gray-900 italic border-l-4 border-[#F5A623] pl-4 py-2">
                &quot;Our mission is to turn your Turkish vacation into a lifelong memory, crafted with care, expertise, and a touch of local magic.&quot;
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-[#1A1A2E] mb-4">Why Choose LED Travel?</h2>
            <p className="text-lg text-gray-600">We hold ourselves to the highest standards to ensure your journey is nothing short of perfection.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group"
              >
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#1A1A2E] mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#1A1A2E] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#F5A623 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Start Your Adventure?</h2>
              <p className="text-gray-300 text-lg mb-10">
                Let our experts design the perfect Turkish itinerary for you. No stress, just unforgettable memories.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/tours" 
                  className="w-full sm:w-auto bg-[#F5A623] hover:bg-[#e0961f] text-white font-bold py-4 px-8 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#F5A623]/20"
                >
                  Explore Tours <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="https://wa.me/905333811447" 
                  target="_blank"
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl backdrop-blur-md transition-colors duration-300 flex items-center justify-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
