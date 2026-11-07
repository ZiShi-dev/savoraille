'use client';

import { CalendarDays, Clock3, Leaf, ShoppingBag } from 'lucide-react';

import { LocalizedLink } from './localized-link';
import { useI18n } from './i18n-provider';

export function HeroContent() {
  const { locale, tr } = useI18n();
  const arabic = locale === 'ar';

  return (
    <div className={`-mx-6 w-[calc(100%+3rem)] rounded-t-[28px] bg-[#102B4D] px-6 pt-7 pb-[max(1.75rem,env(safe-area-inset-bottom))] sm:mx-0 sm:w-auto sm:rounded-[28px] sm:px-8 sm:py-10 ${arabic ? 'sm:max-w-4xl' : 'sm:max-w-3xl'}`}>
      <p data-motion-child className="font-script text-2xl text-[#C6A15B] sm:text-4xl">{tr('La merveille des saveurs')}</p>

      <h1 data-motion-child className={`font-display mt-3 font-semibold text-[#FAF6EC] sm:mt-5 ${arabic ? 'text-[2.1rem] leading-[1.35] tracking-normal sm:text-[clamp(2.35rem,4.4vw,3.6rem)]' : 'text-[2.6rem] leading-[0.92] tracking-[-0.04em] sm:text-[clamp(3.2rem,6vw,6rem)] sm:leading-[0.88] sm:tracking-[-0.045em]'}`}>
        <span className="block">{tr('Trois adresses,')}</span>
        <span className={`block text-[#E4DDD0] ${arabic ? '' : 'italic'}`}>{tr('une carte de saison.')}</span>
      </h1>

      <p data-motion-child className="mt-4 max-w-xl text-base leading-7 text-[#E4DDD0] sm:mt-7 sm:text-lg">
        {tr('Cuisine française de saison, servie à Paris, Lyon et Bordeaux.')}
      </p>

      <div data-motion-child className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
        <LocalizedLink href="/reservation" className="btn btn-primary">
          <CalendarDays aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.8} />
          <span>{tr('Réserver une table')}</span>
        </LocalizedLink>
        <LocalizedLink href="/carte" className="btn btn-secondary text-[#FAF6EC]">
          <ShoppingBag aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.8} />
          <span>{tr('Commander')}</span>
        </LocalizedLink>
      </div>

      <div data-motion-child className="mt-5 flex flex-wrap gap-x-6 gap-y-2 pe-16 text-base font-medium text-[#E4DDD0] sm:mt-8 sm:gap-y-3 sm:pe-0">
        <span className="flex items-center gap-2"><Clock3 className="size-4 text-[#C6A15B]" />{tr('Mar–Dim · 12 h–23 h')}</span>
        <span className="flex items-center gap-2"><Leaf className="size-4 text-[#C6A15B]" />{tr('Produits de saison')}</span>
      </div>
    </div>
  );
}
