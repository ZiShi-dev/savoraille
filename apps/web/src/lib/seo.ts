import type { Metadata } from 'next';

import { siteConfig, withBasePath } from '@/lib/site-config';

const staticRoutes = [
  '/',
  '/carte/',
  '/reservation/',
  '/commandes/',
  '/histoire/',
  '/contact/',
] as const;

export function getStaticRoutes() {
  return staticRoutes;
}

export function pageMetadata(path: string, metadata: Metadata = {}): Metadata {
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: path,
    },
    robots: siteConfig.portfolioMode
      ? { index: false, follow: false }
      : metadata.robots ?? { index: true, follow: true },
  };
}

export function restaurantJsonLd() {
  const url = siteConfig.siteUrl.replace(/\/$/, '');

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: siteConfig.name,
    description: 'Restaurant français : carte de saison, réservation et commande en ligne.',
    url,
    image: `${url}${withBasePath('/images/savoraille-dining-room-3d.png')}`,
    servesCuisine: 'French',
    priceRange: '€€',
    email: 'bonjour@savoraille.fr',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '12:00',
        closes: '23:00',
      },
    ],
    potentialAction: {
      '@type': 'ReserveAction',
      target: `${url}${withBasePath('/reservation/')}`,
    },
  };
}
