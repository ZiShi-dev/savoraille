import type { Metadata } from 'next';

import { OrderDetailContent } from '@/components/order-detail-content';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { menuItems } from '@/lib/menu-data';
import { locales, type Locale } from '@/lib/i18n-routing';
import { pageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return locales.flatMap((locale) => menuItems.map((item) => ({ locale, itemId: item.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; itemId: string }> }): Promise<Metadata> {
  const { locale, itemId } = await params;
  const item = menuItems.find((entry) => entry.id === itemId);

  return pageMetadata(locale as Locale, `/commander/${itemId}/`, {
    title: item?.name ?? 'Commander',
    description: item?.detail ?? 'Personnalisez votre commande et complétez votre menu Savoraille.',
  });
}

export default async function OrderDetailPage({ params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = await params;
  return (
    <>
      <SiteHeader />
      <main id="contenu-principal"><OrderDetailContent itemId={itemId} /></main>
      <SiteFooter />
    </>
  );
}
