import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import BackToTop from '@/components/BackToTop'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blog.digitalnerdhq.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
    shortcut: '/logo.png',
  },
  title: {
    template: '%s | DigitalNerdHQ Blog',
    default: 'DigitalNerdHQ Blog — Where Digital Minds Level Up',
  },
  description:
    'DigitalNerdHQ Blog — where digital minds level up. In-depth articles on digital marketing, tech, entrepreneurship, freelancing, automation, LinkedIn, Upwork, Fiverr, and online business.',
  keywords: [
    'digital marketing',
    'tech blog',
    'entrepreneurship',
    'freelancing',
    'automation',
    'LinkedIn',
    'Upwork',
    'Fiverr',
    'online business',
    'DigitalNerdHQ',
  ],
  authors: [{ name: 'DigitalNerdHQ', url: 'https://www.digitalnerdhq.com' }],
  creator: 'DigitalNerdHQ',
  publisher: 'DigitalNerdHQ',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'DigitalNerdHQ Blog',
    title: 'DigitalNerdHQ Blog — Where Digital Minds Level Up',
    description:
      'Creativity, innovation and empowerment. Articles on digital marketing, tech, entrepreneurship, and online business.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DigitalNerdHQ Blog — Where Digital Minds Level Up',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DigitalNerdHQ Blog',
    description:
      'Where digital minds level up. Articles on digital marketing, tech, and online business.',
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

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DigitalNerdHQ',
  url: 'https://www.digitalnerdhq.com',
  logo: `${siteUrl}/logo.png`,
  sameAs: [
    'https://twitter.com/DigitalNerdHQ',
    'https://www.linkedin.com/company/digitalnerdhq',
    'https://www.instagram.com/digitalnerdhq',
  ],
  description: 'Creativity, innovation and empowerment. A platform for digital minds.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: 'https://www.digitalnerdhq.com/contact',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <link rel="alternate" type="application/rss+xml" title="DigitalNerdHQ Blog" href="/feed.xml" />
      </head>
      <body
        className="font-[Inter,sans-serif] antialiased"
        style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <BackToTop />
          
        </ThemeProvider>
      </body>
    </html>
  )
}
