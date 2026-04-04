import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with LED Travel. Visit our Istanbul office, call, email, or chat on WhatsApp. We reply within 24 hours.',
  openGraph: {
    title: 'Contact LED Travel | Turkey Tours',
    description: 'Get in touch with LED Travel. Visit our Istanbul office, call, email, or chat on WhatsApp.',
    images: [
      {
        url: '/images/1.webp',
        width: 1200,
        height: 630,
        alt: 'Contact LED Travel',
      },
    ],
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
