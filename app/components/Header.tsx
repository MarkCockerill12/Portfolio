'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Moon, Sun, Menu, X, Circle, Sparkles, Square } from 'lucide-react'
import { useTheme } from 'next-themes'
import HoverText from './HoverText'
import { motion } from 'framer-motion'
import BackgroundAnimation from './BackgroundAnimation'

type AnimationType = 'circles' | 'fireworks' | 'squares';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [animationType, setAnimationType] = useState<AnimationType>('circles')

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const toggleAnimation = () => {
    const types: AnimationType[] = ['circles', 'fireworks', 'squares']
    const currentIndex = types.indexOf(animationType)
    const nextIndex = (currentIndex + 1) % types.length
    setAnimationType(types[nextIndex])
  }

  if (!mounted) {
    return null
  }

  const ClickAnimation = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.div>
  )

  return (
    <>
      <BackgroundAnimation animationType={animationType} />
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold font-press-start-2p"><HoverText>Mark.C Portfolio</HoverText></Link>
            <div className="flex items-center">
              <ClickAnimation>
                <button onClick={toggleAnimation} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 mr-2">
                  {animationType === 'circles' && <Sparkles className="w-5 h-5" />}
                  {animationType === 'fireworks' && <Square className="w-5 h-5" />}
                  {animationType === 'squares' && <Circle className="w-5 h-5" />}
                </button>
              </ClickAnimation>
              <ClickAnimation>
                <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 mr-2">
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </ClickAnimation>
              <ClickAnimation>
                <button onClick={toggleMenu} className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                  {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </ClickAnimation>
            </div>
          </div>
          <ul className={`${menuOpen ? 'block' : 'hidden'} md:flex md:space-x-4 mt-4 md:mt-0`}>
            {['Home', 'About', 'Projects', 'Skills', 'Experience'].map((item) => (
              <li key={item}>
                <ClickAnimation>
                  <Link href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="block py-2 hover:text-blue-500 relative">
                    <motion.div
                      whileTap={{
                        scale: 0.95,
                        transition: { duration: 0.1 }
                      }}
                    >
                      {item}
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      whileTap={{
                        scale: 1.5,
                        opacity: 0,
                        transition: { duration: 0.3 }
                      }}
                    >
                      {[0, 1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-blue-500 rounded-full"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            x: [0, (i % 2 ? 1 : -1) * 20],
                            y: [0, ((i < 2 ? 1 : -1) * 20)],
                            transition: { duration: 0.3, delay: i * 0.05 }
                          }}
                        />
                      ))}
                    </motion.div>
                  </Link>
                </ClickAnimation>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header

