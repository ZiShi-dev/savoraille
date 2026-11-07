import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { prefersReducedMotion } from '@/lib/gsap-register';

export function scheduleScrollRefresh() {
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh);
  const timer = window.setTimeout(refresh, 400);
  return () => {
    window.removeEventListener('load', refresh);
    window.clearTimeout(timer);
  };
}

function isInsideCustomScope(el: Element) {
  return Boolean(el.closest('[data-gsap-custom]'));
}

export function attachSiteMotion(root: Element) {
  if (prefersReducedMotion()) return () => undefined;

  const cleanups: (() => void)[] = [];

  const heroes = gsap.utils.toArray<HTMLElement>('[data-motion="hero"]', root);
  heroes.forEach((hero) => {
    const targets = hero.querySelectorAll('[data-motion-child]');
    const kids = targets.length ? targets : hero.children;
    gsap.fromTo(kids, { y: 20, autoAlpha: 0 }, {
      y: 0,
      autoAlpha: 1,
      duration: 0.65,
      stagger: 0.08,
      ease: 'power3.out',
      delay: 0.05,
    });
  });

  const reveals = gsap.utils.toArray<HTMLElement>('[data-motion="reveal"]', root).filter((el) => !isInsideCustomScope(el));
  if (reveals.length) {
    gsap.set(reveals, { y: 28, autoAlpha: 0 });
    ScrollTrigger.batch(reveals, {
      start: 'top 88%',
      once: true,
      interval: 0.08,
      batchMax: 4,
      onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', overwrite: 'auto' }),
    });
  }

  root.querySelectorAll('[data-motion="parallax"]').forEach((wrap) => {
    const photo = wrap.querySelector('[data-parallax-inner]');
    if (!photo) return;
    gsap.fromTo(photo, { scale: 1.08 }, {
      scale: 1,
      ease: 'none',
      scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'center center', scrub: 0.45 },
    });
  });

  const hoverRoot = root;
  const onOver = (event: Event) => {
    const card = (event.target as Element | null)?.closest('[data-motion="lift"]');
    const photo = card?.querySelector('[data-photo]');
    if (photo) gsap.to(photo, { scale: 1.045, duration: 0.55, ease: 'power2.out', overwrite: 'auto' });
  };
  const onOut = (event: Event) => {
    const card = (event.target as Element | null)?.closest('[data-motion="lift"]');
    const related = (event as PointerEvent).relatedTarget;
    if (card && related instanceof Node && card.contains(related)) return;
    const photo = card?.querySelector('[data-photo]');
    if (photo) gsap.to(photo, { scale: 1, duration: 0.45, ease: 'power2.out', overwrite: 'auto' });
  };

  if (window.matchMedia('(hover: hover)').matches) {
    hoverRoot.addEventListener('pointerover', onOver);
    hoverRoot.addEventListener('pointerout', onOut);
    cleanups.push(() => {
      hoverRoot.removeEventListener('pointerover', onOver);
      hoverRoot.removeEventListener('pointerout', onOut);
    });
  }

  const refreshCleanup = scheduleScrollRefresh();
  return () => {
    refreshCleanup();
    cleanups.forEach((fn) => fn());
  };
}

export function attachMenuPanelMotion(panel: HTMLElement, contextSafe?: (fn: () => void) => () => void) {
  if (prefersReducedMotion()) {
    gsap.set(panel, { autoAlpha: 1, y: 0, clearProps: 'transform' });
    return () => undefined;
  }

  gsap.set(panel, { autoAlpha: 1, y: 0 });
  const entrance = gsap.timeline();
  entrance.fromTo(panel, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' });

  const dishes = gsap.utils.toArray<HTMLElement>('[data-dish]:not([data-featured])', panel);
  if (dishes.length) {
    gsap.set(dishes, { y: 28 });
    ScrollTrigger.batch(dishes, {
      start: 'top 88%',
      once: true,
      interval: 0.08,
      batchMax: 3,
      onEnter: (batch) => gsap.to(batch, { y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', overwrite: 'auto' }),
    });
  }

  const featuredPhoto = panel.querySelector('[data-featured-photo]');
  if (featuredPhoto) {
    gsap.fromTo(featuredPhoto, { scale: 1.08 }, {
      scale: 1,
      ease: 'none',
      scrollTrigger: { trigger: featuredPhoto, start: 'top bottom', end: 'center center', scrub: 0.45 },
    });
  }

  const onOver = (event: Event) => {
    const card = (event.target as Element | null)?.closest('[data-dish]:not([data-featured])');
    const photo = card?.querySelector('[data-photo]');
    if (photo) gsap.to(photo, { scale: 1.045, duration: 0.55, ease: 'power2.out', overwrite: 'auto' });
  };
  const onOut = (event: Event) => {
    const card = (event.target as Element | null)?.closest('[data-dish]:not([data-featured])');
    const related = (event as PointerEvent).relatedTarget;
    if (card && related instanceof Node && card.contains(related)) return;
    const photo = card?.querySelector('[data-photo]');
    if (photo) gsap.to(photo, { scale: 1, duration: 0.45, ease: 'power2.out', overwrite: 'auto' });
  };

  if (window.matchMedia('(hover: hover)').matches) {
    panel.addEventListener('pointerover', onOver);
    panel.addEventListener('pointerout', onOut);
  }

  return () => {
    panel.removeEventListener('pointerover', onOver);
    panel.removeEventListener('pointerout', onOut);
  };
}

export function fadePanelOut(panel: HTMLElement, onComplete: () => void) {
  if (prefersReducedMotion()) {
    onComplete();
    return;
  }
  gsap.timeline({ onComplete })
    .to(panel, { y: 14, autoAlpha: 0, duration: 0.26, ease: 'power2.in' });
}

export function enterStep(el: HTMLElement, fromX = 0) {
  if (prefersReducedMotion()) {
    gsap.set(el, { autoAlpha: 1, x: 0, y: 0, scale: 1 });
    return;
  }
  gsap.fromTo(el, { autoAlpha: 0, y: fromX ? 0 : 18, x: fromX, scale: 0.995 }, {
    autoAlpha: 1,
    y: 0,
    x: 0,
    scale: 1,
    duration: 0.3,
    ease: 'power3.out',
  });
}

export function enterFade(el: HTMLElement) {
  if (prefersReducedMotion()) {
    gsap.set(el, { autoAlpha: 1 });
    return;
  }
  gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: 'power2.out' });
}

export function enterSuccess(el: HTMLElement) {
  if (prefersReducedMotion()) {
    gsap.set(el, { scale: 1, rotation: 0 });
    return;
  }
  gsap.fromTo(el, { scale: 0.7, rotation: -8 }, { scale: 1, rotation: 0, duration: 0.55, ease: 'back.out(1.4)' });
}

export function slideDrawer(el: HTMLElement, fromX: string | number) {
  if (prefersReducedMotion()) {
    gsap.set(el, { x: 0, autoAlpha: 1 });
    return;
  }
  gsap.fromTo(el, { x: fromX, autoAlpha: 1 }, { x: 0, duration: 0.28, ease: 'power3.out' });
}
