'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Hero() {
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    try {
      const { error } = await supabase
        .from('itinerary_requests')
        .insert([{ email }]);

      if (error) throw error;

      setStatus('success');
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Failed to send request. Please try again.');
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[#1A1A2E]">
        <Image
          src="https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=1920&auto=format&fit=crop"
          alt="Istanbul skyline"
          fill
          className="object-cover"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/70 via-transparent to-[#1A1A2E]/50" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center w-full max-w-6xl mt-12">
        
        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-12 max-w-4xl leading-[1.15] drop-shadow-xl">
          {headlineWords.map((word, i) => (
            <span key={i} className="inline-block whitespace-pre">
              <motion.span
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                className="inline-block"
              >
                {word}
              </motion.span>
              {" "}
            </span>
          ))}
          <span className="inline-block whitespace-pre">
            <motion.span
              custom={headlineWords.length}
              initial="hidden"
              animate="visible"
              variants={wordVariants}
              className="text-white italic inline-block"
            >
              in Turkey
            </motion.span>
          </span>
        </h1>
        
        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: (headlineWords.length + 1) * 0.2 + 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto items-center"
        >
          <Link href="/tours" className="w-full sm:w-auto bg-[#E63946] hover:bg-[#D62828] text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#E63946]/20">
            Explore Tours <ArrowRight className="w-5 h-5" />
          </Link>
          
          {!isEmailOpen && status !== 'success' ? (
            <button 
              onClick={() => setIsEmailOpen(true)}
              className="w-full sm:w-auto bg-transparent border-2 border-white hover:bg-white hover:text-[#1A1A2E] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" /> Get free itinerary
            </button>
          ) : status === 'success' ? (
            <div className="w-full sm:w-auto bg-green-500/20 border-2 border-green-500 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 backdrop-blur-sm">
              <Check className="w-5 h-5" /> Sent! Check your inbox.
            </div>
          ) : (
            <motion.form 
              initial={{ opacity: 0, scale: 0.95, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleEmailSubmit} 
              className="flex flex-col sm:flex-row w-full sm:w-auto relative bg-white p-1.5 rounded-xl shadow-2xl ring-4 ring-white/20"
            >
              <div className="hidden sm:flex items-center pl-3 pr-1">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <input 
                type="email" 
                placeholder="Enter your email..." 
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                disabled={status === 'loading'}
                className="w-full sm:w-64 px-4 sm:px-2 py-3 sm:py-0 bg-transparent text-gray-900 focus:outline-none font-medium placeholder:text-gray-400"
                required
              />
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full sm:w-auto bg-[#E63946] hover:bg-[#D62828] text-white px-6 py-3 rounded-lg font-bold transition-colors duration-300 disabled:opacity-70 flex items-center justify-center whitespace-nowrap"
              >
                {status === 'loading' ? 'Sending...' : 'Send'}
              </button>
              {status === 'error' && (
                <div className="absolute -bottom-10 left-0 text-red-400 text-sm font-medium w-full text-center sm:text-left bg-black/60 px-3 py-1.5 rounded-md backdrop-blur-md">
                  {errorMessage}
                </div>
              )}
            </motion.form>
          )}
        </motion.div>

      </div>
    </section>
  );
}
