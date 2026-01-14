'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import HoverText from '../components/HoverText'
import ScrollAnimation from '../components/ScrollAnimation'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Gamepad, Palette, Music, BookOpen, BookHeart } from 'lucide-react'


const aboutParagraphs = [
  {
    id: 'intro',
    content: "Hello! My name is Mark, and I am 20 years old. I am a third year Computing Science student at Dundee University. I am an enthusiastic and bubbly person who enjoys working with people and helping others. Due to my upbringing, religion and a supportive family who encourage my interests, I always strive to make the most out of any situation and work with determination resulting in a positive outcome."
  },
  {
    id: 'experience',
    content: "Working throughout my academic life has broadened my experiences and has given me new opportunities to learn. I have built up my communication skills to foster good relationships between lecturers and fellow students which has translated well into retail settings and enabled me to work efficiently in a group. I am very driven to complete work assigned to me and I can seek out ways to research more about any given topic using online materials. I am good at making decisions and thinking clearly under pressure, examples being effectively managing university work between group members with upcoming deadlines and navigating cooperation issues."
  }
]

const hobbies = [
  {
    icon: <Gamepad className="w-8 h-8 text-blue-500" />,
    title: "Gaming",
    description: "Games such as the Dark Souls trilogy require high attention to detail, problem solving and consistent determination to complete and understand. Other games such as Minecraft allow for creativeness to be explored, and multiplayer games allow for communicating and teamwork to be utilised."
  },
  {
    icon: <Palette className="w-8 h-8 text-blue-500" />,
    title: "Drawing",
    description: "This encourages creativity and requires dedication and practice in order to improve. It develops attention to detail skills as studying anatomy and light shading/reflecting is implemented."
  },
  {
    icon: <Palette className="w-8 h-8 text-blue-500" />,
    title: "Digital Art",
    description: "Alongside physical drawing, this encourages creativity and requires dedication and practice in order to improve. This is based also on the ability to adapt and learn to a new medium of art, utilising digital aspects to reach new heights."
  },
  {
    icon: <Palette className="w-8 h-8 text-blue-500" />,
    title: "Animating",
    description: "I mainly use 3D software such as Blender, although I have created multiple 2D frame by frame animations. These require lots of patience and tie into creative skills in order to bring a vision to life. Problem solving skills are crucial as things never go as intended."
  },
  {
    icon: <Code className="w-8 h-8 text-blue-500" />,
    title: "Programming",
    description: "Outside of academic purposes, I enjoy coding as it helps test all of my prior knowledge and expand upon it. I have worked on creating games, websites, visual novels, simple scripts, decryptions and fun messages to send to friends."
  },
  {
    icon: <Music className="w-8 h-8 text-blue-500" />,
    title: "Music",
    description: "I find myself listening to music whenever in transit whether it be walking or by vehicle, it allows me to escape into a different world and keep me upbeat for whatever life has in store for me."
  },
  {
    icon: <BookOpen className="w-8 h-8 text-blue-500" />,
    title: "Reading",
    description: "Reading also provides an escape into a new world by allowing my creative ability to construct the image the book presents into my head."
  },
  {
    icon: <BookHeart className="w-8 h-8 text-blue-500" />,
    title: "Religious Study",
    description: "Reading the bible and other sources regarding Christianity helps me to navigate aspects of my life and improve my ability to communicate with others about it"
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
          src="/media/me.png"
          alt="Profile Picture"
          width={175}
          height={175}
          className="rounded-lg shadow-lg"
        />
      </motion.div>
      <div className="max-w-2xl">
        {aboutParagraphs.map((paragraph) => (
          <motion.p 
            key={paragraph.id}
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HoverText>{paragraph.content}</HoverText>
          </motion.p>
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
          <p className="text-gray-600 dark:text-gray-300">
            <HoverText>{hobby.description}</HoverText>
          </p>
        </motion.div>
      ))}
    </div>
  </motion.section>
)

export default function About() {
  const [activeTab, setActiveTab] = useState('about')

  return (
    <ScrollAnimation>
      <div className="flex flex-col items-center space-y-8">
        <div className="flex space-x-4">
        <TabButton id="about" label="About Me" activeTab={activeTab} setActiveTab={setActiveTab} className="hover:text-blue-500" />          
        <TabButton id="hobbies" label="Hobbies" activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'about' ? <AboutSection /> : <HobbiesSection />}
        </AnimatePresence>
      </div>
    </ScrollAnimation>
  )
}