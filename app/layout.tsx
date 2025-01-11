import './globals.css'
import { Inter, Press_Start_2P } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import BackgroundAnimation from './components/BackgroundAnimation'
import React from 'react'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const pressStart2P = Press_Start_2P({ weight: '400', subsets: ['latin'], variable: '--font-press-start-2p' })

export const metadata = {
  title: "Mark's Portfolio" ,
  description: 'Portfolio of Mark.C',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${pressStart2P.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative min-h-screen bg-gradient-custom">
            
            <div className="relative z-10 flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow container mx-auto px-4 py-8">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

