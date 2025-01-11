'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import { Search, Filter } from 'lucide-react'
//import AnimatedButton from '../components/AnimatedButton'
import HoverText from '../components/HoverText'
import ScrollAnimation from '../components/ScrollAnimation'

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
    github: "https://github.com/MarkCockerill12/DataAWS",
    technologies: ["Visual Stdio Code", "MySQL", "PHP", "Amazon Web Services", "Docker"],
    details: "This mock company website interacts with a database with SQL and php in order to execute queries. It has predfined functions, an SQL builder and more. It has a functional php-sql login system. This was a university assignment and was hosted on amazon web servers, however for the testing and development, docker was used to set up local servers in order for them to interact. Our next steps with this website would be to touch up some of the visual aspects of it.",
    categories: ["SQL", "Python", "HTML"]
  },
  {
    id: 2,
    title: "Visual Novel Addon",
    description: "A simple addon to Visual Novel 'Doki Doki Literature Club' by Team Salvato.",
    media: {
      images: ["/pics/placeholder.png"],
    },
    technologies: ["RenPy", "PicsArt", "Visual Stdio Code"],
    details: "A simple addon to Visual Novel 'Doki Doki Literature Club' by Team Salvato. This project was made for fun and the desire to experience the RenPy coding language.",
    categories: ["Game"]
  },
  {
    id: 4,
    title: "3D Animation- Penthouse",
    description: "An animation of my room becoming a penthouse suite",
    media: {
      images: ["/pics/3D/Penthouse/Penthouse.png"],
      video: "/pics/3D/Penthouse/penthouse.mp4",
    },
    technologies: ["Blender", "DaVinci Resolve",],
    details: "This project was a combination of real life and blender animation, using DaVince Resole video editior to join the two together.",
    categories: ["3D Animation", "Video Editing",]
  },
  {
    id: 6,
    title: "Sonic Digital Drawing",
    description: "A drawing of Sonic, created on Krita",
    media: {
      images: ["/pics/Sonic/Sonic.png", "/pics/Sonic/SonicShow.png"],
    },
    technologies: ["Krita"],
    details: "This mock company website interacts with a database with SQL and php in order to execute queries. It has predfined functions, an SQL builder and more. It has a functional php-sql login system. This was a university assignment and was hosted on amazon web servers, however for the testing and development, docker was used to set up local servers in order for them to interact.",
    categories: ["Digital Art"]
  },
  {
    id: 8,
    title: "Shrimp",
    description: "Shrimp",
    media: {
      images: ["/pics/Shrimp/Shrimp.png", "/pics/Shrimp/ShrimpShow.png"],
    },
    technologies: ["C#", "Pure uncompromising genius",],
    details: "A shrimple program that asks if you are a shrimp or not.",
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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const filtered = projects.filter(project => 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategories.length === 0 || selectedCategories.some(cat => project.categories.includes(cat)))
    )
    setFilteredProjects(filtered)
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500)
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
      <ScrollAnimation>
        <h1 className="text-4xl font-bold mb-8 text-center font-press-start-2p">
          <HoverText>My Projects</HoverText>
        </h1>
      </ScrollAnimation>
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
          <button
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center"
          >
            <Filter className="mr-2" /> Filter
          </button>
          {isFilterMenuOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-2 z-10">
              {allCategories.map(category => (
                <HoverText key={category}>
                  <button
                    onClick={() => toggleCategory(category)}
                    className={`block w-full text-left p-2 rounded ${
                      selectedCategories.includes(category)
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                </HoverText>
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
          ))}
        </AnimatePresence>
      </motion.div>
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </motion.div>
  )
}

