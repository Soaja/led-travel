'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Linkedin, Mail } from 'lucide-react';

const teamMembers = [
  {
    name: 'Kadir Kılgı',
    role: 'Owner & Founder',
    image: 'https://picsum.photos/seed/kadir/600/800',
    description: 'Visionary leader with a passion for showcasing the authentic beauty of Turkey to the world.'
  },
  {
    name: 'Lara Gölel',
    role: 'Affiliate Partner & Intermediary for International Relations and Group Organizations',
    image: 'https://picsum.photos/seed/lara/600/800',
    description: 'Expert in building global partnerships and orchestrating seamless experiences for large groups.'
  },
  {
    name: 'Murat Kılgı',
    role: 'Affiliate Partner & Head of Reservations',
    image: 'https://picsum.photos/seed/murat/600/800',
    description: 'Ensures every booking is handled with precision, guaranteeing a flawless journey from start to finish.'
  },
  {
    name: 'Seyit Esen',
    role: 'Affiliate Partner & Collaborator',
    image: 'https://picsum.photos/seed/seyit/600/800',
    description: 'Dedicated to crafting unique itineraries and providing exceptional on-the-ground support.'
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
                  referrerPolicy="no-referrer"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/90 via-[#1A1A2E]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                
                {/* Social Links on Hover */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                  <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#E63946] transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#E63946] transition-colors">
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
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
