import type { Metadata } from 'next';

import { HistoryPageContent } from '@/components/history-page-content';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { type Locale } from '@/lib/i18n-routing';
import { getPageCopy, pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = getPageCopy('histoire', locale as Locale);
  return pageMetadata(locale as Locale, '/histoire/', copy);
}

export default function HistoryPage() {
  return (
    <>
      <SiteHeader />
      <HistoryPageContent />
      <SiteFooter />
    </>
  );
}
