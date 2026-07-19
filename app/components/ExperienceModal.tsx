'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Pencil, Trash2, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { Experience, ExperienceItem } from '@/lib/types'

interface ExperienceModalProps {
  experience: Experience
  onClose: () => void
  isAdmin?: boolean
  onUpdate?: (updated: Experience) => void
  onDelete?: (id: string) => void
}

const ICON_MAP = ["Code", "Palette", "Gamepad", "FishSymbol"]

export default function ExperienceModal({
  experience,
  onClose,
  isAdmin = false,
  onUpdate,
  onDelete
}: ExperienceModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
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

    if (experience.title === "" || experience.title === "New Position @ Company: Year-Present") {
      setIsEditing(true)
    } else {
      setIsEditing(false)
    }
  }, [experience])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    globalThis.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      globalThis.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

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
    onUpdate?.({
      ...experience,
      title: editTitle,
      website: editWebsite || undefined,
      icon: editIcon,
      items: editItems
    })
    setIsEditing(false)
    onClose()
  }

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete this position: "${experience.title}"?`)) {
      onDelete?.(experience.id)
      onClose()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Window Header */}
        <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button onClick={onClose} className="w-3 h-3 bg-red-500 rounded-full cursor-pointer" aria-label="Close" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            
            <div className="absolute left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
              <span>{editTitle || "Experience details"}</span>
              {isAdmin && !isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-gray-500 hover:text-gray-850 dark:hover:text-gray-100 transition-all cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="w-16"></div>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} className="p-6 overflow-y-auto max-h-[calc(90vh-60px)] space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Edit Position Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Position Title & Period</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Website URL</label>
                <input
                  type="text"
                  value={editWebsite}
                  onChange={(e) => setEditWebsite(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Lucide Icon name</label>
              <select
                value={editIcon}
                onChange={(e) => setEditIcon(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {ICON_MAP.map(key => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Bullet Points Details (HTML supported)</label>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="text-xs flex items-center gap-1 text-blue-500 hover:text-blue-600 font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Bullet Point
                </button>
              </div>

              {editItems.map((item, index) => (
                <div key={item.id} className="flex gap-2 items-start">
                  <textarea
                    value={item.text}
                    onChange={(e) => handleItemTextChange(index, e.target.value)}
                    rows={3}
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none font-sans"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="p-2 text-gray-400 hover:text-red-500 cursor-pointer"
                    title="Remove point"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              {isAdmin && experience.title !== "" && experience.title !== "New Position @ Company: Year-Present" && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg text-sm font-semibold transition-all cursor-pointer flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Delete Experience
                </button>
              )}
              <div className="flex gap-2 ml-auto">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-all cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-60px)] space-y-4">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{experience.title}</h2>
              {experience.website && (
                <a
                  href={experience.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:underline inline-flex items-center gap-1 mt-1 font-semibold"
                >
                  Visit Website <X className="w-3 h-3 rotate-45" />
                </a>
              )}
            </div>
            <div className="space-y-4">
              {experience.items.map((item) => (
                <div
                  key={item.id}
                  className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
