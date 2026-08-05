'use client'

import { motion } from 'motion/react'
import { ReactNode } from 'react'

interface ScrollAnimationProps {
  children: ReactNode
}

/**
 * Fades and lifts its children in the first time they scroll into view.
 * Uses the animation library's own viewport tracking, so no separate
 * IntersectionObserver wrapper or animation controller is needed.
 */
const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ children }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

export default ScrollAnimation
