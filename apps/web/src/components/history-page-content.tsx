'use client';

import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Flame, Gem, Heart, Leaf, Sparkles, UsersRound, UtensilsCrossed, Wheat } from 'lucide-react';
import { AppImage } from './app-image';
import Link from 'next/link';

import { BrandSeal } from './brand-seal';
import { useI18n } from './i18n-provider';

const values = [
  { icon: Leaf, title: 'Terroir', description: 'Des produits de saison choisis près de chez nous, au rythme de la terre.' },
  { icon: Gem, title: 'Élégance', description: 'Le raffinement français sans froideur, dans l’assiette comme en salle.' },
  { icon: Heart, title: 'Chaleur', description: 'Un accueil sincère, une lumière douce et le plaisir de prendre le temps.' },
  { icon: UtensilsCrossed, title: 'Générosité', description: 'Des assiettes vraies, des saveurs franches et une attention qui se partage.' },
];

const gestures = [
  { icon: Wheat, number: '01', title: 'Choisir', description: 'Des produits de saison, des producteurs proches et une carte qui sait attendre le bon moment.' },
  { icon: Flame, number: '02', title: 'Cuisiner', description: 'Des cuissons justes, des sauces patientes et des gestes français précis, sans artifice.' },
  { icon: UsersRound, number: '03', title: 'Partager', description: 'Une assiette généreuse n’est complète que lorsqu’elle arrive à une table heureuse.' },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.65, ease: 'easeOut' as const },
};

export function HistoryPageContent() {
  const { tr } = useI18n();

  return (
    <main className="overflow-hidden bg-[#FAF6EC] pt-20 text-[#241F19]">
      <section className="relative isolate min-h-[680px] overflow-hidden bg-[#102B4D] text-[#FAF6EC] sm:min-h-[760px]">
        <AppImage src="/images/savoraille-dining-room-3d.png" alt={tr('La salle Savoraille, préparée pour le service du soir')} fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,25,45,.92)_0%,rgba(7,25,45,.74)_48%,rgba(7,25,45,.26)_100%)] rtl:bg-[linear-gradient(270deg,rgba(7,25,45,.92)_0%,rgba(7,25,45,.74)_48%,rgba(7,25,45,.26)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,25,45,.72)_0%,transparent_55%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#C6A15B]/70" />

        <div className="relative mx-auto flex min-h-[680px] max-w-[1200px] flex-col justify-end px-6 pb-16 pt-24 sm:min-h-[760px] sm:pb-20 lg:px-8">
          <motion.div {...reveal} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C6A15B]/45 bg-[#102B4D]/55 px-3.5 py-2 text-[0.68rem] font-bold tracking-[0.16em] text-[#FAF6EC] uppercase backdrop-blur-md">
              <Sparkles className="size-3.5 text-[#C6A15B]" />{tr('Maison française · Cuisine de saison')}
            </div>
            <p className="font-script mt-7 text-3xl text-[#C6A15B] sm:text-4xl">{tr('Notre maison')}</p>
            <h1 className="font-display mt-3 max-w-[850px] text-5xl leading-[0.9] font-semibold text-balance sm:text-7xl lg:text-[5.5rem]">{tr('Notre histoire, servie à table.')}</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-[#FAF6EC]/78 sm:text-lg">{tr('Savoraille est née d’une envie simple : faire vivre la cuisine française avec les saisons, sans perdre la chaleur du bistrot ni la précision des beaux gestes.')}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/carte" className="inline-flex items-center gap-2 rounded-lg bg-[#C6A15B] px-5 py-3.5 text-sm font-bold text-[#241F19] outline-none transition-colors hover:bg-[#FAF6EC] focus-visible:ring-2 focus-visible:ring-[#FAF6EC]">{tr('Voir la carte de saison')}<ArrowUpRight className="size-4 rtl:-scale-x-100" /></Link>
              <Link href="#notre-geste" className="inline-flex items-center gap-2 rounded-lg border border-[#FAF6EC]/35 bg-[#102B4D]/35 px-5 py-3.5 text-sm font-bold text-[#FAF6EC] outline-none backdrop-blur-sm transition-colors hover:bg-[#FAF6EC]/10 focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Découvrir notre manière de faire')}<ArrowDown className="size-4" /></Link>
            </div>
          </motion.div>

          <div className="absolute bottom-8 end-6 hidden items-center gap-4 rounded-2xl border border-[#C6A15B]/30 bg-[#102B4D]/65 p-3 pe-5 backdrop-blur-lg lg:flex">
            <BrandSeal inverse className="size-16" />
            <div><p className="font-script text-xl text-[#C6A15B]">{tr('La merveille des saveurs')}</p><p className="mt-0.5 text-xs text-[#FAF6EC]/60">{tr('À votre table, au rythme des saisons.')}</p></div>
          </div>
        </div>
      </section>

      <div className="gold-divider" aria-hidden="true" />

      <section className="px-6 py-16 sm:py-24 lg:px-8" aria-labelledby="story-title">
        <motion.div {...reveal} className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:gap-16">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#1E3A5F]/12 bg-[#1E3A5F] shadow-[0_24px_55px_rgba(30,58,95,0.18)] sm:aspect-[5/4] lg:aspect-[4/5]">
              <AppImage src="/images/reservations/dinner.png" alt={tr('Une table Savoraille dressée avec soin')} fill sizes="(max-width: 1024px) 100vw, 46vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102B4D]/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 end-4 max-w-[240px] rounded-2xl border border-[#C6A15B]/45 bg-[#FAF6EC] p-5 shadow-[0_16px_38px_rgba(30,58,95,0.18)] sm:end-8">
              <p className="font-script text-2xl text-[#7C2438]">{tr('La merveille des saveurs')}</p>
              <p className="mt-1 text-xs leading-5 text-[#241F19]/58">{tr('Une cuisine précise, chaleureuse et profondément vivante.')}</p>
            </div>
          </div>

          <div className="pt-7 lg:pt-0">
            <p className="text-xs font-bold tracking-[0.18em] text-[#7C2438] uppercase">{tr('Une cuisine vivante')}</p>
            <h2 id="story-title" className="font-display mt-3 text-4xl leading-[0.98] font-semibold text-[#1E3A5F] text-balance sm:text-6xl">{tr('De la terre à l’assiette, sans raccourci.')}</h2>
            <p className="mt-7 text-base leading-8 text-[#241F19]/68">{tr('Nous suivons le goût avant les habitudes. Les légumes donnent le tempo, les sauces prennent leur temps et chaque assiette garde la mémoire du produit.')}</p>
            <p className="mt-5 border-s-2 border-[#C6A15B] ps-5 text-lg leading-8 text-[#1E3A5F]">{tr('Notre cuisine tutoie la tradition française, puis lui ouvre les fenêtres sur le présent.')}</p>
            <Link href="/carte" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#7C2438] underline decoration-[#C6A15B] decoration-2 underline-offset-8 outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Goûter notre histoire')}<ArrowUpRight className="size-4 rtl:-scale-x-100" /></Link>
          </div>
        </motion.div>
      </section>

      <section id="notre-geste" className="relative bg-[#102B4D] px-6 py-16 text-[#FAF6EC] sm:py-24 lg:px-8" aria-labelledby="gesture-title">
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_15%_20%,#C6A15B_0,transparent_22%),linear-gradient(rgba(198,161,91,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(198,161,91,.06)_1px,transparent_1px)] [background-size:auto,56px_56px,56px_56px]" />
        <motion.div {...reveal} className="relative mx-auto max-w-[1200px]">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-[0.18em] text-[#C6A15B] uppercase">{tr('Notre manière de faire')}</p>
            <h2 id="gesture-title" className="font-display mt-3 text-4xl leading-none font-semibold text-balance sm:text-6xl">{tr('Trois gestes, une même exigence.')}</h2>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {gestures.map(({ icon: Icon, number, title, description }) => (
              <article key={title} className="group relative overflow-hidden rounded-2xl border border-[#C6A15B]/25 bg-[#FAF6EC]/[0.055] p-6 transition-colors hover:border-[#C6A15B]/60 hover:bg-[#FAF6EC]/[0.09] sm:p-8">
                <div className="flex items-start justify-between gap-5"><span className="grid size-12 place-items-center rounded-full border border-[#C6A15B]/50 text-[#C6A15B]"><Icon className="size-5" strokeWidth={1.6} /></span><span className="font-display text-5xl font-semibold text-[#C6A15B]/18">{number}</span></div>
                <h3 className="font-display mt-12 text-3xl font-semibold">{tr(title)}</h3>
                <p className="mt-3 text-sm leading-7 text-[#FAF6EC]/62">{tr(description)}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="px-6 py-16 sm:py-24 lg:px-8" aria-labelledby="values-title">
        <motion.div {...reveal} className="mx-auto max-w-[1200px]">
          <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] text-[#7C2438] uppercase">{tr('Ce qui nous guide')}</p>
              <h2 id="values-title" className="font-display mt-3 text-4xl leading-none font-semibold text-[#1E3A5F] text-balance sm:text-5xl">{tr('Une maison de goût, quatre convictions.')}</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#241F19]/60 lg:justify-self-end">{tr('Elles se retrouvent dans le choix d’un produit, la lumière de la salle et l’attention portée à chaque convive.')}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, description }, index) => (
              <article key={title} className="group relative grid overflow-hidden rounded-2xl border border-[#1E3A5F]/12 bg-white/70 p-6 shadow-[0_8px_24px_rgba(30,58,95,0.07)] transition-all hover:-translate-y-1 hover:border-[#C6A15B]/60 hover:shadow-[0_16px_36px_rgba(30,58,95,0.13)] sm:grid-cols-[auto_1fr] sm:gap-5 sm:p-7">
                <span className="font-display absolute end-5 top-3 text-6xl font-semibold text-[#C6A15B]/12">0{index + 1}</span>
                <div className="relative grid size-12 place-items-center rounded-full border border-[#C6A15B]/50 text-[#7C2438]"><Icon className="size-5" strokeWidth={1.6} /></div>
                <div className="relative"><h3 className="font-display mt-5 text-3xl font-semibold text-[#1E3A5F] sm:mt-0">{tr(title)}</h3><p className="mt-2 text-sm leading-6 text-[#241F19]/65">{tr(description)}</p></div>
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8" aria-labelledby="table-story-title">
        <motion.div {...reveal} className="relative mx-auto min-h-[540px] max-w-[1200px] overflow-hidden rounded-3xl bg-[#7C2438] shadow-[0_24px_60px_rgba(30,58,95,0.18)]">
          <AppImage src="/images/reservations/romantic.png" alt={tr('Une table intime dans la salle Savoraille')} fill sizes="(max-width: 1200px) 100vw, 1200px" className="object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,25,34,.9)_0%,rgba(20,25,34,.65)_48%,rgba(20,25,34,.18)_100%)] rtl:bg-[linear-gradient(270deg,rgba(20,25,34,.9)_0%,rgba(20,25,34,.65)_48%,rgba(20,25,34,.18)_100%)]" />
          <div className="relative flex min-h-[540px] max-w-xl flex-col justify-end p-7 text-[#FAF6EC] sm:p-12 lg:p-16">
            <p className="font-script text-3xl text-[#C6A15B]">{tr('Bienvenue à notre table.')}</p>
            <h2 id="table-story-title" className="font-display mt-3 text-4xl leading-none font-semibold text-balance sm:text-6xl">{tr('Chaque table a son histoire.')}</h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-[#FAF6EC]/72 sm:text-base">{tr('Un dîner à deux, un déjeuner qui rassemble ou un moment à célébrer : nous préparons le décor, vous écrivez le souvenir.')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/reservation" className="inline-flex items-center gap-2 rounded-lg bg-[#FAF6EC] px-5 py-3.5 text-sm font-bold text-[#7C2438] outline-none transition-colors hover:bg-[#C6A15B] hover:text-[#241F19] focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Réserver une table')}<ArrowUpRight className="size-4 rtl:-scale-x-100" /></Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg border border-[#FAF6EC]/35 bg-[#102B4D]/35 px-5 py-3.5 text-sm font-bold text-[#FAF6EC] outline-none backdrop-blur-sm hover:bg-[#FAF6EC]/10 focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Nous contacter')}<ArrowUpRight className="size-4 rtl:-scale-x-100" /></Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
