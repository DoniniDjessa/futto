import type { Metadata, Viewport } from 'next'
import { Inter, Oswald } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { PhoneFrame } from '@/components/phone-frame'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
})

export const metadata: Metadata = {
  title: 'FUTTO — Le foot nous unit',
  description:
    "FUTTO connecte les passionnés de football en Côte d'Ivoire. Réserve un terrain, trouve des joueurs, organise des matchs et progresse. 100% ivoirien, 100% foot.",
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#0d0d0d',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`dark bg-background ${inter.variable} ${oswald.variable}`}>
      <body className="antialiased">
        <PhoneFrame>{children}</PhoneFrame>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
