'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import { Search, Filter } from 'lucide-react'

interface Project {
  id: number;
  title: string;
  description: string;
  media: {
    images?: string[];
    video?: string;
  };
  github?: string;
  demo?: string;
  technologies: string[];
  details: string;
  categories: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "SQL Company Website",
    description: "A website that interacts with a database in form of SQL",
    media: {
      images: ["/pics/SteelSummit/Steel1.png", "/pics/SteelSummit/Steel2.png", "/pics/SteelSummit/Steel3.png", "/pics/SteelSummit/Steel4.png", "/pics/SteelSummit/Steel5.png", "/pics/SteelSummit/Steel6.png", "/pics/SteelSummit/Steel7.png", "/pics/SteelSummit/Steel8.png"],
    },
    github: "https://github.com/yourusername/pixel-art-generator",
    demo: "https://pixel-art-generator-demo.com",
    technologies: ["RenPy", "PicsArt", "Visual Stdio Code"],
    details: "This mock company website interacts with a database with SQL and php in order to execute queries. It has predfined functions, an SQL builder and more. It has a functional php-sql login system. This was a university assignment and was hosted on amazon web servers, however for the testing and development, docker was used to set up local servers in order for them to interact.",
    categories: []
  },
  {
    id: 2,
    title: "Visual Novel Addon",
    description: "A soft sequel(?) to Doki Doki Literature Club",
    media: {
      images: ["/pics/placeholder.png"],
    },
    github: "https://github.com/yourusername/pixel-art-generator",
    demo: "https://pixel-art-generator-demo.com",
    technologies: ["RenPy", "PicsArt", "Visual Stdio Code"],
    details: "This project combines my love for art and coding. Users can create pixel art, animate it, and share their creations with a community of artists. It features a custom-built drawing engine and real-time collaboration tools.",
    categories: []
  },
  {
    id: 3,
    title: "3D Animation- Star wars",
    description: "Yep, I made a Star Wars animation",
    media: {
      video: "/sample-video.mp4",
      images: ["/pics/placeholder.png"],
    },
    github: "https://github.com/yourusername/rpg-inventory",
    technologies: ["Blender", "DaVinci Resolve",],
    details: "Inspired by my favorite RPGs, I created a robust inventory system that game developers can easily integrate into their projects. It supports item stacking, weight limits, equipment slots, and a drag-and-drop interface.",
    categories: ["Blender", "DaVinci Resolve",]
  },
  {
    id: 4,
    title: "3D Animation- Penthouse",
    description: "Animation",
    media: {
      video: "/sample-video.mp4",
      images: ["/pics/placeholder.png"],
    },
    github: "https://github.com/yourusername/creative-coding-sketchbook",
    demo: "https://pixel-art-generator-demo.com",
    technologies: ["Blender", "DaVinci Resolve",],
    details: "This project showcases my experiments with creative coding. Each sketch is an interactive piece of art that responds to user input or generates unique patterns. It's a fusion of my programming skills and artistic vision.",
    categories: ["Blender", "DaVinci Resolve",]
  },
  {
    id: 5,
    title: "Scribble",
    description: "A website that interacts with a database in form of SQL",
    media: {
      images: ["/pics/placeholder.png"],
    },
    github: "https://github.com/yourusername/pixel-art-generator",
    demo: "https://pixel-art-generator-demo.com",
    technologies: ["RenPy", "PicsArt", "Visual Stdio Code"],
    details: "This mock company website interacts with a database with SQL and php in order to execute queries. It has predfined functions, an SQL builder and more. It has a functional php-sql login system. This was a university assignment and was hosted on amazon web servers, however for the testing and development, docker was used to set up local servers in order for them to interact.",
    categories: []
  },
  {
    id: 6,
    title: "Sonic Digital Drawing",
    description: "A website that interacts with a database in form of SQL",
    media: {
      images: ["/pics/Sonic/Sonic.png", "/pics/Sonic/SonicShow.png"],
    },
    github: "https://github.com/yourusername/pixel-art-generator",
    demo: "https://pixel-art-generator-demo.com",
    technologies: ["RenPy", "PicsArt", "Visual Stdio Code"],
    details: "This mock company website interacts with a database with SQL and php in order to execute queries. It has predfined functions, an SQL builder and more. It has a functional php-sql login system. This was a university assignment and was hosted on amazon web servers, however for the testing and development, docker was used to set up local servers in order for them to interact.",
    categories: []
  },
  {
    id: 7,
    title: "3D Animation- IRL Springtrap",
    description: "Animation",
    media: {
      video: "/sample-video.mp4",
      images: ["/pics/placeholder.png"],
    },
    github: "https://github.com/yourusername/creative-coding-sketchbook",
    demo: "https://pixel-art-generator-demo.com",
    technologies: ["Blender", "DaVinci Resolve",],
    details: "This project showcases my experiments with creative coding. Each sketch is an interactive piece of art that responds to user input or generates unique patterns. It's a fusion of my programming skills and artistic vision.",
    categories: ["Blender", "DaVinci Resolve",]
  },
  {
    id: 8,
    title: "Shrimp",
    description: "Shrimp",
    media: {
      images: ["/pics/Shrimp/Shrimp.png", "/pics/Shrimp/ShrimpShow.png"],
    },
    github: "https://github.com/yourusername/creative-coding-sketchbook",
    // demo: "https://pixel-art-generator-demo.com",
    technologies: ["C#", "Pure uncompromising genious",],
    details: "A simple program that asks if you are a shrimp or not.",
    categories: ["C#"]
  },
]

const allCategories = Array.from(new Set(projects.flatMap(project => project.categories)))

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)

  useEffect(() => {
    const filtered = projects.filter(project => 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategories.length === 0 || selectedCategories.some(cat => project.categories.includes(cat)))
    )
    setFilteredProjects(filtered)
  }, [searchTerm, selectedCategories])

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-4xl font-bold mb-8 text-center font-press-start-2p">My Projects</h1>
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center"
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
          >
            <Filter className="mr-2" /> Filter
          </motion.button>
          {isFilterMenuOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-2 z-10">
              {allCategories.map(category => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`block w-full text-left p-2 rounded ${
                    selectedCategories.includes(category)
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>
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
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} onSelect={() => setSelectedProject(project)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </motion.div>
  )
}