'use client';

import { useGSAP } from '@gsap/react';
import { useRef, type ReactNode } from 'react';

import { enterStep } from '@/lib/site-motion';
import { ensureGsapPlugins } from '@/lib/gsap-register';

ensureGsapPlugins();

export function GsapStepPanel({
  stepKey,
  children,
  className,
  fromX = 0,
}: {
  stepKey: string;
  children: ReactNode;
  className?: string;
  fromX?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    enterStep(el, fromX);
  }, { scope: ref, dependencies: [stepKey, fromX], revertOnUpdate: true });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
