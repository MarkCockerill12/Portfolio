import './globals.css'
import { Inter, Press_Start_2P } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import BackgroundAnimation from './components/BackgroundAnimation'
import React from 'react'

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
    <html lang="en" className={`scroll-smooth ${inter.variable} ${pressStart2P.variable}`}>
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <BackgroundAnimation />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

