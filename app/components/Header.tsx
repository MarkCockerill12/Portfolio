'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Moon, Sun, Menu, X, Circle, Sparkles, Square, Grid } from 'lucide-react'
import { useTheme } from 'next-themes'
import HoverText from './HoverText'
import { motion } from 'framer-motion'
import BackgroundAnimation from './BackgroundAnimation'
import LittleGuy from './LittleGuy'
import { Switch } from '@headlessui/react'
import Tooltip from './Tooltip'

type AnimationType = 'circles' | 'fireworks' | 'squares';

const ClickAnimation = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05 }}
  >
    {children}
  </motion.div>
)

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [animationType, setAnimationType] = useState<AnimationType>('circles')
  const [guyVisible, setGuyVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    // setTheme('dark')
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

  return (
    <>
      <BackgroundAnimation animationType={animationType} />
      <LittleGuy visible={guyVisible} onClose={() => setGuyVisible(false)} />
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold font-press-start-2p"><HoverText>Mark.C Portfolio</HoverText></Link>
            <div className="flex items-center">
              <ClickAnimation>
                <Tooltip content="Change background animation">
                  <button onClick={toggleAnimation} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 mr-2">
                    {animationType === 'circles' && <Sparkles className="w-5 h-5" />} {/* next: fireworks */}
                    {animationType === 'fireworks' && <Square className="w-5 h-5" />} {/* next: squares */}
                    {animationType === 'squares' && <Sparkles className="w-5 h-5" />} {/* next: circles */}
                  </button>
                </Tooltip>
              </ClickAnimation>
              <ClickAnimation>
                <Tooltip content="Toggle dark/light mode">
                  <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 mr-2">
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                </Tooltip>
              </ClickAnimation>
              <ClickAnimation>
                <Tooltip content="Summon Little Helper">
                  <Switch
                    checked={guyVisible}
                    onChange={setGuyVisible}
                    className={`${guyVisible ? 'bg-blue-600' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none mr-2`}
                    aria-label="Toggle Little Guy"
                  >
                    <span className="sr-only">Toggle Little Guy</span>
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${guyVisible ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </Switch>
                </Tooltip>
              </ClickAnimation>
              <ClickAnimation>
                <button onClick={toggleMenu} className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                  {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </ClickAnimation>
            </div>
          </div>
          <ul className={`${menuOpen ? 'block' : 'hidden'} md:flex md:space-x-4 mt-4 md:mt-0`}>
            {['Home', 'About', 'Projects', 'Skills', 'Experience', 'Qualifications'].map((item) => (
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

