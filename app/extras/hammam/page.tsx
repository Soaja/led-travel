import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Sparkles, Droplets, Clock, Star, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Traditional Hammam | LED Travel',
  description:
    'Experience the centuries-old tradition of the Turkish hammam — a ritual of steam, marble, and deep cleansing that renews body and soul.',
};

const highlights = [
  { icon: <Droplets className="w-5 h-5 text-[#E63946]" />, label: 'Authentic marble hammam setting' },
  { icon: <Star className="w-5 h-5 text-[#E63946]" />, label: 'Full-body kese scrub & foam massage' },
  { icon: <Clock className="w-5 h-5 text-[#E63946]" />, label: 'Sessions from 60 to 120 minutes' },
  { icon: <Sparkles className="w-5 h-5 text-[#E63946]" />, label: 'Relaxation lounge access included' },
];

export default function HammamPage() {
  return (
    <div className="bg-white min-h-screen pb-20">

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-end pt-24 overflow-hidden bg-[#1A1A2E]">
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(#E63946 2px, transparent 2px)', backgroundSize: '30px 30px' }}
        />
        <Image
          src="/images/hammam.jpg"
          alt="Traditional Turkish Hammam interior with marble and steam"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/50 to-transparent" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 pb-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/#extras" className="hover:text-white transition-colors">Extras</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Traditional Hammam</span>
          </nav>

          <span className="text-[#E63946] font-bold tracking-wider uppercase text-sm mb-4 block">
            ■ Exclusive Extra
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 leading-tight">
            Traditional<br />Turkish Hammam
          </h1>
          <p className="text-white/60 text-base font-medium mb-6">at <span className="text-white font-bold">Rumeli Hammam</span></p>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl">
            Step into a centuries-old ritual of steam, marble, and deep cleansing. The hammam is not just a bath — it is a social and spiritual ceremony that has shaped Turkish culture for generations.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main description */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What is a Hammam?</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                The Turkish bath, or <em>hammam</em>, has been the cornerstone of Ottoman and Turkish hygiene and social life for over 600 years. Nestled inside grand marble halls warmed by a hypocaust heating system, the hammam offers a journey from the cool entry room (<em>soğukluk</em>), through the warm room (<em>ılıklık</em>), to the intensely steamed hot room (<em>hararet</em>).
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Your Experience</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                Our curated hammam sessions take place in historically significant baths selected for their authenticity, hygiene standards, and atmosphere. A trained <em>tellak</em> (bath attendant) will guide you through the full ritual:
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-[#E63946] font-bold mt-1">01.</span>
                  <span><strong className="text-gray-800">Steam session</strong> — relax on the warm marble slab as steam opens your pores and melts away tension.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#E63946] font-bold mt-1">02.</span>
                  <span><strong className="text-gray-800">Kese scrub</strong> — a vigorous exfoliation using a traditional kese mitt that removes dead skin and leaves you glowing.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#E63946] font-bold mt-1">03.</span>
                  <span><strong className="text-gray-800">Foam massage</strong> — a luxurious full-body soap massage using a hand-blown bubble nest of olive-oil soap.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#E63946] font-bold mt-1">04.</span>
                  <span><strong className="text-gray-800">Rest &amp; refresh</strong> — cool down in the relaxation lounge with traditional Turkish tea or cold water.</span>
                </li>
              </ul>
            </div>

            {/* Photo gallery */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">Inside Rumeli Hammam</h2>
              <div className="grid grid-cols-3 gap-2.5">
                {['h1','h2','h3','h4','h5','h6'].map((img, i) => (
                  <div key={i} className="relative h-44 rounded-xl overflow-hidden shadow-sm group">
                    <Image
                      src={`/images/${img}.jpeg`}
                      alt={`Rumeli Hammam photo ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 33vw, 22vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Why Book Through Us?</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                We pre-screen every hammam for cleanliness, staff professionalism, and historical value. We handle reservations, transport to and from the bath, and ensure you receive an authentic experience — never the tourist shortcut. Optional add-ons such as aromatherapy oils, private cabin sessions, and post-hammam meals can be arranged on request.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">

              {/* Highlights card */}
              <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Session Highlights</h3>
                <ul className="space-y-3">
                  {highlights.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      {item.icon}
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Location card */}
              <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Location</h3>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#E63946] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-800 mb-1">Rumeli Hammam</p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Küçük Ayasofya, Küçük Ayasofya Cd. No:68/A<br />
                      34122 Fatih / İstanbul
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA card */}
              <div className="bg-[#1A1A2E] rounded-2xl shadow-xl p-6 text-center relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'radial-gradient(#E63946 2px, transparent 2px)', backgroundSize: '20px 20px' }}
                />
                <div className="relative z-10">
                  <Sparkles className="w-8 h-8 text-[#E63946] mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">Ready to Book?</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Contact us via WhatsApp and we will arrange your hammam experience within 24 hours.
                  </p>
                  <a
                    href="https://wa.me/905333811447"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#E63946] hover:bg-[#D62828] text-white font-bold py-3.5 rounded-xl transition-colors duration-300 text-center"
                  >
                    Book via WhatsApp
                  </a>
                </div>
              </div>

              {/* Back link */}
              <Link
                href="/#extras"
                className="flex items-center gap-2 text-gray-500 hover:text-[#E63946] transition-colors text-sm font-medium"
              >
                ← Back to Extras
              </Link>
            </div>
          </aside>

        </div>
      </section>
    </div>
  );
}
