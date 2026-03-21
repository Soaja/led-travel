'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Phone, ChevronDown } from 'lucide-react';

// Custom hook for scroll position
function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scrollPosition;
}

export default function Navbar() {
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition > 20;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const destinations = [
    'Istanbul',
    'Cappadocia',
    'Izmir-Ephesus',
    'Pamukkale',
    'Antalya',
    'Troy',
    'Other Tours',
  ];

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tours', href: '/tours' },
    { name: 'About Us', href: '/about' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Extras', href: '/#extras' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col justify-center group z-50">
          <div className="flex items-baseline">
            <span className={`text-4xl md:text-5xl font-black tracking-tighter uppercase transition-colors duration-500 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              LED
            </span>
            <span className="text-[#E63946] text-4xl md:text-5xl font-black ml-0.5 group-hover:translate-x-1 transition-transform duration-500">.</span>
          </div>
          <span className={`text-[0.75rem] md:text-sm font-bold tracking-[0.35em] uppercase mt-[-6px] md:mt-[-8px] pl-0.5 transition-colors duration-500 ${isScrolled ? 'text-gray-500' : 'text-white/70'} group-hover:text-[#E63946]`}>
            Travel
          </span>
        </Link>

        {/* Desktop Nav */}
        <motion.nav
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="hidden lg:flex items-center gap-8"
        >
          {navLinks.map((link) => {
            if (link.name === 'Tours') {
              return (
                <motion.div key={link.name} variants={itemVariants} className="relative group">
                  <Link
                    href={link.href}
                    className={`relative text-lg font-bold transition-colors duration-300 flex items-center gap-1 ${
                      isScrolled ? 'text-gray-800 hover:text-[#E63946]' : 'text-white hover:text-[#E63946]'
                    }`}
                  >
                    {link.name}
                    <ChevronDown className="w-4 h-4" />
                  </Link>
                  {/* Dropdown Menu */}
                  <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 w-48 flex flex-col">
                      {destinations.map(dest => (
                        <Link 
                          key={dest} 
                          href={`/tours?region=${dest}`} 
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#E63946] transition-colors"
                        >
                          {dest}
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div key={link.name} variants={itemVariants}>
                <Link
                  href={link.href}
                  className={`relative text-lg font-bold group transition-colors duration-300 ${
                    isScrolled ? 'text-gray-800 hover:text-[#E63946]' : 'text-white hover:text-[#E63946]'
                  }`}
                >
                  {link.name}
                  <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#E63946] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            );
          })}
        </motion.nav>

        {/* Right Side Actions */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Contact Us Button */}
          <Link
            href="/contact"
            className="bg-[#E63946] hover:bg-[#D62828] text-white px-6 py-2.5 rounded-lg font-bold transition-colors duration-300 shadow-lg flex items-center gap-2"
          >
            <span>Contact Us</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className={`w-6 h-6 ${isScrolled || isMobileMenuOpen ? 'text-gray-800' : 'text-white'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl lg:hidden overflow-hidden border-t border-gray-100"
          >
            <div className="flex flex-col p-6 gap-6">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => {
                  if (link.name === 'Tours') {
                    return (
                      <div key={link.name} className="flex flex-col gap-2">
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-gray-800 text-2xl font-bold hover:text-[#E63946] transition-colors duration-300"
                        >
                          {link.name}
                        </Link>
                        <div className="flex flex-col pl-4 gap-2 border-l-2 border-gray-100 ml-2">
                          {destinations.map(dest => (
                            <Link 
                              key={dest} 
                              href={`/tours?region=${dest}`} 
                              onClick={() => setIsMobileMenuOpen(false)} 
                              className="text-gray-600 text-base hover:text-[#E63946] transition-colors"
                            >
                              {dest}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-gray-800 text-2xl font-bold hover:text-[#E63946] transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-[#E63946] hover:bg-[#D62828] text-white px-6 py-3 rounded-lg font-bold w-full text-center flex items-center justify-center gap-2 shadow-md"
              >
                <span>Contact Us</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
