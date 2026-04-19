import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const BASE_URL = 'https://ledtravel.net';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
  title: {
    default: 'LED Travel | Premium Turkey Tours',
    template: '%s | LED Travel',
  },
  description: 'Experience the magic of Turkey with LED Travel. Premium private tours to Istanbul, Cappadocia, Ephesus, Pamukkale, Antalya and more.',
  keywords: ['Turkey tours', 'Istanbul tours', 'Cappadocia tours', 'Ephesus tours', 'private tours Turkey', 'Turkish travel agency', 'LED Travel'],
  authors: [{ name: 'LED Travel', url: BASE_URL }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'LED Travel',
    title: 'LED Travel | Premium Turkey Tours',
    description: 'Experience the magic of Turkey with LED Travel. Premium private tours to Istanbul, Cappadocia, Ephesus, Pamukkale, Antalya and more.',
    images: [
      {
        url: '/images/1.webp',
        width: 1200,
        height: 630,
        alt: 'LED Travel – Premium Turkey Tours',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LED Travel | Premium Turkey Tours',
    description: 'Experience the magic of Turkey with LED Travel. Premium private tours to Istanbul, Cappadocia, Ephesus and more.',
    images: ['/images/1.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'LED Travel',
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo.png`,
  description: 'Premium private tours to Istanbul, Cappadocia, Ephesus, Pamukkale, Antalya and more.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Alemdar, Yerebatan caddesi No.30',
    addressLocality: 'Fatih / İstanbul',
    addressCountry: 'TR',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+90-212-517-34-27',
      contactType: 'customer service',
      availableLanguage: ['English', 'Turkish'],
    },
  ],
  email: 'info@ledtravel.net',
  sameAs: [],
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans bg-white text-gray-900 antialiased flex flex-col min-h-screen" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
