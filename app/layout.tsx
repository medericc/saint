import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
})

export const metadata: Metadata = {
  title: 'Vie des Saints - Contemplation et Éducation',
  description: 'Découvrez la vie inspirante des saints et leurs vertus',
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
      </head>
      <body className={`${inter.className} ${playfair.variable} bg-cream min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}