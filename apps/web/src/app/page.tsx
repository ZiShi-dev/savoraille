'use client';

import {
  ArrowRight, Bike, CalendarDays, Clock3,
  Phone, ShoppingBag,
} from 'lucide-react';
import Link from 'next/link';

import { BrandSeal } from '@/components/brand-seal';
import { HeroContent } from '@/components/hero-content';
import { useI18n } from '@/components/i18n-provider';
import { RestaurantExperience } from '@/components/restaurant-experience';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { SummerMenuExperience } from '@/components/summer-menu-experience';
import { withBasePath } from '@/lib/site-config';

const services = [
  { icon: CalendarDays, eyebrow: 'Sur place', title: 'Votre table vous attend.', description: 'Choisissez votre heure, nous préparons le reste.', action: 'Réserver une table', href: '/reservation' },
  { icon: ShoppingBag, eyebrow: 'À emporter', title: 'Votre panier sent déjà bon.', description: 'Commandez la carte du moment et passez la chercher.', action: 'Commander', href: '/carte?service=takeaway#menu-complet' },
  { icon: Bike, eyebrow: 'Livraison', title: 'La cloche sonne bientôt.', description: 'Nos assiettes voyagent jusque chez vous.', action: 'Se faire livrer', href: '/carte?service=delivery#menu-complet' },
];

export default function HomePage() {
  const { tr } = useI18n();

  return (
    <>
      <SiteHeader />
      <main id="contenu-principal">
        <section id="accueil" className="relative min-h-[100svh] overflow-hidden bg-[#1E3A5F] px-6 pb-64 pt-36 sm:pb-48 sm:pt-40">
          <video className="absolute inset-0 size-full object-cover motion-reduce:hidden" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
            <source src={withBasePath('/videos/savoraille-hero.mp4')} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,36,64,0.96)_0%,rgba(30,58,95,0.82)_48%,rgba(30,58,95,0.42)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(15,36,64,0.72)_0%,transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_75%_35%,#C6A15B_0,transparent_34%)]" />

          <div className="relative z-10 mx-auto flex min-h-[calc(100svh-18rem)] max-w-[1200px] items-center">
            <HeroContent />
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20 border-y border-[#C6A15B]/45 bg-[#102B4D]/88 px-6 py-5 backdrop-blur-md">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="shrink-0 rounded-full bg-[#C6A15B] px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.14em] text-[#241F19] uppercase">{tr('Carte d’été')}</span>
                <div>
                  <p className="font-display text-xl font-semibold text-[#FAF6EC] sm:text-2xl">{tr('L’assiette du moment')}</p>
                  <p className="text-xs text-[#FAF6EC]/65 sm:text-sm">{tr('Volaille dorée, jus corsé, légumes de nos producteurs.')}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 self-start sm:self-auto">
                <Link href="/carte" className="inline-flex items-center gap-2 text-sm font-bold text-[#C6A15B] outline-none hover:text-[#FAF6EC] focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Découvrir la carte')}<ArrowRight className="size-4 rtl:rotate-180" /></Link>
                <a href="#selection-surprise" className="inline-flex items-center gap-2 text-sm font-semibold text-[#FAF6EC]/75 outline-none hover:text-[#FAF6EC] focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Voir les choix surprises')}<ArrowRight className="size-4 rtl:rotate-180" /></a>
              </div>
            </div>
          </div>
        </section>

        <div className="gold-divider" aria-hidden="true" />

        <section className="bg-[#FAF6EC] px-6 py-16 sm:py-20 lg:py-24" aria-labelledby="services-title">
          <div className="mx-auto max-w-[1200px]">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-script text-3xl text-[#7C2438]">{tr('À chacun son moment')}</p>
              <h2 id="services-title" className="font-display mt-3 text-4xl font-semibold text-[#1E3A5F] sm:text-5xl">{tr('Savourez comme vous aimez.')}</h2>
            </div>
            <p className="mt-5 text-center text-xs font-semibold tracking-[0.08em] text-[#1E3A5F]/55 uppercase lg:hidden">{tr('Faites glisser pour découvrir les trois services')}</p>
            <div className="-mx-6 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:mt-12 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0" aria-label={tr('Nos services')}>
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article key={service.title} className="group min-w-[82vw] snap-center rounded-2xl border border-[#1E3A5F]/12 bg-white/55 p-6 shadow-[0_8px_24px_rgba(30,58,95,0.08)] transition-all hover:-translate-y-1 hover:border-[#C6A15B]/45 hover:shadow-[0_14px_34px_rgba(30,58,95,0.14)] sm:min-w-[55vw] sm:p-8 lg:min-w-0">
                    <div className="grid size-12 place-items-center rounded-full border border-[#C6A15B]/45 text-[#1E3A5F]"><Icon className="size-6" strokeWidth={1.6} /></div>
                    <p className="mt-7 text-xs font-bold tracking-[0.17em] text-[#C4703F] uppercase">{tr(service.eyebrow)}</p>
                    <h3 className="font-display mt-2 text-3xl font-semibold text-[#1E3A5F]">{tr(service.title)}</h3>
                    <p className="mt-3 leading-7 text-[#241F19]/65">{tr(service.description)}</p>
                    <Link href={service.href} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#7C2438] outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr(service.action)}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" /></Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <SummerMenuExperience />

        <RestaurantExperience />

        <div className="gold-divider gold-divider-dark" aria-hidden="true" />

        <section id="histoire" className="bg-[#FAF6EC] px-6 py-16 sm:py-24 lg:py-28">
          <div className="mx-auto grid max-w-[1200px] gap-8 sm:gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div className="mx-auto grid aspect-square w-full max-w-56 place-items-center rounded-full border border-[#C6A15B]/50 bg-white/40 p-6 sm:max-w-sm sm:p-8"><BrandSeal className="size-full" /></div>
            <div>
              <p className="font-script text-3xl text-[#7C2438]">{tr('Notre maison')}</p>
              <h2 className="font-display mt-3 text-4xl leading-[0.98] font-semibold text-[#1E3A5F] sm:text-6xl">{tr('Le cachet du terroir, la fraîcheur d’aujourd’hui.')}</h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#241F19]/70 sm:mt-7 sm:text-lg sm:leading-8">{tr('Savoraille cuisine la saison avec respect et liberté. Des produits choisis près de chez nous, des gestes français et une salle où chaque détail invite à rester.')}</p>
              <p className="font-script mt-6 text-3xl text-[#C4703F]">{tr('Bienvenue à notre table.')}</p>
            </div>
          </div>
        </section>

        <section id="commander" className="bg-[#FAF6EC] px-6 pb-24">
          <div id="reservation" className="relative mx-auto max-w-[1200px] overflow-hidden rounded-2xl bg-[#7C2438] p-8 text-[#FAF6EC] shadow-[0_16px_50px_rgba(124,36,56,0.2)] sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full border border-[#C6A15B]/25" /><div className="pointer-events-none absolute -right-8 -top-12 size-56 rounded-full border border-[#C6A15B]/35" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="font-script text-3xl text-[#C6A15B]">{tr('Votre table vous attend')}</p>
                <h2 className="font-display mt-3 max-w-2xl text-5xl leading-none font-semibold sm:text-6xl">{tr('Quel plaisir vous ferait envie aujourd’hui ?')}</h2>
                <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#FAF6EC]/78"><span className="flex items-center gap-2"><Clock3 className="size-4 text-[#C6A15B]" />{tr('Mar–Dim · 12 h–23 h')}</span></div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href="/reservation" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FAF6EC] px-6 py-4 font-bold text-[#7C2438] focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:outline-none"><CalendarDays className="size-5" strokeWidth={1.8} />{tr('Faire une demande de réservation')}</Link>
                <a href="mailto:bonjour@savoraille.fr" className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#FAF6EC]/40 px-6 py-4 font-bold text-[#FAF6EC] focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:outline-none"><Phone className="size-5" strokeWidth={1.8} />{tr('Nous écrire')}</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
