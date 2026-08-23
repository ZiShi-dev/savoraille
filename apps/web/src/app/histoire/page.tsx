import type { Metadata } from 'next';

import { HistoryPageContent } from '@/components/history-page-content';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = { title: 'Notre histoire — Savoraille', description: 'Découvrez l’histoire, les valeurs et la cuisine française vivante de Savoraille.' };

export default function HistoryPage() {
  return <><SiteHeader /><HistoryPageContent /><SiteFooter /></>;
}
