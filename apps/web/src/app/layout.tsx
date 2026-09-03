import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/600-italic.css';
import '@fontsource/cormorant-garamond/700.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/noto-naskh-arabic/arabic-600.css';
import '@fontsource/noto-naskh-arabic/arabic-700.css';
import '@fontsource/noto-sans-arabic/arabic-400.css';
import '@fontsource/noto-sans-arabic/arabic-500.css';
import '@fontsource/noto-sans-arabic/arabic-600.css';
import '@fontsource/noto-sans-arabic/arabic-700.css';
import '@fontsource/parisienne/400.css';

import './globals.css';

import { AuthProvider } from '@/components/auth-provider';
import { CartProvider } from '@/components/cart-provider';
import { I18nProvider } from '@/components/i18n-provider';
import { PortfolioBanner } from '@/components/portfolio-banner';
import { RestaurantProvider } from '@/components/restaurant-provider';
import { SkipLink } from '@/components/skip-link';
import { siteConfig, withBasePath } from '@/lib/site-config';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: 'Savoraille — La merveille des saveurs',
    template: '%s | Savoraille',
  },
  description: 'Site vitrine restaurant français : carte interactive, réservation, commande et expérience multilingue.',
  keywords: ['restaurant', 'français', 'réservation', 'commande en ligne', 'démo', 'VORZIX'],
  authors: [{ name: 'VORZIX', url: siteConfig.vorzixUrl }],
  creator: 'VORZIX',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteConfig.siteUrl,
    siteName: 'Savoraille',
    title: 'Savoraille — La merveille des saveurs',
    description: 'Site vitrine restaurant moderne, conçu par VORZIX.',
    images: [{ url: withBasePath('/images/savoraille-dining-room-3d.png'), width: 1200, height: 630, alt: 'Salle du restaurant Savoraille' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Savoraille — La merveille des saveurs',
    description: 'Site vitrine restaurant moderne, conçu par VORZIX.',
    images: [withBasePath('/images/savoraille-dining-room-3d.png')],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={siteConfig.portfolioMode ? 'portfolio-demo' : undefined}>
        <I18nProvider>
          <AuthProvider>
            <RestaurantProvider>
              <CartProvider>
                <SkipLink />
                <PortfolioBanner />
                {children}
              </CartProvider>
            </RestaurantProvider>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
