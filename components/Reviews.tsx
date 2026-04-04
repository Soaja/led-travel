'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Quote, ArrowRight } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Marco Ricci",
    flag: "🇮🇹",
    city: "Milano",
    tour: "Istanbul Classics Full Day",
    text: "Il miglior tour che abbia mai fatto! La guida parlava perfettamente italiano e conosceva ogni angolo di Istanbul. Un'esperienza autentica e indimenticabile.",
    avatar: "https://picsum.photos/seed/marco/100/100",
    stars: 5,
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
  },
  {
    id: 4,
    name: "Elena Rossi",
    flag: "🇮🇹",
    city: "Napoli",
    tour: "Istanbul Old City Tour",
    text: "La Moschea Blu e Santa Sofia mi hanno lasciata senza parole. La guida è stata eccezionale, piena di aneddoti storici e curiosità su Istanbul.",
    avatar: "https://picsum.photos/seed/elena/100/100",
    stars: 5,
  },
  {
    id: 5,
    name: "Giulia Marchetti",
    flag: "🇮🇹",
    city: "Firenze",
    tour: "Pamukkale Full Day Tour",
    text: "Le terrazze di travertino bianco di Pamukkale sono un sogno ad occhi aperti. Un luogo assolutamente unico al mondo, da non perdere assolutamente!",
    avatar: "https://picsum.photos/seed/giulia/100/100",
    stars: 5,
  },
  {
    id: 6,
    name: "Emma Williams",
    flag: "🇬🇧",
    city: "Manchester",
    tour: "Ephesus Full Day Tour",
    text: "Walking through ancient Ephesus was like stepping back in time. Our guide brought every ruin to life with fascinating stories about Roman history.",
    avatar: "https://picsum.photos/seed/emma/100/100",
    stars: 5,
  },
  {
    id: 7,
    name: "Lena Schmidt",
    flag: "🇩🇪",
    city: "München",
    tour: "Izmir City and Agora Tour",
    text: "Izmir hat mich komplett überrascht — lebhafte Atmosphäre, wunderschöner Hafen und die antiken Ruinen von Ephesus direkt vor der Tür. Unvergesslich!",
    avatar: "https://picsum.photos/seed/lena/100/100",
    stars: 5,
  },
  {
    id: 8,
    name: "Sophie Bernard",
    flag: "🇫🇷",
    city: "Lyon",
    tour: "Antalya Old Town and Waterfalls",
    text: "Antalya est une ville magnifique — la vieille ville Kaleiçi, les chutes d'eau et la mer turquoise. LED Travel a rendu cette journée parfaite.",
    avatar: "https://picsum.photos/seed/sophie/100/100",
    stars: 5,
  },
  {
    id: 9,
    name: "Pierre Dubois",
    flag: "🇫🇷",
    city: "Paris",
    tour: "Troy and Gallipoli Day Trip",
    text: "Visiter Troie était un rêve d'enfance réalisé. Notre guide connaissait l'Iliade sur le bout des doigts — une expérience historique inoubliable.",
    avatar: "https://picsum.photos/seed/pierre/100/100",
    stars: 5,
  },
  {
    id: 10,
    name: "Carlos García",
    flag: "🇪🇸",
    city: "Madrid",
    tour: "Cappadocia Valley Hike",
    text: "Los paisajes de Capadocia parecen de otro planeta. Los valles, las chimeneas de hadas y los pueblos en roca son simplemente increíbles.",
    avatar: "https://picsum.photos/seed/carlos/100/100",
    stars: 5,
  },
];

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="flex-shrink-0 w-80 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:bg-white/8 hover:border-white/20 transition-colors duration-300">
      <Quote className="w-8 h-8 text-[#E63946] opacity-60" />
      <p className="text-gray-300 text-sm leading-relaxed line-clamp-4 flex-grow">
        {review.text}
      </p>
      <div className="flex gap-0.5 mt-auto">
        {[...Array(review.stars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
      </div>
      <div className="flex items-center gap-3 pt-3 border-t border-white/10">
        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-white/20">
          <Image
            src={review.avatar}
            alt={review.name}
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <div className="text-white font-semibold text-sm flex items-center gap-1.5">
            {review.name} <span>{review.flag}</span>
          </div>
          <div className="text-gray-500 text-xs">{review.city} · {review.tour}</div>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  const row1 = [...reviews, ...reviews];
  const row2 = [...reviews.slice(5), ...reviews.slice(0, 5), ...reviews.slice(5), ...reviews.slice(0, 5)];

  return (
    <section id="reviews" className="py-24 bg-[#0D0D1F] overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-4 md:px-6 text-center mb-16">
        <span className="text-[#E63946] font-bold tracking-wider uppercase text-sm mb-4 block">
          ■ Guest Experiences
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          What Our Travelers Say
        </h2>
        <p className="text-gray-400 mb-10 max-w-xl mx-auto">
          Real experiences from real travelers across Turkey
        </p>

        {/* Rating badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
          </div>
          <span className="text-white font-bold text-lg">4.9</span>
          <span className="text-gray-500">·</span>
          <span className="text-gray-300 text-sm">1,847 reviews</span>
          <span className="text-gray-500">·</span>
          <span className="text-gray-400 text-sm">Google &amp; TripAdvisor</span>
        </div>
      </div>

      {/* Row 1 — left to right */}
      <div className="overflow-hidden mb-5">
        <div
          className="flex gap-5"
          style={{
            width: 'max-content',
            animation: 'marquee 50s linear infinite',
          }}
        >
          {row1.map((review, i) => (
            <ReviewCard key={`r1-${i}`} review={review} />
          ))}
        </div>
      </div>

      {/* Row 2 — right to left */}
      <div className="overflow-hidden">
        <div
          className="flex gap-5"
          style={{
            width: 'max-content',
            animation: 'marquee-reverse 45s linear infinite',
          }}
        >
          {row2.map((review, i) => (
            <ReviewCard key={`r2-${i}`} review={review} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 text-center mt-16">
        <Link
          href="/reviews"
          className="inline-flex items-center gap-2 bg-[#E63946] text-white font-bold px-8 py-4 rounded-full hover:bg-red-600 transition-colors duration-300"
        >
          Read all 1,847 reviews <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
