'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Mail } from 'lucide-react';

const teamMembers = [
  {
    name: 'Kadir Kılgı',
    role: 'Owner & Founder',
    email: 'kadir@ledtravel.net',
    image: '/images/aboutus3.webp',
    description: 'Visionary leader with a passion for showcasing the authentic beauty of Turkey to the world.'
  },
  {
    name: 'Lara Gölel',
    role: 'Affiliate partner & head of international relations',
    email: 'lara@ledtravel.net',
    image: '/images/aboutus5.jpg',
    description: 'Expert in building global partnerships and orchestrating seamless experiences for international clients.'
  },
  {
    name: 'Murat Kılgı',
    role: 'Affiliate partner & head of local service organizations',
    email: 'murat@ledtravel.net',
    image: '/images/aboutus4.jpg',
    description: 'Ensures every local service and organization is handled with precision for a flawless journey.'
  },
  {
    name: 'Seyit Esen',
    role: 'Affiliate partner & collaborator for external services',
    image: '/images/aboutus6.jpg',
    description: 'Dedicated to crafting unique itineraries and providing exceptional support through external services.'
  }
];

export default function Team() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#E63946] font-bold tracking-wider uppercase text-sm mb-4 block">
            ■ Meet The Experts
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A2E] mb-6">
            Our Dedicated Team
          </h2>
          <p className="text-gray-600 text-lg">
            The passionate individuals behind LED Travel, committed to making your Turkish adventure truly unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative"
            >
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden mb-6 shadow-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/90 via-[#1A1A2E]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                
                {/* Social Links on Hover */}
                {member.email && (
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                    <a href={`mailto:${member.email}`} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#E63946] transition-colors">
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                )}
              </div>
              
              <div className="text-center px-2">
                <h3 className="text-2xl font-bold text-[#1A1A2E] mb-2">{member.name}</h3>
                <p className="text-[#E63946] font-semibold text-sm uppercase tracking-wide mb-3 min-h-[40px] flex items-center justify-center">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
