'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect, ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'

interface ScrollAnimationProps {
  children: ReactNode
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ children }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
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

