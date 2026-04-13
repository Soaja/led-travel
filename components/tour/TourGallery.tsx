'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TourGallery({ images }: { images: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handlePrevious, handleNext]);

  return (
    <div className="mb-8">
      {/* Desktop: main image left + 2×2 grid right | Mobile: square image + scroll thumbnails */}
      <div className="hidden md:flex gap-3 items-stretch">
        {/* Main Image — dominant */}
        <div
          className="relative aspect-square w-[58%] shrink-0 rounded-2xl overflow-hidden cursor-pointer group"
          onClick={() => { setCurrentIndex(0); setIsOpen(true); }}
        >
          <Image src={images[0]} alt="Tour Main" fill unoptimized sizes="58vw" className="object-cover object-center group-hover:scale-105 transition-transform duration-500" priority />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        </div>

        {/* 2×2 thumbnail grid */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          {images.slice(1, 5).map((img, idx) => (
            <div
              key={idx}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => { setCurrentIndex(idx + 1); setIsOpen(true); }}
            >
              <Image src={img} alt={`Tour photo ${idx + 2}`} fill unoptimized sizes="200px" className="object-cover object-center group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              {/* "View all" badge on last thumbnail */}
              {idx === 3 && images.length > 5 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">+{images.length - 5} more</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: square main image */}
      <div className="md:hidden">
        <div
          className="relative aspect-square w-full rounded-2xl overflow-hidden mb-3 cursor-pointer group"
          onClick={() => { setCurrentIndex(0); setIsOpen(true); }}
        >
          <Image src={images[0]} alt="Tour Main" fill unoptimized sizes="100vw" className="object-cover object-center group-hover:scale-105 transition-transform duration-500" priority />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm pointer-events-none">
            View all photos
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
          {images.slice(1).map((img, idx) => (
            <div key={idx} className="relative aspect-square w-20 shrink-0 rounded-xl overflow-hidden cursor-pointer snap-start group" onClick={() => { setCurrentIndex(idx + 1); setIsOpen(true); }}>
              <Image src={img} alt={`Thumbnail ${idx}`} fill unoptimized sizes="80px" className="object-cover object-center group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-white hover:text-[#E63946] z-50 transition-colors">
            <X className="w-8 h-8" />
          </button>
          
          {/* Previous Button */}
          {images.length > 1 && (
            <button 
              onClick={handlePrevious}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 p-2 md:p-3 rounded-full transition-all z-50"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
            </button>
          )}

          <div className="relative w-full max-w-5xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={images[currentIndex]} alt="Lightbox" fill unoptimized className="object-contain" />
          </div>

          {/* Next Button */}
          {images.length > 1 && (
            <button 
              onClick={handleNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 p-2 md:p-3 rounded-full transition-all z-50"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
            </button>
          )}

          {/* Simple controls */}
          <div className="absolute bottom-6 flex gap-4" onClick={(e) => e.stopPropagation()}>
            {images.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentIndex(idx)} 
                className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-[#E63946] scale-125' : 'bg-white/50 hover:bg-white'}`} 
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
