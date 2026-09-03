export const locales = ['fr', 'en', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

const localePattern = /^\/(fr|en|ar)(?=\/|$)/;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function stripLocaleFromPath(pathname: string): string {
  const stripped = pathname.replace(localePattern, '') || '/';
  return stripped.startsWith('/') ? stripped : `/${stripped}`;
}

export function localizedPath(locale: Locale, path: string): string {
  const suffixMatch = path.match(/([?#].*)$/);
  const suffix = suffixMatch?.[1] ?? '';
  const pathname = path.slice(0, path.length - suffix.length) || '/';

  if (pathname.startsWith('/#')) {
    return `/${locale}/${pathname.slice(1)}${suffix}`;
  }

  const bare = stripLocaleFromPath(pathname);
  if (bare === '/') {
    return `/${locale}/${suffix}`;
  }

  const segment = bare.replace(/^\//, '').replace(/\/$/, '');
  return `/${locale}/${segment}/${suffix}`;
}
