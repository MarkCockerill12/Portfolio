'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import { Search, Filter, Plus } from 'lucide-react'
import HoverText from '../components/HoverText'
import ScrollAnimation from '../components/ScrollAnimation'
import { celebrate, usePortfolio } from '@/lib/use-portfolio'
import { useIsAdmin } from '@/lib/use-admin'
import { Project } from '@/lib/types'

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const { data, save } = usePortfolio()
  const isAdmin = useIsAdmin()
  const projectsList = data.projects

  // `/projects?project=<id>` opens that project, so shared links land on it.
  // Retried as the live catalog arrives, since newer projects are only in R2.
  const deepLinkHandled = useRef(false)
  useEffect(() => {
    if (deepLinkHandled.current) return
    const id = Number(new URLSearchParams(globalThis.location.search).get('project'))
    if (!id) {
      deepLinkHandled.current = true
      return
    }
    const match = projectsList.find((p) => p.id === id)
    if (match) {
      deepLinkHandled.current = true
      setSelectedProject(match)
    }
  }, [projectsList])

  const filteredProjects = useMemo(
    () => projectsList.filter(project =>
      // Check if title matches search term
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      // Check if project has ALL selected categories (AND logic)
      selectedCategories.every(cat => project.categories.includes(cat))
    ),
    [projectsList, searchTerm, selectedCategories]
  )

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleProjectUpdated = async (updatedProject: Project) => {
    const saved = await save((draft) => {
      const index = draft.projects.findIndex((proj) => proj.id === updatedProject.id)
      if (index === -1) draft.projects.push(updatedProject)
      else draft.projects[index] = updatedProject
    })

    if (saved) {
      setSelectedProject(updatedProject)
      celebrate()
    }
  }

  const handleProjectDeleted = async (id: number) => {
    const saved = await save((draft) => {
      draft.projects = draft.projects.filter((proj) => proj.id !== id)
    })
    if (saved) setSelectedProject(null)
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
    <div className="container mx-auto px-4 py-8">
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
            filteredProjects.map((project, index) => (
              <ScrollAnimation key={project.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard
                    project={project}
                    onSelect={() => setSelectedProject(project)}
                    priority={index < 3}
                  />
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
    </div>
  )
}