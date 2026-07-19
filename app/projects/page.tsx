'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import { Search, Filter, Plus } from 'lucide-react'
import HoverText from '../components/HoverText'
import ScrollAnimation from '../components/ScrollAnimation'
import { defaultPortfolioData } from '@/lib/default-portfolio'
import { Project } from '@/lib/types'

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [projectsList, setProjectsList] = useState<Project[]>(defaultPortfolioData.projects)
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(defaultPortfolioData.projects)
  const [showFilters, setShowFilters] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const loadData = async () => {
    try {
      const res = await fetch("/api/portfolio")
      if (res.ok) {
        const data = await res.json()
        if (data.projects && data.projects.length > 0) {
          setProjectsList(data.projects)
        }
      }
    } catch (err) {
      console.error("Failed to load projects dynamic catalog:", err)
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

  useEffect(() => {
    const filtered = projectsList.filter(project => 
      // Check if title matches search term
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      // Check if project has ALL selected categories (AND logic)
      selectedCategories.every(cat => project.categories.includes(cat))
    )
    setFilteredProjects(filtered)
  }, [searchTerm, selectedCategories, projectsList])

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleProjectUpdated = async (updatedProject: Project) => {
    try {
      const res = await fetch("/api/portfolio")
      if (!res.ok) return
      const data = await res.json()
      
      const exists = data.projects.some((proj: Project) => proj.id === updatedProject.id)
      if (exists) {
        data.projects = data.projects.map((proj: Project) => 
          proj.id === updatedProject.id ? updatedProject : proj
        )
      } else {
        data.projects.push(updatedProject)
      }

      const saveRes = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updatedData: data })
      })

      if (saveRes.ok) {
        setProjectsList(data.projects)
        setSelectedProject(updatedProject)
        // Fire celebration confetti
        const confetti = (await import("canvas-confetti")).default
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } })
      }
    } catch (err) {
      console.error("Failed to update project:", err)
    }
  }

  const handleProjectDeleted = async (id: number) => {
    try {
      const res = await fetch("/api/portfolio")
      if (!res.ok) return
      const data = await res.json()

      data.projects = data.projects.filter((proj: Project) => proj.id !== id)

      const saveRes = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updatedData: data })
      })

      if (saveRes.ok) {
        setProjectsList(data.projects)
        setSelectedProject(null)
      }
    } catch (err) {
      console.error("Failed to delete project:", err)
    }
  }

  const handleAddNewProject = () => {
    const newProj: Project = {
      id: Date.now(),
      title: "New Project Title",
      description: "Short description of the new project.",
      media: { images: ["https://pub-699441ce0cfb40449cc458823a3f1ed2.r2.dev/portfolio/media/placeholder.webp"] },
      github: "",
      demo: "",
      technologies: ["Tech"],
      details: "<p>Detailed description goes here...</p>",
      categories: ["Web"]
    }
    setSelectedProject(newProj)
  }

  const allCategories = Array.from(new Set(projectsList.flatMap(project => project.categories)))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <ScrollAnimation>
        <h1 className="text-4xl font-bold mb-8 text-center font-press-start-2p">
          <HoverText>My Projects</HoverText>
        </h1>
      </ScrollAnimation>

      {isAdmin && (
        <div className="flex justify-end mb-6 max-w-7xl mx-auto">
          <button
            onClick={handleAddNewProject}
            className="bg-green-500 hover:bg-green-600 active:scale-95 transition-all text-white font-semibold px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 text-sm shadow-md"
          >
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>
      )}

      <ScrollAnimation>
        <div className="mb-8 space-y-4">   
          <div className="flex gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex items-center gap-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-700 ${
                showFilters ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <Filter className="w-5 h-5" />
              <span>Filters {selectedCategories.length > 0 && `(${selectedCategories.length})`}</span>
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
                  {allCategories.map(category => (
                    <motion.button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        selectedCategories.includes(category)
                          ? 'bg-blue-500 text-white hover:bg-blue-600'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category}
                      {selectedCategories.includes(category) && (
                        <span className="ml-2">×</span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollAnimation>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        <AnimatePresence>
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400"
            >
              <p className="text-xl">No projects found matching your criteria</p>
            </motion.div>
          ) : (
            filteredProjects.map((project) => (
              <ScrollAnimation key={project.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard project={project} onSelect={() => setSelectedProject(project)} />
                </motion.div>
              </ScrollAnimation>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
            isAdmin={isAdmin}
            onProjectUpdated={handleProjectUpdated}
            onProjectDeleted={handleProjectDeleted}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}