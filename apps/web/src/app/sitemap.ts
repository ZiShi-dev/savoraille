import type { MetadataRoute } from 'next';

import { menuItems } from '@/lib/menu-data';
import { localizedPath, locales } from '@/lib/i18n-routing';
import { getStaticRoutes } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl.replace(/\/$/, '');
  const now = new Date();

  const staticEntries = locales.flatMap((locale) =>
    getStaticRoutes().map((path) => ({
      url: `${base}${localizedPath(locale, path)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: path === '/' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [alt, `${base}${localizedPath(alt, path)}`]),
        ),
      },
    })),
  );

  const menuEntries = locales.flatMap((locale) =>
    menuItems.map((item) => ({
      url: `${base}${localizedPath(locale, `/commander/${item.id}/`)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [alt, `${base}${localizedPath(alt, `/commander/${item.id}/`)}`]),
        ),
      },
    })),
  );

  return [...staticEntries, ...menuEntries];
}
