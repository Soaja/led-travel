import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, HeartPulse, ShieldCheck, Star, Stethoscope, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Aesthetic & Wellness Clinics',
  description:
    'World-class aesthetic and medical tourism in Turkey. Hair transplants, dental care, and cosmetic procedures arranged through trusted, accredited clinics.',
  openGraph: {
    title: 'Aesthetic & Wellness Clinics | LED Travel',
    description: 'World-class aesthetic and medical tourism in Turkey. Hair transplants, dental care, and cosmetic procedures.',
    images: [{ url: '/images/1.webp', width: 1200, height: 630, alt: 'Aesthetic & Wellness Clinics Turkey' }],
  },
  alternates: { canonical: '/extras/clinics' },
};

const services = [
  { label: 'Hair Transplant (FUE / DHI)' },
  { label: 'Dental Veneers & Implants' },
  { label: 'Rhinoplasty & Facial Aesthetics' },
  { label: 'Body Contouring & Liposuction' },
  { label: 'Eye Laser Surgery (LASIK)' },
  { label: 'Skin Treatments & Fillers' },
];

const highlights = [
  { icon: <ShieldCheck className="w-5 h-5 text-[#E63946]" />, label: 'Accredited JCI & ISO certified clinics' },
  { icon: <Star className="w-5 h-5 text-[#E63946]" />, label: 'Board-certified specialist surgeons' },
  { icon: <Stethoscope className="w-5 h-5 text-[#E63946]" />, label: 'Full pre- & post-op coordination' },
  { icon: <HeartPulse className="w-5 h-5 text-[#E63946]" />, label: 'Airport, hotel & clinic transfers included' },
];

export default function ClinicsPage() {
  return (
    <div className="bg-white min-h-screen pb-20">

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-end pt-24 overflow-hidden bg-[#1A1A2E]">
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(#E63946 2px, transparent 2px)', backgroundSize: '30px 30px' }}
        />
        <Image
          src="/images/plastic.jpg"
          alt="Modern aesthetic clinic interior in Turkey"
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
            <span className="text-white">Aesthetic & Wellness Clinics</span>
          </nav>

          <span className="text-[#E63946] font-bold tracking-wider uppercase text-sm mb-4 block">
            ■ Exclusive Extra
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 leading-tight">
            Aesthetic &amp;<br />Wellness Clinics
          </h1>
          <p className="text-white/60 text-base font-medium mb-6">at <span className="text-white font-bold">Valley Clinic</span></p>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl">
            Turkey is one of the world&apos;s leading destinations for medical tourism — outstanding outcomes, internationally accredited clinics, and costs a fraction of Western Europe. We make it seamless.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main description */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Why Turkey for Medical Tourism?</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Turkey attracts hundreds of thousands of medical tourists every year — and for good reason. World-class surgeons trained at European and American institutions, state-of-the-art facilities, and procedures priced 50–70% below UK, US, or Western European rates. Istanbul and other major cities host dozens of JCI-accredited hospitals and clinics that meet or exceed international standards.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Services We Arrange</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-5">
                We partner exclusively with clinics that have been personally vetted by our team. Our concierge coordination covers everything from the initial consultation to aftercare follow-ups.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-gray-700"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#E63946] flex-shrink-0" />
                    {s.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Photo gallery */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">Inside Valley Clinic</h2>

              {/* Featured clinic photo */}
              <div className="relative h-56 rounded-2xl overflow-hidden shadow-sm mb-2.5 group">
                <Image
                  src="https://valleyclinicturkiye.com/wp-content/uploads/2023/06/Valley-Clinic.png"
                  alt="Valley Clinic Istanbul"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Procedure grid */}
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  'https://valleyclinicturkiye.com/wp-content/uploads/2022/02/service12-570x385.jpg',
                  'https://valleyclinicturkiye.com/wp-content/uploads/2023/04/sac-ekimi-greft.jpg',
                  'https://valleyclinicturkiye.com/wp-content/uploads/2023/04/sac-ekimi-nedir-ve-nasil-yapilir-10461_b.jpg',
                  'https://valleyclinicturkiye.com/wp-content/uploads/2023/04/safirfue.jpg',
                  'https://valleyclinicturkiye.com/wp-content/uploads/2023/04/burunestetigi.jpg',
                  'https://valleyclinicturkiye.com/wp-content/uploads/2023/04/lazer-liposuction-izmir.jpg',
                ].map((src, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden shadow-sm group">
                    <Image
                      src={src}
                      alt={`Valley Clinic procedure ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How We Help</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                Navigating a medical procedure abroad can feel overwhelming. That is why we handle every logistical detail so you can focus entirely on your health and recovery.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-[#E63946] font-bold mt-1">01.</span>
                  <span><strong className="text-gray-800">Free clinic matching</strong> — we assess your needs and recommend the right specialist and facility.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#E63946] font-bold mt-1">02.</span>
                  <span><strong className="text-gray-800">Online consultation</strong> — a video call with the surgeon before you travel, at no extra charge.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#E63946] font-bold mt-1">03.</span>
                  <span><strong className="text-gray-800">Full transfer package</strong> — airport pickup, hotel accommodation, clinic transport, and return transfer.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#E63946] font-bold mt-1">04.</span>
                  <span><strong className="text-gray-800">Aftercare follow-up</strong> — post-procedure check-ins and coordination with the medical team until you are fully recovered.</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <p className="text-amber-800 text-sm leading-relaxed">
                <strong>Important notice:</strong> LED Travel acts solely as a concierge and coordination service. We do not provide medical advice. All procedures are performed by licensed, independent medical professionals. Please consult with the clinic directly regarding medical suitability before booking.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">

              {/* Highlights card */}
              <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">What's Included</h3>
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
                    <p className="font-bold text-gray-800 mb-1">Valley Clinic</p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Oz Altin Is Merkezi, Şirinevler<br />
                      Meriç Sk No:16 Bahçelievler<br />
                      34144 Bahçelievler / İstanbul
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
                  <HeartPulse className="w-8 h-8 text-[#E63946] mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">Get a Free Quote</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Tell us which procedure you are interested in and we will match you with the right clinic within 24 hours.
                  </p>
                  <a
                    href="https://wa.me/905333811447"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#E63946] hover:bg-[#D62828] text-white font-bold py-3.5 rounded-xl transition-colors duration-300 text-center"
                  >
                    Contact Us on WhatsApp
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
