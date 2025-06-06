'use client'

import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { Code, Palette, Gamepad, Lightbulb } from 'lucide-react'
import ScrollAnimation from '../app/components/ScrollAnimation'
import HoverText from '../app/components/HoverText'

export default function Home() {
  return (
    <ScrollAnimation>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 font-press-start-2p"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HoverText>Welcome!</HoverText>
          </motion.h1>
          <motion.h2 
            className="text-2xl md:text-3xl mb-8 text-blue-500 dark:text-blue-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
          </motion.h2>
          <Link href="/projects" passHref>
          <motion.div 
            className="flex justify-center space-x-4 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {[
              { Icon: Code, label: "Coding" },
              { Icon: Lightbulb, label: "Creativity" },
              { Icon: Palette, label: "Art" },
              { Icon: Gamepad, label: "Gaming" }

            ].map(({ Icon, label }, index) => (
              <motion.div
                key={label}
                className="flex flex-col items-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-16 h-16 text-blue-500 dark:text-blue-400" />
                <span className="mt-2 text-sm">
                  <HoverText>{label}</HoverText>
                </span>
              </motion.div>
            ))}
          </motion.div></Link>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <HoverText>
              Welcome to my portfolio! I'm a computer science student with a passion for coding, art and gaming. 
              More projects will be added with time as some are work in progress.
            </HoverText>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link href="/projects" passHref >
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg undefined">
                Explore My Projects
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </ScrollAnimation>
  )
}

