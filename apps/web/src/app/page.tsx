import type { Metadata } from 'next';

import { HomePageContent } from '@/components/home-page-content';
import { JsonLd } from '@/components/json-ld';
import { pageMetadata, restaurantJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/', {
  description: 'Restaurant français : carte de saison, réservation en ligne et commande à emporter chez Savoraille.',
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={restaurantJsonLd()} />
      <HomePageContent />
    </>
  );
}
