'use client'

import { Code, Palette, Gamepad, Lightbulb } from 'lucide-react'
import { motion } from 'framer-motion'
import ScrollAnimation from '../components/ScrollAnimation'
import HoverText from '../components/HoverText'
import AnimatedButton from '../components/AnimatedButton'

const skills = [
  {
    category: "Programming Languages & Frameworks",
    items: ["JavaScript/TypeScript", "Python", "React", "Java", "C/C++/C#", "SQL", "HTML/CSS", "Tailwind"],
    icon: <Code className="w-6 h-6" />
  },
  {
    category: "Art, Design & Animation",
    items: ["Digital Illustration", "UI/UX Design", "3D Modeling", "2D/3D Animation", "Drawing/Sketching"],
    icon: <Palette className="w-6 h-6" />
  },
  {
    category: "Applications/Tools",
    items: ["CAD Inventor", "Blender", "Krita", "Microsoft Word, Excel, PowerPoint, Access", "Visual Studio/Visual Studio Code", "MySQL", "Docker", "Github", "Cisco Packet Tracer", "Arduino Uno (IDE)", "DaVinci Resolve", "VirtualBox"],
    icon: <Gamepad className="w-6 h-6" />
  },
  {
    category: "Other Computer Related Skills",
    items: ["Understanding of Networking and Addresses", "Physical Computer Installations/Assembly", "Video Editing"],
    icon: <Lightbulb className="w-6 h-6" />
  },
  {
    category: "Other Skills",
    items: ["Independent Working", "Teamwork", "Problem-Solving", "Leadership", "Communication", "Working under pressure", "Motivated and Enthusiastic"],
    icon: <Lightbulb className="w-6 h-6" />
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
          <HoverText>Skills & Experience</HoverText>
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  <motion.li 
                    key={skillIndex} 
                    className="mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: (index * 0.1) + (skillIndex * 0.05) }}
                  >
                    <HoverText>{skill}</HoverText>
                  </motion.li>
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
          <AnimatedButton>
            Download Full CV
          </AnimatedButton>
        </motion.div>
      </div>
    </ScrollAnimation>
  )
}

