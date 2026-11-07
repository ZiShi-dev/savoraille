'use client';

import { useGSAP } from '@gsap/react';
import { useRef, type ReactNode } from 'react';

import { enterSuccess } from '@/lib/site-motion';
import { ensureGsapPlugins } from '@/lib/gsap-register';

ensureGsapPlugins();

export function GsapSuccessBadge({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    enterSuccess(el);
  }, { scope: ref, dependencies: [id], revertOnUpdate: true });

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}
