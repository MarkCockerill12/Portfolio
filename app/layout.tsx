import './globals.css'
import { Inter, Press_Start_2P } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import ViewTransitions from './components/ViewTransitions'
import React from 'react'
import { ThemeProvider } from 'next-themes'
import { CatalogProvider } from '@/lib/portfolio-store'
import { getCatalog } from '@/lib/portfolio-server'

// Pages are rebuilt in the background at most this often (seconds) to pick up
// catalog edits made outside the admin UI; admin saves revalidate immediately.
export const revalidate = 60

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const pressStart2P = Press_Start_2P({ weight: '400', subsets: ['latin'], variable: '--font-press-start-2p' })

export const metadata = {
  title: "Mark's Portfolio",
  description: 'Portfolio of Mark.C',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const catalog = await getCatalog()

  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${pressStart2P.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <CatalogProvider initial={catalog}>
            <ViewTransitions />
            <div className="relative min-h-screen bg-gradient-custom">
              <div className="relative z-10 flex flex-col min-h-screen">
                <Header />
                <main className="page-transition flex-grow container mx-auto px-4 py-8">
                  {children}
                </main>
                <Footer />
                <CookieBanner />
              </div>
            </div>
          </CatalogProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}