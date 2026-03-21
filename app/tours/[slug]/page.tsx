import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight, Star, Clock, Users, MapPin, Check, X as XIcon, Map as MapIcon } from 'lucide-react';
import TourGallery from '@/components/tour/TourGallery';
import BookingCard from '@/components/tour/BookingCard';
import { getTourBySlug, getToursFromSheet } from '@/lib/tours';
import { STATIC_REVIEWS } from '@/lib/reviews';

export async function generateStaticParams() {
  const tours = await getToursFromSheet();
  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  
  if (!tour) {
    return {
      title: 'Tour Not Found | LED Travel',
    };
  }

  return {
    title: `${tour.title} | LED Travel`,
    description: tour.includes || `Experience ${tour.title} with LED Travel.`,
  };
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  // Parse includes into an array
  const includedItems = tour.includes ? tour.includes.split('|').map(i => i.trim()).filter(Boolean) : [];
  const notIncludedItems = tour.notIncluded ? tour.notIncluded.split('|').map(i => i.trim()).filter(Boolean) : [
    'Gratuities (optional)',
    'Personal expenses',
  ];
  const highlightsList = tour.highlights ? tour.highlights.split('|').map(i => i.trim()).filter(Boolean) : [
    `Explore the best of ${tour.region}`,
    'Private guide dedicated only to your group',
    'Flexible itinerary tailored to your pace',
    'Authentic local experience'
  ];
  
  const description = tour.shortDescription || `Experience the best of ${tour.region} with our ${tour.title}. This premium tour is designed to give you an unforgettable experience.`;
  const maxGroupSize = 8;
  
  const itineraryItems = tour.itinerary
    ? tour.itinerary.split('|').map(i => i.trim()).filter(Boolean)
    : [];
  const meetingPoint = `Central location in ${tour.region}`;
  
  let images = [tour.image];
  if (tour.galleryImages) {
    const gallery = tour.galleryImages.split('|').map(i => i.trim()).filter(Boolean);
    if (gallery.length > 0) {
      images = [tour.image, ...gallery];
    }
  }
  
  // Fallback images if we don't have enough
  while (images.length < 4) {
    images.push(`https://picsum.photos/seed/${tour.slug}${images.length}/800/600`);
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.title,
    description: description,
    touristType: [
      "Private",
      "Small Group"
    ],
    offers: {
      '@type': 'Offer',
      price: tour.price || 0,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
    provider: {
      '@type': 'Organization',
      name: 'LED Travel',
      url: 'https://ledtravel.com'
    }
  };

  // Fetch all tours to find related ones
  const allTours = await getToursFromSheet();
  const relatedTours = allTours
    .filter(t => t.region === tour.region && t.slug !== tour.slug)
    .slice(0, 3);
  
  // If we don't have enough related tours in the same region, just grab some random ones
  if (relatedTours.length < 3) {
    const otherTours = allTours
      .filter(t => t.slug !== tour.slug && !relatedTours.find(rt => rt.slug === t.slug))
      .slice(0, 3 - relatedTours.length);
    relatedTours.push(...otherTours);
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Dark Header Background for Navbar */}
      <div className="bg-[#1A1A2E] pt-32 pb-8 mb-8">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-[#E63946] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/tours" className="hover:text-[#E63946] transition-colors">Tours</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/tours?region=${tour.region}`} className="hover:text-[#E63946] transition-colors">{tour.region}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium truncate">{tour.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Gallery */}
        <TourGallery images={images} />

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-12 mt-8">
          
          {/* Left Column */}
          <div className="flex-grow lg:w-2/3">
            <div className="mb-6">
              {tour.badge && (
                <span className="inline-block bg-[#E63946] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                  ■ {tour.badge}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{tour.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-1 font-bold">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  {tour.rating} <span className="text-gray-500 font-normal underline cursor-pointer">({tour.reviews} reviews)</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-5 h-5 text-[#E63946]" /> {tour.duration}
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-5 h-5 text-[#E63946]" /> Max {maxGroupSize}
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-5 h-5 text-[#E63946]" /> {tour.region}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{description}</p>
            </div>

            {/* Highlights */}
            <div className="mb-10 bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tour Highlights</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {highlightsList.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-gray-900 font-bold shrink-0 mt-0.5">•</span>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Included / Not Included */}
            <div className="mb-12 rounded-3xl overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Included */}
                <div className="p-8 md:p-10 bg-gradient-to-br from-emerald-50/80 via-white to-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-200/30 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3 relative z-10">
                    <span className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm shadow-emerald-200">
                      <Check className="w-5 h-5" />
                    </span>
                    What&apos;s Included
                  </h3>
                  <ul className="flex flex-col gap-4 relative z-10">
                    {includedItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium">{item}</span>
                      </li>
                    ))}
                    {includedItems.length === 0 && (
                      <li className="text-gray-500 italic">See full itinerary for details</li>
                    )}
                  </ul>
                </div>

                {/* Not Included */}
                <div className="p-8 md:p-10 bg-gradient-to-br from-rose-50/60 via-white to-white border-t md:border-t-0 md:border-l border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-rose-200/30 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3 relative z-10">
                    <span className="w-10 h-10 rounded-full bg-rose-400 flex items-center justify-center text-white shadow-sm shadow-rose-200">
                      <XIcon className="w-5 h-5" />
                    </span>
                    Not Included
                  </h3>
                  <ul className="flex flex-col gap-4 relative z-10">
                    {notIncludedItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4 opacity-80">
                        <XIcon className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                        <span className="text-gray-500">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            {/* Itinerary */}
            {itineraryItems.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Itinerary</h2>
                <div className="border border-gray-100 rounded-2xl overflow-hidden">
                  {itineraryItems.map((item, idx) => (
                    <div key={idx}>
                      <div className="px-6 py-4 text-gray-700 leading-relaxed">
                        {item}
                      </div>
                      {idx < itineraryItems.length - 1 && (
                        <hr className="border-gray-100" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}


          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:w-1/3 relative">
            <BookingCard price={tour.price} rating={tour.rating} reviewsCount={tour.reviews} title={tour.title} />
          </div>

        </div>

        {/* Reviews Section */}
        <div className="mt-20 border-t border-gray-200 pt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Guest Reviews</h2>
            <Link href="/reviews" className="text-[#E63946] font-bold hover:underline hidden md:block">Read all 128 reviews →</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STATIC_REVIEWS.map((review) => (
              <div key={review.id} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(review.stars)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-700 italic mb-6 line-clamp-4">&quot;{review.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 relative overflow-hidden">
                    <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-900">{review.name} {review.flag}</div>
                    <div className="text-xs text-gray-500">{review.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/reviews" className="text-[#E63946] font-bold hover:underline mt-6 md:hidden block text-center">Read all 128 reviews →</Link>
        </div>

        {/* Related Tours */}
        <div className="mt-20 border-t border-gray-200 pt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTours.map((relatedTour) => (
              <Link href={`/tours/${relatedTour.slug}`} key={relatedTour.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100 group cursor-pointer flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image 
                    src={relatedTour.image}
                    alt={relatedTour.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  {relatedTour.badge && (
                    <div className="absolute top-3 left-3 bg-[#E63946] text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {relatedTour.badge}
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#E63946]" /> {relatedTour.region}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#E63946]" /> {relatedTour.duration}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-[#E63946] transition-colors">
                    {relatedTour.title}
                  </h3>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-sm font-bold">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" /> {relatedTour.rating}
                    </div>
                    <div className="font-bold text-gray-900">
                      {relatedTour.price ? `From €${relatedTour.price.toFixed(2)}` : 'On request'}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
