'use client';

import { useState } from 'react';
import { Star, Send, CheckCircle2, MapPin, ChevronDown, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const LOCATIONS = [
  { label: 'Istanbul',       value: 'istanbul'        },
  { label: 'Cappadocia',     value: 'cappadocia'      },
  { label: 'Ephesus',        value: 'ephesus'         },
  { label: 'Pamukkale',      value: 'pamukkale'       },
  { label: 'Antalya',        value: 'antalya'         },
  { label: 'Eastern Turkey', value: 'eastern-turkey'  },
];

const STAR_LABELS = ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'];

export default function ReviewForm() {
  const [rating, setRating]               = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitted, setIsSubmitted]     = useState(false);
  const [isSubmitting, setIsSubmitting]   = useState(false);
  const [error, setError]                 = useState('');

  const [name,     setName]     = useState('');
  const [location, setLocation] = useState('');
  const [text,     setText]     = useState('');

  const activeRating = hoveredRating || rating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0)   { setError('Please select a star rating.');    return; }
    if (!location)      { setError('Please select a destination.');     return; }

    setIsSubmitting(true);
    setError('');

    try {
      const destinationLabel = LOCATIONS.find((l) => l.value === location)?.label || location;
      const { error: supabaseError } = await supabase
        .from('reviews')
        .insert([{
          tour_slug: location,
          destination: destinationLabel,
          author: name,
          rating,
          comment: text,
          approved: true,
        }]);

      if (supabaseError) throw supabaseError;

      setIsSubmitted(true);
      setName(''); setLocation(''); setText(''); setRating(0);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Thank you!</h2>
        <p className="text-gray-500 max-w-sm mx-auto">
          Your review has been submitted and will appear under the correct destination.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-8 text-[#E63946] font-bold text-sm hover:underline"
        >
          Submit another review
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-10">

      {/* Left panel */}
      <div className="md:w-56 shrink-0 flex flex-col justify-center">
        <span className="text-[#E63946] font-bold tracking-wider uppercase text-xs mb-3">■ Share Your Experience</span>
        <h2 className="text-2xl font-bold text-gray-900 leading-snug mb-4">
          How was your trip with LED Travel?
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          Your review helps other travelers and appears directly under the destination you visited.
        </p>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px bg-gray-100 self-stretch" />

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 space-y-5">

        {/* Star rating */}
        <div>
          <span className="text-sm font-bold text-gray-700 block mb-3">Your Rating</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
                className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
              >
                <Star
                  className={`w-9 h-9 transition-colors duration-150 ${
                    star <= activeRating ? 'text-yellow-400 fill-current' : 'text-gray-200 fill-current'
                  }`}
                />
              </button>
            ))}
            {activeRating > 0 && (
              <span className="ml-2 text-sm font-bold text-gray-500">
                {STAR_LABELS[activeRating]}
              </span>
            )}
          </div>
        </div>

        {/* Name + Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="rname" className="text-sm font-bold text-gray-700">Your Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                id="rname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E63946] focus:border-transparent outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="rlocation" className="text-sm font-bold text-gray-700">Destination</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E63946] pointer-events-none" />
              <select
                id="rlocation"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full pl-10 pr-9 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E63946] focus:border-transparent outline-none transition-all appearance-none bg-white text-sm text-gray-700"
              >
                <option value="" disabled>Select a destination…</option>
                {LOCATIONS.map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Review text */}
        <div className="space-y-1.5">
          <label htmlFor="rtext" className="text-sm font-bold text-gray-700">Your Review</label>
          <textarea
            id="rtext"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            required
            placeholder="Tell us about your experience…"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E63946] focus:border-transparent outline-none transition-all resize-none text-sm"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 font-medium bg-red-50 px-4 py-3 rounded-xl border border-red-100">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#E63946] hover:bg-[#D62828] text-white font-bold py-3.5 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          {isSubmitting ? 'Submitting…' : 'Submit Review'}
        </button>

      </form>
    </div>
  );
}
