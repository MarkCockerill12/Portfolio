'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import { Search, Filter } from 'lucide-react'
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
    title: "NCR ATM Simulation",
    description: "An application that acts as a mock ATM for NCR",
    media: {
      images: ["/pics/Agile/Agile2.PNG", "/pics/Agile/Agile3.PNG", "/pics/Agile/Agile4.PNG", "/pics/Agile/Agile5.PNG", "/pics/Agile/Agile6.PNG", "/pics/Agile/Agile7.PNG", "/pics/Agile/Agile8.PNG", "/pics/Agile/Agile1.PNG", "/pics/Agile/Agile9.PNG"],
    },
    github: "https://github.com/MarkCockerill12/AC31007AgileGroup1",
    technologies: ["Visual Stdio Code", "MySQL", "Go", "Amazon Web Services", "Docker", "React", "Electron", "Next.js", "Python", "Agile Methodologies"],
    details: "This mock ATM program was our task issues by NCR for learning agile methodologies, it utilises electron to showcase the front end, which handles the visual aspects. The front end then communciates with a Go-coded switch by sending JSON, the switch sorts out the different card numbers and sends them to a seperate simulation which in turn interacts with information in a database. This program is capable of multi currency support, multiple langauges and has error handling. ",
    categories: ["Web", "SQL"]
  },
  {
    id: 2,
    title: "SQL Company Website",
    description: "A website that interacts with a database in form of SQL",
    media: {
      images: ["/pics/SteelSummit/Steel1.png", "/pics/SteelSummit/Steel2.png", "/pics/SteelSummit/Steel3.png", "/pics/SteelSummit/Steel4.png", "/pics/SteelSummit/Steel5.png", "/pics/SteelSummit/Steel6.png", "/pics/SteelSummit/Steel7.png", "/pics/SteelSummit/Steel8.png"],
    },
    github: "https://github.com/MarkCockerill12/DataAWS",
    technologies: ["Visual Stdio Code", "MySQL", "PHP", "Amazon Web Services", "Docker"],
    details: "This mock company website interacts with a database with SQL and php in order to execute queries. It has predfined functions, an SQL builder and more. It has a functional php-sql login system. This was a university assignment and was hosted on amazon web servers, however for the testing and development, docker was used to set up local servers in order for them to interact. Our next steps with this website would be to touch up some of the visual aspects of it.",
    categories: ["SQL", "Web"]
  },
  
  {
    id: 3,
    title: "Visual Novel Addon",
    description: "A simple addon to Visual Novel 'Doki Doki Literature Club' by Team Salvato.",
    media: {
      images: ["/pics/Doki/DokiDev.PNG", "/pics/Doki/DokiGame.PNG"],
    },
    technologies: ["RenPy", "PicsArt", "Visual Stdio Code"],
    details: "A simple addon to Visual Novel 'Doki Doki Literature Club' by Team Salvato. This project was made for fun and the desire to experience the RenPy coding language.",
    categories: ["Game"]
  },
  {
    id: 11,
    title: "NextGen ATM Website",
    description: "A website that expands upon the possilities of ATMs, commisioned by NCR for 2025 Dundee Hackathon",
    media: {
      images: ["/pics/Hak-ATM/atm1.PNG", "/pics/Hak-ATM/atm2.PNG", "/pics/Hak-ATM/atm3.PNG", "/pics/Hak-ATM/atm4.PNG"],
    },
    github: "https://github.com/MarkCockerill12/Hak25--NCR",
    technologies: ["Visual Stdio Code", "React", "Next.js", "Vercel"],
    demo: "https://hak25-ncr.vercel.app",
    details: "This mock ATM website was one of the projects my team took on during the 2025 Dundee Uni Hackaton. Our task was to create an ATM that would represent the future, and all the new functionalities that come with it. I decided to create an all-in-one type website, where you can manage your finances, stocks, bills and more with just a few clicks, as well as giving you a visual representation of all of these. Since the hackathon took place over 24 hours, some functionalites such as different langauges arent available. The website uses local storage to remember any additions you make to your bank account, whether it be adding money, cards or stocks. ",
    categories: ["Web", "SQL"]
  },
  {
    id: 4,
    title: "Raspbery Pi Pico Web Texter",
    description: "A program that uses Twilio and a Raspberry Pi Pico W to send text messages",
    media: {
      images: ["/pics/Twilio/Twi1.PNG", "/pics/Twilio/Twi2.jpg"],
    },
    technologies: ["RenPy", "PicsArt", "Visual Stdio Code"],
    details: "The Raspbery Pi W hosts a web server which allows the user to input text, the program then uses the Twilio API to send text messages through the pico.",
    categories: ["Python", "Raspbery Pi"]
  },
  {
    id: 5,
    title: "3D Animation- Penthouse",
    description: "An animation of my room becoming a penthouse suite",
    media: {
      images: ["/pics/3D/Penthouse/Penthouse.PNG"],
      video: "/pics/3D/Penthouse/PenthouseVid.mp4",
    },
    technologies: ["Blender", "DaVinci Resolve",],
    details: "This project was a combination of real life and blender animation, using DaVinci Resole video editior to join the two together.",
    categories: ["3D Animation"]
  },
  {
    id: 6,
    title: "Encrypted Login System with backdoor",
    description: "A login system that is suposedly secure",
    media: {
      images: ["/pics/Wadiya/Wadiya1.PNG", "/pics/Wadiya/Wadiya2.PNG"],
    },
    github: "https://github.com/MarkCockerill12/VirusWadiya",
    technologies: ["Visual Studio Code", "C++"],
    details: `This project was a product of our University Information Security module, where we were tasked with making a login system with a backdoor that was incredibly difficult to crack if only looking at the code. <a href="/docs/backdoor_explanation.pdf" target="_blank" class="text-blue-500 hover:underline">View detailed explanation</a>`,    
    categories: ["Cyber Security", "C/C++/C#"]
},
  {
    id: 7,
    title: "This portfolio",
    description: "This very Portfolio, made with react and tailwind",
    media: {
      images: ["/pics/Portfolio/Port1.PNG", "/pics/Portfolio/Port2.PNG"],
    },
    github: "https://github.com/MarkCockerill12/Portfolio",
    technologies: ["Visual Studio Code", "React", "Next.js", "TypeScript", "Tailwind"],
    details: "This project was a product of our University Information Security module, where we were taked with making a login system with a backdoor that was incredibly difficult to crack if only looking at the code.",
    categories: ["Web",]
  },
  {
    id: 8,
    title: "Sonic Digital Drawing",
    description: "A drawing of Sonic, created on Krita",
    media: {
      images: ["/pics/Sonic/Sonic.png", "/pics/Sonic/SonicShow.png"],
    },
    technologies: ["Krita"],
    details: "A digital drawing of Sonic the Hedgehog racing alongside Metal Sonic, created on Krita.",
    categories: ["Digital Art"]
  },
  {
    id: 9,
    title: "Chat Bot and Server",
    description: "A chat Bot and Server that interact with HexChat",
    media: {
      images: ["/pics/HexChat/Hex1.PNG", "/pics/HexChat/Hex2.PNG"],
    },
    github: "https://github.com/MarkCockerill12/ChatBotLol",
    technologies: ["HexChat", "Python", "MiniIRC", "Visual Studio Code"],
    details: "A chat Bot and Server that interact with HexChat, the chat Bot responds to commands and user messages. The server attempts to repplicate a MiniIRC server.",
    categories: ["Python"]
  },
  {
    id: 10,
    title: "Shrimp",
    description: "Shrimp",
    media: {
      images: ["/pics/Shrimp/Shrimp.png", "/pics/Shrimp/ShrimpShow.png"],
    },
    technologies: ["C#", "Pure uncompromising genius", "Visual Studio"],
    details: "A shrimple program that asks if you are a shrimp or not.",
    categories: ["C/C++/C#", "Game"]
  },
]

const allCategories = Array.from(new Set(projects.flatMap(project => project.categories)))

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const filtered = projects.filter(project => 
      // Check if title matches search term
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      // Check if project has ALL selected categories (AND logic)
      (selectedCategories.length === 0 || 
        selectedCategories.every(cat => project.categories.includes(cat)))
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

  // ...rest of your code remains the same...

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

      <ScrollAnimation>
        <div className="mb-8 space-y-4">   
          <div className="flex gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center gap-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-700 ${
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
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
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
        <AnimatePresence mode="wait">
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
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}