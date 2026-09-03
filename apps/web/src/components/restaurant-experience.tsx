'use client';

import { AppImage } from './app-image';
import Link from 'next/link';

import { useI18n } from './i18n-provider';

export function RestaurantExperience() {
  const { tr } = useI18n();

  return (
    <section id="experience" className="relative overflow-hidden bg-[#1E3A5F] px-6 py-16 text-[#FAF6EC] sm:py-20 lg:py-24" aria-labelledby="experience-title">
      <div className="pointer-events-none absolute -right-32 top-10 size-96 rounded-full border border-[#C6A15B]/15" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-16 top-24 size-72 rounded-full border border-[#C6A15B]/20" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <p className="font-script text-3xl text-[#C6A15B]">{tr('L’expérience Savoraille')}</p>
          <h2 id="experience-title" className="font-display mt-3 text-4xl leading-[0.98] font-semibold sm:text-5xl lg:text-6xl">
            {tr('Plus qu’un repas, un moment qui reste.')}
          </h2>
          <p className="mt-6 text-base leading-7 text-[#FAF6EC]/72 sm:text-lg sm:leading-8">
            {tr('La lumière est douce, les assiettes arrivent au rythme de la saison et chaque geste raconte une cuisine française vivante.')}
          </p>
          <div className="mt-8 flex items-center gap-4 text-xs font-bold tracking-[0.13em] text-[#C6A15B] uppercase">
            <span>{tr('Produits choisis')}</span>
            <span className="h-px w-10 bg-[#C6A15B]/55" aria-hidden="true" />
            <span>{tr('Service attentionné')}</span>
          </div>
          <Link href="/reservation" className="mt-8 inline-flex items-center gap-3 rounded-lg bg-[#FAF6EC] px-5 py-3.5 text-sm font-bold text-[#1E3A5F] outline-none transition-colors hover:bg-[#C6A15B] hover:text-[#241F19] focus-visible:ring-2 focus-visible:ring-[#C6A15B]">
            {tr('Vivre l’expérience')}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <figure className="group relative aspect-[16/11] overflow-hidden rounded-2xl border border-[#C6A15B]/40 bg-[#102B4D] shadow-[0_22px_55px_rgba(7,28,51,0.38)] sm:aspect-[16/10]" aria-label={tr('Trois moments de l’expérience Savoraille')}>
          <AppImage src="/images/savoraille-dining-room-3d.png" alt={tr('Vue 3D de la salle Savoraille et de ses tables')} fill loading="lazy" sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.025]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071C33]/82 via-transparent to-[#071C33]/10" />
          <div className="pointer-events-none absolute inset-4 rounded-xl border border-[#C6A15B]/35 sm:inset-5" aria-hidden="true" />
          <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
            <div>
              <p className="text-[0.65rem] font-bold tracking-[0.15em] text-[#C6A15B] uppercase">{tr('L’expérience Savoraille')}</p>
              <p className="font-display mt-1 text-2xl leading-tight font-semibold sm:text-3xl">{tr('Votre table vous attend.')}</p>
            </div>
            <span className="hidden rounded-full border border-[#C6A15B]/45 bg-[#071C33]/45 px-4 py-2 text-xs font-bold text-[#FAF6EC] backdrop-blur-md sm:block">{tr('Mar–Dim · 12 h–23 h')}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
