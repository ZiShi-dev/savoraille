const normalizeBasePath = (value?: string) => {
  if (!value || value === '/') return '';
  return value.startsWith('/') ? value.replace(/\/$/, '') : `/${value.replace(/\/$/, '')}`;
};

function resolveSiteUrl() {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.CF_PAGES_URL,
    process.env.URL,
  ];

  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (!value) continue;
    return value.startsWith('http') ? value : `https://${value}`;
  }

  return 'https://savoraille.pages.dev';
}

export const siteConfig = {
  name: 'Savoraille',
  tagline: 'La merveille des saveurs',
  basePath: normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH),
  portfolioMode: process.env.NEXT_PUBLIC_PORTFOLIO_MODE === 'true',
  vorzixUrl: process.env.NEXT_PUBLIC_VORZIX_URL ?? 'https://vorzix.com',
  siteUrl: resolveSiteUrl(),
  staticExport: process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true',
} as const;

export function withBasePath(path: string) {
  if (!siteConfig.basePath) return path;
  if (path.startsWith('http')) return path;
  return `${siteConfig.basePath}${path.startsWith('/') ? path : `/${path}`}`;
}
