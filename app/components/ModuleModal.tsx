'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Pencil, Trash2, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { Module, SubProject } from '@/lib/types'

interface ModuleModalProps {
  module: Module
  onClose: () => void
  isAdmin?: boolean
  onUpdate?: (updated: Module) => void
  onDelete?: (id: string) => void
}

export default function ModuleModal({
  module,
  onClose,
  isAdmin = false,
  onUpdate,
  onDelete
}: ModuleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [isEditing, setIsEditing] = useState(false)

  const [name, setName] = useState(module.name)
  const [grade, setGrade] = useState(module.moduleGrade)
  const [desc, setDesc] = useState(module.description)
  const [yr, setYr] = useState(module.year)
  const [sem, setSem] = useState(module.semester)
  const [projectsList, setProjectsList] = useState<SubProject[]>(module.projects || [])

  useEffect(() => {
    setName(module.name)
    setGrade(module.moduleGrade)
    setDesc(module.description)
    setYr(module.year)
    setSem(module.semester)
    setProjectsList(module.projects || [])

    if (module.name === "" || module.name === "New Module") {
      setIsEditing(true)
    } else {
      setIsEditing(false)
    }
  }, [module])

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

  const handleAddProject = () => {
    setProjectsList(prev => [...prev, { name: "", grade: "A", description: "" }])
  }

  const handleRemoveProject = (index: number) => {
    setProjectsList(prev => prev.filter((_, i) => i !== index))
  }

  const handleProjectChange = (index: number, key: keyof SubProject, val: string) => {
    setProjectsList(prev => prev.map((p, i) => i === index ? { ...p, [key]: val } : p))
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate?.({
      ...module,
      name,
      moduleGrade: grade,
      description: desc,
      year: Number(yr),
      semester: Number(sem),
      projects: projectsList.length > 0 ? projectsList : undefined
    })
    setIsEditing(false)
    onClose()
  }

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete module "${module.name}"?`)) {
      onDelete?.(module.id)
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
            
            <div className="absolute left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2 text-center w-64 truncate justify-center">
              <span>{name || "Module details"}</span>
              {isAdmin && !isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-gray-500 hover:text-gray-855 dark:hover:text-gray-100 transition-all cursor-pointer flex-shrink-0"
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
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Edit Module Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Module Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-550"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Module Grade</label>
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-550"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Year</label>
                <input
                  type="number"
                  value={yr}
                  onChange={(e) => setYr(Number(e.target.value))}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-550"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Semester</label>
                <input
                  type="number"
                  value={sem}
                  onChange={(e) => setSem(Number(e.target.value))}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-550"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Description</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={4}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-550 resize-none leading-relaxed"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Module Projects / Assignments</label>
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="text-xs flex items-center gap-1 text-blue-500 hover:text-blue-600 font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Project
                </button>
              </div>

              {projectsList.map((proj, index) => (
                <div key={index} className="flex flex-col gap-2 bg-gray-50 dark:bg-gray-900 p-3.5 rounded-lg border border-gray-100 dark:border-gray-800">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Project Name"
                      value={proj.name}
                      onChange={(e) => handleProjectChange(index, "name", e.target.value)}
                      className="flex-grow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2.5 py-1 text-xs text-foreground focus:outline-none"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Grade"
                      value={proj.grade}
                      onChange={(e) => handleProjectChange(index, "grade", e.target.value)}
                      className="w-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2.5 py-1 text-xs text-foreground focus:outline-none text-center font-bold"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveProject(index)}
                      className="p-1.5 text-gray-400 hover:text-red-500 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    placeholder="Short project description..."
                    value={proj.description}
                    onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                    rows={2}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2.5 py-1 text-xs text-foreground focus:outline-none resize-none font-sans"
                    required
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              {isAdmin && module.name !== "" && module.name !== "New Module" && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg text-sm font-semibold transition-all cursor-pointer flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Delete Module
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
            <div className="border-b border-gray-200 dark:border-gray-700 pb-3 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{module.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Year {module.year}, Semester {module.semester}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">Module Grade:</span>
                <span className="bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs font-bold font-mono">
                  {module.moduleGrade}
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-sans">{module.description}</p>
              
              {module.projects && module.projects.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Projects & Assignments</h4>
                  <div className="space-y-3">
                    {module.projects.map((p, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg border border-gray-100 dark:border-gray-800/80">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-bold text-gray-900 dark:text-gray-200">{p.name}</span>
                          <span className="text-xs font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded">
                            {p.grade}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{p.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
