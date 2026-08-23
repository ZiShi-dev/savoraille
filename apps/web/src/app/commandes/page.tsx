import type { Metadata } from 'next';

import { OrdersPageContent } from '@/components/orders-page-content';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = { title: 'Ma commande — Savoraille', description: 'Consultez vos plats, quantités et le total de votre commande Savoraille.' };

export default function OrdersPage() {
  return <><SiteHeader /><OrdersPageContent /><SiteFooter /></>;
}
