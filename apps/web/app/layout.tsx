import React from 'react';
import { Toaster } from 'react-hot-toast';

import { Header } from '(shared)/components/layout/Header';
import { Providers } from '(shared)/components/providers';

import { WithChildren } from '(shared)/types/common.types';

import { comfortaa, nunito } from './fonts';
import './globals.css';

export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
  const title = 'Сайт свіжих новин | Головна';
  const description = 'Новини Радіо Свободи';

  return {
    metadataBase: new URL(baseUrl),
    title: title,
    description: description,
    twitter: {
      title: title,
      card: 'summary_large_image',
      description: description,
      images: [
        {
          url: '/meta/ogp-image.jpg',
          width: 1017,
          height: 509,
          alt: description,
        },
      ],
    },
    openGraph: {
      title: title,
      description: description,
      siteName: title,
      locale: 'uk_UA',
      type: 'website',
      images: [
        {
          url: '/meta/ogp-image.jpg',
          width: 1017,
          height: 509,
          alt: description,
        },
      ],
    },
    manifest: '/meta/site.webmanifest',
    robots: 'all',
    alternates: {
      canonical: baseUrl,
    },
    keywords: [
      'Новини',
      'Події',
      'Міжнародні',
      'Радіо Свобода',
      'Новини України',
      'Важливі новини',
    ],
    icons: {
      icon: [
        {
          url: '/meta/favicon.ico',
        },
        {
          url: '/meta/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png',
        },
        {
          url: '/meta/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          url: '/meta/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          url: '/meta/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      shortcut: '/meta/favicon.ico',
      apple: '/meta/apple-touch-icon.png',
    },
  };
}

export default function RootLayout({ children }: WithChildren) {
  return (
    <html lang="uk">
      <body
        className={`${nunito.variable} ${comfortaa.variable} flex h-full min-h-screen flex-col`}
      >
        <Providers>
          <Header />

          <main className="flex-grow" role="main">
            {children}
          </main>
          <Toaster position="top-center" reverseOrder={false} />
        </Providers>
      </body>
    </html>
  );
}
