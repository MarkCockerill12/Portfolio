'use client'

import Image from 'next/image'
import React from 'react'
import AnimatedButton from '../components/AnimatedButton'
import HoverText from '../components/HoverText'
import ScrollAnimation from '../components/ScrollAnimation'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <ScrollAnimation>
      <div className="flex flex-col items-center">
        <motion.h1 
          className="text-4xl font-bold mb-8 font-press-start-2p"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HoverText>About Me</HoverText>
        </motion.h1>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/pics/placeholder.PNG"
              alt="Profile Picture"
              width={300}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
          <div className="max-w-2xl">
            {[
              "Hello! My name is Mark and I am 20 years old. I am a third year Computing Science student at Dundee University seeking to gain experience working within a professional environment to allow me to develop my skillset. I am an enthusiastic and bubbly person who enjoys working with people and helping others. Due to my upbringing, religion and a supportive family who encourage my interests, I always strive to make the most out of any situation and work with determination resulting in a positive outcome.",
              "Working throughout my academic life has broadened my experiences and has given me new opportunities to learn. I have built up my communication skills to foster good relationships between lecturers and fellow students which has translated well into retail settings and enabled me to work efficiently in a group. I am very driven to complete work assigned to me and I can seek out ways to research more about any given topic using online materials. I am good at making decisions and thinking clearly under pressure, examples being effectively managing university work between group members with upcoming deadlines and navigating cooperation issues.",
              "I enjoy taking part in sports which help develop my communication, leadership and team working skills. A few examples of this would be regularly attending a night-time basketball club and competing against senior pupils and adults at a council leisure provided badminton club outside of Uni terms. I am also learning a few extra languages (Chinese and Russian) to broaden my knowledge of communication.",
              "I have an effective grasp of working with computer programs, I can efficiently use applications like Microsoft apps, CAD inventor and multi-language coding. I annually volunteer to help assist in a week-long children's mission in the northeast of Scotland. This involves utilising my communication skills with other helpers and children. During the week I have several responsibilities such as being in a team leading a specific group of primary pupils through activities as well as being a waiter serving food to multiple families during social events."
            ].map((paragraph, index) => (
              <motion.p 
                key={index} 
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <HoverText>{paragraph}</HoverText>
              </motion.p>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <AnimatedButton className="mt-8">
            Download CV
          </AnimatedButton>
        </motion.div>
      </div>
    </ScrollAnimation>
  )
}

