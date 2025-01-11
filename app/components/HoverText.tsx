'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface HoverTextProps {
  children: ReactNode
  className?: string
}

const HoverText: React.FC<HoverTextProps> = ({ children, className }) => {
  return (
    <motion.span
      className={`inline-block ${className} hover:text-blue-500`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
    </motion.span>
  )
}

export default HoverText