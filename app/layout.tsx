import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import NewsletterPopup from '@/components/NewsletterPopup'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blog.digitalnerdhq.com'
  ),
  title: {
    template: '%s | DigitalNerdHQ Blog',
    default: 'DigitalNerdHQ Blog — Tech Insights for Digital Nerds',
  },
  description:
    'In-depth articles on web development, software engineering, AI, and the digital frontier. Written by nerds, for nerds.',
  keywords: ['tech blog', 'web development', 'software engineering', 'AI', 'programming'],
  authors: [{ name: 'DigitalNerdHQ', url: 'https://www.digitalnerdhq.com' }],
  creator: 'DigitalNerdHQ',
  publisher: 'DigitalNerdHQ',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blog.digitalnerdhq.com',
    siteName: 'DigitalNerdHQ Blog',
    title: 'DigitalNerdHQ Blog — Tech Insights for Digital Nerds',
    description:
      'In-depth articles on web development, software engineering, AI, and the digital frontier.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DigitalNerdHQ Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DigitalNerdHQ Blog',
    description:
      'In-depth articles on web development, software engineering, AI, and the digital frontier.',
    images: ['/og-image.png'],
    creator: '@digitalnerdhq',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-body bg-surface text-primary antialiased">
        {/* Top accent border */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-accent z-50" />
        <div className="pt-1">
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </div>
        <NewsletterPopup />
      </body>
    </html>
  )
}
