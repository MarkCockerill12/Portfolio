'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'
import React from 'react'

const Header = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold font-press-start-2p">Your Name</Link>
          <div className="flex items-center">
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 mr-2">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={toggleMenu} className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <ul className={`${menuOpen ? 'block' : 'hidden'} md:flex md:space-x-4 mt-4 md:mt-0`}>
          <li><Link href="/" className="block py-2 hover:text-blue-500">Home</Link></li>
          <li><Link href="/about" className="block py-2 hover:text-blue-500">About</Link></li>
          <li><Link href="/projects" className="block py-2 hover:text-blue-500">Projects</Link></li>
          <li><Link href="/skills" className="block py-2 hover:text-blue-500">Skills</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

