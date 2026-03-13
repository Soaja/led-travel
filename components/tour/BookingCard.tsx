'use client';
import { useState } from 'react';
import { Star, Calendar, Check, ShieldCheck, Zap, MessageCircle, User, Mail, Phone } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function BookingCard({ price, rating, reviewsCount, title }: { price: number, rating: number, reviewsCount: number, title: string }) {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const totalPrice = (adults * price) + (children * (price * 0.8)); // children 20% off

  const handleBookNow = async () => {
    if (!date || !name || !email || !phone) {
      setError('Please fill in all fields (Date, Name, Email, Phone).');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const { error: supabaseError } = await supabase
        .from('bookings')
        .insert([
          {
            tour_title: title,
            booking_date: date,
            adults,
            children,
            total_price: totalPrice,
            customer_name: name,
            customer_email: email,
            customer_phone: phone,
          }
        ]);

      if (supabaseError) throw supabaseError;

      setSuccess(true);
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setDate('');
      setAdults(2);
      setChildren(0);
    } catch (err: any) {
      setError(err.message || 'Failed to submit booking. Please try again or contact us via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const message = `Hi LED Travel! I'd like to book:
Tour: ${title}
Date: ${date || 'Not selected'}
Adults: ${adults}
Children: ${children}
Total: €${totalPrice}`;
    window.open(`https://wa.me/905333811447?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24 border border-gray-100">
      <div className="flex items-end gap-2 mb-2">
        <span className="text-4xl font-bold text-[#F5A623]">€{price}</span>
        <span className="text-gray-500 text-sm mb-1.5">per person</span>
      </div>
      
      <div className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-100">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
        </div>
        <span className="font-bold text-gray-900">{rating}</span>
        <span className="text-gray-500 text-sm">({reviewsCount} reviews)</span>
      </div>

      {success ? (
        <div className="bg-green-50 text-green-700 p-6 rounded-xl border border-green-200 text-center mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Check className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-bold text-lg mb-2">Booking Request Sent!</h3>
          <p className="text-sm">Thank you for your request. Our team will contact you shortly to confirm your booking and arrange payment.</p>
          <button 
            onClick={() => setSuccess(false)}
            className="mt-4 text-green-700 font-medium underline text-sm hover:text-green-800"
          >
            Book another tour
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 mb-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5A623] focus:border-transparent outline-none text-gray-700 font-medium transition-shadow cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div>
                  <div className="font-bold text-gray-900 text-sm">Adults</div>
                  <div className="text-xs text-gray-500">Age 13+</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-700 font-medium shadow-sm">-</button>
                  <span className="w-4 text-center font-bold text-gray-900">{adults}</span>
                  <button onClick={() => setAdults(adults + 1)} className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-700 font-medium shadow-sm">+</button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div>
                  <div className="font-bold text-gray-900 text-sm">Children</div>
                  <div className="text-xs text-gray-500">Age 0-12</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-700 font-medium shadow-sm">-</button>
                  <span className="w-4 text-center font-bold text-gray-900">{children}</span>
                  <button onClick={() => setChildren(children + 1)} className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-700 font-medium shadow-sm">+</button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5A623] focus:border-transparent outline-none text-gray-700 font-medium transition-shadow"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5A623] focus:border-transparent outline-none text-gray-700 font-medium transition-shadow"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="tel" 
                  placeholder="+1 234 567 8900"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5A623] focus:border-transparent outline-none text-gray-700 font-medium transition-shadow"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-500 font-medium bg-red-50 p-3 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between mb-6 pt-4 border-t border-gray-100">
            <span className="font-bold text-gray-900">Total Price</span>
            <span className="text-2xl font-bold text-gray-900">€{totalPrice}</span>
          </div>

          <button 
            onClick={handleBookNow} 
            disabled={isSubmitting}
            className="w-full bg-[#F5A623] hover:bg-[#e0961f] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl mb-4 transition-colors text-lg shadow-lg shadow-[#F5A623]/20 flex items-center justify-center"
          >
            {isSubmitting ? 'Submitting...' : 'Book Now'}
          </button>

          <div className="text-center mb-4 relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
            <span className="relative bg-white px-3 text-sm text-gray-500">Or contact via</span>
          </div>

          <button onClick={handleWhatsApp} className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3.5 rounded-xl mb-6 transition-colors flex items-center justify-center gap-2 shadow-md">
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </button>
        </>
      )}

      <div className="flex flex-col gap-3 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100">
        <div className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500 shrink-0" /> <span className="font-medium">Free cancellation</span> up to 24h</div>
        <div className="flex items-center gap-3"><Zap className="w-5 h-5 text-[#F5A623] shrink-0" /> <span className="font-medium">Instant confirmation</span></div>
        <div className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-blue-500 shrink-0" /> <span className="font-medium">Secure payment</span></div>
      </div>
    </div>
  )
}
