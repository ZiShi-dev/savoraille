import gsap from 'gsap';

import { prefersReducedMotion } from '@/lib/gsap-register';

const easeOut = 'cubic-bezier(0.23, 1, 0.32, 1)';

export function attachSiteMotion(root: Element) {
  if (prefersReducedMotion()) return () => undefined;

  const heroes = gsap.utils.toArray<HTMLElement>('[data-motion="hero"]', root);
  heroes.forEach((hero) => {
    const targets = hero.querySelectorAll('[data-motion-child]');
    const kids = gsap.utils.toArray<HTMLElement>(targets.length ? targets : hero.children);
    const animated = kids.filter((el) => !el.querySelector('a, button'));
    if (!animated.length) return;
    gsap.fromTo(animated, { y: 8, autoAlpha: 0 }, {
      y: 0,
      autoAlpha: 1,
      duration: 0.4,
      stagger: 0.04,
      ease: easeOut,
    });
  });

  return () => undefined;
}

export function attachMenuPanelMotion(panel: HTMLElement) {
  if (prefersReducedMotion()) {
    gsap.set(panel, { autoAlpha: 1, clearProps: 'transform' });
    return () => undefined;
  }

  gsap.fromTo(panel, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: easeOut, overwrite: 'auto' });
  return () => undefined;
}

export function fadePanelOut(panel: HTMLElement, onComplete: () => void) {
  if (prefersReducedMotion()) {
    onComplete();
    return;
  }
  gsap.to(panel, { autoAlpha: 0, duration: 0.2, ease: easeOut, onComplete, overwrite: 'auto' });
}

export function enterStep(el: HTMLElement, fromX = 0) {
  if (prefersReducedMotion()) {
    gsap.set(el, { autoAlpha: 1, x: 0, y: 0, scale: 1 });
    return;
  }
  gsap.fromTo(el, { autoAlpha: 0, y: fromX ? 0 : 8, x: fromX }, {
    autoAlpha: 1,
    y: 0,
    x: 0,
    duration: 0.2,
    ease: easeOut,
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
  gsap.fromTo(el, { scale: 0.96 }, { scale: 1, duration: 0.2, ease: easeOut });
}

export function slideDrawer(el: HTMLElement, fromX: string | number) {
  if (prefersReducedMotion()) {
    gsap.set(el, { x: 0, autoAlpha: 1 });
    return;
  }
  gsap.fromTo(el, { x: fromX, autoAlpha: 1 }, { x: 0, duration: 0.28, ease: easeOut });
}
