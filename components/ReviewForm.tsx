'use client';

import { useState } from 'react';
import { Star, Send, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [tour, setTour] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a rating.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const { error: supabaseError } = await supabase
        .from('reviews')
        .insert([{ name, tour, text, stars: rating }]);

      if (supabaseError) throw supabaseError;

      setIsSubmitted(true);
      setName('');
      setTour('');
      setText('');
      setRating(0);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to submit review. Please try again.';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-10">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
        <p className="text-gray-600 text-lg">
          Your review has been submitted and will appear under the correct destination.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-8 text-[#E63946] font-bold hover:underline"
        >
          Submit another review
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Leave a Review</h2>
        <p className="text-gray-500">How was your experience with LED Travel?</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Star rating */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`w-10 h-10 transition-colors duration-200 ${
                    star <= (hoveredRating || rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-sm text-gray-500 mt-3 font-medium">
            {rating === 0 ? 'Select a rating' : `You rated us ${rating} out of 5 stars`}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-bold text-gray-700">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#E63946] focus:border-transparent outline-none transition-all"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="tour" className="text-sm font-bold text-gray-700">Tour Taken</label>
            <input
              type="text"
              id="tour"
              value={tour}
              onChange={(e) => setTour(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#E63946] focus:border-transparent outline-none transition-all"
              placeholder="e.g. istanbul-old-city-tour-full-day"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="review" className="text-sm font-bold text-gray-700">Your Review</label>
          <textarea
            id="review"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#E63946] focus:border-transparent outline-none transition-all resize-none"
            placeholder="Tell us about your experience..."
          />
        </div>

        {error && (
          <div className="text-sm text-red-500 font-medium bg-red-50 p-3 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={rating === 0 || isSubmitting}
          className="w-full bg-[#E63946] hover:bg-[#D62828] text-white font-bold py-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </>
  );
}
