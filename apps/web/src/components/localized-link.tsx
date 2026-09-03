'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';

import { localizedPath } from '@/lib/i18n-routing';

import { useI18n } from './i18n-provider';

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
};

export function LocalizedLink({ href, ...props }: LocalizedLinkProps) {
  const { locale } = useI18n();
  const resolvedHref = href.startsWith('/') && !href.startsWith('//') ? localizedPath(locale, href) : href;

  return <Link href={resolvedHref} {...props} />;
}
