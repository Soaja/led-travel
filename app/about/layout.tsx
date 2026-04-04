import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about LED Travel — a boutique Turkey tour agency born from a passion for authentic local experiences. 10+ years of expertise, 15,000+ happy travelers.',
  openGraph: {
    title: 'About LED Travel | Premium Turkey Tours',
    description: 'Learn about LED Travel — a boutique Turkey tour agency born from a passion for authentic local experiences.',
    images: [
      {
        url: '/images/aboutus1.webp',
        width: 1200,
        height: 630,
        alt: 'About LED Travel',
      },
    ],
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
