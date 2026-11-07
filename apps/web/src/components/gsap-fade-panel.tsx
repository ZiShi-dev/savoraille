'use client';

import { useGSAP } from '@gsap/react';
import { useRef, type ReactNode } from 'react';

import { enterFade } from '@/lib/site-motion';
import { ensureGsapPlugins } from '@/lib/gsap-register';

ensureGsapPlugins();

export function GsapFadePanel({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    enterFade(el);
  }, { scope: ref, dependencies: [id], revertOnUpdate: true });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
