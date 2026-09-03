import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { LocaleSync } from '@/components/locale-sync';
import { isLocale, locales } from '@/lib/i18n-routing';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <LocaleSync locale={locale} />
      {children}
    </>
  );
}
