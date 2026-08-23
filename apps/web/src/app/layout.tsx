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

import { CartProvider } from '@/components/cart-provider';
import { I18nProvider } from '@/components/i18n-provider';
import { RestaurantProvider } from '@/components/restaurant-provider';

export const metadata: Metadata = {
  title: 'Savoraille — La merveille des saveurs',
  description: 'Restaurant français moderne : réservation, commande à emporter et livraison.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body><I18nProvider><RestaurantProvider><CartProvider>{children}</CartProvider></RestaurantProvider></I18nProvider></body>
    </html>
  );
}
