'use client';

import { useState, useEffect } from 'react';
import { Star, Quote, Send, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

// Initial mock reviews to show if DB is empty or loading
const mockReviews = [
  {
    id: '1',
    name: "Marco Ricci",
    tour: "Istanbul Classics Full Day",
    text: "Il miglior tour che abbia mai fatto! La guida parlava perfettamente italiano e conosceva ogni angolo di Istanbul. Un'esperienza autentica e indimenticabile.",
    stars: 5,
    created_at: new Date("2025-10-15").toISOString()
  },
  {
    id: '2',
    name: "Sofia Ferretti",
    tour: "Cappadocia Hot Air Balloon",
    text: "La mongolfiera all'alba è stata magica. LED Travel ha organizzato tutto perfettamente, dall'hotel al trasferimento. Prenoto già il prossimo viaggio!",
    stars: 5,
    created_at: new Date("2025-09-20").toISOString()
  },
  {
    id: '3',
    name: "James Thompson",
    tour: "Bosphorus Sunset Cruise",
    text: "Professional, punctual, and passionate guides. This is exactly how Turkey should be experienced — intimate, authentic, and absolutely stunning.",
    stars: 5,
    created_at: new Date("2025-08-10").toISOString()
  }
];

type Review = {
  id: string;
  name: string;
  tour: string;
  text: string;
  stars: number;
  created_at: string;
};

export default function ReviewsPage() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Form state
  const [name, setName] = useState('');
  const [tour, setTour] = useState('');
  const [text, setText] = useState('');

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setReviews(data);
      } else {
        // Fallback to mock reviews if DB is empty
        setReviews(mockReviews);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setReviews(mockReviews); // Fallback on error
    } finally {
      setIsLoading(false);
    }
  };

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
        .insert([
          {
            name,
            tour,
            text,
            stars: rating
          }
        ]);

      if (supabaseError) throw supabaseError;

      setIsSubmitted(true);
      // Reset form
      setName('');
      setTour('');
      setText('');
      setRating(0);
      
      // Refresh reviews list
      fetchReviews();
    } catch (err: any) {
      console.error('Review submission error:', err);
      setError(err.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate average rating
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, rev) => acc + rev.stars, 0) / reviews.length).toFixed(1)
    : "5.0";

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-[#1A1A2E] text-white pt-32 pb-16 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#E63946 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-[#E63946] font-bold tracking-wider uppercase text-sm mb-4 block">
            ■ Guest Experiences
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Traveler Reviews
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl font-light">
            Read what our guests have to say about their journeys with LED Travel, or share your own experience.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        
        {/* Leave a Review Box */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-10 mb-20 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#E63946]"></div>
          
          {isSubmitted ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
              <p className="text-gray-600 text-lg">
                Your review has been submitted successfully and is now visible on our site. We appreciate your feedback!
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-8 text-[#E63946] font-bold hover:underline"
              >
                Submit another review
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Leave a Review</h2>
                <p className="text-gray-500">How was your experience with LED Travel?</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Star Rating */}
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
                          className={`w-10 h-10 ${
                            star <= (hoveredRating || rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          } transition-colors duration-200`} 
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
                      placeholder="e.g. Istanbul Full Day"
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
                  ></textarea>
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
          )}
        </div>

        {/* Reviews Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">All Reviews</h2>
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-[#E63946] fill-current" />
              <span className="text-2xl font-bold text-gray-900">{avgRating}</span>
              <span className="text-gray-500 text-sm">/ 5.0</span>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-gray-500">Loading reviews...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review) => {
                // Generate a consistent random avatar based on the name
                const seed = review.name.replace(/\s+/g, '').toLowerCase() || 'user';
                const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundColor=F5A623`;
                
                // Format date
                const dateObj = new Date(review.created_at);
                const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

                return (
                  <div key={review.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative flex flex-col hover:shadow-md transition-shadow">
                    <Quote className="absolute top-8 right-8 w-10 h-10 text-[#E63946] opacity-10 rotate-180" />
                    
                    {/* Top: Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(review.stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    {/* Quote Text */}
                    <p className="text-gray-700 text-base leading-relaxed italic flex-grow mb-6">
                      &quot;{review.text}&quot;
                    </p>
                    
                    {/* Divider */}
                    <div className="border-t border-gray-50 my-4"></div>
                    
                    {/* Bottom Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-100 border border-gray-200">
                          <Image
                            src={avatarUrl}
                            alt={review.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                            {review.name}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-[#E63946] max-w-[100px] truncate" title={review.tour}>
                          {review.tour}
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{formattedDate}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
