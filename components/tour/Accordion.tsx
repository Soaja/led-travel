'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MapPin } from 'lucide-react';

export function ItineraryAccordion({ items }: { items: { time: string, location: string, description: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, idx) => (
        <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
          <button 
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex items-center justify-between p-4 md:p-5 text-left bg-white hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-16 md:w-20 text-sm md:text-base font-bold text-[#E63946] shrink-0">{item.time}</div>
              <div className="font-bold text-gray-900 flex items-center gap-2 text-sm md:text-base">
                <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                {item.location}
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 shrink-0 ${openIndex === idx ? 'rotate-180 text-[#E63946]' : ''}`} />
          </button>
          <AnimatePresence>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="p-4 md:p-5 pt-0 md:pt-0 pl-[5.5rem] md:pl-[7.5rem] text-gray-600 border-t border-gray-100 mt-2 text-sm md:text-base leading-relaxed">
                  {item.description}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

export function FaqAccordion({ items }: { items: { question: string, answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, idx) => (
        <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
          <button 
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex items-center justify-between p-4 md:p-5 text-left bg-white hover:bg-gray-50 transition-colors"
          >
            <div className="font-bold text-gray-900 pr-4 text-sm md:text-base">{item.question}</div>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 shrink-0 ${openIndex === idx ? 'rotate-180 text-[#E63946]' : ''}`} />
          </button>
          <AnimatePresence>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="p-4 md:p-5 pt-0 md:pt-0 text-gray-600 border-t border-gray-100 mt-2 text-sm md:text-base leading-relaxed">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
