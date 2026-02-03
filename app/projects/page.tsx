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

const BASE_URL = "https://pub-699441ce0cfb40449cc458823a3f1ed2.r2.dev/portfolio"

const projects: Project[] = [
    { 
    id: 15,
    title: "DevOps- Conference Booking System",
    description: "A conference booking system with full DevOps implementation",
    media: {
      images: [`${BASE_URL}/media/DevOps/DevOps.webp`, `${BASE_URL}/media/DevOps/DevOps1.webp`, `${BASE_URL}/media/DevOps/DevOps2.webp`, `${BASE_URL}/media/DevOps/DevOps3.webp`, `${BASE_URL}/media/DevOps/DevOps4.webp`, `${BASE_URL}/media/DevOps/DevOps5.webp`, `${BASE_URL}/media/DevOps/DevOps6.webp`,  `${BASE_URL}/media/DevOps/DevOps7.webp`, `${BASE_URL}/media/DevOps/DevOps8.webp`, `${BASE_URL}/media/DevOps/DevOps9.webp`, `${BASE_URL}/media/DevOps/DevOps10.webp`, `${BASE_URL}/media/DevOps/DevOps11.webp`, `${BASE_URL}/media/DevOps/DevOps12.webp`, `${BASE_URL}/media/DevOps/DevOps13.webp`],
      video: `${BASE_URL}/media/DevOps/DevOps14.webm`,
    },
    github: "https://github.com/MarkCockerill12/Booking-System",
    technologies: ["Visual Stdio Code", "React", "TypeScript", "Next.js", "AWS", "Vercel"],
    details: "This project was created to showcase different DevOps practices, such as CI/CD, Infrastructure as Code and Automated Testing. The conference booking system allows users to create accounts, book and manage their bookings for different conferences. The frontend is hosted on Vercel and the backend is hosted on AWS. It makes use of multiple different AWS services such as Lambda, API Gateway, DynamoDB and S3. ",
    categories: ["Web"]
  },
  { 
    id: 14,
    title: "LoFi Web",
    description: "A website that plays LoFi music with visuals to help with focus, studying and relaxation",
    media: {
      images: [`${BASE_URL}/media/Lofi/Lofi1.webp`, `${BASE_URL}/media/Lofi/Lofi2.webp`, `${BASE_URL}/media/Lofi/Lofi3.webp`, `${BASE_URL}/media/ChrisLofi/Lofi4.webp`, `${BASE_URL}/media/ChrisLofi/Lofi5.webp`],
    },
    github: "https://github.com/MarkCockerill12/LofiWeb",
    technologies: ["Visual Stdio Code", "React", "TypeScript", "Next.js", "Cloudflare R2", "Vercel"],
    demo: "https://lofiweb.vercel.app/",
    details: "This website was designed to help with studying and calming down. It displays a looping background with music, users can choose between different visuals, sound overlays, colours and songs to best fit their needs. The songs and videos are hosted on Cloudflare's R2 and the frontend is hosted on Vercel.",
    categories: ["Web"]
  },
  { 
    id: 13,
    title: "CrossExamination- Christian Apologetics Website",
    description: "A website that showcases different sources, facts and arguments regarding Christianity",
    media: {
      images: [`${BASE_URL}/media/Chris/ChristianWeb1.webp`, `${BASE_URL}/media/Chris/ChristianWeb2.webp`, `${BASE_URL}/media/Chris/ChristianWeb3.webp`, `${BASE_URL}/media/Chris/ChristianWeb4.webp`],
    },
    github: "https://github.com/MarkCockerill12/ChristianWeb",
    technologies: ["Visual Stdio Code", "React", "TypeScript", "Next.js", "Vercel"],
    demo: "https://crossexamination.vercel.app/",
    details: "This website goes into depth regarding multiple aspects of both Christianity and other religions. It tackles numerous topics and arguments, such as the problem of Evil in the world, Historical/Archaeological reliability and Science vs Religion. It explores these meticulously, quoting sources and conveying information in an easy to understand way. The website includes a homepage, biblical timeline, topics page, personal story and resources page. The frontend is hosted on Vercel.",
    categories: ["Web"]
  },
  { 
    id: 12,
    title: "Investment Platform Project- University module sponsored by BarClays",
    description: "An all in one investment platform for both investors and pitch founders",
    media: {
      images: [`${BASE_URL}/media/Invest/Invest1.webp`, `${BASE_URL}/media/Invest/Invest2.webp`, `${BASE_URL}/media/Invest/Invest3.webp`, `${BASE_URL}/media/Invest/Invest4.webp`, `${BASE_URL}/media/Invest/Invest5.webp`, `${BASE_URL}/media/Invest/Invest6.webp`, `${BASE_URL}/media/Invest/Invest7.webp`, `${BASE_URL}/media/Invest/Invest8.webp`, `${BASE_URL}/media/Invest/Invest9.webp`, `${BASE_URL}/media/Invest/Invest10.webp`],
      video: `${BASE_URL}/media/Invest/DEMO.webm`,
    },
    technologies: ["Visual Stdio Code", "React", "TypeScript", "Next.js", "Docker", "MongoDB", "Google Cloud", ],
    details: "This project covers different aspects of a investment platform, covering the Frontend, Backend, BankAPI as well as MongoDB database. We created an intuitive and acessible website that allows users to create, browse and invest in different pitches. It handles transactions through a seperate secure API and hsa a working notification system. The website takes fees from transactions in order to keep itself funded. The website securely holds user data and contains an online wallet, similar to how other platforms work. My team took inspirations from other apps and websites such as 212 Trading, Plus500, CrowdCube and KickStarter. Learning from their features, user feedback and design philosphies.",
    categories: ["Web"]
  },
  { 
    id: 11,
    title: "ATM Simulation- University module sponsored by NCR",
    description: "An application that acts as a mock ATM for NCR",
    media: {
      images: [`${BASE_URL}/media/Agile/Agile2.webp`, `${BASE_URL}/media/Agile/Agile3.webp`, `${BASE_URL}/media/Agile/Agile4.webp`, `${BASE_URL}/media/Agile/Agile5.webp`, `${BASE_URL}/media/Agile/Agile6.webp`, `${BASE_URL}/media/Agile/Agile7.webp`, `${BASE_URL}/media/Agile/Agile8.webp`, `${BASE_URL}/media/Agile/Agile1.webp`, `${BASE_URL}/media/Agile/Agile9.webp`],
    },
    github: "https://github.com/MarkCockerill12/AC31007AgileGroup1",
    technologies: ["Visual Stdio Code", "MySQL", "Go", "Amazon Web Services", "Docker", "React", "Electron", "Next.js", "Python", "Agile Methodologies"],
    details: "This mock ATM program was our task issues by NCR for learning agile methodologies, it utilises electron to showcase the front end, which handles the visual aspects. The front end then communciates with a Go-coded switch by sending JSON, the switch sorts out the different card numbers and sends them to a seperate simulation which in turn interacts with information in a database. This program is capable of multi currency support, multiple langauges and has error handling. ",
    categories: ["Web", "SQL"]
  },
  {
    id: 10,
    title: "SQL Company Website",
    description: "A website that interacts with a database in form of SQL",
    media: {
      images: [`${BASE_URL}/media/SteelSummit/Steel1.webp`, `${BASE_URL}/media/SteelSummit/Steel2.webp`, `${BASE_URL}/media/SteelSummit/Steel3.webp`, `${BASE_URL}/media/SteelSummit/Steel4.webp`, `${BASE_URL}/media/SteelSummit/Steel5.webp`, `${BASE_URL}/media/SteelSummit/Steel6.webp`, `${BASE_URL}/media/SteelSummit/Steel7.webp`, `${BASE_URL}/media/SteelSummit/Steel8.webp`],
    },
    github: "https://github.com/MarkCockerill12/DataAWS",
    technologies: ["Visual Stdio Code", "MySQL", "PHP", "Amazon Web Services", "Docker"],
    details: "This mock company website interacts with a database with SQL and php in order to execute queries. It has predfined functions, an SQL builder and more. It has a functional php-sql login system. This was a university assignment and was hosted on amazon web servers, however for the testing and development, docker was used to set up local servers in order for them to interact. Our next steps with this website would be to touch up some of the visual aspects of it.",
    categories: ["SQL", "Web"]
  },
  
  {
    id: 9,
    title: "Visual Novel Addon",
    description: "A simple addon to Visual Novel 'Doki Doki Literature Club' by Team Salvato",
    media: {
      images: [`${BASE_URL}/media/Doki/DokiDev.webp`, `${BASE_URL}/media/Doki/DokiGame.webp`],
    },
    technologies: ["RenPy", "PicsArt", "Visual Stdio Code"],
    details: "A simple addon to Visual Novel 'Doki Doki Literature Club' by Team Salvato. This project was made for fun and the desire to experience the RenPy coding language.",
    categories: ["Game"]
  },
  {
    id: 8,
    title: "NextGen ATM Website",
    description: "A website that expands upon the possilities of ATMs, sponsored by NCR for 2025 Dundee Hackathon",
    media: {
      images: [`${BASE_URL}/media/Hak-ATM/atm1.webp`, `${BASE_URL}/media/Hak-ATM/atm2.webp`, `${BASE_URL}/media/Hak-ATM/atm3.webp`, `${BASE_URL}/media/Hak-ATM/atm4.webp`],
    },
    github: "https://github.com/MarkCockerill12/Hak25--NCR",
    technologies: ["Visual Stdio Code", "React", "Next.js", "Vercel"],
    demo: "https://hak25-ncr.vercel.app",
    details: "This mock ATM website was one of the projects my team took on during the 2025 Dundee Uni Hackaton. Our task was to create an ATM that would represent the future, and all the new functionalities that come with it. I decided to create an all-in-one type website, where you can manage your finances, stocks, bills and more with just a few clicks, as well as giving you a visual representation of all of these. Since the hackathon took place over 24 hours, some functionalites such as different langauges arent available. The website uses local storage to remember any additions you make to your bank account, whether it be adding money, cards or stocks. The frontend is hosted on Vercel.",
    categories: ["Web", "SQL"]
  },
  {
    id: 7,
    title: "Raspbery Pi Pico Web Texter",
    description: "A program that uses Twilio and a Raspberry Pi Pico W to send text messages",
    media: {
      images: [`${BASE_URL}/media/Twilio/Twi1.webp`, `${BASE_URL}/media/Twilio/Twi2.webp`],
    },
    technologies: ["RenPy", "PicsArt", "Visual Stdio Code"],
    details: "The Raspbery Pi W hosts a web server which allows the user to input text, the program then uses the Twilio API to send text messages through the pico.",
    categories: ["Python", "Raspbery Pi"]
  },
  {
    id: 6,
    title: "3D Animation- Penthouse",
    description: "An animation of my room becoming a penthouse suite",
    media: {
      images: [`${BASE_URL}/media/3D/Penthouse/Penthouse.webp`],
      video: `${BASE_URL}/media/3D/Penthouse/PenthouseVid.webm`,
    },
    technologies: ["Blender", "DaVinci Resolve",],
    details: "This project was a combination of real life and blender animation, using DaVinci Resole video editior to join the two together.",
    categories: ["3D Animation"]
  },
  {
    id: 5,
    title: "Encrypted Login System with backdoor",
    description: "A login system that is suposedly secure",
    media: {
      images: [`${BASE_URL}/media/Wadiya/Wadiya1.webp`, `${BASE_URL}/media/Wadiya/Wadiya2.webp`],
    },
    github: "https://github.com/MarkCockerill12/VirusWadiya",
    technologies: ["Visual Studio Code", "C++"],
    details: `This project was a product of our University Information Security module, where we were tasked with making a login system with a backdoor that was incredibly difficult to crack if only looking at the code. <a href="/docs/backdoor_explanation.pdf" target="_blank" class="text-blue-500 hover:underline">View detailed explanation</a>`,    
    categories: ["Cyber Security", "C/C++/C#"]
},
  {
    id: 4,
    title: "This portfolio",
    description: "This very Portfolio, made with react and tailwind",
    media: {
      images: [`${BASE_URL}/media/Portfolio/Port1.webp`, `${BASE_URL}/media/Portfolio/Port2.webp`],
    },
    github: "https://github.com/MarkCockerill12/Portfolio",
    demo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    technologies: ["Visual Studio Code", "React", "Next.js", "TypeScript", "Tailwind", "Vercel", "Cloudflare R2"],
    details: "This project was a product of our University Information Security module, where we were taked with making a login system with a backdoor that was incredibly difficult to crack if only looking at the code. The medie is hosted on Cloudflare's R2 and the frontend is hosted on Vercel.",
    categories: ["Web",]
  },
  {
    id: 3,
    title: "Sonic Digital Drawing",
    description: "A drawing of Sonic, created on Krita",
    media: {
      images: [`${BASE_URL}/media/Sonic/Sonic.webp`, `${BASE_URL}/media/Sonic/SonicShow.webp`],
    },
    technologies: ["Krita"],
    details: "A digital drawing of Sonic the Hedgehog racing alongside Metal Sonic, created on Krita.",
    categories: ["Digital Art"]
  },
  {
    id: 2,
    title: "Chat Bot and Server",
    description: "A chat Bot and Server that interact with HexChat",
    media: {
      images: [`${BASE_URL}/media/HexChat/Hex1.webp`, `${BASE_URL}/media/HexChat/Hex2.webp`],
    },
    github: "https://github.com/MarkCockerill12/ChatBotLol",
    technologies: ["HexChat", "Python", "MiniIRC", "Visual Studio Code"],
    details: "A chat Bot and Server that interact with HexChat, the chat Bot responds to commands and user messages. The server attempts to repplicate a MiniIRC server.",
    categories: ["Python"]
  },
  {
    id: 1,
    title: "Shrimp",
    description: "Shrimp",
    media: {
      images: [`${BASE_URL}/media/Shrimp/Shrimp.webp`, `${BASE_URL}/media/Shrimp/ShrimpShow.webp`],
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
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}