'use client';

import { CalendarDays, Clock3, Leaf, ShoppingBag } from 'lucide-react';

import { LocalizedLink } from './localized-link';
import { useI18n } from './i18n-provider';

export function HeroContent() {
  const { locale, tr } = useI18n();
  const arabic = locale === 'ar';

  return (
    <div className={`rounded-[28px] bg-[#102B4D] px-6 py-8 sm:px-8 sm:py-10 ${arabic ? 'max-w-4xl' : 'max-w-3xl'}`}>
      <p data-motion-child className="font-script text-3xl text-[#C6A15B] sm:text-4xl">{tr('La merveille des saveurs')}</p>

      <h1 data-motion-child className={`font-display mt-5 font-semibold text-[#FAF6EC] ${arabic ? 'text-[clamp(2.35rem,4.4vw,3.6rem)] leading-[1.35] tracking-normal' : 'text-[clamp(3.2rem,6vw,6rem)] leading-[0.88] tracking-[-0.045em]'}`}>
        <span className="block">{tr('Trois adresses,')}</span>
        <span className={`block text-[#E4DDD0] ${arabic ? '' : 'italic'}`}>{tr('une carte de saison.')}</span>
      </h1>

      <p data-motion-child className="mt-7 max-w-xl text-base leading-7 text-[#E4DDD0] sm:text-lg">
        {tr('Cuisine française de saison, servie à Paris, Lyon et Bordeaux.')}
      </p>

      <div data-motion-child className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <LocalizedLink href="/reservation" className="btn btn-primary">
          <CalendarDays aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.8} />
          <span>{tr('Réserver une table')}</span>
        </LocalizedLink>
        <LocalizedLink href="/carte" className="btn btn-secondary text-[#FAF6EC]">
          <ShoppingBag aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.8} />
          <span>{tr('Commander')}</span>
        </LocalizedLink>
      </div>

      <div data-motion-child className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-base font-medium text-[#E4DDD0]">
        <span className="flex items-center gap-2"><Clock3 className="size-4 text-[#C6A15B]" />{tr('Mar–Dim · 12 h–23 h')}</span>
        <span className="flex items-center gap-2"><Leaf className="size-4 text-[#C6A15B]" />{tr('Produits de saison')}</span>
      </div>
    </div>
  );
}
