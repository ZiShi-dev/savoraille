'use client';

import Link from 'next/link';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { useI18n } from '@/components/i18n-provider';

export default function NotFoundPage() {
  const { tr } = useI18n();

  return (
    <>
      <SiteHeader />
      <main id="contenu-principal" className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FAF6EC] px-6 pt-28 text-center text-[#1E3A5F]">
        <p className="font-script text-3xl text-[#7C2438]">{tr('Oups')}</p>
        <h1 className="font-display mt-3 text-5xl font-semibold">{tr('Page introuvable')}</h1>
        <p className="mt-4 max-w-md text-sm leading-7 text-[#241F19]/65">
          {tr('Cette page n’existe pas ou a été déplacée. Revenez à l’accueil pour poursuivre la visite.')}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-full bg-[#7C2438] px-6 py-3 text-sm font-bold text-[#FAF6EC] outline-none transition-colors hover:bg-[#691d2f] focus-visible:ring-2 focus-visible:ring-[#C6A15B]"
        >
          {tr('Retour à l’accueil')}
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
