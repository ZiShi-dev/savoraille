import type { Metadata } from 'next';

import { OrderDetailContent } from '@/components/order-detail-content';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = { title: 'Commander — Savoraille', description: 'Personnalisez votre commande et complétez votre menu Savoraille.' };

export default async function OrderDetailPage({ params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = await params;
  return <><SiteHeader /><OrderDetailContent itemId={itemId} /><SiteFooter /></>;
}
