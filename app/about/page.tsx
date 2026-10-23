'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import HoverText from '../components/HoverText'
import EditableText from '../components/EditableText'
import { motion, AnimatePresence } from 'motion/react'
import { Code, Gamepad, Palette, Music, BookOpen, BookHeart } from 'lucide-react'

const BASE_URL = "https://pub-699441ce0cfb40449cc458823a3f1ed2.r2.dev/portfolio"

// Copy lives in DEFAULT_CONTENT and can be rewritten from admin mode.
const aboutParagraphs = ['about.intro', 'about.experience']

const hobbies = [
  {
    icon: <Gamepad className="w-8 h-8 text-blue-500" />,
    title: "Gaming",
  },
  {
    icon: <Palette className="w-8 h-8 text-blue-500" />,
    title: "Drawing",
  },
  {
    icon: <Palette className="w-8 h-8 text-blue-500" />,
    title: "Digital Art",
  },
  {
    icon: <Palette className="w-8 h-8 text-blue-500" />,
    title: "Animating",
  },
  {
    icon: <Code className="w-8 h-8 text-blue-500" />,
    title: "Programming",
  },
  {
    icon: <Music className="w-8 h-8 text-blue-500" />,
    title: "Music",
  },
  {
    icon: <BookOpen className="w-8 h-8 text-blue-500" />,
    title: "Reading",
  },
  {
    icon: <BookHeart className="w-8 h-8 text-blue-500" />,
    title: "Religious Study",
  }
]

const TabButton = ({ id, label, activeTab, setActiveTab, className = '' }: { 
  id: string; 
  label: string;
  activeTab: string;
  setActiveTab: (id: string) => void;
  className?: string;
}) => (
  <motion.button
    className={`px-8 py-3 rounded-lg font-press-start-2p text-sm md:text-base ${
      activeTab === id 
        ? 'bg-blue-900 text-white' 
        : 'bg-gray-200 dark:bg-gray-700'
    } ${className}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => setActiveTab(id)}
  >
    <HoverText>{label}</HoverText>
  </motion.button>
)

const AboutSection = () => (
  <motion.section
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.3 }}
    className="w-full"
  >
    <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image 
          src={`${BASE_URL}/media/me.webp`}
          alt="Profile Picture"
          width={175}
          height={175}
          className="rounded-lg shadow-lg"
        />
      </motion.div>
      <div className="max-w-2xl">
        {aboutParagraphs.map((id) => (
          <EditableText key={id} id={id} rows={8}>
            {(text) => (
              <motion.p
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <HoverText>{text}</HoverText>
              </motion.p>
            )}
          </EditableText>
        ))}
      </div>
    </div>
  </motion.section>
)

const HobbiesSection = () => (
  <motion.section
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
    className="w-full"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {hobbies.map((hobby) => (
        <motion.div
          key={hobby.title}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center mb-4">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {hobby.icon}
            </motion.div>
            <h3 className="text-xl font-bold ml-4">
              <HoverText>{hobby.title}</HoverText>
            </h3>
          </div>
          <EditableText id={`hobby.${hobby.title.toLowerCase().replace(/\s+/g, '-')}`}>
            {(text) => (
              <p className="text-gray-600 dark:text-gray-300">
                <HoverText>{text}</HoverText>
              </p>
            )}
          </EditableText>
        </motion.div>
      ))}
    </div>
  </motion.section>
)

export default function About() {
  const [activeTab, setActiveTab] = useState('about')

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="flex space-x-4">
      <TabButton id="about" label="About Me" activeTab={activeTab} setActiveTab={setActiveTab} className="hover:text-blue-500" />          
      <TabButton id="hobbies" label="Hobbies" activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'about' ? <AboutSection /> : <HobbiesSection />}
      </AnimatePresence>
    </div>
  )
}