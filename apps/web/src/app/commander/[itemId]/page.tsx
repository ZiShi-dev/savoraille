import type { Metadata } from 'next';

import { OrderDetailContent } from '@/components/order-detail-content';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { menuItems } from '@/lib/menu-data';
import { pageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return menuItems.map((item) => ({ itemId: item.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ itemId: string }> }): Promise<Metadata> {
  const { itemId } = await params;
  const item = menuItems.find((entry) => entry.id === itemId);

  return pageMetadata(`/commander/${itemId}/`, {
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
