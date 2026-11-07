'use client';

import { CalendarDays, Clock3, Leaf, ShoppingBag } from 'lucide-react';

import { LocalizedLink } from './localized-link';
import { useI18n } from './i18n-provider';

export function HeroContent() {
  const { tr } = useI18n();

  return (
    <div className="max-w-3xl">
      <p data-motion-child className="font-script text-3xl text-[#C6A15B] sm:text-4xl">{tr('La merveille des saveurs')}</p>

      <h1 data-motion-child className="font-display mt-5 text-[clamp(3.6rem,7vw,6.8rem)] leading-[0.88] font-semibold tracking-[-0.045em] text-[#FAF6EC]">
        <span className="block">{tr('Trois adresses,')}</span>
        <span className="block italic text-[#C6A15B]">{tr('une carte de saison.')}</span>
      </h1>

      <p data-motion-child className="mt-7 max-w-xl text-base leading-7 text-[#FAF6EC]/82 sm:text-lg">
        {tr('Cuisine française de saison, servie à Paris, Lyon et Bordeaux.')}
      </p>

      <div data-motion-child className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <LocalizedLink
          href="/reservation"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FAF6EC] px-6 py-4 font-semibold text-[#1E3A5F] focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E3A5F] focus-visible:outline-none active:scale-[0.98]"
        >
          <CalendarDays aria-hidden="true" className="size-5" strokeWidth={1.8} />{tr('Réserver une table')}
        </LocalizedLink>
        <LocalizedLink
          href="/carte"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#7C2438] px-6 py-4 font-semibold text-[#FAF6EC] focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E3A5F] focus-visible:outline-none active:scale-[0.98]"
        >
          <ShoppingBag aria-hidden="true" className="size-5" strokeWidth={1.8} />{tr('Commander')}
        </LocalizedLink>
      </div>

      <div data-motion-child className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#FAF6EC]/78">
        <span className="flex items-center gap-2"><Clock3 className="size-4 text-[#C6A15B]" />{tr('Mar–Dim · 12 h–23 h')}</span>
        <span className="flex items-center gap-2"><Leaf className="size-4 text-[#C6A15B]" />{tr('Produits de saison')}</span>
      </div>
    </div>
  );
}
