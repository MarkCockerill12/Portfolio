'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, onClick, className }) => {
  return (
    <motion.button
      className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}

export default AnimatedButton

