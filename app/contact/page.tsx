'use client';

import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Send, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 bg-[#1A1A2E] overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#E63946 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#E63946] font-bold tracking-wider uppercase text-sm mb-4 block">
              ■ Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Have questions about our tours or want to customize your itinerary? We&apos;re here to help you plan the perfect Turkish adventure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section className="relative z-20 -mt-10 container mx-auto px-4 md:px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center group hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#E63946] transition-colors duration-300">
              <MapPin className="w-6 h-6 text-[#E63946] group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Visit Us</h3>
            <p className="text-gray-600">Alemdar, Yerebatan caddesi No.29<br/>Fatih / İstanbul, Türkiye</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center group hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#E63946] transition-colors duration-300">
              <Phone className="w-6 h-6 text-[#E63946] group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Call Us</h3>
            <a href="tel:+905333811447" className="text-gray-600 hover:text-[#E63946] transition-colors block mb-1">+90 533 381 14 47</a>
            <p className="text-sm text-gray-500 mt-2">Mon-Sun, 9am - 8pm</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center group hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#E63946] transition-colors duration-300">
              <Mail className="w-6 h-6 text-[#E63946] group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Email Us</h3>
            <a href="mailto:lara@ledtravel.net" className="text-gray-600 hover:text-[#E63946] transition-colors block">lara@ledtravel.net</a>
            <p className="text-sm text-gray-500 mt-2">We reply within 24 hours</p>
          </motion.div>
        </div>
      </section>

      {/* FORM & MAP SECTION */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
          
          {/* Left: Form */}
          <div className="lg:w-1/2 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Send a Message</h2>
            <p className="text-gray-600 mb-8">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E63946] focus:border-transparent outline-none transition-shadow" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E63946] focus:border-transparent outline-none transition-shadow" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E63946] focus:border-transparent outline-none transition-shadow" placeholder="john@example.com" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E63946] focus:border-transparent outline-none transition-shadow bg-white">
                  <option>General Inquiry</option>
                  <option>Custom Tour Request</option>
                  <option>Booking Question</option>
                  <option>Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E63946] focus:border-transparent outline-none transition-shadow resize-none" placeholder="How can we help you?"></textarea>
              </div>

              <button type="submit" className="w-full bg-[#1A1A2E] hover:bg-gray-900 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg">
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-500 mb-4">Or reach out instantly via WhatsApp</p>
              <a 
                href="https://wa.me/905333811447" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3 px-8 rounded-xl transition-colors items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right: Map */}
          <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full bg-gray-200">
            <iframe
              src="https://maps.google.com/maps?q=Alemdar%20Mahallesi%20Yerebatan%20caddesi%20No.29%20Istanbul&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>

        </div>
      </section>
    </div>
  );
}
