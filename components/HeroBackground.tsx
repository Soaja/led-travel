'use client';

import Image from 'next/image';

export default function HeroBackground() {
  return (
    <Image
      src="https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=1920&auto=format&fit=crop"
      alt="Istanbul skyline"
      fill
      className="object-cover"
      priority
      referrerPolicy="no-referrer"
    />
  );
}
