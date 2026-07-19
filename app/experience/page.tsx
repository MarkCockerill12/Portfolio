'use client'

import { useState, useEffect } from 'react'
import { Code, Palette, Gamepad, FishSymbol, Pencil, Plus, Trash2, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollAnimation from '../components/ScrollAnimation'
import HoverText from '../components/HoverText'
import React from 'react'
import { Experience } from '@/lib/types'
import { defaultPortfolioData } from '@/lib/default-portfolio'
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
  const [jobList, setJobList] = useState<Experience[]>(defaultPortfolioData.jobExperiences)
  const [otherList, setOtherList] = useState<Experience[]>(defaultPortfolioData.otherExperiences)
  const [isAdmin, setIsAdmin] = useState(false)
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)

  const loadData = async () => {
    try {
      const res = await fetch("/api/portfolio")
      if (res.ok) {
        const data = await res.json()
        if (data.jobExperiences) setJobList(data.jobExperiences)
        if (data.otherExperiences) setOtherList(data.otherExperiences)
      }
    } catch (err) {
      console.error("Failed to load experience dynamic catalog:", err)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => setIsAdmin(data.authenticated))
      .catch(() => setIsAdmin(false))
  }, [])

  const handleUpdateExperience = async (updated: Experience) => {
    try {
      const res = await fetch("/api/portfolio")
      if (!res.ok) return
      const data = await res.json()

      if (activeTab === 'job') {
        const exists = data.jobExperiences.some((exp: Experience) => exp.id === updated.id)
        if (exists) {
          data.jobExperiences = data.jobExperiences.map((exp: Experience) => 
            exp.id === updated.id ? updated : exp
          )
        } else {
          data.jobExperiences.push(updated)
        }
      } else {
        const exists = data.otherExperiences.some((exp: Experience) => exp.id === updated.id)
        if (exists) {
          data.otherExperiences = data.otherExperiences.map((exp: Experience) => 
            exp.id === updated.id ? updated : exp
          )
        } else {
          data.otherExperiences.push(updated)
        }
      }

      const saveRes = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updatedData: data })
      })

      if (saveRes.ok) {
        if (activeTab === 'job') {
          setJobList(data.jobExperiences)
        } else {
          setOtherList(data.otherExperiences)
        }
        setSelectedExperience(null)
        // Celebration!
        const confetti = (await import("canvas-confetti")).default
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } })
      }
    } catch (err) {
      console.error("Failed to save experience update:", err)
    }
  }

  const handleDeleteExperience = async (id: string) => {
    try {
      const res = await fetch("/api/portfolio")
      if (!res.ok) return
      const data = await res.json()

      if (activeTab === 'job') {
        data.jobExperiences = data.jobExperiences.filter((exp: Experience) => exp.id !== id)
      } else {
        data.otherExperiences = data.otherExperiences.filter((exp: Experience) => exp.id !== id)
      }

      const saveRes = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updatedData: data })
      })

      if (saveRes.ok) {
        if (activeTab === 'job') {
          setJobList(data.jobExperiences)
        } else {
          setOtherList(data.otherExperiences)
        }
        setSelectedExperience(null)
      }
    } catch (err) {
      console.error("Failed to delete experience:", err)
    }
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

  const currentList = activeTab === 'job' ? jobList : otherList

  return (
    <ScrollAnimation>
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
    </ScrollAnimation>
  )
}