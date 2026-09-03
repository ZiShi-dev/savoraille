'use client';

import { localizedPath } from '@/lib/i18n-routing';

import { useI18n } from '@/components/i18n-provider';

export function useLocalizedPath() {
  const { locale } = useI18n();

  return (path: string) => localizedPath(locale, path);
}
