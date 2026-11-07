'use client';

import { ArrowRight, Clock3, MapPin } from 'lucide-react';

import { AppImage } from './app-image';
import { LocalizedLink } from './localized-link';

import { useI18n } from './i18n-provider';
import { restaurants } from './restaurant-data';

export function RestaurantExperience() {
  const { tr } = useI18n();

  return (
    <section id="experience" className="bg-[#102B4D] px-6 py-20 text-[#FAF6EC] sm:py-28" aria-labelledby="experience-title">
      <div className="mx-auto max-w-[1200px]">
        <div data-motion="reveal" className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="font-script text-3xl text-[#C6A15B]">{tr('La salle')}</p>
            <h2 id="experience-title" className="font-display mt-2 text-4xl leading-[0.98] font-semibold text-balance sm:text-6xl">
              {tr('La salle, le soir.')}
            </h2>
            <p className="mt-5 text-base leading-7 text-[#FAF6EC]/70 sm:text-lg sm:leading-8">
              {tr('Les tables sont préparées avant le service. La carte est courte, elle change avec le marché.')}
            </p>
          </div>
          <p className="text-xs font-bold tracking-[0.16em] text-[#C6A15B] uppercase">{tr('Paris · Lyon · Bordeaux')}</p>
        </div>

        <figure data-motion="parallax" className="relative mt-12 aspect-[4/3] overflow-hidden rounded-3xl bg-[#1E3A5F] sm:aspect-[21/9]">
          <div data-parallax-inner className="absolute inset-0">
            <AppImage src="/images/savoraille-dining-room-3d.png" alt={tr('Vue 3D de la salle Savoraille et de ses tables')} fill loading="lazy" sizes="(min-width: 1200px) 1200px, 100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#071C33]/75 via-transparent to-transparent" />
          <figcaption className="font-display absolute bottom-5 start-6 text-2xl font-semibold sm:bottom-8 sm:start-8 sm:text-3xl">
            {tr('Tables dressées avant le service.')}
          </figcaption>
        </figure>

        <ul className="mt-6 grid gap-4 md:grid-cols-3" aria-label={tr('Nos adresses')}>
          {restaurants.map((restaurant) => (
            <li key={restaurant.id} data-motion="reveal" className="flex flex-col rounded-3xl border border-[#C6A15B]/25 bg-[#1E3A5F]/55 p-7">
              <p className="font-script text-2xl text-[#C6A15B]">{tr(restaurant.area)}</p>
              <h3 className="font-display text-4xl font-semibold">{restaurant.city}</h3>
              <p className="mt-5 flex gap-2.5 text-sm leading-6 text-[#FAF6EC]/75"><MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-[#C6A15B]" />{restaurant.address}</p>
              <p className="mt-2 flex gap-2.5 text-sm leading-6 text-[#FAF6EC]/75"><Clock3 aria-hidden="true" className="mt-1 size-4 shrink-0 text-[#C6A15B]" />{tr(restaurant.hours)}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={tr('Nos services')}>
                {restaurant.services.map((service) => (
                  <li key={service} className="rounded-full border border-[#FAF6EC]/15 px-3 py-1 text-xs text-[#FAF6EC]/80">{tr(service)}</li>
                ))}
              </ul>
              <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#FAF6EC]/10 pt-5">
                <LocalizedLink href="/reservation" className="inline-flex items-center gap-2 rounded-full bg-[#C6A15B] px-4 py-2.5 text-sm font-bold text-[#241F19] outline-none transition-[background-color,transform] duration-150 hover:bg-[#d4b273] focus-visible:ring-2 focus-visible:ring-[#FAF6EC] active:scale-[0.97]">
                  {tr('Réserver')}<ArrowRight className="size-4 rtl:rotate-180" />
                </LocalizedLink>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[#FAF6EC]/70 underline decoration-[#FAF6EC]/25 underline-offset-4 outline-none transition-colors hover:text-[#FAF6EC] focus-visible:ring-2 focus-visible:ring-[#C6A15B]"
                >
                  {tr('Itinéraire')}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
