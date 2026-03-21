import Link from 'next/link';
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

// Custom TikTok Icon since it's not in Lucide
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.0000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-white border-t-[3px] border-[#E63946]">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          
          {/* COL 1 - Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex flex-col justify-center group mb-4">
              <div className="flex items-baseline">
                <span className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-white transition-colors duration-500">
                  LED
                </span>
                <span className="text-[#E63946] text-3xl md:text-4xl font-black ml-0.5 group-hover:translate-x-1 transition-transform duration-500">.</span>
              </div>
              <span className="text-[0.65rem] md:text-xs font-bold tracking-[0.35em] uppercase mt-[-4px] md:mt-[-6px] pl-0.5 text-white/70 group-hover:text-[#E63946] transition-colors duration-500">
                Travel
              </span>
            </Link>
            <p className="text-gray-300 font-medium mb-4 italic">
              Connecting travelers to authentic Turkey
            </p>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              We specialize in creating unforgettable, premium private tours across Turkey. Experience the rich history, culture, and landscapes with our expert local guides.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-white hover:text-[#E63946] transition-colors duration-300">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://www.facebook.com/ledtravel.turkey/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#E63946] transition-colors duration-300">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-white hover:text-[#E63946] transition-colors duration-300">
                <TikTokIcon className="w-5 h-5" />
                <span className="sr-only">TikTok</span>
              </a>
              <a href="#" className="text-white hover:text-[#E63946] transition-colors duration-300">
                <Youtube className="w-5 h-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* COL 2 - Destinations */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-[#E63946] font-semibold text-lg mb-4">Destinations</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/tours?region=Istanbul" className="text-gray-400 hover:text-white transition-colors duration-300">Istanbul Tours</Link></li>
              <li><Link href="/tours?region=Cappadocia" className="text-gray-400 hover:text-white transition-colors duration-300">Cappadocia Tours</Link></li>
              <li><Link href="/tours?region=Antalya" className="text-gray-400 hover:text-white transition-colors duration-300">Antalya Tours</Link></li>
              <li><Link href="/tours?region=Izmir-Ephesus" className="text-gray-400 hover:text-white transition-colors duration-300">Izmir-Ephesus Tours</Link></li>
              <li><Link href="/tours?region=Pamukkale" className="text-gray-400 hover:text-white transition-colors duration-300">Pamukkale Tours</Link></li>
              <li><Link href="/tours" className="text-gray-400 hover:text-white transition-colors duration-300 font-medium mt-2 block">View All →</Link></li>
            </ul>
          </div>

          {/* COL 3 - Support */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-[#E63946] font-semibold text-lg mb-4">Support</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact Us</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors duration-300">FAQ</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link href="/cancellation" className="text-gray-400 hover:text-white transition-colors duration-300">Cancellation Policy</Link></li>
            </ul>
          </div>

          {/* COL 4 - Contact info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-[#E63946] font-semibold text-lg mb-4">Contact</h3>
            <ul className="flex flex-col gap-4 mb-6 w-full">
              <li className="flex items-start gap-3 text-gray-400 justify-center md:justify-start">
                <MapPin className="w-5 h-5 text-[#E63946] shrink-0 mt-0.5" />
                <span className="text-sm">Alemdar, Yerebatan caddesi No.30<br/>Fatih / İstanbul, Türkiye</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 justify-center md:justify-start">
                <Phone className="w-5 h-5 text-[#E63946] shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+905333811447" className="text-sm hover:text-white transition-colors duration-300">+90 533 381 14 47</a>
                  <a href="tel:+905336693721" className="text-sm hover:text-white transition-colors duration-300 mt-1">+90 533 669 37 21</a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400 justify-center md:justify-start">
                <Mail className="w-5 h-5 text-[#E63946] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="mailto:lara@ledtravel.net" className="text-sm hover:text-white transition-colors duration-300">lara@ledtravel.net</a>
                  <a href="mailto:kadir@ledtravel.net" className="text-sm hover:text-white transition-colors duration-300">kadir@ledtravel.net</a>
                  <a href="mailto:murat@ledtravel.net" className="text-sm hover:text-white transition-colors duration-300">murat@ledtravel.net</a>
                </div>
              </li>
            </ul>
            <a 
              href="https://wa.me/905333811447" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10"></div>

        {/* BOTTOM SECTION */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div className="order-2 md:order-1">
            © 2026 Led Travel. All rights reserved.
          </div>
          
          <div className="order-3 md:order-2 flex items-center gap-1">
            Made with <span className="text-red-500 mx-1">❤</span> in Istanbul
          </div>
          
          <div className="order-1 md:order-3 flex items-center gap-4">
            <Link href="#" className="flex items-center gap-1.5 hover:text-white transition-colors duration-300">
              <span>🇮🇹</span> Italiano
            </Link>
            <div className="w-px h-4 bg-white/20"></div>
            <Link href="#" className="flex items-center gap-1.5 hover:text-white transition-colors duration-300">
              <span>🇬🇧</span> English
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
