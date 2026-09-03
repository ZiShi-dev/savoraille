import type { Metadata } from 'next';

import { OrdersPageContent } from '@/components/orders-page-content';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { type Locale } from '@/lib/i18n-routing';
import { getPageCopy, pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = getPageCopy('commandes', locale as Locale);
  return pageMetadata(locale as Locale, '/commandes/', copy);
}

export default function OrdersPage() {
  return (
    <>
      <SiteHeader />
      <OrdersPageContent />
      <SiteFooter />
    </>
  );
}
