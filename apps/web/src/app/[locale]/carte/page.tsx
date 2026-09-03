import type { Metadata } from 'next';

import { FullMenuCatalog } from '@/components/full-menu-catalog';
import { MealBuilder } from '@/components/meal-builder';
import { ScrollToTop } from '@/components/scroll-to-top';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { SummerMenuExperience } from '@/components/summer-menu-experience';
import { type Locale } from '@/lib/i18n-routing';
import { getPageCopy, pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = getPageCopy('carte', locale as Locale);
  return pageMetadata(locale as Locale, '/carte/', copy);
}

export default function MenuPage() {
  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      <main className="bg-[#102B4D] pt-24" id="contenu-principal">
        <SummerMenuExperience showDiscovery standalone />
        <MealBuilder />
        <FullMenuCatalog />
      </main>
      <SiteFooter />
    </>
  );
}
