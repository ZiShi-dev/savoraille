import {
  ArrowRight, Bike, CalendarDays, Clock3, Instagram, Leaf, MapPin,
  Phone, ShoppingBag, Star, Utensils,
} from 'lucide-react';

import { BrandSeal } from '@/components/brand-seal';
import { SiteHeader } from '@/components/site-header';

const services = [
  { icon: CalendarDays, eyebrow: 'Sur place', title: 'Votre table vous attend.', description: 'Choisissez votre heure, nous préparons le reste.', action: 'Réserver une table', href: '#reservation' },
  { icon: ShoppingBag, eyebrow: 'À emporter', title: 'Votre panier sent déjà bon.', description: 'Commandez la carte du moment et passez la chercher.', action: 'Commander', href: '#commander' },
  { icon: Bike, eyebrow: 'Livraison', title: 'La cloche sonne bientôt.', description: 'Nos assiettes voyagent jusque chez vous.', action: 'Se faire livrer', href: '#commander' },
];

const dishes = [
  { name: 'Volaille fermière', description: 'Jus au thym, mousseline fumée, carotte rôtie.', price: '26 €', tone: 'from-[#C4703F] via-[#a84e30] to-[#7C2438]', label: 'Signature' },
  { name: 'Lieu jaune nacré', description: 'Beurre citronné, poireau braisé, œufs de truite.', price: '29 €', tone: 'from-[#C6A15B] via-[#9d813f] to-[#1E3A5F]', label: 'De saison' },
  { name: 'Potimarron confit', description: 'Crème de châtaigne, noisette torréfiée, sauge.', price: '21 €', tone: 'from-[#d58b55] via-[#C4703F] to-[#7b3828]', label: 'Végétal' },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section id="accueil" className="relative min-h-[100svh] overflow-hidden bg-[#FAF6EC] px-6 pb-20 pt-36 sm:pt-40">
          <div className="pointer-events-none absolute -left-48 top-24 size-96 rounded-full bg-[#C6A15B]/12 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-0 size-[30rem] rounded-full bg-[#C4703F]/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-[1200px] items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="font-script text-3xl text-[#7C2438] sm:text-4xl">La merveille des saveurs</p>
              <h1 className="font-display mt-5 max-w-3xl text-[clamp(3.6rem,7vw,6.8rem)] leading-[0.88] font-semibold tracking-[-0.045em] text-[#1E3A5F]">
                Le terroir,<span className="block italic text-[#7C2438]">dans l’air du temps.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-[#241F19]/72 sm:text-lg">Bienvenue chez Savoraille. Une cuisine française de saison, généreuse et précise, à savourer à table ou chez vous.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#reservation" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1E3A5F] px-6 py-4 font-semibold text-[#FAF6EC] shadow-[0_8px_24px_rgba(30,58,95,0.18)] transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:ring-offset-2 focus-visible:outline-none">
                  <CalendarDays aria-hidden="true" className="size-5" strokeWidth={1.8} />Réserver une table
                </a>
                <a href="#commander" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#7C2438] px-6 py-4 font-semibold text-[#FAF6EC] shadow-[0_8px_24px_rgba(124,36,56,0.16)] transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:ring-offset-2 focus-visible:outline-none">
                  <ShoppingBag aria-hidden="true" className="size-5" strokeWidth={1.8} />Commander
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#1E3A5F]/75">
                <span className="flex items-center gap-2"><Clock3 className="size-4 text-[#C4703F]" />Mar–Dim · 12 h–23 h</span>
                <span className="flex items-center gap-2"><Leaf className="size-4 text-[#C4703F]" />Produits de saison</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[520px]">
              <div className="absolute -left-5 top-10 z-10 rounded-full bg-[#C6A15B] px-4 py-2 text-xs font-bold tracking-[0.12em] text-[#241F19] uppercase shadow-lg sm:-left-10">Carte d’été</div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#1E3A5F] p-6 shadow-[0_20px_60px_rgba(30,58,95,0.2)] sm:p-9">
                <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_20%_20%,#C6A15B_0,transparent_30%),radial-gradient(circle_at_80%_70%,#C4703F_0,transparent_35%)]" />
                <div className="relative flex h-full flex-col justify-between rounded-xl border border-[#C6A15B]/35 p-6 sm:p-8">
                  <div className="flex items-start justify-between">
                    <BrandSeal inverse className="size-24" />
                    <span className="font-script text-2xl text-[#C6A15B]">Fait maison</span>
                  </div>
                  <div className="relative mx-auto grid size-56 place-items-center rounded-full border border-[#C6A15B]/50 sm:size-64">
                    <div className="absolute inset-3 rounded-full border border-[#FAF6EC]/15" />
                    <div className="size-40 rounded-full bg-[radial-gradient(circle_at_35%_30%,#e9bd70_0_8%,#C4703F_28%,#7C2438_58%,#241F19_100%)] shadow-[inset_0_0_30px_rgba(250,246,236,0.18),0_16px_40px_rgba(0,0,0,0.25)] sm:size-44" />
                    <Leaf className="absolute size-11 rotate-[-22deg] text-[#C6A15B]" strokeWidth={1.25} />
                  </div>
                  <div>
                    <div className="mb-4 h-px bg-[#C6A15B]/60" />
                    <p className="font-display text-3xl font-semibold text-[#FAF6EC]">L’assiette du moment</p>
                    <p className="mt-2 text-sm leading-6 text-[#FAF6EC]/70">Volaille dorée, jus corsé, légumes de nos producteurs.</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -right-3 rounded-lg bg-[#FAF6EC] px-5 py-4 shadow-[0_8px_24px_rgba(30,58,95,0.12)] sm:-right-8">
                <div className="flex gap-1 text-[#C6A15B]" aria-label="Note de cinq sur cinq">{[0, 1, 2, 3, 4].map((star) => <Star key={star} className="size-4 fill-current" />)}</div>
                <p className="mt-1 text-xs font-semibold text-[#1E3A5F]">Une cuisine qui rassemble</p>
              </div>
            </div>
          </div>
        </section>

        <div className="gold-divider" aria-hidden="true" />

        <section className="bg-[#FAF6EC] px-6 py-20 sm:py-24" aria-labelledby="services-title">
          <div className="mx-auto max-w-[1200px]">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-script text-3xl text-[#7C2438]">À chacun son moment</p>
              <h2 id="services-title" className="font-display mt-3 text-4xl font-semibold text-[#1E3A5F] sm:text-5xl">Savourez comme vous aimez.</h2>
            </div>
            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article key={service.title} className="group rounded-2xl border border-[#1E3A5F]/12 bg-white/55 p-6 shadow-[0_8px_24px_rgba(30,58,95,0.08)] transition-all hover:-translate-y-1 hover:border-[#C6A15B]/45 hover:shadow-[0_14px_34px_rgba(30,58,95,0.14)] sm:p-8">
                    <div className="grid size-12 place-items-center rounded-full border border-[#C6A15B]/45 text-[#1E3A5F]"><Icon className="size-6" strokeWidth={1.6} /></div>
                    <p className="mt-7 text-xs font-bold tracking-[0.17em] text-[#C4703F] uppercase">{service.eyebrow}</p>
                    <h3 className="font-display mt-2 text-3xl font-semibold text-[#1E3A5F]">{service.title}</h3>
                    <p className="mt-3 leading-7 text-[#241F19]/65">{service.description}</p>
                    <a href={service.href} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#7C2438] outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{service.action}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="carte" className="scroll-mt-28 bg-[#1E3A5F] px-6 py-24 text-[#FAF6EC] sm:py-28">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <p className="font-script text-3xl text-[#C6A15B]">Carte de saison</p>
                <h2 className="font-display mt-3 max-w-2xl text-5xl leading-none font-semibold sm:text-6xl">Des assiettes qui racontent la France.</h2>
              </div>
              <a href="#commander" className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#C6A15B]/60 px-5 py-3 font-semibold text-[#FAF6EC] transition-colors hover:bg-[#C6A15B] hover:text-[#241F19] focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:outline-none">Voir toute la carte<ArrowRight className="size-4" /></a>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {dishes.map((dish) => (
                <article key={dish.name} className="group overflow-hidden rounded-2xl border border-[#FAF6EC]/10 bg-[#FAF6EC] text-[#241F19] shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-1 hover:border-[#C6A15B]/70">
                  <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${dish.tone}`}>
                    <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_center,rgba(250,246,236,0.9)_0_2%,transparent_3%),radial-gradient(circle_at_30%_60%,rgba(250,246,236,0.25)_0_8%,transparent_9%)] [background-size:64px_64px,100%_100%]" />
                    <div className="absolute inset-0 grid place-items-center"><div className="grid size-32 place-items-center rounded-full border border-[#FAF6EC]/50 bg-[#241F19]/15 shadow-2xl backdrop-blur-sm"><Utensils className="size-9 text-[#FAF6EC]" strokeWidth={1.35} /></div></div>
                    <span className="absolute left-4 top-4 rounded-full bg-[#C6A15B] px-3 py-1.5 text-xs font-bold text-[#241F19]">{dish.label}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4"><h3 className="font-display text-3xl font-semibold text-[#1E3A5F]">{dish.name}</h3><span className="shrink-0 text-lg font-bold text-[#7C2438]">{dish.price}</span></div>
                    <p className="mt-3 text-sm leading-6 text-[#241F19]/65">{dish.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="gold-divider gold-divider-dark" aria-hidden="true" />

        <section id="histoire" className="scroll-mt-28 bg-[#FAF6EC] px-6 py-24 sm:py-28">
          <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div className="mx-auto grid aspect-square w-full max-w-sm place-items-center rounded-full border border-[#C6A15B]/50 bg-white/40 p-8"><BrandSeal className="size-full" /></div>
            <div>
              <p className="font-script text-3xl text-[#7C2438]">Notre maison</p>
              <h2 className="font-display mt-3 text-5xl leading-[0.98] font-semibold text-[#1E3A5F] sm:text-6xl">Le cachet du terroir, la fraîcheur d’aujourd’hui.</h2>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#241F19]/70">Savoraille cuisine la saison avec respect et liberté. Des produits choisis près de chez nous, des gestes français et une salle où chaque détail invite à rester.</p>
              <p className="font-script mt-6 text-3xl text-[#C4703F]">Bienvenue à notre table.</p>
            </div>
          </div>
        </section>

        <section id="commander" className="scroll-mt-28 bg-[#FAF6EC] px-6 pb-24">
          <div id="reservation" className="relative mx-auto max-w-[1200px] overflow-hidden rounded-2xl bg-[#7C2438] p-8 text-[#FAF6EC] shadow-[0_16px_50px_rgba(124,36,56,0.2)] sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full border border-[#C6A15B]/25" /><div className="pointer-events-none absolute -right-8 -top-12 size-56 rounded-full border border-[#C6A15B]/35" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="font-script text-3xl text-[#C6A15B]">Votre table vous attend</p>
                <h2 className="font-display mt-3 max-w-2xl text-5xl leading-none font-semibold sm:text-6xl">Quel plaisir vous ferait envie aujourd’hui ?</h2>
                <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#FAF6EC]/78"><span className="flex items-center gap-2"><Clock3 className="size-4 text-[#C6A15B]" />Mar–Dim · 12 h–23 h</span><span className="flex items-center gap-2"><MapPin className="size-4 text-[#C6A15B]" />Votre adresse ici</span></div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a href="tel:+33000000000" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FAF6EC] px-6 py-4 font-bold text-[#7C2438] focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:outline-none"><Phone className="size-5" strokeWidth={1.8} />Réserver par téléphone</a>
                <a href="#carte" className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#FAF6EC]/40 px-6 py-4 font-bold text-[#FAF6EC] focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:outline-none"><ShoppingBag className="size-5" strokeWidth={1.8} />Commander en ligne</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="scroll-mt-28 bg-[#1E3A5F] px-6 py-14 text-[#FAF6EC]">
        <div className="mx-auto grid max-w-[1200px] gap-10 border-b border-[#C6A15B]/30 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex items-center gap-5"><BrandSeal inverse className="size-24 shrink-0" /><div><p className="font-display text-4xl font-semibold">Savoraille</p><p className="font-script mt-1 text-2xl text-[#C6A15B]">La merveille des saveurs</p></div></div>
          <div><p className="text-xs font-bold tracking-[0.18em] text-[#C6A15B] uppercase">Nous trouver</p><p className="mt-4 text-sm leading-7 text-[#FAF6EC]/70">Votre adresse<br />Votre ville, France</p></div>
          <div><p className="text-xs font-bold tracking-[0.18em] text-[#C6A15B] uppercase">Nous suivre</p><a href="#" className="mt-4 inline-flex items-center gap-2 text-sm text-[#FAF6EC]/75 hover:text-[#FAF6EC]"><Instagram className="size-5" />Instagram</a></div>
        </div>
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 pt-6 text-xs text-[#FAF6EC]/50 sm:flex-row sm:justify-between"><p>© 2026 Savoraille. Tous droits réservés.</p><p>Restaurant français moderne.</p></div>
      </footer>
    </>
  );
}
