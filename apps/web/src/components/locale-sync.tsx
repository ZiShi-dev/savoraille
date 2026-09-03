'use client';

import { useEffect } from 'react';

import { type Locale } from '@/lib/i18n-routing';

import { useI18n } from './i18n-provider';

export function LocaleSync({ locale }: { locale: Locale }) {
  const { setLocale } = useI18n();

  useEffect(() => {
    setLocale(locale);
  }, [locale, setLocale]);

  return null;
}
