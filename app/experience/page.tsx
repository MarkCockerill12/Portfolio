'use client'

import { useState, useEffect } from 'react'
import { Code, Palette, Gamepad, FishSymbol, Pencil, Plus, Trash2, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollAnimation from '../components/ScrollAnimation'
import HoverText from '../components/HoverText'
import React from 'react'
import { Experience, ExperienceItem } from '@/lib/types'
import { defaultPortfolioData } from '@/lib/default-portfolio'

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
  onUpdate: (updated: Experience) => void
  onDelete?: (id: string) => void
}

const ExperienceCard = ({ experience, isAdmin, onUpdate, onDelete }: ExperienceCardProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(experience.title)
  const [editWebsite, setEditWebsite] = useState(experience.website || "")
  const [editIcon, setEditIcon] = useState(experience.icon)
  const [editItems, setEditItems] = useState<ExperienceItem[]>(experience.items)

  useEffect(() => {
    setEditTitle(experience.title)
    setEditWebsite(experience.website || "")
    setEditIcon(experience.icon)
    setEditItems(experience.items)
    
    // Auto edit mode for template cards
    if (experience.title === "New Position @ Company: Year-Present") {
      setIsEditing(true)
    } else {
      setIsEditing(false)
    }
  }, [experience])

  const handleAddItem = () => {
    setEditItems(prev => [...prev, { id: `item-${Date.now()}`, text: "" }])
  }

  const handleRemoveItem = (index: number) => {
    setEditItems(prev => prev.filter((_, i) => i !== index))
  }

  const handleItemTextChange = (index: number, val: string) => {
    setEditItems(prev => prev.map((item, i) => i === index ? { ...item, text: val } : item))
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate({
      ...experience,
      title: editTitle,
      website: editWebsite || undefined,
      icon: editIcon,
      items: editItems
    })
    setIsEditing(false)
  }

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative border border-gray-100 dark:border-gray-700/50"
      layout
    >
      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-4">
          <h3 className="font-bold text-lg">Edit Experience Details</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500">Title & Year</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500">Website URL</label>
              <input
                type="text"
                value={editWebsite}
                onChange={(e) => setEditWebsite(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500">Lucide Icon</label>
            <select
              value={editIcon}
              onChange={(e) => setEditIcon(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {Object.keys(ICON_MAP).map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-gray-500">Bullet Description Blocks (HTML supported)</label>
              <button
                type="button"
                onClick={handleAddItem}
                className="text-xs flex items-center gap-1 text-blue-500 hover:text-blue-600 font-semibold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Block
              </button>
            </div>

            {editItems.map((item, index) => (
              <div key={item.id} className="flex gap-2 items-start">
                <textarea
                  value={item.text}
                  onChange={(e) => handleItemTextChange(index, e.target.value)}
                  rows={3}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="p-2 text-gray-400 hover:text-red-500 cursor-pointer"
                  title="Remove block"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-2">
            {isAdmin && experience.title !== "New Position @ Company: Year-Present" && (
              <button
                type="button"
                onClick={() => onDelete?.(experience.id)}
                className="px-3.5 py-1.5 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Delete Card
              </button>
            )}
            <div className="flex gap-2 ml-auto">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3.5 py-1.5 border border-gray-300 dark:border-gray-700 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-blue-500 text-white hover:bg-blue-600 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Save Card
              </button>
            </div>
          </div>
        </form>
      ) : (
        <>
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
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1.5 hover:bg-gray-105 dark:hover:bg-gray-700 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-gray-100 transition-all cursor-pointer"
                  title="Edit Experience"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete?.(experience.id)}
                  className="p-1.5 hover:bg-gray-105 dark:hover:bg-gray-700 rounded-full text-gray-450 hover:text-red-500 transition-all cursor-pointer"
                  title="Delete Card"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <div className="space-y-4">
            {experience.items.map((item) => (
              <motion.div
                key={item.id}
                className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base prose dark:prose-invert max-w-none ml-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            ))}
          </div>
        </>
      )}
    </motion.div>
  )
}

export default function ExperiencePage() {
  const [activeTab, setActiveTab] = useState<'job' | 'other'>('job')
  const [jobList, setJobList] = useState<Experience[]>(defaultPortfolioData.jobExperiences)
  const [otherList, setOtherList] = useState<Experience[]>(defaultPortfolioData.otherExperiences)
  const [isAdmin, setIsAdmin] = useState(false)

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

      let isNew = true
      if (activeTab === 'job') {
        const exists = data.jobExperiences.some((exp: Experience) => exp.id === updated.id)
        if (exists) {
          isNew = false
          data.jobExperiences = data.jobExperiences.map((exp: Experience) => 
            exp.id === updated.id ? updated : exp
          )
        } else {
          data.jobExperiences.push(updated)
        }
      } else {
        const exists = data.otherExperiences.some((exp: Experience) => exp.id === updated.id)
        if (exists) {
          isNew = false
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
        // Celebration!
        const confetti = (await import("canvas-confetti")).default
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } })
      }
    } catch (err) {
      console.error("Failed to save experience update:", err)
    }
  }

  const handleDeleteExperience = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience card?")) return
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
      items: [{ id: `item-${Date.now()}`, text: "Insert description block here." }]
    }
    // Set view list state immediately so edit opens, then save updates R2 on save
    if (activeTab === 'job') {
      setJobList(prev => [...prev, newExp])
    } else {
      setOtherList(prev => [...prev, newExp])
    }
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
                  onUpdate={handleUpdateExperience} 
                  onDelete={handleDeleteExperience}
                />
              </ScrollAnimation>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </ScrollAnimation>
  )
}