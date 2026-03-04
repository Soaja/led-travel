import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight, Star, Clock, Users, MapPin, Check, X as XIcon, Map as MapIcon } from 'lucide-react';
import TourGallery from '@/components/tour/TourGallery';
import { ItineraryAccordion, FaqAccordion } from '@/components/tour/Accordion';
import BookingCard from '@/components/tour/BookingCard';
import { getTourBySlug, getToursFromSheet } from '@/lib/tours';

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
  
  const itinerary = [
    { time: tour.startTime || '09:00 AM', location: 'Meeting Point', description: 'Meet your guide.' },
    { time: 'Mid-day', location: 'Main Attractions', description: `Explore the highlights of ${tour.title}.` },
    { time: tour.endTime || '05:00 PM', location: 'End of Tour', description: 'Tour concludes.' },
  ];
  const meetingPoint = `Central location in ${tour.region}`;
  const faqs = [
    { question: 'Is this a private tour?', answer: 'Yes, this is a private tour exclusively for your group.' },
    { question: 'Can we customize the itinerary?', answer: 'Absolutely! Since it is a private tour, we can adjust the pace and focus based on your preferences.' },
    { question: 'What should I bring?', answer: tour.whatToBring || 'Comfortable shoes, camera, and a smile!' },
  ];
  
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
      
      <div className="container mx-auto px-4 md:px-6 pt-24">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#F5A623]">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/tours" className="hover:text-[#F5A623]">Tours</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/tours?region=${tour.region}`} className="hover:text-[#F5A623]">{tour.region}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium truncate">{tour.title}</span>
        </nav>

        {/* Gallery */}
        <TourGallery images={images} />

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-12 mt-8">
          
          {/* Left Column */}
          <div className="flex-grow lg:w-2/3">
            <div className="mb-6">
              {tour.badge && (
                <span className="inline-block bg-[#F5A623] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
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
                  <Clock className="w-5 h-5 text-[#F5A623]" /> {tour.duration}
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-5 h-5 text-[#F5A623]" /> Max {maxGroupSize}
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-5 h-5 text-[#F5A623]" /> {tour.region}
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
                    <Check className="w-5 h-5 text-[#F5A623] shrink-0 mt-0.5" />
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Included / Not Included */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What&apos;s Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <ul className="flex flex-col gap-3">
                    {includedItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                    {includedItems.length === 0 && (
                      <li className="text-gray-500 italic">See full itinerary for details</li>
                    )}
                  </ul>
                </div>
                <div>
                  <ul className="flex flex-col gap-3">
                    {notIncludedItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <XIcon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-gray-500">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            {/* Itinerary */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Itinerary</h2>
              <ItineraryAccordion items={itinerary} />
            </div>

            {/* Meeting Point */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Meeting Point</h2>
              <div className="bg-gray-100 rounded-2xl h-64 w-full mb-4 relative overflow-hidden flex items-center justify-center border border-gray-200">
                {/* Placeholder for Map */}
                <MapIcon className="w-16 h-16 text-gray-300" />
                <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                  <span className="bg-white px-4 py-2 rounded-lg shadow-md font-medium text-gray-700 text-sm">Interactive Map</span>
                </div>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <MapPin className="w-6 h-6 text-[#F5A623] shrink-0" />
                <p>{meetingPoint}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            {/* FAQs */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <FaqAccordion items={faqs} />
            </div>

          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:w-1/3 relative">
            <BookingCard price={tour.price || 0} rating={tour.rating} reviewsCount={tour.reviews} title={tour.title} />
          </div>

        </div>

        {/* Reviews Section */}
        <div className="mt-20 border-t border-gray-200 pt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Guest Reviews</h2>
            <button className="text-[#F5A623] font-bold hover:underline hidden md:block">Read all 128 reviews →</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
              <div className="flex text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-gray-700 italic mb-6 line-clamp-4">&quot;Il miglior tour che abbia mai fatto! La guida parlava perfettamente italiano e conosceva ogni angolo di Istanbul. Un&apos;esperienza autentica e indimenticabile.&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 relative overflow-hidden">
                  <Image src="https://picsum.photos/seed/marco/100/100" alt="Marco" fill className="object-cover" />
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-900">Marco Ricci 🇮🇹</div>
                  <div className="text-xs text-gray-500">Milano</div>
                </div>
              </div>
            </div>
            {/* Review 2 */}
            <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
              <div className="flex text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-gray-700 italic mb-6 line-clamp-4">&quot;Professional, punctual, and passionate guides. This is exactly how Turkey should be experienced — intimate, authentic, and absolutely stunning.&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 relative overflow-hidden">
                  <Image src="https://picsum.photos/seed/james/100/100" alt="James" fill className="object-cover" />
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-900">James Thompson 🇬🇧</div>
                  <div className="text-xs text-gray-500">London</div>
                </div>
              </div>
            </div>
            {/* Review 3 */}
            <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
              <div className="flex text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-gray-700 italic mb-6 line-clamp-4">&quot;Incredible day exploring the old city. The skip-the-line access saved us hours, and our guide was a wealth of knowledge.&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 relative overflow-hidden">
                  <Image src="https://picsum.photos/seed/sarah/100/100" alt="Sarah" fill className="object-cover" />
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-900">Sarah Jenkins 🇺🇸</div>
                  <div className="text-xs text-gray-500">New York</div>
                </div>
              </div>
            </div>
          </div>
          <button className="text-[#F5A623] font-bold hover:underline mt-6 md:hidden">Read all 128 reviews →</button>
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
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  {relatedTour.badge && (
                    <div className="absolute top-3 left-3 bg-[#F5A623] text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {relatedTour.badge}
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#F5A623]" /> {relatedTour.region}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#F5A623]" /> {relatedTour.duration}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-[#F5A623] transition-colors">
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
