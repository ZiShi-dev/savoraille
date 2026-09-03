import type { Metadata } from 'next';

import { ReservationPageContent } from '@/components/reservation-page-content';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { type Locale } from '@/lib/i18n-routing';
import { getPageCopy, pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = getPageCopy('reservation', locale as Locale);
  return pageMetadata(locale as Locale, '/reservation/', copy);
}

export default function ReservationPage() {
  return (
    <>
      <SiteHeader />
      <main id="contenu-principal"><ReservationPageContent /></main>
      <SiteFooter />
    </>
  );
}
