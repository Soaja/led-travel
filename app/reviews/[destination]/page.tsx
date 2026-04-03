import { getReviewsByDestination } from '@/lib/reviews';
import Link from 'next/link';
import { Star, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

const SLUG_TO_DESTINATION: Record<string, string> = {
  istanbul: 'Istanbul',
  cappadocia: 'Cappadocia',
  ephesus: 'Ephesus',
  pamukkale: 'Pamukkale',
  antalya: 'Antalya',
  'eastern-turkey': 'Eastern Turkey',
};

export async function generateMetadata({ params }: { params: Promise<{ destination: string }> }) {
  const { destination: slug } = await params;
  const destination = SLUG_TO_DESTINATION[slug];
  if (!destination) return { title: 'Reviews | LED Travel' };
  return {
    title: `${destination} Reviews | LED Travel`,
    description: `Read verified traveler reviews for ${destination} tours by LED Travel.`,
  };
}

export default async function DestinationReviewsPage({
  params,
}: {
  params: Promise<{ destination: string }>;
}) {
  const { destination: slug } = await params;
  const destination = SLUG_TO_DESTINATION[slug];

  if (!destination) notFound();

  const reviews = await getReviewsByDestination(destination);
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{destination}</h1>
          <div className="flex items-center justify-center gap-4 text-gray-300">
            <span>{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</span>
            {reviews.length > 0 && (
              <>
                <span className="w-1 h-1 bg-gray-500 rounded-full" />
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  {avgRating.toFixed(1)} / 5
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Back button */}
        <div className="mb-8">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-[#E63946] font-bold hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all destinations
          </Link>
        </div>

        {reviews.length === 0 ? (
          <p className="text-center text-gray-400 text-lg py-20">
            No reviews yet for {destination}. Be the first to share your experience!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => {
              const date = review.created_at
                ? new Date(review.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })
                : '';

              return (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col"
                >
                  {/* Stars */}
                  <div className="flex text-yellow-400 mb-3">
                    {Array.from({ length: Math.min(Math.max(review.rating, 1), 5) }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 italic leading-relaxed flex-grow mb-4">
                    &quot;{review.comment}&quot;
                  </p>

                  {/* Author & date */}
                  <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                    <div className="w-10 h-10 rounded-full bg-[#E63946]/10 flex items-center justify-center shrink-0">
                      <span className="text-[#E63946] font-bold text-sm">
                        {review.author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900">{review.author}</p>
                      {date && <p className="text-xs text-gray-400">{date}</p>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
