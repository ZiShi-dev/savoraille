'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ensureGsapPlugins } from '@/lib/gsap-register';
import { ArrowLeft, Check, Minus, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { AppImage } from './app-image';
import { useCart, type CartCustomization } from './cart-provider';
import { getDishAllergens, getDishExtras } from './dish-customizations';
import { useI18n } from './i18n-provider';
import { LocalizedLink } from './localized-link';
import { menuItems, menuSections } from '@/lib/menu-data';

ensureGsapPlugins();

function ingredientsOf(detail: string) {
  return detail.replace(/\.$/, '').split(/,\s*/).filter(Boolean);
}

function Leader() {
  return <span aria-hidden="true" className="mx-3 min-w-6 flex-1 translate-y-[-0.3em] border-b border-dotted border-[#1E3A5F]/30" />;
}

export function OrderDetailContent({ itemId }: { itemId: string }) {
  const { locale, tr } = useI18n();
  const { addItem, itemCount, total } = useCart();
  const rootRef = useRef<HTMLDivElement>(null);
  const item = menuItems.find((candidate) => candidate.id === itemId);
  const itemSection = menuSections.find((section) => section.items.some((candidate) => candidate.id === itemId));
  const [quantity, setQuantity] = useState(1);
  const [selectedExtraIds, setSelectedExtraIds] = useState<string[]>([]);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-dish-bar', '');
    return () => document.body.removeAttribute('data-dish-bar');
  }, []);

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;

    const motion = gsap.matchMedia();
    motion.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        hover: '(hover: hover) and (prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const { motion: canMove, hover } = context.conditions as { motion: boolean; hover: boolean };
        if (!canMove) return;

        gsap.timeline({ defaults: { ease: 'power3.out' } })
          .fromTo('[data-reveal-photo]', { clipPath: 'inset(0 0 100% 0 round 1.5rem)' }, { clipPath: 'inset(0 0 0% 0 round 1.5rem)', duration: 0.9 })
          .fromTo('[data-reveal]', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.07 }, '-=0.55');

        const heroPhoto = root.querySelector('[data-hero-photo]');
        if (heroPhoto) {
          gsap.fromTo(heroPhoto, { scale: 1.06 }, {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: '[data-reveal-photo]', start: 'top 70%', end: 'bottom top', scrub: 0.45 },
          });
        }

        const siblings = gsap.utils.toArray<HTMLElement>('[data-sibling]', root);
        if (siblings.length) {
          gsap.set(siblings, { y: 28, autoAlpha: 0 });
          ScrollTrigger.batch(siblings, {
            start: 'top 90%',
            once: true,
            interval: 0.08,
            onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', overwrite: 'auto' }),
          });
        }

        if (!hover) return;
        const photoOf = (event: Event) => (event.target as Element | null)?.closest('[data-sibling]')?.querySelector('[data-photo]') ?? null;
        const onOver = (event: Event) => {
          const photo = photoOf(event);
          if (photo) gsap.to(photo, { scale: 1.045, duration: 0.55, ease: 'power2.out', overwrite: 'auto' });
        };
        const onOut = (event: Event) => {
          const card = (event.target as Element | null)?.closest('[data-sibling]');
          const related = (event as PointerEvent).relatedTarget;
          if (card && related instanceof Node && card.contains(related)) return;
          const photo = card?.querySelector('[data-photo]');
          if (photo) gsap.to(photo, { scale: 1, duration: 0.45, ease: 'power2.out', overwrite: 'auto' });
        };
        root.addEventListener('pointerover', onOver);
        root.addEventListener('pointerout', onOut);
        return () => {
          root.removeEventListener('pointerover', onOver);
          root.removeEventListener('pointerout', onOut);
        };
      },
    );

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const timer = window.setTimeout(refresh, 400);
    return () => {
      window.removeEventListener('load', refresh);
      window.clearTimeout(timer);
      motion.revert();
    };
  }, { scope: rootRef, dependencies: [itemId], revertOnUpdate: true });

  const money = (value: number) => new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(value);

  if (!item) {
    return <div className="grid min-h-[70svh] place-items-center bg-[#FAF6EC] px-6 pt-28 text-center"><div><h1 className="font-display text-5xl font-semibold text-[#1E3A5F]">{tr('Plat introuvable')}</h1><LocalizedLink href="/carte" className="mt-6 inline-flex rounded-full bg-[#1E3A5F] px-5 py-3 font-bold text-[#FAF6EC]">{tr('Retour à la carte')}</LocalizedLink></div></div>;
  }

  const unitPrice = Number.parseFloat(item.price);
  const extras = getDishExtras(itemSection?.id ?? '');
  const allergens = getDishAllergens(itemSection?.id ?? '');
  const ingredients = ingredientsOf(tr(item.detail));
  const selectedExtras = extras.filter((extra) => selectedExtraIds.includes(extra.id));
  const supplementTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  const lineTotal = (unitPrice + supplementTotal) * quantity;
  const siblings = (itemSection?.items ?? []).filter((candidate) => candidate.id !== item.id).slice(0, 3);
  const position = (itemSection?.items.findIndex((candidate) => candidate.id === item.id) ?? 0) + 1;

  const addCurrentItem = () => {
    const customization: CartCustomization | undefined = selectedExtras.length > 0 ? {
      optionIds: selectedExtras.map((extra) => extra.id),
      optionLabels: selectedExtras.map((extra) => extra.label),
      unitSupplement: supplementTotal,
    } : undefined;
    addItem(item.id, quantity, customization);
    setAdded(true);
  };

  const toggleExtra = (extraId: string) => {
    setSelectedExtraIds((current) => current.includes(extraId) ? current.filter((id) => id !== extraId) : [...current, extraId]);
    setAdded(false);
  };

  const changeQuantity = (delta: number) => {
    setQuantity((current) => Math.max(1, current + delta));
    setAdded(false);
  };

  const stepper = (
    <div className="flex items-center rounded-full border border-[#1E3A5F]/15 bg-white p-1">
      <button type="button" onClick={() => changeQuantity(-1)} disabled={quantity === 1} aria-label={tr('Diminuer la quantité')} className="grid size-10 place-items-center rounded-full text-[#1E3A5F] outline-none hover:bg-[#FAF6EC] focus-visible:ring-2 focus-visible:ring-[#C6A15B] disabled:opacity-35"><Minus className="size-4" /></button>
      <span className="min-w-8 text-center font-bold tabular-nums text-[#1E3A5F]" aria-live="polite">{quantity}</span>
      <button type="button" onClick={() => changeQuantity(1)} aria-label={tr('Augmenter la quantité')} className="grid size-10 place-items-center rounded-full text-[#1E3A5F] outline-none hover:bg-[#FAF6EC] focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><Plus className="size-4" /></button>
    </div>
  );

  const addButton = (
    <button type="button" onClick={addCurrentItem} className={`inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold text-[#FAF6EC] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF6EC] ${added ? 'bg-[#1E3A5F]' : 'bg-[#7C2438] hover:bg-[#681d2f]'}`}>
      <span aria-live="polite" className="inline-flex items-center gap-2">
        {added ? <Check className="size-4" /> : null}
        {added ? tr('Ajouté à votre commande') : <>{tr('Ajouter')} · <span className="tabular-nums">{money(lineTotal)}</span></>}
      </span>
    </button>
  );

  return (
    <div ref={rootRef} data-gsap-custom className="bg-[#FAF6EC] pb-32 text-[#241F19] lg:pb-24">
      <div className="mx-auto max-w-[1280px] px-4 pt-24 sm:px-6 sm:pt-28">
        <nav aria-label={tr('La carte')} className="flex items-center gap-2 text-sm text-[#241F19]/55">
          <LocalizedLink href="/carte" className="inline-flex items-center gap-1.5 rounded-full font-bold text-[#1E3A5F] outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]"><ArrowLeft className="size-4 rtl:-scale-x-100" />{tr('La carte')}</LocalizedLink>
          {itemSection ? <><span aria-hidden="true">/</span><span>{tr(itemSection.shortLabel)}</span></> : null}
        </nav>

        <div className="mt-5 grid gap-8 lg:mt-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div data-reveal-photo className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#1E3A5F] sm:aspect-[5/4] lg:aspect-[4/5]">
              <div data-hero-photo className="absolute inset-0 will-change-transform">
                <AppImage src={item.image} alt={tr(item.name)} fill priority sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
              </div>
              {itemSection ? (
                <span className="font-display absolute end-5 top-5 rounded-full bg-[#FAF6EC]/92 px-3 py-1 text-sm text-[#1E3A5F]">
                  {String(position).padStart(2, '0')} / {String(itemSection.items.length).padStart(2, '0')}
                </span>
              ) : null}
            </div>
          </div>

          <div className="min-w-0">
            <p data-reveal className="font-script text-3xl text-[#7C2438]">{tr(itemSection?.subtitle ?? item.eyebrow)}</p>
            <div data-reveal className="mt-1 flex items-end">
              <h1 id="dish-title" className="font-display text-4xl leading-[0.95] font-semibold text-[#1E3A5F] sm:text-6xl">{tr(item.name)}</h1>
              <Leader />
              <p className="font-display shrink-0 text-3xl font-semibold text-[#7C2438] sm:text-4xl">{item.price}</p>
            </div>

            <section data-reveal className="mt-10" aria-labelledby="dish-ingredients">
              <h2 id="dish-ingredients" className="text-[0.68rem] font-bold tracking-[0.18em] text-[#C4703F] uppercase">{tr('Dans l’assiette')}</h2>
              <ol className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-[#1E3A5F]/10 bg-[#1E3A5F]/10 sm:grid-cols-2">
                {ingredients.map((ingredient, index) => (
                  <li key={ingredient} className="flex items-baseline gap-3 bg-[#FAF6EC] px-4 py-3.5">
                    <span className="font-display text-sm text-[#C6A15B] tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                    <span className="font-display text-xl text-[#1E3A5F] first-letter:uppercase">{ingredient}</span>
                  </li>
                ))}
              </ol>
              {allergens.length > 0 ? (
                <p className="mt-4 text-sm leading-6 text-[#241F19]/60"><span className="font-bold text-[#7C2438]">{tr('Allergènes')} :</span> {allergens.map((allergen) => tr(allergen)).join(', ')}. {tr('Informez notre équipe de toute allergie.')}</p>
              ) : null}
            </section>

            {extras.length > 0 ? (
              <fieldset data-reveal className="mt-10">
                <legend className="text-[0.68rem] font-bold tracking-[0.18em] text-[#C4703F] uppercase">{tr('Suppléments')}</legend>
                <div className="mt-3 divide-y divide-[#1E3A5F]/10 border-y border-[#1E3A5F]/10">
                  {extras.map((extra) => {
                    const selected = selectedExtraIds.includes(extra.id);
                    return (
                      <label key={extra.id} className="flex min-h-14 cursor-pointer items-center gap-3 py-2 outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#C6A15B]">
                        <input type="checkbox" checked={selected} onChange={() => toggleExtra(extra.id)} className="sr-only" />
                        <span className={`grid size-6 shrink-0 place-items-center rounded-full border transition-colors ${selected ? 'border-[#7C2438] bg-[#7C2438] text-[#FAF6EC]' : 'border-[#1E3A5F]/30 text-transparent'}`}><Check className="size-3.5" /></span>
                        <span className={`font-display text-xl ${selected ? 'text-[#7C2438]' : 'text-[#1E3A5F]'}`}>{tr(extra.label)}</span>
                        <Leader />
                        <span className="shrink-0 text-sm font-bold text-[#241F19]/70 tabular-nums">{extra.price === 0 ? tr('Offert') : `+${money(extra.price)}`}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ) : null}

            <div data-reveal className="mt-10 hidden rounded-3xl bg-[#1E3A5F] p-6 text-[#FAF6EC] lg:block">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-sm text-[#FAF6EC]/65">{supplementTotal > 0 ? `${quantity} × (${item.price} + ${money(supplementTotal)})` : `${quantity} × ${item.price}`}</p>
                <p className="font-display text-3xl font-semibold text-[#C6A15B] tabular-nums">{money(lineTotal)}</p>
              </div>
              <div className="mt-5 flex items-center gap-3">{stepper}{addButton}</div>
              <p className="mt-4 text-sm text-[#FAF6EC]/60">
                <span className="tabular-nums">{itemCount}</span> {tr(itemCount <= 1 ? 'article dans votre commande' : 'articles dans votre commande')} · <span className="tabular-nums">{money(total)}</span>
                <LocalizedLink href="/commandes" className="ms-3 font-bold text-[#FAF6EC] underline decoration-[#C6A15B] underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Voir ma commande')}</LocalizedLink>
              </p>
            </div>
          </div>
        </div>

        {siblings.length > 0 && itemSection ? (
          <section className="mt-20 border-t border-[#C6A15B]/40 pt-10" aria-labelledby="dish-siblings">
            <div className="flex items-baseline justify-between gap-4">
              <h2 id="dish-siblings" className="font-display text-3xl font-semibold text-[#1E3A5F] sm:text-4xl">{tr(itemSection.label)}</h2>
              <LocalizedLink href="/carte" className="shrink-0 text-sm font-bold text-[#7C2438] underline decoration-[#C6A15B] underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]">{tr('Toute la carte')}</LocalizedLink>
            </div>
            <ul className="mt-6 grid gap-6 sm:grid-cols-3">
              {siblings.map((sibling) => (
                <li key={sibling.id} data-sibling>
                  <LocalizedLink href={`/commander/${sibling.id}`} className="block rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B]">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#1E3A5F]">
                      <div data-photo className="absolute inset-0">
                        <AppImage src={sibling.image} alt="" fill sizes="(min-width:640px) 33vw, 100vw" className="object-cover" />
                      </div>
                    </div>
                    <div className="mt-3 flex items-baseline">
                      <span className="font-display text-xl text-[#1E3A5F]">{tr(sibling.name)}</span>
                      <Leader />
                      <span className="font-display shrink-0 text-lg text-[#7C2438]">{sibling.price}</span>
                    </div>
                  </LocalizedLink>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#C6A15B]/35 bg-[#FAF6EC]/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3">{stepper}{addButton}</div>
      </div>
    </div>
  );
}
