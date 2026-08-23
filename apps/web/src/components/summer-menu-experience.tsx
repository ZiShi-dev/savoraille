'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChefHat, ChevronLeft, ChevronRight, ScanLine, Sparkles, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const images = {
  aperitif: 'https://images.unsplash.com/photo-1576006144029-e42bb7166c76?auto=format&fit=crop&w=1600&q=82',
  entree: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1600&q=82',
  volaille: 'https://images.unsplash.com/photo-1616401616927-3c81de22dfa8?auto=format&fit=crop&w=1600&q=82',
  poisson: 'https://images.unsplash.com/photo-1776097633704-6666ffafc58d?auto=format&fit=crop&w=1600&q=82',
  vegetal: 'https://images.unsplash.com/photo-1470338950318-40320a722782?auto=format&fit=crop&w=1600&q=82',
  dessert: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1600&q=82',
  cocktail: 'https://images.unsplash.com/photo-1677825949218-608c76ed1fbf?auto=format&fit=crop&w=1600&q=82',
  vin: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=82',
} as const;

type MenuItem = {
  id: string;
  eyebrow: string;
  name: string;
  detail: string;
  price: string;
  image: string;
};

type MenuSection = {
  id: string;
  label: string;
  shortLabel: string;
  subtitle: string;
  items: readonly MenuItem[];
};

const menuSections: readonly MenuSection[] = [
  {
    id: 'aperitifs',
    label: 'Apéritifs & amuse-bouches',
    shortLabel: 'Apéritifs',
    subtitle: 'Pour ouvrir l’appétit',
    items: [
      { id: 'gougere', eyebrow: 'Bouchée chaude', name: 'Gougère au vieux comté', detail: 'Une pâte légère et dorée, garnie de vieux comté affiné et d’une pointe de muscade.', price: '9 €', image: images.aperitif },
      { id: 'tomate-fumee', eyebrow: 'Fraîcheur', name: 'Tartare de tomate fumée', detail: 'Tomates de saison, huile de basilic et pain de campagne croustillant.', price: '11 €', image: images.entree },
      { id: 'rillettes-truite', eyebrow: 'Bord de mer', name: 'Rillettes de truite', detail: 'Truite délicatement fumée, crème citronnée et pickles de fenouil.', price: '13 €', image: images.poisson },
      { id: 'croquette-volaille', eyebrow: 'Croustillant', name: 'Croquette de volaille', detail: 'Volaille confite, cœur fondant et moutarde douce à l’ancienne.', price: '12 €', image: images.volaille },
      { id: 'pissaladiere', eyebrow: 'Du Sud', name: 'Mini pissaladière', detail: 'Oignons doucement confits, anchois, olives noires et pâte croustillante.', price: '10 €', image: images.aperitif },
      { id: 'huitre', eyebrow: 'Iodé', name: 'Huître & granité citron', detail: 'Huître fraîche, granité citronné et huile délicate aux herbes.', price: '15 €', image: images.poisson },
      { id: 'jambon-persille', eyebrow: 'Terroir', name: 'Jambon persillé', detail: 'Jambon fondant, gelée au persil et moutarde de Bourgogne.', price: '12 €', image: images.volaille },
    ],
  },
  {
    id: 'entrees',
    label: 'Entrées',
    shortLabel: 'Entrées',
    subtitle: 'Les premiers parfums',
    items: [
      { id: 'veloute', eyebrow: 'De saison', name: 'Velouté de potimarron', detail: 'Crème de châtaigne, noisettes torréfiées et huile de sauge.', price: '14 €', image: images.vegetal },
      { id: 'oeuf-parfait', eyebrow: 'Signature', name: 'Œuf parfait', detail: 'Champignons rôtis, émulsion de comté et mouillettes au beurre noisette.', price: '15 €', image: images.aperitif },
      { id: 'poireau', eyebrow: 'Végétal', name: 'Poireau vinaigrette', detail: 'Poireau braisé, vinaigrette aux herbes et jaune d’œuf confit.', price: '13 €', image: images.entree },
      { id: 'truite-marinee', eyebrow: 'Fraîcheur', name: 'Truite marinée', detail: 'Crème crue, concombre, aneth et œufs de truite légèrement fumés.', price: '17 €', image: images.poisson },
    ],
  },
  {
    id: 'plats',
    label: 'Plats principaux',
    shortLabel: 'Plats',
    subtitle: 'Le cœur de la table',
    items: [
      { id: 'volaille', eyebrow: 'Signature de la maison', name: 'Volaille fermière dorée', detail: 'Une peau croustillante, une chair tendre et un jus réduit lentement pour concentrer toute la saveur du terroir.', price: '26 €', image: images.volaille },
      { id: 'lieu', eyebrow: 'Arrivage du marché', name: 'Lieu jaune nacré', detail: 'Une cuisson juste nacrée, réveillée par un beurre vif et la douceur fondante du poireau de saison.', price: '29 €', image: images.poisson },
      { id: 'potimarron', eyebrow: 'Création végétale', name: 'Potimarron confit', detail: 'Le potimarron caramélise doucement avant de rencontrer la rondeur de la châtaigne et le croquant des noisettes.', price: '21 €', image: images.vegetal },
      { id: 'boeuf-braise', eyebrow: 'Cuisson lente', name: 'Bœuf braisé au vin rouge', detail: 'Paleron fondant, jus au bordeaux, échalotes confites et pommes grenailles.', price: '31 €', image: images.volaille },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    shortLabel: 'Desserts',
    subtitle: 'La dernière gourmandise',
    items: [
      { id: 'tarte-pomme', eyebrow: 'Tout en finesse', name: 'Tarte fine aux pommes', detail: 'Pommes caramélisées, crème crue vanillée et caramel au beurre salé.', price: '11 €', image: images.dessert },
      { id: 'chocolat', eyebrow: 'Intense', name: 'Chocolat grand cru', detail: 'Crémeux chocolat noir, croustillant praliné et glace au grué de cacao.', price: '12 €', image: images.dessert },
      { id: 'paris-brest', eyebrow: 'Classique français', name: 'Paris-Brest', detail: 'Pâte à choux, praliné noisette généreux et éclats de fruits secs.', price: '13 €', image: images.aperitif },
      { id: 'fraises', eyebrow: 'Fruit de saison', name: 'Fraises & verveine', detail: 'Fraises fraîches, crème légère, verveine citronnée et meringue craquante.', price: '12 €', image: images.entree },
    ],
  },
  {
    id: 'boissons',
    label: 'Boissons',
    shortLabel: 'Boissons',
    subtitle: 'Avec ou sans alcool',
    items: [
      { id: 'spritz', eyebrow: 'Cocktail signature', name: 'Savoraille Spritz', detail: 'Apéritif maison, agrumes frais, fines bulles et romarin.', price: '10 €', image: images.cocktail },
      { id: 'bordeaux', eyebrow: 'Sélection du sommelier', name: 'Verre de Bordeaux', detail: 'Une cuvée souple et fruitée choisie pour accompagner la carte du moment.', price: '9 €', image: images.vin },
      { id: 'citronnade', eyebrow: 'Fait maison', name: 'Citronnade au thym', detail: 'Citron pressé, sirop léger au thym frais et eau filtrée.', price: '6 €', image: images.cocktail },
      { id: 'eau-botanique', eyebrow: 'Sans alcool', name: 'Eau pétillante botanique', detail: 'Bulles fines, concombre, verveine et une pointe de baie rose.', price: '5 €', image: images.vin },
    ],
  },
] as const;

const menuItems = menuSections.flatMap((section) => section.items);
const defaultItem = menuSections[0]!.items[0]!;
const CHOICES_PER_PAGE = 4;

const bookPages = menuSections.flatMap((section, sectionIndex) => {
  const sectionPageCount = Math.ceil(section.items.length / CHOICES_PER_PAGE);

  return Array.from({ length: sectionPageCount }, (_, sectionPageIndex) => ({
    sectionId: section.id,
    sectionIndex,
    sectionPageIndex,
    sectionPageCount,
    label: section.label,
    subtitle: section.subtitle,
    items: section.items.slice(sectionPageIndex * CHOICES_PER_PAGE, (sectionPageIndex + 1) * CHOICES_PER_PAGE),
  }));
});

const pageTurnVariants = {
  enter: (direction: number) => ({ opacity: 0, rotateY: direction > 0 ? 70 : -70, x: direction > 0 ? 26 : -26 }),
  center: { opacity: 1, rotateY: 0, x: 0 },
  exit: (direction: number) => ({ opacity: 0, rotateY: direction > 0 ? -70 : 70, x: direction > 0 ? -20 : 20 }),
};

export function SummerMenuExperience() {
  const [selectedId, setSelectedId] = useState(defaultItem.id);
  const [screenOpen, setScreenOpen] = useState(true);
  const [mobileScreenOpen, setMobileScreenOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageDirection, setPageDirection] = useState(1);
  const previousBodyOverflow = useRef('');
  const bodyLockActive = useRef(false);
  const reduceMotion = useReducedMotion();
  const selected = menuItems.find((item) => item.id === selectedId) ?? defaultItem;
  const pageCount = bookPages.length;
  const currentPage = bookPages[pageIndex] ?? bookPages[0]!;
  const visibleItems = currentPage.items;

  useEffect(() => {
    if (!mobileScreenOpen) return;

    previousBodyOverflow.current = document.body.style.overflow;
    bodyLockActive.current = true;
    const unlockPage = () => {
      if (!bodyLockActive.current) return;
      document.body.style.overflow = previousBodyOverflow.current;
      bodyLockActive.current = false;
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        unlockPage();
        setMobileScreenOpen(false);
      }
    };
    const closeOnNavigation = () => {
      unlockPage();
      setMobileScreenOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('hashchange', closeOnNavigation);

    return () => {
      unlockPage();
      window.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('hashchange', closeOnNavigation);
    };
  }, [mobileScreenOpen]);

  function closeMobileScreen() {
    if (bodyLockActive.current) {
      document.body.style.overflow = previousBodyOverflow.current;
      bodyLockActive.current = false;
    }
    setMobileScreenOpen(false);
  }

  function selectItem(id: string) {
    setSelectedId(id);
    setScreenOpen(true);
    setMobileScreenOpen(window.matchMedia('(max-width: 1023px)').matches);
  }

  function changePage(nextPage: number) {
    closeMobileScreen();
    const wrappedPage = (nextPage + pageCount) % pageCount;
    if (wrappedPage === pageIndex) return;

    const firstItem = bookPages[wrappedPage]?.items[0];
    if (!firstItem) return;

    setPageDirection(nextPage > pageIndex ? 1 : -1);
    setPageIndex(wrappedPage);
    setSelectedId(firstItem.id);
    setScreenOpen(true);
  }

  function changeSection(sectionId: string) {
    closeMobileScreen();
    const firstPageIndex = bookPages.findIndex((page) => page.sectionId === sectionId);
    if (firstPageIndex >= 0) changePage(firstPageIndex);
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

        <nav className="mt-8 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Sections de la carte d’été">
          {menuSections.map((section) => {
            const active = section.id === currentPage.sectionId;
            return (
              <button key={section.id} type="button" onClick={() => changeSection(section.id)} aria-current={active ? 'page' : undefined} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold tracking-[0.06em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#C6A15B] ${active ? 'border-[#C6A15B] bg-[#C6A15B] text-[#241F19]' : 'border-[#FAF6EC]/18 bg-[#FAF6EC]/5 text-[#FAF6EC]/68 hover:border-[#C6A15B]/60 hover:text-[#FAF6EC]'}`}>
                {section.shortLabel}
              </button>
            );
          })}
        </nav>

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
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
                  <div><p className="font-script text-xl text-[#7C2438]">{currentPage.label}</p><p className="mt-1 text-[0.58rem] font-bold tracking-[0.16em] text-[#1E3A5F]/65 uppercase">{currentPage.subtitle} · Page {currentPage.sectionPageIndex + 1}/{currentPage.sectionPageCount}</p></div>
                  <div className="grid size-9 place-items-center rounded-full border border-[#C6A15B]/60 text-[#1E3A5F]"><ChefHat className="size-4" strokeWidth={1.5} /></div>
                </div>

                <div className="mt-4 overflow-hidden" role="tablist" aria-label={`${currentPage.label}, page ${currentPage.sectionPageIndex + 1} sur ${currentPage.sectionPageCount}`}>
                  <motion.div
                    key={pageIndex}
                    custom={pageDirection}
                    className="space-y-2"
                    variants={pageTurnVariants}
                    initial={reduceMotion ? { opacity: 0 } : 'enter'}
                    animate="center"
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: pageDirection > 0 ? 'left center' : 'right center' }}
                  >
                      {visibleItems.map((item, index) => {
                        const active = selected.id === item.id && screenOpen;
                        const itemNumber = currentPage.sectionPageIndex * CHOICES_PER_PAGE + index + 1;
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
                              <span className={`relative size-12 shrink-0 overflow-hidden rounded-md border sm:size-14 ${active ? 'border-[#C6A15B]/65' : 'border-[#1E3A5F]/12'}`}>
                                <Image src={item.image} alt="" fill loading="lazy" sizes="56px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                <span className="absolute inset-0 bg-gradient-to-t from-[#071C33]/70 via-transparent to-transparent" />
                                <span className="font-display absolute bottom-1 left-1.5 text-xs font-semibold tabular-nums text-[#FAF6EC]">{String(itemNumber).padStart(2, '0')}</span>
                              </span>
                              <span className="min-w-0 flex-1"><span className="block text-[0.55rem] font-bold tracking-[0.14em] uppercase opacity-60">{item.eyebrow}</span><span className="font-display mt-0.5 block text-lg font-semibold sm:text-xl">{item.name}</span></span>
                              <span className={`text-sm font-bold ${active ? 'text-[#C6A15B]' : 'text-[#7C2438]'}`}>{item.price}</span>
                            </span>
                          </button>
                        );
                      })}
                  </motion.div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#C6A15B]/45 pt-3">
                  <button type="button" onClick={() => changePage(pageIndex - 1)} className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[0.62rem] font-bold tracking-[0.08em] text-[#1E3A5F] uppercase outline-none transition-colors hover:bg-[#1E3A5F]/8 focus-visible:ring-2 focus-visible:ring-[#C6A15B]" aria-label="Page précédente du menu"><ChevronLeft className="size-4" />Précédent</button>
                  <span className="font-display text-sm font-semibold tabular-nums text-[#7C2438]" aria-live="polite">{String(pageIndex + 1).padStart(2, '0')} / {String(pageCount).padStart(2, '0')}</span>
                  <button type="button" onClick={() => changePage(pageIndex + 1)} className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[0.62rem] font-bold tracking-[0.08em] text-[#1E3A5F] uppercase outline-none transition-colors hover:bg-[#1E3A5F]/8 focus-visible:ring-2 focus-visible:ring-[#C6A15B]" aria-label="Page suivante du menu">Suivant<ChevronRight className="size-4" /></button>
                </div>

                <div className="mt-3 flex items-center justify-between text-[0.58rem] font-semibold tracking-[0.1em] text-[#1E3A5F]/55 uppercase"><span>Cuisine de saison</span><span>Fait maison</span></div>
              </div>
            </motion.div>
          </div>

          <div className="relative hidden min-h-[480px] lg:block" aria-live="polite">
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
                    <Image src={selected.image} alt={selected.name} fill loading="eager" sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" />
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

        <p className="mt-5 text-center text-xs font-semibold tracking-[0.08em] text-[#FAF6EC]/55 uppercase lg:hidden">Touchez une assiette pour ouvrir son écran</p>
      </div>

      <AnimatePresence>
        {mobileScreenOpen ? (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-[#071C33]/78 p-3 backdrop-blur-md lg:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeMobileScreen}
          >
            <motion.article
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-dish-title"
              className="relative max-h-[90dvh] w-full max-w-md overflow-y-auto border border-[#C6A15B]/55 bg-[#071C33] shadow-[0_28px_90px_rgba(0,0,0,0.6)] [clip-path:polygon(0_5%,5%_0,100%_0,100%_95%,95%_100%,0_100%)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 36, scale: 0.94, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="pointer-events-none absolute inset-2 z-20 border border-[#C6A15B]/24 [clip-path:polygon(0_5%,5%_0,100%_0,100%_95%,95%_100%,0_100%)]" />
              <div className="relative h-[38dvh] min-h-[230px] max-h-[340px]">
                <Image src={selected.image} alt={selected.name} fill loading="eager" sizes="100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071C33] via-transparent to-[#071C33]/15" />
                <motion.div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(198,161,91,.16),transparent)]" animate={reduceMotion ? undefined : { x: ['-100%', '100%'] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }} />
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-[#C6A15B]/45 bg-[#071C33]/76 px-3 py-2 text-[0.58rem] font-bold tracking-[0.15em] text-[#C6A15B] uppercase backdrop-blur-md"><ScanLine className="size-3.5" />Écran du menu</div>
                <button type="button" autoFocus onClick={closeMobileScreen} className="absolute right-5 top-5 z-30 grid size-11 place-items-center rounded-full border border-[#FAF6EC]/30 bg-[#071C33]/78 text-[#FAF6EC] outline-none backdrop-blur-md focus-visible:ring-2 focus-visible:ring-[#C6A15B]" aria-label="Fermer l’écran mobile du plat"><X className="size-5" /></button>
              </div>
              <div className="relative z-10 px-6 pb-8 pt-1">
                <div className="flex items-center gap-2 text-[#C6A15B]"><Sparkles className="size-4" /><p className="text-[0.6rem] font-bold tracking-[0.16em] uppercase">{selected.eyebrow}</p></div>
                <div className="mt-2 flex items-start justify-between gap-4"><h3 id="mobile-dish-title" className="font-display text-3xl leading-none font-semibold text-[#FAF6EC]">{selected.name}</h3><span className="shrink-0 text-lg font-bold text-[#C6A15B]">{selected.price}</span></div>
                <p className="mt-4 text-sm leading-6 text-[#FAF6EC]/68">{selected.detail}</p>
                <a href="#commander" onClick={closeMobileScreen} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#C6A15B] outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]">Commander cette assiette<ArrowUpRight className="size-4" /></a>
              </div>
              <div className="pointer-events-none absolute bottom-2 left-2 size-7 border-b border-l border-[#C6A15B]" /><div className="pointer-events-none absolute right-2 top-2 size-7 border-r border-t border-[#C6A15B]" />
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
