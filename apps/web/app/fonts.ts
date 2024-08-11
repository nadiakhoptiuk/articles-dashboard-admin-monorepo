import { Comfortaa, Nunito } from 'next/font/google';

export const comfortaa = Comfortaa({
  subsets: ['latin', 'cyrillic-ext'],
  display: 'swap',
  weight: ['600', '700'],
  style: ['normal'],
  variable: '--font-comfortaa',
});

export const nunito = Nunito({
  subsets: ['latin', 'cyrillic-ext'],
  display: 'swap',
  weight: ['300', '400', '500'],
  style: ['normal'],
  variable: '--font-nunito',
});
