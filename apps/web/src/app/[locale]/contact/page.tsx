import type { Metadata } from 'next';

import { ContactPageContent } from '@/components/contact-page-content';
import { JsonLd } from '@/components/json-ld';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { type Locale } from '@/lib/i18n-routing';
import { getPageCopy, pageMetadata, restaurantJsonLd } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = getPageCopy('contact', locale as Locale);
  return pageMetadata(locale as Locale, '/contact/', copy);
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <>
      <JsonLd data={restaurantJsonLd(locale as Locale)} />
      <SiteHeader />
      <ContactPageContent />
      <SiteFooter />
    </>
  );
}
