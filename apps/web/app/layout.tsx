import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/navigation'
import ProgressBar from '@/components/ui/ProgressBar'
import { AnimatePresence } from '@/lib/motion'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Landmark Gayrimenkul Yatırım Hizmetleri | Profesyonel Gayrimenkul ve Sigorta',
  description: '20 yıllık deneyim ile profesyonel gayrimenkul ve yatırım hizmetleri ve kapsamlı sigorta çözümleri. İstanbul ve Türkiye genelinde güvenilir hizmet.',
  keywords: 'gayrimenkul, emlak, sigorta, yatırım, istanbul, türkiye',
  authors: [{ name: 'Landmark Gayrimenkul Yatırım Hizmetleri' }],
  creator: 'Landmark Gayrimenkul Yatırım Hizmetleri',
  publisher: 'Landmark Gayrimenkul Yatırım Hizmetleri',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://landmark.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Landmark Gayrimenkul Yatırım Hizmetleri',
    description: 'Profesyonel gayrimenkul yatırım hizmetleri ve sigorta hizmetleri',
    url: '/',
    siteName: 'Landmark Gayrimenkul Yatırım Hizmetleri',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Landmark Gayrimenkul Yatırım Hizmetleri',
    description: 'Profesyonel gayrimenkul ve yatırım hizmetleri ve sigorta hizmetleri',
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <ProgressBar />
        <div className="min-h-screen bg-background">
          <Navigation />
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </div>
      </body>
    </html>
  )
}
