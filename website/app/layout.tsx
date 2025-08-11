import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Great Blue AI - AI Automation Solutions | Portland, Maine",
  description: "Portland Maine's AI automation expert. Transform your business with custom AI solutions. From chaos to clarity in 15 minutes. Serving Maine and New England businesses.",
  keywords: "AI automation Portland Maine, business automation Maine, AI consultant Portland, Maine AI solutions, New England AI services, workflow automation Maine",
  authors: [{ name: "Jake Mahon" }],
  creator: "Great Blue AI",
  publisher: "Great Blue AI",
  openGraph: {
    title: "Great Blue AI - AI Automation Solutions | Portland, Maine",
    description: "Portland Maine's AI automation expert. Transform your business with custom AI solutions.",
    url: "https://greatblueai.com",
    siteName: "Great Blue AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/heron-logo-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Great Blue AI - Portland Maine AI Solutions",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Great Blue AI - AI Automation Solutions | Portland, Maine",
    description: "Portland Maine's AI automation expert. Transform your business with custom AI solutions.",
    images: ["/heron-logo-1200x630.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: "https://greatblueai.com",
  },
  icons: {
    icon: '/heron_favicon_transparent.png',
    apple: '/heron_favicon_transparent.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Great Blue AI",
    "description": "AI automation solutions for businesses in Portland, Maine and throughout New England",
    "url": "https://greatblueai.com",
    "telephone": "",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Portland",
      "addressRegion": "ME",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.6591,
      "longitude": -70.2568
    },
    "areaServed": [
      {
        "@type": "State",
        "name": "Maine"
      },
      {
        "@type": "Place",
        "name": "New England"
      }
    ],
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    },
    "founder": {
      "@type": "Person",
      "name": "Jake Mahon",
      "jobTitle": "AI Strategy Lead"
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}