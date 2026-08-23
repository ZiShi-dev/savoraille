'use client';

import { ArrowUpRight, Gem, Heart, Leaf, UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';

import { BrandSeal } from './brand-seal';
import { useI18n } from './i18n-provider';

const values = [
  { icon: Leaf, title: 'Terroir', description: 'Des produits de saison choisis près de chez nous, au rythme de la terre.' },
  { icon: Gem, title: 'Élégance', description: 'Le raffinement français sans froideur, dans l’assiette comme en salle.' },
  { icon: Heart, title: 'Chaleur', description: 'Un accueil sincère, une lumière douce et le plaisir de prendre le temps.' },
  { icon: UtensilsCrossed, title: 'Générosité', description: 'Des assiettes vraies, des saveurs franches et une attention qui se partage.' },
];

export function HistoryPageContent() {
  const { tr } = useI18n();

  return (
    <main className="bg-[#FAF6EC] pt-24">
      <section className="relative overflow-hidden bg-[#102B4D] px-6 py-16 text-[#FAF6EC] sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_82%_28%,#C6A15B_0,transparent_30%),linear-gradient(rgba(198,161,91,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(198,161,91,.07)_1px,transparent_1px)] [background-size:auto,48px_48px,48px_48px]" />
        <div className="relative mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="font-script text-3xl text-[#C6A15B]">{tr('Notre maison')}</p>
            <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[0.95] font-semibold sm:text-6xl lg:text-7xl">{tr('Notre histoire, servie à table.')}</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-[#FAF6EC]/72 sm:text-lg">{tr('Savoraille est née d’une envie simple : faire vivre la cuisine française avec les saisons, sans perdre la chaleur du bistrot ni la précision des beaux gestes.')}</p>
            <Link href="/carte" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#C6A15B] px-5 py-3.5 text-sm font-bold text-[#241F19] outline-none transition-colors hover:bg-[#FAF6EC] focus-visible:ring-2 focus-visible:ring-[#FAF6EC]">{tr('Goûter notre histoire')}<ArrowUpRight className="size-4 rtl:-scale-x-100" /></Link>
          </div>
          <div className="mx-auto grid aspect-square w-full max-w-sm place-items-center rounded-full border border-[#C6A15B]/45 bg-[#FAF6EC]/5 p-10 shadow-[0_24px_70px_rgba(0,0,0,0.22)]"><BrandSeal inverse className="size-full" /></div>
        </div>
      </section>

      <div className="gold-divider" aria-hidden="true" />

      <section className="px-6 py-16 sm:py-24" aria-labelledby="values-title">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-[0.18em] text-[#7C2438] uppercase">{tr('Ce qui nous guide')}</p>
            <h2 id="values-title" className="font-display mt-3 text-4xl leading-none font-semibold text-[#1E3A5F] sm:text-5xl">{tr('Une maison de goût, quatre convictions.')}</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, description }, index) => (
              <article key={title} className="relative overflow-hidden rounded-2xl border border-[#1E3A5F]/12 bg-white/60 p-6 shadow-[0_8px_24px_rgba(30,58,95,0.08)] transition-all hover:-translate-y-1 hover:border-[#C6A15B]/60 hover:shadow-[0_16px_36px_rgba(30,58,95,0.14)]">
                <span className="font-display absolute end-4 top-3 text-5xl font-semibold text-[#C6A15B]/14">0{index + 1}</span>
                <div className="grid size-12 place-items-center rounded-full border border-[#C6A15B]/50 text-[#7C2438]"><Icon className="size-5" strokeWidth={1.6} /></div>
                <h3 className="font-display mt-6 text-3xl font-semibold text-[#1E3A5F]">{tr(title)}</h3>
                <p className="mt-3 text-sm leading-6 text-[#241F19]/65">{tr(description)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#7C2438] px-6 py-14 text-[#FAF6EC] sm:py-18">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="font-script text-3xl text-[#C6A15B]">{tr('Bienvenue à notre table.')}</p><h2 className="font-display mt-2 max-w-2xl text-4xl leading-none font-semibold sm:text-5xl">{tr('Le cachet du terroir, la fraîcheur d’aujourd’hui.')}</h2></div>
          <Link href="/#reservation" className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#FAF6EC] px-5 py-3.5 text-sm font-bold text-[#7C2438] outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Réserver une table')}<ArrowUpRight className="size-4 rtl:-scale-x-100" /></Link>
        </div>
      </section>
    </main>
  );
}
