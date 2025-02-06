'use client'

import { Code, Palette, Gamepad, Lightbulb } from 'lucide-react'
import { motion } from 'framer-motion'
import ScrollAnimation from '../components/ScrollAnimation'
import HoverText from '../components/HoverText'
import AnimatedButton from '../components/AnimatedButton'

const skills = [
  {
    category: "The Fish Works: 2023 - Present",
    items: ["The Fish Works: 2023-Present Working in multi award winning fish and chip shop, this role required me to develop an understanding of financial transactions through the till, food safety, teamwork communication and working under pressure.", "I would serve customers at a window, handle transactions at the till, be responsible for frying and preparing food and cleaning. I utilised communication skills when dealing with customers and was alwaysable to resolve any conflicts that arose. At times, the shop would be extremely busy and stressful and working seamlessly as a team would be crucial."],
    icon: <Code className="w-6 h-6" />
  },
  {
    category: "DUSA Premier: 2023-2024",
    items: ["Having worked in DUSA Premier on Dundee University Campus this role required me to manage financial transactions at the till, communicate with customers and restock items wherever needed in the shop.", "While this was less pressure, effective communication was still needed in order to navigate the working environment."],
    icon: <Palette className="w-6 h-6" />
  },
  {
    category: "Childern Summer Holiday Club: 2016- Present",
    items: ["I annually volunteer to help assist in a week-long children's mission in the northeast of Scotland. This involves utilising my communication skills with other helpers and children. During the week I have several responsibilities such as being in a team leading a specific group of primary pupils through activities as well as being a waiter serving food to multiple families during social events"],
    icon: <Gamepad className="w-6 h-6" />
  }
]

export default function Skills() {
  return (
    <ScrollAnimation>
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center font-press-start-2p"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HoverText>External Experience</HoverText>
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {skills.map((skillSet, index) => (
            <motion.div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {skillSet.icon}
                </motion.div>
                <h2 className="text-2xl font-bold ml-2">
                  <HoverText>{skillSet.category}</HoverText>
                </h2>
              </div>
              <ul className="list-disc list-inside">
                {skillSet.items.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex} 
                    className="mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: (index * 0.1) + (skillIndex * 0.05) }}
                  >
                    <HoverText>{skill}</HoverText>
                  </motion.div>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
        </motion.div>
      </div>
    </ScrollAnimation>
  )
}

