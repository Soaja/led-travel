'use client';
import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

export default function TourGallery({ images }: { images: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="mb-8">
      {/* Main Image */}
      <div className="relative h-96 w-full rounded-2xl overflow-hidden mb-4 cursor-pointer group" onClick={() => { setCurrentIndex(0); setIsOpen(true); }}>
        <Image src={images[0]} alt="Tour Main" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
      </div>
      
      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x hide-scrollbar">
        {images.slice(1).map((img, idx) => (
          <div key={idx} className="relative h-24 w-32 shrink-0 rounded-xl overflow-hidden cursor-pointer snap-start group" onClick={() => { setCurrentIndex(idx + 1); setIsOpen(true); }}>
            <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
          <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-white hover:text-[#E63946] z-50 transition-colors">
            <X className="w-8 h-8" />
          </button>
          <div className="relative w-full max-w-5xl h-[80vh]">
            <Image src={images[currentIndex]} alt="Lightbox" fill className="object-contain" />
          </div>
          {/* Simple controls */}
          <div className="absolute bottom-6 flex gap-4">
            {images.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentIndex(idx)} 
                className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-[#E63946] scale-125' : 'bg-white/50 hover:bg-white'}`} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
