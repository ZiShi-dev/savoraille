'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChefHat, ScanLine, Sparkles, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const menuItems = [
  {
    id: 'volaille',
    eyebrow: 'Signature de la maison',
    name: 'Volaille fermière dorée',
    shortName: 'La volaille',
    description: 'Jus corsé au thym, mousseline fumée et carottes de nos producteurs.',
    detail: 'Une peau croustillante, une chair tendre et un jus réduit lentement pour concentrer toute la saveur du terroir.',
    price: '26 €',
    image: 'https://images.unsplash.com/photo-1616401616927-3c81de22dfa8?auto=format&fit=crop&w=1600&q=82',
    accent: '#C6A15B',
  },
  {
    id: 'lieu',
    eyebrow: 'Arrivage du marché',
    name: 'Lieu jaune nacré',
    shortName: 'Le poisson',
    description: 'Beurre citronné, poireau braisé et perles d’œufs de truite.',
    detail: 'Une cuisson juste nacrée, réveillée par un beurre vif et la douceur fondante du poireau de saison.',
    price: '29 €',
    image: 'https://images.unsplash.com/photo-1776097633704-6666ffafc58d?auto=format&fit=crop&w=1600&q=82',
    accent: '#C4703F',
  },
  {
    id: 'potimarron',
    eyebrow: 'Création végétale',
    name: 'Potimarron confit',
    shortName: 'Le végétal',
    description: 'Crème de châtaigne, noisettes torréfiées et sauge croustillante.',
    detail: 'Le potimarron caramélise doucement avant de rencontrer la rondeur de la châtaigne et le croquant des noisettes.',
    price: '21 €',
    image: 'https://images.unsplash.com/photo-1470338950318-40320a722782?auto=format&fit=crop&w=1600&q=82',
    accent: '#C4703F',
  },
] as const;

export function SummerMenuExperience() {
  const [selectedId, setSelectedId] = useState<(typeof menuItems)[number]['id']>(menuItems[0].id);
  const [screenOpen, setScreenOpen] = useState(true);
  const reduceMotion = useReducedMotion();
  const selected = menuItems.find((item) => item.id === selectedId) ?? menuItems[0];

  function selectItem(id: (typeof menuItems)[number]['id']) {
    setSelectedId(id);
    setScreenOpen(true);
  }

  return (
    <section id="carte" className="relative scroll-mt-28 overflow-hidden bg-[#102B4D] px-6 py-16 text-[#FAF6EC] sm:py-20" aria-labelledby="summer-menu-title">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_85%_18%,#C6A15B_0,transparent_26%),linear-gradient(rgba(198,161,91,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(198,161,91,.08)_1px,transparent_1px)] [background-size:auto,48px_48px,48px_48px]" />
      <div className="pointer-events-none absolute -left-40 top-1/3 size-96 rounded-full border border-[#C6A15B]/15" />
      <div className="relative mx-auto max-w-[1200px]">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-[#C6A15B]"><span className="h-px w-10 bg-current" /><p className="text-xs font-bold tracking-[0.2em] uppercase">Carte d’été</p></div>
          <h2 id="summer-menu-title" className="font-display mt-3 text-4xl leading-none font-semibold sm:text-5xl lg:text-6xl">L’assiette du moment</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#FAF6EC]/68 sm:text-base">Volaille dorée, jus corsé, légumes de nos producteurs. Ouvrez la carte et laissez chaque assiette prendre vie.</p>
        </div>

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
          <div className="[perspective:1400px]">
            <motion.div
              className="relative mx-auto max-w-[410px] origin-right rounded-r-2xl rounded-l-md border border-[#C6A15B]/55 bg-[#F7F0E2] p-2.5 text-[#241F19] shadow-[18px_28px_70px_rgba(0,0,0,0.35)]"
              initial={reduceMotion ? false : { opacity: 0, rotateY: -18, x: -30 }}
              whileInView={{ opacity: 1, rotateY: -7, rotateX: 2, x: 0 }}
              whileHover={reduceMotion ? undefined : { rotateY: -3, rotateX: 0, y: -4 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="pointer-events-none absolute -left-3 inset-y-4 w-3 rounded-l-md bg-[linear-gradient(90deg,#7C2438,#C6A15B)] shadow-[-6px_8px_18px_rgba(0,0,0,0.25)]" />
              <div className="rounded-r-xl rounded-l-sm border border-[#C6A15B]/55 p-4 sm:p-5">
                <div className="flex items-start justify-between border-b border-[#C6A15B]/45 pb-4">
                  <div><p className="font-script text-xl text-[#7C2438]">Maison Savoraille</p><p className="mt-1 text-[0.58rem] font-bold tracking-[0.2em] text-[#1E3A5F]/65 uppercase">Menu d’été · 2026</p></div>
                  <div className="grid size-9 place-items-center rounded-full border border-[#C6A15B]/60 text-[#1E3A5F]"><ChefHat className="size-4" strokeWidth={1.5} /></div>
                </div>

                <div className="mt-4 space-y-2" role="tablist" aria-label="Choisir une assiette">
                  {menuItems.map((item, index) => {
                    const active = selected.id === item.id && screenOpen;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        aria-controls="dish-screen"
                        onClick={() => selectItem(item.id)}
                        className={`group relative w-full overflow-hidden rounded-lg border px-3 py-3 text-left outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#C6A15B] ${active ? 'border-[#C6A15B]/80 bg-[#1E3A5F] text-[#FAF6EC] shadow-[0_8px_20px_rgba(30,58,95,0.18)]' : 'border-[#1E3A5F]/10 bg-white/45 hover:border-[#C6A15B]/55 hover:bg-white/80'}`}
                      >
                        {active ? <motion.span layoutId="menu-active" className="absolute inset-y-0 left-0 w-1 bg-[#C6A15B]" /> : null}
                        <span className="flex items-center gap-4">
                          <span className={`font-display text-base tabular-nums ${active ? 'text-[#C6A15B]' : 'text-[#7C2438]'}`}>0{index + 1}</span>
                          <span className="min-w-0 flex-1"><span className="block text-[0.55rem] font-bold tracking-[0.14em] uppercase opacity-60">{item.eyebrow}</span><span className="font-display mt-0.5 block text-lg font-semibold sm:text-xl">{item.name}</span></span>
                          <span className={`text-sm font-bold ${active ? 'text-[#C6A15B]' : 'text-[#7C2438]'}`}>{item.price}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#C6A15B]/45 pt-3 text-[0.58rem] font-semibold tracking-[0.1em] text-[#1E3A5F]/55 uppercase"><span>Cuisine de saison</span><span>Fait maison</span></div>
              </div>
            </motion.div>
          </div>

          <div className="relative min-h-[430px] lg:min-h-[480px]" aria-live="polite">
            <div className="pointer-events-none absolute left-[-3.5rem] top-1/2 hidden h-px w-16 bg-gradient-to-r from-transparent via-[#C6A15B] to-[#C6A15B] lg:block" />
            <div className="pointer-events-none absolute left-[-0.6rem] top-[calc(50%-0.25rem)] hidden size-2 rotate-45 border border-[#C6A15B] bg-[#102B4D] lg:block" />
            <AnimatePresence mode="wait">
              {screenOpen ? (
                <motion.article
                  key={selected.id}
                  id="dish-screen"
                  role="tabpanel"
                  className="relative h-full min-h-[430px] overflow-hidden border border-[#C6A15B]/50 bg-[#071C33]/92 shadow-[0_24px_70px_rgba(0,0,0,0.38)] backdrop-blur-xl lg:min-h-[480px]"
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 72, rotateY: -28, clipPath: 'polygon(0 12%, 10% 0, 100% 0, 100% 88%, 90% 100%, 0 100%)' }}
                  animate={{ opacity: 1, x: 0, rotateY: 0, clipPath: 'polygon(0 8%, 8% 0, 100% 0, 100% 92%, 92% 100%, 0 100%)' }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 48, scale: 0.97 }}
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: 'left center' }}
                >
                  <div className="pointer-events-none absolute inset-3 z-20 border border-[#C6A15B]/25 [clip-path:polygon(0_8%,8%_0,100%_0,100%_92%,92%_100%,0_100%)]" />
                  <div className="relative h-[220px] sm:h-[250px] lg:h-[260px]">
                    <Image src={selected.image} alt={selected.name} fill priority={selected.id === menuItems[0].id} sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071C33] via-[#071C33]/12 to-transparent" />
                    <motion.div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(198,161,91,.14),transparent)]" animate={reduceMotion ? undefined : { x: ['-100%', '100%'] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }} />
                    <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-[#C6A15B]/45 bg-[#071C33]/72 px-3 py-2 text-[0.62rem] font-bold tracking-[0.16em] text-[#C6A15B] uppercase backdrop-blur-md"><ScanLine className="size-3.5" />Sélection active</div>
                    <button type="button" onClick={() => setScreenOpen(false)} className="absolute right-6 top-6 z-30 grid size-10 place-items-center rounded-full border border-[#FAF6EC]/25 bg-[#071C33]/72 text-[#FAF6EC] outline-none backdrop-blur-md hover:border-[#C6A15B] hover:text-[#C6A15B] focus-visible:ring-2 focus-visible:ring-[#C6A15B]" aria-label="Fermer l’écran du plat"><X className="size-4" /></button>
                  </div>

                  <div className="relative z-10 px-6 pb-7 pt-1 sm:px-8">
                    <div className="flex items-center gap-2 text-[#C6A15B]"><Sparkles className="size-4" /><p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase">{selected.eyebrow}</p></div>
                    <div className="mt-2 flex items-start justify-between gap-5"><h3 className="font-display text-3xl leading-none font-semibold sm:text-4xl">{selected.name}</h3><span className="shrink-0 text-lg font-bold text-[#C6A15B]">{selected.price}</span></div>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-[#FAF6EC]/68">{selected.detail}</p>
                    <a href="#commander" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#C6A15B] outline-none hover:text-[#FAF6EC] focus-visible:ring-2 focus-visible:ring-[#C6A15B]">Commander cette assiette<ArrowUpRight className="size-4" /></a>
                  </div>
                  <div className="pointer-events-none absolute bottom-3 left-3 size-8 border-b border-l border-[#C6A15B]" /><div className="pointer-events-none absolute right-3 top-3 size-8 border-r border-t border-[#C6A15B]" />
                </motion.article>
              ) : (
                <motion.button
                  type="button"
                  className="grid min-h-[430px] w-full place-items-center border border-dashed border-[#C6A15B]/35 bg-[#071C33]/45 text-center outline-none hover:border-[#C6A15B]/70 focus-visible:ring-2 focus-visible:ring-[#C6A15B] lg:min-h-[480px]"
                  onClick={() => setScreenOpen(true)}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                >
                  <span><ScanLine className="mx-auto size-8 text-[#C6A15B]" /><span className="font-display mt-4 block text-3xl">Écran refermé</span><span className="mt-2 block text-sm text-[#FAF6EC]/55">Cliquez ici ou choisissez une assiette pour l’ouvrir.</span></span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
