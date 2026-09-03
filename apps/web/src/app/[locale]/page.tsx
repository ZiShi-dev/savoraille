import type { Metadata } from 'next';

import { HomePageContent } from '@/components/home-page-content';
import { JsonLd } from '@/components/json-ld';
import { type Locale } from '@/lib/i18n-routing';
import { getPageCopy, pageMetadata, restaurantJsonLd } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = getPageCopy('home', locale as Locale);
  return pageMetadata(locale as Locale, '/', {
    title: copy.title,
    description: copy.description,
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <>
      <JsonLd data={restaurantJsonLd(locale as Locale)} />
      <HomePageContent />
    </>
  );
}
