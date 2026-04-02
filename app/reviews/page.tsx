import { getRegionSummaries } from '@/lib/reviews';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MessageSquare, ChevronRight } from 'lucide-react';
import ReviewForm from '@/components/ReviewForm';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Reviews by Destination | LED Travel',
  description: 'Read verified traveler reviews for Istanbul, Cappadocia, Ephesus, Pamukkale, Antalya and Eastern Turkey tours.',
};

export default async function ReviewsPage() {
  const summaries = await getRegionSummaries();

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#1A1A2E] text-white pt-32 pb-16 mb-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(#E63946 2px, transparent 2px)', backgroundSize: '30px 30px' }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-[#E63946] font-bold tracking-wider uppercase text-sm mb-4 block">
            ■ Guest Experiences
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Traveler Reviews</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg font-light">
            Explore what our guests say about each destination. Choose a region to read all verified reviews.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">

        {/* Leave a Review form */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-10 mb-16 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#E63946]" />
          <ReviewForm />
        </div>

        {/* Destination cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {summaries.map(({ region, slug, image, count, avgRating, latestReview }) => (
            <Link key={slug} href={`/reviews/${slug}`} className="group block">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {/* Cover image */}
                <div className="relative h-52 overflow-hidden shrink-0">
                  <Image
                    src={image}
                    alt={region}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h2 className="text-white text-xl font-bold drop-shadow">{region}</h2>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col flex-grow">
                  {/* Stats row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-[#E63946]" />
                      <span className="text-sm font-bold text-gray-700">
                        {count} {count === 1 ? 'review' : 'reviews'}
                      </span>
                    </div>
                    {count > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-bold text-gray-700">{avgRating.toFixed(1)}</span>
                        <span className="text-xs text-gray-400">/ 5</span>
                      </div>
                    )}
                  </div>

                  {/* Latest review preview */}
                  <div className="flex-grow">
                    {latestReview ? (
                      <p className="text-gray-500 text-sm italic leading-relaxed line-clamp-2">
                        &quot;{latestReview.text.slice(0, 80)}{latestReview.text.length > 80 ? '…' : ''}&quot;
                      </p>
                    ) : (
                      <p className="text-gray-400 text-sm">No reviews yet for this destination.</p>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-1 mt-4 text-[#E63946] text-sm font-bold">
                    <span>Read all reviews</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
