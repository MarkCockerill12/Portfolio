'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import ScrollAnimation from '../components/ScrollAnimation'
import HoverText from '../components/HoverText'

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
        moduleGrade: 'TBC',
        description: 'Introduction to Agile practices.',
        projects: [
            {
                name: 'Agile Methodologies',
                grade: 'TBC',
                description: 'We were tasked by NCR Atleos to create a full-stack application using Agile methodologies. This application was a recreation of an ATM system.'
            },
        ]
    },
    {
        id: 'CS23005',
        name: 'Mobile Application Development',
        year: 3,
        semester: 2,
        moduleGrade: 'TBC',
        description: 'Introduction to mobile application development.',
        projects: [
            {
                name: 'Design Proposal',
                grade: 'TBC',
                description: 'Propose a mobile application idea and design. The application must use some form of mobile phone input sensor'
            },
            {
                name: 'MobileApp',
                grade: 'TBC',
                description: 'Build the application with full functionality and give demo of it'
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

export default function Qualifications() {
    return (
        <ScrollAnimation>
            <div className="container mx-auto px-4 py-8">
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
            </div>
        </ScrollAnimation>
    )
}