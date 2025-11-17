import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://vie-de-saints.vercel.app/'),
  title: {
    default: 'Vie des Saints — Figures catholiques & vertus',
    template: '%s | Vie des Saints'
  },
  description:
    'Découvrez la vie des saints et de grandes figures catholiques : enseignements, vertus, dates clés et inspirations spirituelles.',
  openGraph: {
    type: 'website',
    title: 'Vie des Saints — Figures catholiques & inspirations spirituelles',
    description:
      'Explorez la vie des saints et des grandes figures catholiques, leurs vertus et leurs enseignements.',
    url: 'https://vie-de-saints.vercel.app/',
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: 'Aperçu du site Vie des Saints'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vie des Saints — Inspirations catholiques',
    description:
      'Histoires, vertus et biographies de saints et figures catholiques.',
    images: ['/preview.png']
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon0.png' },
      { url: '/icon1.png' },
      { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png'
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://vie-de-saints.vercel.app/'
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="apple-mobile-web-app-title" content="Vie des Saints" />
        <meta name="theme-color" content="#ffffff" />
      </head>

      <body className={`${inter.className} ${playfair.variable} bg-cream min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
