import type { Metadata } from 'next';

import { ContactPageContent } from '@/components/contact-page-content';
import { JsonLd } from '@/components/json-ld';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { pageMetadata, restaurantJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/contact/', {
  title: 'Contact',
  description: 'Contactez Savoraille pour une réservation, une question ou un événement privé.',
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={restaurantJsonLd()} />
      <SiteHeader />
      <ContactPageContent />
      <SiteFooter />
    </>
  );
}
