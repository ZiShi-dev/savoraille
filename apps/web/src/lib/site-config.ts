const normalizeBasePath = (value?: string) => {
  if (!value || value === '/') return '';
  return value.startsWith('/') ? value.replace(/\/$/, '') : `/${value.replace(/\/$/, '')}`;
};

export const siteConfig = {
  name: 'Savoraille',
  tagline: 'La merveille des saveurs',
  basePath: normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH),
  portfolioMode: process.env.NEXT_PUBLIC_PORTFOLIO_MODE === 'true',
  vorzixUrl: process.env.NEXT_PUBLIC_VORZIX_URL ?? 'https://vorzix.com',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://savoraille.netlify.app',
  staticExport: process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true',
} as const;

export function withBasePath(path: string) {
  if (!siteConfig.basePath) return path;
  if (path.startsWith('http')) return path;
  return `${siteConfig.basePath}${path.startsWith('/') ? path : `/${path}`}`;
}
