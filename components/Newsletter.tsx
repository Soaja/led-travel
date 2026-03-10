'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    // TODO: Connect to Mailchimp / ConvertKit API here
    // Example: await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/seed/istanbul_night/1920/1080"
          alt="Istanbul at night"
          fill
          className="object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[#1A1A2E]/85" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center flex flex-col items-center"
        >
          {/* 1. Small orange label pill */}
          <div className="bg-[#F5A623]/20 border border-[#F5A623]/50 text-[#F5A623] px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6 flex items-center gap-2 backdrop-blur-sm">
            <span>■</span> EXCLUSIVE GIFT
          </div>

          {/* 2. H2 */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Your free 3-day Istanbul itinerary
          </h2>

          {/* 3. Subtitle */}
          <p className="text-gray-300 text-lg mb-8 font-light">
            Created by our local experts — updated for 2026
          </p>

          {/* 4. BENEFIT PILLS */}
          <div className="flex flex-col md:flex-row gap-3 mb-10 w-full justify-center">
            <div className="bg-white/10 backdrop-blur rounded-full px-4 py-2 text-white text-sm flex items-center justify-center gap-2">
              <span className="text-[#F5A623] font-bold">✓</span> Hidden gems tourists don&apos;t know about
            </div>
            <div className="bg-white/10 backdrop-blur rounded-full px-4 py-2 text-white text-sm flex items-center justify-center gap-2">
              <span className="text-[#F5A623] font-bold">✓</span> Best restaurants by neighborhood
            </div>
            <div className="bg-white/10 backdrop-blur rounded-full px-4 py-2 text-white text-sm flex items-center justify-center gap-2">
              <span className="text-[#F5A623] font-bold">✓</span> Perfect timing to avoid the crowds
            </div>
          </div>

          {/* 5. SOCIAL PROOF LINE */}
          <div className="text-[#F5A623] text-sm font-medium mb-6 flex items-center justify-center gap-2">
            <span>■</span> Already used by 12,000+ travelers
          </div>

          {/* 6. EMAIL FORM */}
          <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mb-4 relative">
            <div className="flex flex-col md:flex-row w-full gap-3 md:gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Your email address"
                className="flex-1 bg-white text-gray-900 rounded-lg md:rounded-r-none md:rounded-l-lg px-6 py-4 outline-none focus:ring-2 focus:ring-[#F5A623] placeholder:text-gray-400 font-medium"
                disabled={status === 'loading' || status === 'success'}
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="bg-[#F5A623] hover:bg-[#e0961f] text-white font-bold px-8 py-4 rounded-lg md:rounded-l-none md:rounded-r-lg transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70 whitespace-nowrap"
              >
                {status === 'loading' ? 'Sending...' : 'Download for Free →'}
              </button>
            </div>
            
            {/* Form Messages */}
            {status === 'error' && (
              <div className="absolute -bottom-8 left-0 w-full text-red-400 text-sm font-medium">
                {errorMessage}
              </div>
            )}
            {status === 'success' && (
              <div className="absolute -bottom-8 left-0 w-full text-green-400 text-sm font-medium flex items-center justify-center gap-2">
                <span>■</span> Check your email!
              </div>
            )}
          </form>

          {/* 7. TRUST LINE */}
          <div className="text-white/50 text-xs mt-8 flex items-center justify-center gap-1.5">
            <span>■</span> No spam. Unsubscribe anytime.
          </div>

        </motion.div>
      </div>
    </section>
  );
}
