import type { Metadata } from 'next';

import { FullMenuCatalog } from '@/components/full-menu-catalog';
import { ScrollToTop } from '@/components/scroll-to-top';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { SummerMenuExperience } from '@/components/summer-menu-experience';

export const metadata: Metadata = {
  title: 'La carte — Savoraille',
  description: 'Découvrez la carte de saison et les sélections surprises de Savoraille.',
};

export default function MenuPage() {
  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      <main className="bg-[#102B4D] pt-24">
        <SummerMenuExperience showDiscovery={false} standalone />
        <FullMenuCatalog />
      </main>
      <SiteFooter />
    </>
  );
}
