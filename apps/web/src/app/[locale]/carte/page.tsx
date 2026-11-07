import type { Metadata } from 'next';

import { RestaurantMenu } from '@/components/restaurant-menu';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
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
      <SiteHeader />
      <main className="bg-[#FAF6EC]" id="contenu-principal">
        <RestaurantMenu />
      </main>
      <SiteFooter />
    </>
  );
}
