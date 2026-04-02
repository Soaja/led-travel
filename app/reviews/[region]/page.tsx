import { getReviewsByRegion, REGIONS } from '@/lib/reviews';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Star, ArrowLeft, Quote } from 'lucide-react';

export const dynamic = 'force-dynamic';

const REGION_MAP = Object.fromEntries(REGIONS.map(r => [r.slug, r.name]));

export async function generateMetadata({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  const name = REGION_MAP[region];
  if (!name) return {};
  return {
    title: `${name} Reviews | LED Travel`,
    description: `Read verified traveler reviews for ${name} tours with LED Travel.`,
  };
}

export default async function RegionReviewsPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  const regionName = REGION_MAP[region];

  if (!regionName) notFound();

  const reviews = await getReviewsByRegion(region);

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length
      : 0;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#1A1A2E] text-white pt-32 pb-16 mb-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(#E63946 2px, transparent 2px)', backgroundSize: '30px 30px' }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            All destinations
          </Link>
          <div className="text-center">
            <span className="text-[#E63946] font-bold tracking-wider uppercase text-sm mb-4 block">
              ■ Guest Experiences
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{regionName}</h1>
            <div className="flex items-center justify-center gap-4 text-gray-300">
              <span>
                {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
              </span>
              {reviews.length > 0 && (
                <>
                  <span className="text-gray-600">·</span>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-white font-bold">{avgRating.toFixed(1)}</span>
                    <span className="text-gray-400 text-sm">/ 5.0 average</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {reviews.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg mb-6">No reviews yet for {regionName}.</p>
            <Link href="/reviews" className="text-[#E63946] font-bold hover:underline">
              ← Back to all destinations
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map(review => {
              const dateObj = new Date(review.created_at);
              const formattedDate = review.created_at
                ? dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                : '';

              return (
                <div
                  key={review.id}
                  className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 relative flex flex-col hover:shadow-lg transition-shadow duration-200"
                >
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-[#E63946] opacity-10 rotate-180" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i <= review.stars ? 'text-yellow-400 fill-current' : 'text-gray-200 fill-current'}`}
                      />
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-gray-700 text-base leading-relaxed italic flex-grow mb-6">
                    &quot;{review.text}&quot;
                  </p>

                  {/* Footer */}
                  <div className="border-t border-gray-100 pt-4 flex items-center justify-between gap-2">
                    <span className="font-bold text-gray-900 text-sm truncate">{review.name}</span>
                    {formattedDate && (
                      <span className="text-xs text-gray-400 shrink-0">{formattedDate}</span>
                    )}
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
