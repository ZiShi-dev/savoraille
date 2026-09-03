import type { Metadata } from 'next';

import { ContactPageContent } from '@/components/contact-page-content';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = { title: 'Contact', description: 'Contactez Savoraille pour une réservation, une question ou un événement privé.' };

export default function ContactPage() {
  return <><SiteHeader /><ContactPageContent /><SiteFooter /></>;
}
