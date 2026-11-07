'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef } from 'react';

const SCROLL_KEY = 'savorailleScroll';

function pageKey(pathname: string, search: string) {
  return `${pathname}?${search}`;
}

function jump(y: number) {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  window.scrollTo({ top: y, left: 0, behavior: 'instant' as ScrollBehavior });
  root.style.scrollBehavior = previous;
}

function jumpToHash(hash: string) {
  const id = decodeURIComponent(hash.slice(1));
  const target = document.getElementById(id);
  if (!target) return false;
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  target.scrollIntoView({ block: 'start' });
  root.style.scrollBehavior = previous;
  return true;
}

function rememberScroll() {
  const state = history.state ?? {};
  if (state[SCROLL_KEY] === window.scrollY) return;
  history.replaceState({ ...state, [SCROLL_KEY]: window.scrollY }, '');
}

export function ScrollToTop() {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const key = pageKey(pathname, search);
  const keyRef = useRef(key);
  const pushing = useRef(false);
  const locking = useRef(false);

  useEffect(() => {
    keyRef.current = key;
  }, [key]);

  useEffect(() => {
    history.scrollRestoration = 'manual';
    let frame = 0;
    const onScroll = () => {
      if (locking.current || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!locking.current) rememberScroll();
      });
    };
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest('a');
      if (!link || link.target === '_blank') return;
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (pageKey(url.pathname, url.search.slice(1)) === keyRef.current) return;
      rememberScroll();
      pushing.current = true;
      locking.current = true;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('click', onClick, true);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', onClick, true);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useLayoutEffect(() => {
    const isPush = pushing.current;
    locking.current = true;

    const place = () => {
      if (isPush) {
        const hash = window.location.hash;
        if (hash.length > 1 && jumpToHash(hash)) return true;
        jump(0);
        return hash.length <= 1;
      }
      const saved = history.state?.[SCROLL_KEY];
      if (typeof saved === 'number') {
        jump(saved);
        return true;
      }
      const hash = window.location.hash;
      if (hash.length > 1 && jumpToHash(hash)) return true;
      jump(0);
      return hash.length <= 1;
    };

    place();
    let frames = 0;
    let raf = 0;
    const enforce = () => {
      const settled = place();
      frames += 1;
      if (frames < 4 || (!settled && frames < 12)) raf = requestAnimationFrame(enforce);
      else {
        locking.current = false;
        pushing.current = false;
      }
    };
    raf = requestAnimationFrame(enforce);
    return () => cancelAnimationFrame(raf);
  }, [key]);

  return null;
}
