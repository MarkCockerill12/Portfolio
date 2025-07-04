'use client'

import { Code, Palette, Gamepad, FishSymbol } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollAnimation from '../components/ScrollAnimation'
import HoverText from '../components/HoverText'
import React, { ReactElement } from 'react'

type Experience = {
  id: string;
  title: string;
  website?: string;
  items: Array<{
    id: string;
    text: string | ReactElement;
  }>;
  icon: ReactElement;
}

const jobExperiences: Experience[] = [
  {
    id: 'Outlier',
    title: "Independent Contractor @ Outlier AI: 2025-Present",
    website: "https://www.outlier.ai",
    items: [
      {
        id: 'outlier-main',
        text: "Outlier is a platform that connects subject matter experts to help build the world's most advanced Generative AI."
      },
      {
        id: 'outlier-details',
        text: (
          <>
            My work at Outlier consists of training AI models and reviewing their responses and provided code to make sure it is up to standard and there are no errors. I have worked on multiple projects, where I have had to:
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>Train AI models to respond to a specific prompt and rate their outputs based on truthfulness and other factors. This could take the form of complete code generation, refactoring, and testing.</li>
              <br></br>
              <li>Review different GitHub pull requests and issues, where I would have to read through the code and provide problem statements, requirements, and classifications.</li>
            </ul>
          </>
        )
      }
    ],
    icon: <Code className="w-6 h-6" />
  },
  {
    id: 'fish-works',
    title: "Retail Assistant @ The Fish Works: 2023-Present",
    website: "https://thefishworks.co.uk",
    items: [
      {
        id: 'fish-works-main',
        text: "The Fish Works: 2023-Present Working in multi award winning fish and chip shop, this role required me to develop an understanding of financial transactions through the till, food safety, teamwork communication and working under pressure."
      },
      {
        id: 'fish-works-details',
        text: "I would serve customers at a window, handle transactions at the till, be responsible for frying and preparing food and cleaning. I utilised communication skills when dealing with customers and was always able to resolve any conflicts that arose. At times, the shop would be extremely busy and stressful and working seamlessly as a team would be crucial."
      }
    ],
    icon: <FishSymbol className="w-6 h-6" />
  },
  {
    id: 'dusa',
    title: "Retail Assistant @ DUSA Premier: 2023-2024",
    website: "https://www.dusa.co.uk",
    items: [
      {
        id: 'dusa-main',
        text: "Having worked in DUSA Premier on Dundee University Campus this role required me to manage financial transactions at the till, communicate with customers and restock items wherever needed in the shop."
      },
      {
        id: 'dusa-details',
        text: "While this was less pressure, effective communication was still needed in order to navigate the working environment."
      }
    ],
    icon: <Palette className="w-6 h-6" />
  }
]

const otherExperiences: Experience[] = [
  {
    id: 'hackathon25',
    title: "2025 Dundee Uni Hackathon",
    items: [
      {
        id: 'hackathon25-main',
        text: "The Dundee University Hackathon is a 24-hour event where students are tasked with creating a project set out by a company with the chance to win prizes. Multiple companies sponsored this hackathon, such as Rockstar, BlackRock, NCR Atleos and Synechron."
      },
      {
        id: 'hackathon25-details',
        text: "BlackRock tasked us with creating an enviromental events webpage, showcasing green efforts and upcoming activites and plans. NCR Atleos tasked us with creating an ATM that utilises new innovative features to bring to future of finance to the current day. Synechron tasked us with making a simple game using GameMaker. My team tackled all of these projects, as I created the ATM independantly for my group, I included it in the projects of this portfolio."
      }
    ],
    icon: <Code className="w-6 h-6" />
  },
  {
    id: 'agile',
    title: "Agile Practices",
    items: [
      {
        id: 'agile-main',
        text: "During our Universities agile module where we created an ATM simulation for NCR, we learned and displayed proper agile development practices through taking notes and github. We used Kankan boards, planning poker, MoSCoW, retrospectives, sprint reviews, scrum meetings and more."
      }
    ],
    icon: <Code className="w-6 h-6" />
  },
  {
    id: 'hackathon24',
    title: "2024 Dundee Uni Hackathon",
    items: [
      {
        id: 'hackathon24-main',
        text: "Multiple companies sponsored this hackathon, such as BlackRock, NCR Atleos and GE Vernova."
      },
      {
        id: 'hackathon24-details',
        text: "BlackRock tasked us with creating a student friendly application, whether it be for shoping or studing and NCR Atleos tasking us with creating a map where we could plot ATM locations on. I attempted both of these tasks and was able to achieve second place in NCR Atleos' challenge."
      }
    ],
    icon: <Code className="w-6 h-6" />
  },
  {
    id: 'holiday-club',
    title: "Helper @ Children Summer Holiday Club: 2016-Present",
    items: [
      {
        id: 'holiday-club-main',
        text: "I annually volunteer to help assist in a week-long children's mission in the northeast of Scotland. This involves utilising my communication skills with other helpers and children. During the week I have several responsibilities such as being in a team leading a specific group of primary pupils through activities as well as being a waiter serving food to multiple families during social events"
      }
    ],
    icon: <Gamepad className="w-6 h-6" />
  }
]

const ExperienceTab = ({ label, isActive, onClick }: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    className={`text-xl font-semibold px-4 py-2 relative ${
      isActive ? 'text-blue-500' : 'text-gray-600 dark:text-gray-300'
    }`}
    onClick={onClick}
  >
    {label}
    {isActive && (
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
        layoutId="underline"
      />
    )}
  </button>
)

const ExperienceSection = ({ experiences }: { experiences: Experience[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="grid grid-cols-1 gap-8"
  >
    {experiences.map((exp) => (
      <motion.div 
        key={exp.id}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {exp.icon}
          </motion.div>
          <h2 className="text-2xl font-bold ml-2">
            {exp.website ? (
              <a 
                href={exp.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-500 transition-colors"
              >
                <HoverText>{exp.title}</HoverText>
              </a>
            ) : (
              <HoverText>{exp.title}</HoverText>
            )}
          </h2>
        </div>
        <ul className="list-disc list-inside">
          {exp.items.map((item) => (
            <motion.div
              key={item.id}
              className="mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HoverText>{item.text}</HoverText>
            </motion.div>
          ))}
        </ul>
      </motion.div>
    ))}
  </motion.div>
)

export default function Experience() {
  const [activeTab, setActiveTab] = React.useState<'job' | 'other'>('job')

  return (
    <ScrollAnimation>
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-8 mb-8">
          <ExperienceTab 
            label="Job Experience" 
            isActive={activeTab === 'job'} 
            onClick={() => setActiveTab('job')} 
          />
          <ExperienceTab 
            label="Other Experience" 
            isActive={activeTab === 'other'} 
            onClick={() => setActiveTab('other')} 
          />
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'job' ? (
            <ExperienceSection experiences={jobExperiences} />
          ) : (
            <ExperienceSection experiences={otherExperiences} />
          )}
        </AnimatePresence>
      </div>
    </ScrollAnimation>
  )
}