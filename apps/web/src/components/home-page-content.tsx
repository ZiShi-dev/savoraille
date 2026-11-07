'use client';

import {
  ArrowRight, ArrowUpRight, Bike, CalendarDays, Clock3,
  Mail, ShoppingBag, UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';
import { AppImage } from './app-image';
import { LocalizedLink } from './localized-link';

import { BrandSeal } from '@/components/brand-seal';
import { HeroContent } from '@/components/hero-content';
import { useI18n } from '@/components/i18n-provider';
import { RestaurantExperience } from '@/components/restaurant-experience';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { SummerMenuExperience } from '@/components/summer-menu-experience';
import { withBasePath } from '@/lib/site-config';

const services: { title: string; description: string; href: string; icon: LucideIcon }[] = [
  { title: 'À table.', description: 'Mardi au dimanche, de 12 h à 23 h.', href: '/reservation', icon: UtensilsCrossed },
  { title: 'À emporter.', description: 'Vous choisissez l’heure, on prépare la carte.', href: '/carte?service=takeaway#menu-complet', icon: ShoppingBag },
  { title: 'Livraison.', description: 'Paris et Bordeaux livrent. Lyon, non.', href: '/carte?service=delivery#menu-complet', icon: Bike },
];

const houseFacts = [
  { value: '3', label: 'adresses' },
  { value: '6 j', label: 'par semaine' },
  { value: '0 %', label: 'alcool' },
];

export function HomePageContent() {
  const { tr } = useI18n();

  return (
    <>
      <SiteHeader />
      <main id="contenu-principal">
        <section id="accueil" className="relative min-h-[100svh] overflow-hidden bg-[#1E3A5F] px-6 pt-28 pb-16 sm:pt-32">
          <video
            className="absolute inset-0 size-full object-cover motion-reduce:hidden"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={withBasePath('/images/savoraille-dining-room-3d.png')}
            aria-hidden="true"
          >
            <source src={withBasePath('/videos/savoraille-hero.mp4')} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,36,64,0.96)_0%,rgba(30,58,95,0.82)_48%,rgba(30,58,95,0.42)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(15,36,64,0.72)_0%,transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_75%_35%,#C6A15B_0,transparent_34%)]" />

          <div data-motion="hero" className="relative z-10 mx-auto flex min-h-[calc(100svh-11rem)] max-w-[1200px] items-center">
            <HeroContent />
          </div>
        </section>

        <div className="gold-divider" aria-hidden="true" />

        <section className="bg-[#FAF6EC] px-6 py-20 sm:py-28" aria-labelledby="services-title">
          <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div data-motion="reveal" className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-script text-3xl text-[#7C2438]">{tr('Nos services')}</p>
              <h2 id="services-title" className="font-display mt-2 text-4xl leading-[0.98] font-semibold text-balance text-[#1E3A5F] sm:text-6xl">{tr('Sur place, à emporter, ou livré.')}</h2>
              <p className="mt-5 max-w-md text-base leading-7 text-[#241F19]/65">{tr('La carte, du mardi au dimanche, de 12 h à 23 h.')}</p>
              <LocalizedLink href="/carte" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1E3A5F] px-6 py-3.5 text-sm font-bold text-[#FAF6EC] outline-none transition-[background-color,transform] duration-150 hover:bg-[#244872] focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF6EC] active:scale-[0.97]">
                {tr('Voir la carte')}<ArrowRight className="size-4 rtl:rotate-180" />
              </LocalizedLink>
            </div>

            <ol aria-label={tr('Nos services')} className="border-b border-[#C6A15B]/40">
              {services.map((service, index) => (
                <li key={service.title} data-motion="reveal" className="border-t border-[#C6A15B]/40">
                  <LocalizedLink href={service.href} className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-8 outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] sm:gap-8 sm:py-10">
                    <span className="font-display w-14 text-5xl leading-none text-[#C6A15B] tabular-nums sm:w-20 sm:text-7xl">{String(index + 1).padStart(2, '0')}</span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-3">
                        <service.icon aria-hidden="true" className="size-5 shrink-0 text-[#7C2438]" strokeWidth={1.7} />
                        <span className="font-display text-3xl font-semibold text-[#1E3A5F] sm:text-4xl">{tr(service.title)}</span>
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-[#241F19]/60 sm:text-base">{tr(service.description)}</span>
                    </span>
                    <span aria-hidden="true" className="grid size-11 place-items-center rounded-full border border-[#1E3A5F]/15 text-[#1E3A5F] transition-colors duration-200 group-hover:border-[#1E3A5F] group-hover:bg-[#1E3A5F] group-hover:text-[#FAF6EC]">
                      <ArrowUpRight className="size-4 rtl:-scale-x-100" />
                    </span>
                  </LocalizedLink>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div className="gold-divider" aria-hidden="true" />

        <SummerMenuExperience />

        <section id="histoire" className="bg-white px-6 py-20 sm:py-28" aria-labelledby="house-title">
          <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <figure data-motion="parallax" className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#1E3A5F] sm:aspect-[5/4] lg:aspect-[4/5]">
              <div data-parallax-inner className="absolute inset-0">
                <AppImage src="/images/reservations/dinner.png" alt={tr('Une table Savoraille dressée avec soin')} fill loading="lazy" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
              <BrandSeal inverse className="absolute bottom-5 start-5 size-20 drop-shadow-[0_8px_20px_rgba(7,28,51,0.45)] sm:size-24" />
            </figure>
            <div data-motion="reveal">
              <p className="font-script text-3xl text-[#7C2438]">{tr('Notre maison')}</p>
              <h2 id="house-title" className="font-display mt-2 text-4xl leading-[0.98] font-semibold text-balance text-[#1E3A5F] sm:text-6xl">{tr('La carte suit le marché.')}</h2>
              <p className="mt-6 text-base leading-8 text-[#241F19]/68 sm:text-lg">{tr('Les produits changent avec la saison. La cuisine reste française : des cuissons justes, une salle calme, trois adresses.')}</p>
              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-[#C6A15B]/45 pt-6">
                {houseFacts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="sr-only">{tr(fact.label)}</dt>
                    <dd className="font-display text-4xl font-semibold leading-none whitespace-nowrap text-[#1E3A5F] sm:text-5xl">{tr(fact.value)}</dd>
                    <dd className="mt-2 text-xs leading-5 text-[#241F19]/58 sm:text-sm">{tr(fact.label)}</dd>
                  </div>
                ))}
              </dl>
              <LocalizedLink href="/histoire" className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#7C2438] underline decoration-[#C6A15B] decoration-2 underline-offset-[6px] outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]">
                {tr('Lire notre histoire')}<ArrowRight className="size-4 rtl:rotate-180" />
              </LocalizedLink>
            </div>
          </div>
        </section>

        <RestaurantExperience />

        <section id="commander" className="bg-[#FAF6EC] px-6 py-20 sm:py-28">
          <div id="reservation" data-motion="reveal" className="relative mx-auto max-w-[1200px] overflow-hidden rounded-3xl bg-[#7C2438] px-7 py-12 text-[#FAF6EC] sm:px-12 sm:py-16 lg:px-16">
            <span aria-hidden="true" className="pointer-events-none absolute -end-16 -top-16 size-72 opacity-[0.08] sm:size-96"><BrandSeal inverse className="size-full" /></span>
            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="font-script text-3xl text-[#C6A15B]">{tr('Une table, ce soir.')}</p>
                <h2 className="font-display mt-2 max-w-2xl text-5xl leading-[0.95] font-semibold text-balance sm:text-7xl">{tr('Réservez, ou écrivez-nous.')}</h2>
                <p className="mt-6 flex items-center gap-2 text-sm text-[#FAF6EC]/78"><Clock3 className="size-4 text-[#C6A15B]" />{tr('Mar–Dim · 12 h–23 h')}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <LocalizedLink href="/reservation" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FAF6EC] px-7 py-4 font-bold text-[#7C2438] outline-none transition-[background-color,transform] duration-150 hover:bg-white focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#7C2438] active:scale-[0.97]"><CalendarDays className="size-5" strokeWidth={1.8} />{tr('Faire une demande de réservation')}</LocalizedLink>
                <a href="mailto:bonjour@savoraille.fr" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#FAF6EC]/40 px-7 py-4 font-bold text-[#FAF6EC] outline-none transition-[background-color,transform] duration-150 hover:bg-[#FAF6EC]/10 focus-visible:ring-2 focus-visible:ring-[#C6A15B] active:scale-[0.97]"><Mail className="size-5" strokeWidth={1.8} />{tr('Nous écrire')}</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
