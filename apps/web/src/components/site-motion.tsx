'use client';

import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';
import { type ReactNode, useRef } from 'react';

import { attachSiteMotion } from '@/lib/site-motion';
import { ensureGsapPlugins } from '@/lib/gsap-register';

ensureGsapPlugins();

export function SiteMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    const main = rootRef.current?.querySelector('#contenu-principal') ?? document.getElementById('contenu-principal');
    if (!main) return () => undefined;
    const detach = attachSiteMotion(main);
    return () => detach?.();
  }, { scope: rootRef, dependencies: [pathname], revertOnUpdate: true });

  return (
    <div ref={rootRef} className="contents">
      {children}
    </div>
  );
}
