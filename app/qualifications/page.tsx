'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import ScrollAnimation from '../components/ScrollAnimation'
import HoverText from '../components/HoverText'
import Image from 'next/image'
import CertificateModal from '../components/CertificateModal'

const educationHistory = [
    {
        institution: "Dundee University",
        years: "2022 - Present",
        qualification: "Bachelor of Science with Honours - Computing Science (BSc)",
        status: "Expected",
        grade: {
            prediction: "2:1",
            label: "Predicted Grade"
        }
    },
    {
        institution: "Largs Academy",
        years: "2016 - 2022",
        qualifications: [
            { subject: "Mathematics", level: "Higher", grade: "A" },
            { subject: "Graphic Communications", level: "Higher", grade: "B" },
            { subject: "English", level: "Higher", grade: "B" },
            { subject: "Computing Science", level: "Higher", grade: "B" },
            { subject: "Physics", level: "Higher", grade: "C" },
            { subject: "Chemistry", level: "Higher", grade: "C" }
        ]
    }
]

const modules = [ 
    {
        id: 'AC31007',
        name: 'Agile Software Engineering',
        year: 3,
        semester: 2,
        moduleGrade: 'B1 / 2:1',
        description: 'Introduction to Agile practices. We were tasked by NCR Atleos to create a full-stack application using Agile methodologies. This application was a recreation of an ATM system.',
        projects: [
            {
                name: 'Agile Methodologies Sprint/Week 1',
                grade: 'B2 / 2:1',
                description: 'Week one was spent building the foundations of the Front End and Back End. This consisting of a webpage, switch and database.'
            },
            {
                name: 'Agile Methodologies Sprint/Week 2',
                grade: 'B1 / 2:1',
                description: 'Week two was spent implementing further features and confirming everything was set up and working well together.'
            }
        ]
    },
    {
        id: 'CS23005',
        name: 'Mobile Application Development',
        year: 3,
        semester: 2,
        moduleGrade: '	A4 / 1st',
        description: 'Introduction to mobile application development. I used React Native to create a Bus App using the Google Maps API.',
        projects: [
            {
                name: 'Design Proposal',
                grade: 'A2 / 1st',
                description: 'Propose a mobile application idea and design. The application had to use some form of mobile phone input sensor.'
            },
            {
                name: 'Mobile App Creation',
                grade: 'A5 / 1st',
                description: 'Build the application with full functionality and give demo of it.'
            }
        ]
    },
    {
        id: 'AC31008',
        name: 'Networks',
        year: 3,
        semester: 1,
        moduleGrade: 'B3 / 2:1',
        description: 'Introduction to computer networks and network programming.',
        projects: [
            {
                name: 'Network Programming',
                grade: 'A5 / 1st',
                description: 'Created a client-server application implementing TCP/IP protocols as well as a bot to interact with it. This utilises HexChat.'
            },
            {
                name: 'Network Simulation',
                grade: 'A4 / 1st',
                description: 'Configured and simulated a network using Cisco Packet Tracer.'
            }
        ]
    },
    {
        id: 'AC31012',
        name: 'Information Security',
        year: 3,
        semester: 1,
        moduleGrade: 'A5 / 1st',
        description: 'Introduction to information security and cryptography.',
        projects: [
            {
                name: 'Applied Cryptography',
                grade: 'A3 / 1st',
                description: 'Created a login program with a backdoor that requires careful examining of the code as well as decryption and brute forcing to bypass.'
            },
            {
                name: 'Ethical Hacking',
                grade: 'A2 / 1st',
                description: 'The task was to attempt to crack other students login problems and take advantage of their vulnerabilities.'
            }
        ]
    },
    {
        id: 'AC32006',
        name: 'Database Systems',
        year: 3,
        semester: 1,
        moduleGrade: 'B2 / 2:1',
        description: 'Database design, implementation and management.',
        projects: [
            {
                name: 'Database Design',
                grade: 'B1 / 2:1',
                description: 'Designed and created a specification, entitiy-relationship diagram and SQL statments for a database system and company.'
            },
            {
                name: 'Database Implementation',
                grade: 'B2 / 2:1',
                description: 'Built a full-stack application with database integration utiling HTML, SQL and PHP.'
            }
        ]
    }
]

const certificates = [
  {
    id: 'cert1',
    title: 'Cyber Security Vulnerability Certificate',
    description: 'Using Hacksplain, I completed a series of lessons and tests educating on the different types of security vulnerabilites and how to prevent them from occuring.',
    image: '/pics/Certificates/hacksplain.PNG',
  },
//   {
//     id: 'cert2',
//     title: 'Cisco CCNA',
//     description: 'Validates ability to install, configure, operate, and troubleshoot medium-size routed and switched networks.',
//     image: '/pics/Portfolio/Port2.PNG',
//   },
]

const GradeBadge = ({ grade, size = "normal", variant = "green" }: { 
    grade: string, 
    size?: "small" | "normal",
    variant?: "green" | "blue"
}) => (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
        variant === "blue" 
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100'
            : 'bg-gray-100 dark:bg-green-900 text-green-800 dark:text-gray-100'
    } ${size === "small" ? "text-xs" : "text-sm"}`}>
        {grade}
    </span>
)

const EducationCard = ({ education }: { education: typeof educationHistory[0] }) => (
    <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
    >
        <h3 className="text-xl font-bold mb-2">
            <HoverText>{education.institution}</HoverText>
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-2">{education.years}</p>
        {education.qualification && (
            <p className="text-gray-800 dark:text-gray-200 mb-1">
                {education.status}: {education.qualification}
            </p>
        )}
        {education.grade && (
            <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">{education.grade.label}:</span>
                <GradeBadge grade={education.grade.prediction} />
            </div>
        )}
        {education.qualifications && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {education.qualifications.map((qual) => (
                    <div key={`${qual.subject}-${qual.level}`} className="flex justify-between items-center">
                        <span className="text-gray-700 dark:text-gray-300">
                            {qual.level} {qual.subject}:
                        </span>
                        <GradeBadge grade={qual.grade} size="small" />
                    </div>
                ))}
            </div>
        )}
    </motion.div>
)

const ModuleCard = ({ module }: { module: typeof modules[0] }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6"
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <button 
                className="w-full p-6 flex justify-between items-center"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex flex-col items-start">
                    <h3 className="text-xl font-bold">
                        <HoverText>{module.name}</HoverText>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Year {module.year}, Semester {module.semester}
                    </p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Module Grade:</span>
                        <GradeBadge grade={module.moduleGrade} />
                    </div>
                    {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                    >
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            <HoverText>{module.description}</HoverText>
                        </p>
                        {module.projects.map((project, index) => (
                            <div key={`${module.id}-${index}`} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-2">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-semibold">
                                        <HoverText>{project.name}</HoverText>
                                    </h4>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Project Grade:</span>
                                        <GradeBadge grade={project.grade} variant="blue" />
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    <HoverText>{project.description}</HoverText>
                                </p>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

const TabButton = ({ id, label, activeTab, setActiveTab, className = '' }) => (
  <motion.button
    className={`px-8 py-3 rounded-lg font-press-start-2p text-sm md:text-base ${
      activeTab === id 
        ? 'bg-blue-900 text-white' 
        : 'bg-gray-200 dark:bg-gray-700'
    } ${className}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => setActiveTab(id)}
  >
    <HoverText>{label}</HoverText>
  </motion.button>
)

const CertificatesSection = ({ setModalImg }) => (
  <div className="flex flex-col gap-12 max-w-4xl mx-auto py-8">
    {certificates.map((cert, idx) => (
      <motion.div
        key={cert.id}
        className={`flex flex-col md:flex-row items-center md:items-stretch gap-8 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''} bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: idx * 0.1 }}
      >
        <div className="flex-1 flex flex-col justify-center min-w-[250px]">
          <h3 className="text-3xl font-bold mb-4 text-blue-700 dark:text-blue-400"><HoverText>{cert.title}</HoverText></h3>
          <p className="text-gray-700 dark:text-gray-200 text-lg mb-2">{cert.description}</p>
        </div>
        <div className="flex-1 flex items-center justify-center min-w-[350px] max-w-[600px] w-full">
          <div className="w-full aspect-[4/3] relative rounded-xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => setModalImg({image: cert.image, title: cert.title})}
          >
            <Image src={cert.image} alt={cert.title} fill className="object-contain" />
          </div>
        </div>
      </motion.div>
    ))}
  </div>
)

export default function Qualifications() {
  const [activeTab, setActiveTab] = useState<'modules' | 'certificates'>('modules')
  const [modalImg, setModalImg] = useState<{image: string, title: string} | null>(null)
  return (
    <ScrollAnimation>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-4 mb-10 mt-2">
          <TabButton id="modules" label="University Modules" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabButton id="certificates" label="Certificates" activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <AnimatePresence mode="wait">
          {activeTab === 'modules' && (
            <motion.div
              key="modules"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h1 
                className="text-4xl font-bold mb-8 text-center font-press-start-2p"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <HoverText>Academic Qualifications</HoverText>
              </motion.h1>
              <div className="grid gap-6 max-w-4xl mx-auto mb-12">
                {educationHistory.map((edu, index) => (
                  <EducationCard key={edu.institution} education={edu} />
                ))}
              </div>
              <motion.h2 
                className="text-2xl font-bold mb-6 text-center font-press-start-2p"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <HoverText>University Modules</HoverText>
              </motion.h2>
              <div className="grid gap-6 max-w-4xl mx-auto">
                {[1, 2].map((semester) => (
                  <div key={semester}>
                    <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
                      Semester {semester}
                    </h3>
                    {modules
                      .filter(module => module.semester === semester)
                      .map((module) => (
                        <ModuleCard key={module.id} module={module} />
                      ))}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {activeTab === 'certificates' && (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-16 max-w-5xl mx-auto py-8">
                <CertificatesSection setModalImg={setModalImg} />
              </div>
              {modalImg && (
                <CertificateModal image={modalImg.image} title={modalImg.title} onClose={() => setModalImg(null)} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollAnimation>
  )
}