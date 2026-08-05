'use client'

import { useState } from 'react'
import { Code, Palette, Gamepad, FishSymbol, Pencil, Plus, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import ScrollAnimation from '../components/ScrollAnimation'
import HoverText from '../components/HoverText'
import React from 'react'
import { Experience } from '@/lib/types'
import { celebrate, usePortfolio } from '@/lib/use-portfolio'
import { useIsAdmin } from '@/lib/use-admin'
import ExperienceModal from '../components/ExperienceModal'

const ICON_MAP: Record<string, React.ReactNode> = {
  Code: <Code className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  Gamepad: <Gamepad className="w-6 h-6" />,
  FishSymbol: <FishSymbol className="w-6 h-6" />
}

const ExperienceTab = ({ label, isActive, onClick }: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    className={`text-xl font-semibold px-4 py-2 relative cursor-pointer ${
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

interface ExperienceCardProps {
  experience: Experience
  isAdmin: boolean
  onSelect: (exp: Experience) => void
}

const ExperienceCard = ({ experience, isAdmin, onSelect }: ExperienceCardProps) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative border border-gray-100 dark:border-gray-700/50"
      layout
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center flex-1">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-blue-500 dark:text-blue-400"
          >
            {ICON_MAP[experience.icon] || <Code className="w-6 h-6" />}
          </motion.div>
          <h2 className="text-2xl font-bold ml-3 text-gray-900 dark:text-gray-100 flex items-center gap-2">
            {experience.website ? (
              <a 
                href={experience.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-500 transition-colors flex items-center gap-1.5"
              >
                <HoverText>{experience.title}</HoverText>
                <Globe className="w-4 h-4 text-gray-400" />
              </a>
            ) : (
              <HoverText>{experience.title}</HoverText>
            )}
          </h2>
        </div>
        {isAdmin && (
          <button
            onClick={() => onSelect(experience)}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-gray-100 transition-all cursor-pointer shrink-0"
            title="Edit Experience"
          >
            <Pencil className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="space-y-4 cursor-pointer" onClick={() => onSelect(experience)}>
        {experience.items.map((item) => (
          <motion.div
            key={item.id}
            className="text-gray-750 dark:text-gray-300 leading-relaxed text-sm sm:text-base prose dark:prose-invert max-w-none ml-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            dangerouslySetInnerHTML={{ __html: item.text }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function ExperiencePage() {
  const [activeTab, setActiveTab] = useState<'job' | 'other'>('job')
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)

  const { data, save } = usePortfolio()
  const isAdmin = useIsAdmin()

  // Both tabs are stored as separate arrays on the same catalog.
  const section = activeTab === 'job' ? 'jobExperiences' : 'otherExperiences'

  const handleUpdateExperience = async (updated: Experience) => {
    const saved = await save((draft) => {
      const list = draft[section]
      const index = list.findIndex((exp) => exp.id === updated.id)
      if (index === -1) list.push(updated)
      else list[index] = updated
    })

    if (saved) {
      setSelectedExperience(null)
      celebrate()
    }
  }

  const handleDeleteExperience = async (id: string) => {
    const saved = await save((draft) => {
      draft[section] = draft[section].filter((exp) => exp.id !== id)
    })
    if (saved) setSelectedExperience(null)
  }

  const handleAddNewExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      title: "New Position @ Company: Year-Present",
      website: "",
      icon: "Code",
      items: [{ id: `item-${Date.now()}`, text: "<p>Position details...</p>" }]
    }
    setSelectedExperience(newExp)
  }

  const currentList = data[section]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8 border-b border-gray-200 dark:border-gray-700/50 pb-4">
        <div className="flex space-x-6">
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
        {isAdmin && (
          <button
            onClick={handleAddNewExperience}
            className="bg-green-500 hover:bg-green-600 active:scale-95 transition-all text-white font-semibold px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 text-sm shadow-md"
          >
            <Plus className="w-4 h-4" /> Add Experience
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 gap-8"
        >
          {currentList.map((exp) => (
            <ScrollAnimation key={exp.id}>
              <ExperienceCard 
                experience={exp} 
                isAdmin={isAdmin}
                onSelect={(item) => setSelectedExperience(item)}
              />
            </ScrollAnimation>
          ))}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {selectedExperience && (
          <ExperienceModal
            experience={selectedExperience}
            isAdmin={isAdmin}
            onUpdate={handleUpdateExperience}
            onDelete={handleDeleteExperience}
            onClose={() => setSelectedExperience(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}