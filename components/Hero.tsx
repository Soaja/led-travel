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

const STATS = [
  { value: '4.9★', label: 'Verified Rating' },
  { value: '15,000+', label: 'Happy Travelers' },
  { value: '10+', label: 'Years Experience' },
  { value: '100%', label: 'Private Tours' },
];

export default function Hero({ initialTours = [] }: { initialTours?: Tour[] }) {
  const router = useRouter();

  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);

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
    if (!q || q.length < 2) return [];

    return initialTours
      .map(t => {
        const titleL  = t.title.toLowerCase();
        const regionL = t.region.toLowerCase();
        let score = 0;

        if (titleL.startsWith(q))                                  score = 100;
        else if (regionL.startsWith(q))                            score = 90;
        else if (titleL.includes(q))                               score = 70;
        else if (regionL.includes(q))                              score = 60;
        else if (t.shortDescription?.toLowerCase().includes(q))    score = 40;
        else if (t.highlights?.toLowerCase().includes(q))          score = 30;
        else if (t.searchKeywords?.some(kw => kw.startsWith(q)))   score = 20;
        else if (t.searchKeywords?.some(kw => kw.includes(q)))     score = 10;

        return { tour: t, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ tour }) => tour)
      .slice(0, 6);
  }, [initialTours, query]);

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
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 bg-[#1A1A2E]">
        <Image
          src="https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=1920&auto=format&fit=crop"
          alt="Istanbul skyline"
          fill
          className="object-cover object-center scale-105"
          priority
          referrerPolicy="no-referrer"
        />
        {/* Layered overlays for depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/80 via-[#1A1A2E]/30 to-[#1A1A2E]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E]/50 via-transparent to-transparent" />
        {/* Subtle dot texture */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-32 pb-16 text-center">

        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[11px] font-bold tracking-[0.18em] uppercase px-5 py-2.5 rounded-full mb-8 shadow-lg"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] animate-pulse shrink-0" />
          Premium Private Tours in Turkey
          <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] animate-pulse shrink-0" />
        </motion.div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.25] pb-2 drop-shadow-2xl max-w-5xl">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="block"
          >
            Light up your
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.35, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="block"
          >
            holidays in{' '}
            <span className="text-[#E63946] italic">
              Turkey
            </span>
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-lg md:text-xl text-white/65 mb-10 max-w-xl leading-relaxed font-light"
        >
          Tailored private tours crafted for curious travelers who want more than the ordinary.
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="w-full max-w-2xl mb-4 relative"
          ref={searchRef}
        >
          <div className="relative flex items-center">
            <Search className="absolute left-5 w-5 h-5 text-gray-400 pointer-events-none z-10" />
            <input
              ref={heroInputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onKeyDown={e => {
                if (e.key === 'Enter' && query.trim().length >= 2) {
                  setIsFocused(false);
                  heroInputRef.current?.blur();
                  router.push(`/tours`);
                }
                if (e.key === 'Escape') { setQuery(''); setIsFocused(false); }
              }}
              placeholder="Search tours… e.g. Istanbul, Bursa, Cappadocia"
              className="w-full pl-14 pr-12 py-[1.1rem] rounded-2xl bg-white text-gray-800 text-base shadow-2xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E63946]/35 transition-all font-medium"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-4 p-1.5 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Clear">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Dropdown */}
          {isFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden text-left">
              {!query || query.trim().length < 2 ? (
                <div className="p-4">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Browse by destination</p>
                  <div className="flex flex-wrap gap-2">
                    {DESTINATIONS.map(dest => (
                      <button
                        key={dest}
                        onMouseDown={() => { setIsFocused(false); setQuery(''); router.push(`/tours?region=${encodeURIComponent(dest)}`); }}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50 hover:bg-[#E63946] hover:text-white text-gray-700 text-sm font-medium border border-gray-100 hover:border-[#E63946] transition-all duration-200 group"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#E63946] group-hover:text-white transition-colors" />
                        {dest}
                      </button>
                    ))}
                  </div>
                </div>
              ) : dropdownResults.length === 0 ? (
                <div className="p-6 text-center text-gray-400 text-sm">No tours found for &ldquo;{query}&rdquo;</div>
              ) : (
                <div className="py-2 max-h-[360px] overflow-y-auto">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 px-4 pt-2 pb-3">
                    {dropdownResults.length} tour{dropdownResults.length !== 1 ? 's' : ''} found
                  </p>
                  {dropdownResults.map(tour => (
                    <button
                      key={tour.id}
                      onMouseDown={() => { router.push(`/tours/${tour.slug}`); setIsFocused(false); setQuery(''); }}
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
                          <span className="text-xs text-gray-500">{tour.price ? `From €${tour.price}` : 'On request'}</span>
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

        {/* Always-visible destination chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {DESTINATIONS.map(dest => (
            <Link
              key={dest}
              href={`/tours?region=${encodeURIComponent(dest)}`}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 hover:border-white/35 text-white/80 hover:text-white text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all duration-200"
            >
              <MapPin className="w-3 h-3 text-[#E63946] shrink-0" />
              {dest}
            </Link>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Link
            href="/tours"
            className="w-full sm:w-auto bg-[#E63946] hover:bg-[#D62828] text-white px-9 py-4 rounded-xl font-bold transition-colors duration-300 flex items-center justify-center gap-2 shadow-2xl shadow-[#E63946]/40 text-base"
          >
            Explore Tours <ArrowRight className="w-5 h-5" />
          </Link>

          {!isEmailOpen && status !== 'success' ? (
            <button
              onClick={() => setIsEmailOpen(true)}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/30 hover:border-white/60 text-white px-9 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 text-base"
            >
              <Mail className="w-5 h-5" /> Get free itinerary
            </button>
          ) : status === 'success' ? (
            <div className="w-full sm:w-auto bg-green-500/20 border-2 border-green-400 text-white px-9 py-4 rounded-xl font-bold flex items-center justify-center gap-2 backdrop-blur-sm">
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
                onChange={e => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
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
                <div className="absolute -bottom-10 left-0 text-red-400 text-sm font-medium w-full text-center bg-black/60 px-3 py-1.5 rounded-md backdrop-blur-md">
                  {errorMessage}
                </div>
              )}
            </motion.form>
          )}
        </motion.div>

      </div>

      {/* ── Stats strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        className="relative z-10 border-t border-white/10 bg-[#1A1A2E]/70 backdrop-blur-md"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center py-5 px-4 gap-0.5">
                <span className="text-white text-2xl font-black leading-none">{stat.value}</span>
                <span className="text-white/45 text-[11px] font-semibold tracking-wider uppercase mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </section>
  );
}
