import { Cormorant_Garamond, Manrope, Noto_Naskh_Arabic, Noto_Sans_Arabic, Parisienne } from 'next/font/google';

export const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export const parisienne = Parisienne({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-parisienne',
  display: 'swap',
});

export const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-arabic',
  display: 'swap',
});

export const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['600', '700'],
  variable: '--font-noto-naskh-arabic',
  display: 'swap',
});

export const fontVariables = [
  cormorantGaramond.variable,
  manrope.variable,
  parisienne.variable,
  notoSansArabic.variable,
  notoNaskhArabic.variable,
].join(' ');
