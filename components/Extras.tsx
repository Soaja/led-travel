'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Sparkles, HeartPulse, Send, CheckCircle2 } from 'lucide-react';

export default function Extras() {
  const [requestText, setRequestText] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText || !email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setRequestText('');
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1000);
  };

  return (
    <section id="extras" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#E63946] font-bold tracking-wider uppercase text-sm mb-4 block">
            ■ Beyond Travel
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Exclusive Extras
          </h2>
          <p className="text-gray-600 text-lg">
            Enhance your journey with our specialized premium services, from traditional relaxation to world-class medical tourism.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Hammam */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="relative h-64 overflow-hidden">
              <Image 
                src="https://picsum.photos/seed/hamam/800/600" 
                alt="Traditional Turkish Hammam" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-sm">
                <Sparkles className="w-6 h-6 text-[#E63946]" />
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Traditional Hammam</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Experience ultimate relaxation and cleansing in a historic, authentic Turkish bath. A centuries-old tradition for body and soul rejuvenation.
              </p>
              <button className="text-[#E63946] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn More <span className="text-xl">→</span>
              </button>
            </div>
          </motion.div>

          {/* Card 2: Aesthetic Surgery */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="relative h-64 overflow-hidden">
              <Image 
                src="https://picsum.photos/seed/aesthetic/800/600" 
                alt="Aesthetic & Medical Tourism" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-sm">
                <HeartPulse className="w-6 h-6 text-red-500" />
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Aesthetic & Wellness</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                World-class medical tourism in Turkey. We arrange top-tier hair transplants, dental care, and aesthetic procedures with trusted professionals.
              </p>
              <button className="text-[#E63946] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn More <span className="text-xl">→</span>
              </button>
            </div>
          </motion.div>

          {/* Card 3: Custom Request (Interactive) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#1A1A2E] rounded-2xl shadow-xl overflow-hidden flex flex-col relative"
          >
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#E63946 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
            
            <div className="p-8 flex flex-col flex-grow relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Custom Request</h3>
              <p className="text-gray-400 mb-6 text-sm">
                Looking for something specific? VIP transfers, private yachts, or special event planning? Let us know what you need.
              </p>

              {isSuccess ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Request Sent!</h4>
                  <p className="text-gray-400 text-sm">Our team will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex-grow flex flex-col gap-4">
                  <div>
                    <input 
                      type="email" 
                      placeholder="Your Email Address" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-transparent transition-all text-sm"
                    />
                  </div>
                  <div className="flex-grow">
                    <textarea 
                      placeholder="Tell us what you need..." 
                      value={requestText}
                      onChange={(e) => setRequestText(e.target.value)}
                      required
                      className="w-full h-full min-h-[120px] px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-transparent transition-all resize-none text-sm"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting || !requestText || !email}
                    className="w-full bg-[#E63946] hover:bg-[#D62828] text-white font-bold py-3.5 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Sending...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Request
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
