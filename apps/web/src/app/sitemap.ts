import type { MetadataRoute } from 'next';

import { menuItems } from '@/lib/menu-data';
import { getStaticRoutes } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl.replace(/\/$/, '');
  const now = new Date();

  const staticEntries = getStaticRoutes().map((path) => ({
    url: `${base}${path === '/' ? '/' : path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1 : 0.8,
  }));

  const menuEntries = menuItems.map((item) => ({
    url: `${base}/commander/${item.id}/`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...menuEntries];
}
