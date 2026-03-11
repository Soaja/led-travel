'use client';

import { useState } from 'react';
import { Star, Quote, Send, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const mockReviews = [
  {
    id: 1,
    name: "Marco Ricci",
    flag: "🇮🇹",
    city: "Milano",
    tour: "Istanbul Classics Full Day",
    text: "Il miglior tour che abbia mai fatto! La guida parlava perfettamente italiano e conosceva ogni angolo di Istanbul. Un'esperienza autentica e indimenticabile.",
    avatar: "https://picsum.photos/seed/marco/100/100",
    stars: 5,
    date: "October 2025"
  },
  {
    id: 2,
    name: "Sofia Ferretti",
    flag: "🇮🇹",
    city: "Roma",
    tour: "Cappadocia Hot Air Balloon",
    text: "La mongolfiera all'alba è stata magica. LED Travel ha organizzato tutto perfettamente, dall'hotel al trasferimento. Prenoto già il prossimo viaggio!",
    avatar: "https://picsum.photos/seed/sofia/100/100",
    stars: 5,
    date: "September 2025"
  },
  {
    id: 3,
    name: "James Thompson",
    flag: "🇬🇧",
    city: "London",
    tour: "Bosphorus Sunset Cruise",
    text: "Professional, punctual, and passionate guides. This is exactly how Turkey should be experienced — intimate, authentic, and absolutely stunning.",
    avatar: "https://picsum.photos/seed/james/100/100",
    stars: 5,
    date: "August 2025"
  },
  {
    id: 4,
    name: "Elena K.",
    flag: "🇩🇪",
    city: "Berlin",
    tour: "Ephesus Ancient City",
    text: "Walking through Ephesus with our guide was like stepping back in time. The knowledge and passion of the LED Travel team is unmatched.",
    avatar: "https://picsum.photos/seed/elena/100/100",
    stars: 5,
    date: "July 2025"
  },
  {
    id: 5,
    name: "David & Sarah",
    flag: "🇺🇸",
    city: "New York",
    tour: "Pamukkale Thermal Pools",
    text: "We had an amazing time. The private tour meant we could avoid the biggest crowds and take our time taking photos. Highly recommended!",
    avatar: "https://picsum.photos/seed/david/100/100",
    stars: 4,
    date: "June 2025"
  },
  {
    id: 6,
    name: "Lucia M.",
    flag: "🇪🇸",
    city: "Madrid",
    tour: "Antalya Coastal Tour",
    text: "Un viaje increíble. Todo estuvo organizado a la perfección. Los guías son muy amables y conocen los mejores lugares locales para comer.",
    avatar: "https://picsum.photos/seed/lucia/100/100",
    stars: 5,
    date: "May 2025"
  }
];

export default function ReviewsPage() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-[#1A1A2E] text-white pt-32 pb-16 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#F5A623 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-[#F5A623] font-bold tracking-wider uppercase text-sm mb-4 block">
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
          <div className="absolute top-0 left-0 w-full h-2 bg-[#F5A623]"></div>
          
          {isSubmitted ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
              <p className="text-gray-600 text-lg">
                Your review has been submitted successfully and is pending approval. We appreciate your feedback!
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-8 text-[#F5A623] font-bold hover:underline"
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
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#F5A623] focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="tour" className="text-sm font-bold text-gray-700">Tour Taken</label>
                    <input 
                      type="text" 
                      id="tour" 
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#F5A623] focus:border-transparent outline-none transition-all"
                      placeholder="e.g. Istanbul Full Day"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="review" className="text-sm font-bold text-gray-700">Your Review</label>
                  <textarea 
                    id="review" 
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#F5A623] focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us about your experience..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={rating === 0}
                  className="w-full bg-[#F5A623] hover:bg-[#e0961f] text-white font-bold py-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  Submit Review
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
              <Star className="w-6 h-6 text-[#F5A623] fill-current" />
              <span className="text-2xl font-bold text-gray-900">4.9</span>
              <span className="text-gray-500 text-sm">/ 5.0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockReviews.map((review) => (
              <div key={review.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative flex flex-col hover:shadow-md transition-shadow">
                <Quote className="absolute top-8 right-8 w-10 h-10 text-[#F5A623] opacity-10 rotate-180" />
                
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
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                        {review.name} <span>{review.flag}</span>
                      </div>
                      <div className="text-xs text-gray-500">{review.city}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-[#F5A623] max-w-[100px] truncate" title={review.tour}>
                      {review.tour}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{review.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Load More Button (Visual only) */}
          <div className="mt-12 text-center">
            <button className="border-2 border-gray-200 text-gray-600 hover:border-[#F5A623] hover:text-[#F5A623] font-bold py-3 px-8 rounded-lg transition-colors duration-300">
              Load More Reviews
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
