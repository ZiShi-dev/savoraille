'use client';

import { ArrowRight, Clock3, MapPin } from 'lucide-react';

import { AppImage } from './app-image';
import { LocalizedLink } from './localized-link';

import { useI18n } from './i18n-provider';
import { restaurants } from './restaurant-data';

export function RestaurantExperience() {
  const { tr } = useI18n();

  return (
    <section id="experience" className="tone-dark bg-[#102B4D] px-6 py-20 text-[#FAF6EC] sm:py-28" aria-labelledby="experience-title">
      <div className="mx-auto max-w-[1200px]">
        <div data-motion="reveal" className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="font-script text-3xl text-[#C6A15B]">{tr('La salle')}</p>
            <h2 id="experience-title" className="font-display mt-2 text-4xl leading-[0.98] font-semibold text-balance sm:text-6xl">
              {tr('La salle, le soir.')}
            </h2>
            <p className="mt-5 text-base leading-7 text-[#E4DDD0] sm:text-lg sm:leading-8">
              {tr('Les tables sont préparées avant le service. La carte est courte, elle change avec le marché.')}
            </p>
          </div>
          <p className="text-sm font-bold tracking-[0.16em] text-[#E4DDD0] uppercase">{tr('Paris · Lyon · Bordeaux')}</p>
        </div>

        <figure data-motion="parallax" className="relative mt-12 aspect-video overflow-hidden rounded-3xl bg-[#1E3A5F]">
          <div data-parallax-inner className="absolute inset-0">
            <AppImage src="/images/reservations/business.jpg" alt={tr('La salle et ses tables.')} fill loading="lazy" sizes="(max-width: 1024px) 100vw, 1400px" className="object-cover" />
          </div>
        </figure>

        <ul className="mt-6 grid gap-4 md:grid-cols-3" aria-label={tr('Nos adresses')}>
          {restaurants.map((restaurant) => (
            <li key={restaurant.id} data-motion="reveal" className="flex flex-col rounded-3xl border border-[#C6A15B]/25 bg-[#1E3A5F]/55 p-7">
              <p className="font-script text-2xl text-[#C6A15B]">{tr(restaurant.area)}</p>
              <h3 className="font-display text-3xl font-semibold">{restaurant.city}</h3>
              <p className="mt-5 flex gap-2.5 text-base leading-6 text-[#E4DDD0]"><MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-[#E4DDD0]" />{restaurant.address}</p>
              <p className="mt-2 flex gap-2.5 text-base leading-6 text-[#E4DDD0]"><Clock3 aria-hidden="true" className="mt-1 size-4 shrink-0 text-[#E4DDD0]" />{tr(restaurant.hours).replace(/(\d+)\s+h/g, '$1\u00a0h')}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={tr('Nos services')}>
                {restaurant.services.map((service) => (
                  <li key={service} className="rounded-full border border-[#FAF6EC]/25 px-3 py-1 text-sm text-[#E4DDD0]">{tr(service)}</li>
                ))}
              </ul>
              <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#FAF6EC]/10 pt-5">
                <LocalizedLink href="/reservation" className="btn btn-primary">
                  <span>{tr('Réserver')}</span><ArrowRight className="size-4 rtl:rotate-180" />
                </LocalizedLink>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center text-base text-[#E4DDD0] underline decoration-[#E4DDD0]/40 underline-offset-4 transition-colors hover:text-[#FAF6EC]"
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
