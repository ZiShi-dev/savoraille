'use client';

import { ArrowRight, CalendarDays, Clock3, Mail, MapPin } from 'lucide-react';

import { AppImage } from './app-image';
import { BrandSeal } from './brand-seal';
import { LocalizedLink } from './localized-link';

import { useI18n } from './i18n-provider';
import { restaurants } from './restaurant-data';

const houseFacts = [
  { value: '3', label: 'adresses' },
  { value: '6 j', label: 'par semaine' },
  { value: '0 %', label: 'alcool' },
];

export function HistoryPageContent() {
  const { tr } = useI18n();

  return (
    <main id="contenu-principal" className="bg-[#FAF6EC] text-[#241F19]">
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#102B4D] text-[#FAF6EC]">
        <AppImage src="/images/savoraille-dining-room-3d.png" alt={tr('La salle Savoraille, préparée pour le service du soir')} fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,36,64,0.96)_0%,rgba(30,58,95,0.82)_48%,rgba(30,58,95,0.42)_100%)] rtl:bg-[linear-gradient(270deg,rgba(15,36,64,0.96)_0%,rgba(30,58,95,0.82)_48%,rgba(30,58,95,0.42)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(15,36,64,0.72)_0%,transparent_55%)]" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-[1200px] items-end px-6 pt-28 pb-16 sm:pt-32 sm:pb-20">
          <div data-motion="hero" className="max-w-3xl">
            <p data-motion-child className="font-script text-3xl text-[#C6A15B] sm:text-4xl">{tr('La maison')}</p>
            <h1 data-motion-child className="font-display mt-2 max-w-[850px] text-5xl leading-[0.92] font-semibold text-balance sm:text-7xl">{tr('Trois salles, une carte.')}</h1>
            <p data-motion-child className="mt-6 max-w-2xl text-base leading-8 text-[#FAF6EC]/78 sm:text-lg">{tr('Le Marais, la Presqu’île, les Chartrons. Du mardi au dimanche, de 12 h à 23 h. Lyon ne livre pas.')}</p>
            <div data-motion-child className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LocalizedLink href="/carte" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FAF6EC] px-6 py-3.5 text-sm font-bold text-[#1E3A5F] outline-none transition-[background-color,transform] duration-150 hover:bg-white focus-visible:ring-2 focus-visible:ring-[#C6A15B] active:scale-[0.97]">
                {tr('Voir la carte')}<ArrowRight className="size-4 rtl:rotate-180" />
              </LocalizedLink>
              <LocalizedLink href="/reservation" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#FAF6EC]/40 px-6 py-3.5 text-sm font-bold text-[#FAF6EC] outline-none transition-[background-color,transform] duration-150 hover:bg-[#FAF6EC]/10 focus-visible:ring-2 focus-visible:ring-[#C6A15B] active:scale-[0.97]">
                {tr('Réserver une table')}<ArrowRight className="size-4 rtl:rotate-180" />
              </LocalizedLink>
            </div>
          </div>
        </div>
      </section>

      <div className="gold-divider" aria-hidden="true" />

      <section className="bg-white px-6 py-20 sm:py-28" aria-labelledby="story-title">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <figure data-motion="parallax" className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#1E3A5F] sm:aspect-[5/4] lg:aspect-[4/5]">
            <div data-parallax-inner className="absolute inset-0">
              <AppImage src="/images/reservations/dinner.png" alt={tr('Une table Savoraille dressée avec soin')} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <BrandSeal inverse className="absolute bottom-5 start-5 size-20 drop-shadow-[0_8px_20px_rgba(7,28,51,0.45)] sm:size-24" />
          </figure>
          <div data-motion="reveal">
            <p className="font-script text-3xl text-[#7C2438]">{tr('La carte')}</p>
            <h2 id="story-title" className="font-display mt-2 text-4xl leading-[0.98] font-semibold text-balance text-[#1E3A5F] sm:text-6xl">{tr('Elle change avec le marché.')}</h2>
            <p className="mt-6 text-base leading-8 text-[#241F19]/68 sm:text-lg">{tr('Volaille fermière, lieu jaune, potimarron, agneau. Ce qui n’est plus bon cette semaine sort de la carte.')}</p>
            <p className="mt-4 text-base leading-8 text-[#241F19]/68 sm:text-lg">{tr('Lyon : sur place et à emporter. Paris et Bordeaux livrent aussi.')}</p>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-[#C6A15B]/45 pt-6">
              {houseFacts.map((fact) => (
                <div key={fact.label}>
                  <dt className="sr-only">{tr(fact.label)}</dt>
                  <dd className="font-display text-4xl font-semibold leading-none whitespace-nowrap text-[#1E3A5F] sm:text-5xl">{tr(fact.value)}</dd>
                  <dd className="mt-2 text-xs leading-5 text-[#241F19]/58 sm:text-sm">{tr(fact.label)}</dd>
                </div>
              ))}
            </dl>
            <LocalizedLink href="/carte" className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#7C2438] underline decoration-[#C6A15B] decoration-2 underline-offset-[6px] outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]">
              {tr('Voir la carte')}<ArrowRight className="size-4 rtl:rotate-180" />
            </LocalizedLink>
          </div>
        </div>
      </section>

      <section id="adresses" className="bg-[#102B4D] px-6 py-20 text-[#FAF6EC] sm:py-28" aria-labelledby="addresses-title">
        <div className="mx-auto max-w-[1200px]">
          <div data-motion="reveal" className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl">
              <p className="font-script text-3xl text-[#C6A15B]">{tr('Les adresses')}</p>
              <h2 id="addresses-title" className="font-display mt-2 text-4xl leading-[0.98] font-semibold text-balance sm:text-6xl">{tr('Où venir.')}</h2>
              <p className="mt-5 text-base leading-7 text-[#FAF6EC]/70 sm:text-lg sm:leading-8">{tr('Le Marais, la Presqu’île, les Chartrons. Du mardi au dimanche, de 12 h à 23 h. Lyon ne livre pas.')}</p>
            </div>
            <p className="text-xs font-bold tracking-[0.16em] text-[#C6A15B] uppercase">{tr('Paris · Lyon · Bordeaux')}</p>
          </div>

          <figure data-motion="parallax" className="relative mt-12 aspect-[4/3] overflow-hidden rounded-3xl bg-[#1E3A5F] sm:aspect-[21/9]">
            <div data-parallax-inner className="absolute inset-0">
              <AppImage src="/images/reservations/romantic.png" alt={tr('Une table intime dans la salle Savoraille')} fill loading="lazy" sizes="(min-width: 1200px) 1200px, 100vw" className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#071C33]/75 via-transparent to-transparent" />
            <figcaption className="font-display absolute bottom-5 start-6 text-2xl font-semibold sm:bottom-8 sm:start-8 sm:text-3xl">
              {tr('Chaque table a son histoire.')}
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

      <section className="bg-[#FAF6EC] px-6 py-20 sm:py-28">
        <div data-motion="reveal" className="relative mx-auto max-w-[1200px] overflow-hidden rounded-3xl bg-[#7C2438] px-7 py-12 text-[#FAF6EC] sm:px-12 sm:py-16 lg:px-16">
          <span aria-hidden="true" className="pointer-events-none absolute -end-16 -top-16 size-72 opacity-[0.08] sm:size-96"><BrandSeal inverse className="size-full" /></span>
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="font-script text-3xl text-[#C6A15B]">{tr('La salle')}</p>
              <h2 className="font-display mt-2 max-w-2xl text-5xl leading-[0.95] font-semibold text-balance sm:text-7xl">{tr('Une table, ce soir.')}</h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-[#FAF6EC]/78">{tr('Date, heure, nombre de couverts.')}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <LocalizedLink href="/reservation" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FAF6EC] px-7 py-4 font-bold text-[#7C2438] outline-none transition-[background-color,transform] duration-150 hover:bg-white focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#7C2438] active:scale-[0.97]">
                <CalendarDays className="size-5" strokeWidth={1.8} />{tr('Réserver une table')}
              </LocalizedLink>
              <LocalizedLink href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#FAF6EC]/40 px-7 py-4 font-bold text-[#FAF6EC] outline-none transition-[background-color,transform] duration-150 hover:bg-[#FAF6EC]/10 focus-visible:ring-2 focus-visible:ring-[#C6A15B] active:scale-[0.97]">
                <Mail className="size-5" strokeWidth={1.8} />{tr('Nous contacter')}
              </LocalizedLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
