'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Check, Search, X, MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Tour } from '@/lib/tours';

const DESTINATIONS = [
  'Istanbul', 'Cappadocia', 'Pamukkale',
  'Izmir-Ephesus', 'Antalya', 'Troy', 'Other Tours',
];

export default function Hero({ initialTours = [] }: { initialTours?: Tour[] }) {
  const router = useRouter();

  // Email form state
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Search state
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dropdownResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return initialTours
      .filter(t =>
        t.searchKeywords?.some(kw => kw.includes(q)) ||
        t.title.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [initialTours, query]);

  const showDropdown = isFocused;

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
      const { error } = await supabase.from('itinerary_requests').insert([{ email }]);
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
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-10 max-w-4xl leading-[1.15] drop-shadow-xl">
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

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: (headlineWords.length + 1) * 0.2 }}
          className="w-full max-w-2xl mb-8 relative"
          ref={searchRef}
        >
          <div className="relative flex items-center">
            <Search className="absolute left-5 w-5 h-5 text-gray-400 pointer-events-none z-10" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="Search tours or destinations… e.g. Istanbul, Bursa, Sapanca"
              className="w-full pl-14 pr-12 py-5 rounded-2xl bg-white/95 backdrop-blur-md text-gray-800 text-base shadow-2xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E63946]/40 transition font-medium"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
              {!query ? (
                /* Destination chips */
                <div className="p-4">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                    Browse by destination
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {DESTINATIONS.map(dest => (
                      <button
                        key={dest}
                        onMouseDown={() => {
                          setIsFocused(false);
                          setQuery('');
                          router.push(`/tours?region=${encodeURIComponent(dest)}`);
                        }}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50 hover:bg-[#E63946] hover:text-white text-gray-700 text-sm font-medium border border-gray-100 hover:border-[#E63946] transition-all duration-200 group"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#E63946] group-hover:text-white transition-colors" />
                        {dest}
                      </button>
                    ))}
                  </div>
                </div>
              ) : dropdownResults.length === 0 ? (
                /* No results */
                <div className="p-6 text-center text-gray-400 text-sm">
                  No tours found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                /* Tour results */
                <div className="py-2 max-h-[380px] overflow-y-auto">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 px-4 pt-2 pb-3">
                    {dropdownResults.length} tour{dropdownResults.length !== 1 ? 's' : ''} found
                  </p>
                  {dropdownResults.map(tour => (
                    <button
                      key={tour.id}
                      onMouseDown={() => {
                        router.push(`/tours/${tour.slug}`);
                        setIsFocused(false);
                        setQuery('');
                      }}
                      className="w-full flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                        <Image src={tour.image} alt={tour.title} fill unoptimized className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 line-clamp-1">{tour.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-flex items-center gap-1 text-xs text-[#E63946] font-medium">
                            <MapPin className="w-3 h-3" />{tour.region}
                          </span>
                          <span className="text-gray-300">·</span>
                          <span className="text-xs text-gray-500">
                            {tour.price ? `From €${tour.price}` : 'On request'}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: (headlineWords.length + 1) * 0.2 + 0.2 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center"
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
