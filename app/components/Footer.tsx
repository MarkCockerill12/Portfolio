import { Github, Linkedin } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Mark Cockerill</p>
        <div className="flex space-x-4">
          <a href="https://github.com/MarkCockerill12" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/mark-cockerill-5312892a1/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

