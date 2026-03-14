'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, animate } from 'motion/react';
import { GraduationCap, Heart, Users, Shield, Star, ArrowRight } from 'lucide-react';

function AnimatedCounter({ from = 0, to, suffix = "", duration = 2 }: { from?: number, to: number, suffix?: string, duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            const isFloat = to % 1 !== 0;
            nodeRef.current.textContent = (isFloat ? value.toFixed(1) : Math.round(value)) + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, suffix, duration, isInView]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
}

const features = [
  { icon: GraduationCap, title: "Licensed Guides", desc: "Officially certified by Turkish Ministry of Tourism" },
  { icon: Heart, title: "Handpicked Experiences", desc: "Every tour personally tested by our team" },
  { icon: Users, title: "Small Groups", desc: "Maximum 8 people for authentic experience" },
  { icon: Shield, title: "Secure Payment", desc: "100% secure, easy cancellation & full refund" }
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <span className="text-[#E63946] font-bold tracking-wider uppercase mb-3 block text-sm">
              WHY CHOOSE US
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Experience Turkey like a local, not a tourist.
            </h2>
            <p className="text-gray-500 text-lg mb-8">
              We believe travel should be authentic, immersive, and completely stress-free. Our deep local knowledge ensures you see the real Turkey, far beyond the typical tourist traps.
            </p>

            <div className="flex flex-col gap-0 mb-10">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                    <feature.icon className="w-6 h-6 text-[#E63946]" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-bold text-gray-900 text-base">{feature.title}</h3>
                    <p className="text-gray-500 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link 
              href="/about" 
              className="inline-flex items-center gap-2 border-2 border-[#E63946] text-[#E63946] hover:bg-[#E63946] hover:text-white px-8 py-3 rounded-lg font-bold transition-colors duration-300"
            >
              Learn More About Us <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col gap-6"
          >
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 z-10 relative">
              <div className="bg-white rounded-xl shadow-md p-4 text-center border border-gray-50">
                <div className="text-3xl font-bold text-[#E63946] mb-1">
                  <AnimatedCounter to={61} suffix="K+" />
                </div>
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Happy Guests</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 text-center border border-gray-50">
                <div className="text-3xl font-bold text-[#E63946] mb-1">
                  <AnimatedCounter to={4.9} suffix="★" />
                </div>
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Average Rating</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 text-center border border-gray-50">
                <div className="text-3xl font-bold text-[#E63946] mb-1">
                  <AnimatedCounter to={8} suffix="+" />
                </div>
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Years of Experience</div>
              </div>
            </div>

            {/* Main Image & Testimonial */}
            <div className="relative w-full mt-2">
              <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-lg">
                <Image 
                  src="https://picsum.photos/seed/turkey_landscape/800/1000" 
                  alt="Beautiful landscape of Turkey" 
                  fill 
                  className="object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Testimonial Card */}
              <div className="absolute -bottom-6 -left-4 md:-left-8 bg-white rounded-xl shadow-xl p-4 w-64 z-10 border border-gray-50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                    <Image 
                      src="https://picsum.photos/seed/avatar1/100/100" 
                      alt="Marco Rossi" 
                      fill 
                      className="object-cover" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm flex items-center gap-1">
                      Marco Rossi <span>🇮🇹</span>
                    </div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm italic">
                  &quot;An unforgettable experience! The local insights made all the difference.&quot;
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
