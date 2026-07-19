'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Pencil, Plus } from 'lucide-react'
import ScrollAnimation from '../components/ScrollAnimation'
import HoverText from '../components/HoverText'
import Image from 'next/image'
import CertificateModal from '../components/CertificateModal'
import EducationModal from '../components/EducationModal'
import ModuleModal from '../components/ModuleModal'
import { defaultPortfolioData } from '@/lib/default-portfolio'
import { Education, Module, Certificate } from '@/lib/types'

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

interface EducationCardProps {
  education: Education
  isAdmin: boolean
  onSelect: (edu: Education) => void
}

const EducationCard = ({ education, isAdmin, onSelect }: EducationCardProps) => {
  return (
    <motion.div
        onClick={() => onSelect(education)}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative border border-gray-100 dark:border-gray-700/50 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
    >
        <div className="absolute top-4 right-4 flex items-center gap-1.5">
          {isAdmin && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onSelect(education)
              }}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-gray-100 transition-all cursor-pointer"
              title="Edit Education"
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            <HoverText>{education.institution}</HoverText>
        </h3>
        <p className="text-gray-650 dark:text-gray-400 mb-2">{education.years}</p>
        {education.qualification && (
            <p className="text-gray-800 dark:text-gray-200 mb-1">
                {education.status}: {education.qualification}
            </p>
        )}
        {education.grade && (
            <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-gray-505 dark:text-gray-400">{education.grade.label}:</span>
                <GradeBadge grade={education.grade.achieved} />
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
}

interface ModuleCardProps {
  module: Module
  isAdmin: boolean
  onSelect: (mod: Module) => void
}

const ModuleCard = ({ module, isAdmin, onSelect }: ModuleCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
      <motion.div 
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6 border border-gray-100 dark:border-gray-750"
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
      >
          <div className="w-full p-6 flex justify-between items-center relative">
              <button 
                  className="flex flex-col items-start flex-grow text-left cursor-pointer"
                  onClick={() => onSelect(module)}
              >
                  <h3 className="text-xl font-bold">
                      <HoverText>{module.name}</HoverText>
                  </h3>
                  <p className="text-gray-650 dark:text-gray-400">
                      Year {module.year}, Semester {module.semester}
                  </p>
              </button>
              <div className="flex items-center space-x-4">
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => onSelect(module)}>
                      <span className="text-sm text-gray-550 dark:text-gray-400">Module Grade:</span>
                      <GradeBadge grade={module.moduleGrade} />
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => onSelect(module)}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-gray-100 transition-all cursor-pointer"
                      title="Edit Module Details"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  )}
                  <button 
                    className="cursor-pointer text-gray-500"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </button>
              </div>
          </div>

          <AnimatePresence>
              {isExpanded && (
                  <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 cursor-pointer"
                      onClick={() => onSelect(module)}
                  >
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                          <HoverText>{module.description}</HoverText>
                      </p>
                      {module.projects?.map((project, index) => (
                          <div key={`${module.id}-${index}`} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-2">
                              <div className="flex justify-between items-center mb-2">
                                  <h4 className="font-semibold">
                                      <HoverText>{project.name}</HoverText>
                                  </h4>
                                  <div className="flex items-center gap-2">
                                      <span className="text-sm text-gray-550 dark:text-gray-400">Project Grade:</span>
                                      <GradeBadge grade={project.grade} variant="blue" />
                                  </div>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-350">
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

const TabButton = ({ id, label, activeTab, setActiveTab, className = '' }: {
  id: string
  label: string
  activeTab: string
  setActiveTab: (id: any) => void
  className?: string
}) => (
  <motion.button
    className={`px-8 py-3 rounded-lg font-press-start-2p text-sm md:text-base cursor-pointer ${
      activeTab === id 
        ? 'bg-blue-900 text-white dark:bg-blue-950' 
        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    } ${className}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => setActiveTab(id)}
  >
    <HoverText>{label}</HoverText>
  </motion.button>
)

interface CertificatesSectionProps {
  certificates: Certificate[]
  isAdmin: boolean
  onSelect: (cert: Certificate) => void
}

const CertificatesSection = ({ certificates, isAdmin, onSelect }: CertificatesSectionProps) => (
  <div className="flex flex-col gap-12 max-w-4xl mx-auto py-8">
    {certificates.map((cert, idx) => (
      <motion.div
        key={cert.id}
        className={`flex flex-col md:flex-row items-center md:items-stretch gap-8 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''} bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-750`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: idx * 0.1 }}
      >
        <div className="flex-grow flex-1 flex flex-col justify-center min-w-[250px] cursor-pointer" onClick={() => onSelect(cert)}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-400">
              <HoverText>{cert.title}</HoverText>
            </h3>
            {isAdmin && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onSelect(cert)
                }}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 hover:text-gray-855 dark:hover:text-gray-100 cursor-pointer"
                title="Edit Certificate"
              >
                <Pencil className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="text-gray-755 dark:text-gray-200 text-lg leading-relaxed">{cert.description}</p>
        </div>
        <div className="flex-shrink-0 flex-1 flex items-center justify-center min-w-[320px] max-w-[500px] w-full">
          <div className="w-full aspect-[4/3] relative rounded-xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => onSelect(cert)}
          >
            <Image src={cert.image} alt={cert.title} fill className="object-contain bg-gray-50 dark:bg-gray-900" />
          </div>
        </div>
      </motion.div>
    ))}
  </div>
)

export default function Qualifications() {
  const [activeTab, setActiveTab] = useState<'modules' | 'certificates'>('modules')
  
  const [educationHistory, setEducationHistory] = useState<Education[]>(defaultPortfolioData.educationHistory)
  const [modules, setModules] = useState<Module[]>(defaultPortfolioData.modules)
  const [certificates, setCertificates] = useState<Certificate[]>(defaultPortfolioData.certificates)
  const [isAdmin, setIsAdmin] = useState(false)

  // Selected states for popup modals
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null)
  const [selectedEdu, setSelectedEdu] = useState<Education | null>(null)
  const [selectedMod, setSelectedMod] = useState<Module | null>(null)

  const loadData = async () => {
    try {
      const res = await fetch("/api/portfolio")
      if (res.ok) {
        const data = await res.json()
        if (data.educationHistory) setEducationHistory(data.educationHistory)
        if (data.modules) setModules(data.modules)
        if (data.certificates) setCertificates(data.certificates)
      }
    } catch (err) {
      console.error("Failed to load qualifications dynamic catalog:", err)
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

  // CRUD for Education History
  const handleUpdateEducation = async (updated: Education) => {
    try {
      const res = await fetch("/api/portfolio")
      if (!res.ok) return
      const data = await res.json()

      const exists = data.educationHistory.some((edu: Education) => edu.institution === updated.institution)
      if (exists) {
        data.educationHistory = data.educationHistory.map((edu: Education) =>
          edu.institution === updated.institution ? updated : edu
        )
      } else {
        data.educationHistory.push(updated)
      }

      const saveRes = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updatedData: data })
      })

      if (saveRes.ok) {
        setEducationHistory(data.educationHistory)
        setSelectedEdu(null)
        const confetti = (await import("canvas-confetti")).default
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } })
      }
    } catch (err) {
      console.error("Failed to update education details:", err)
    }
  }

  const handleDeleteEducation = async (institution: string) => {
    try {
      const res = await fetch("/api/portfolio")
      if (!res.ok) return
      const data = await res.json()

      data.educationHistory = data.educationHistory.filter((edu: Education) => edu.institution !== institution)

      const saveRes = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updatedData: data })
      })

      if (saveRes.ok) {
        setEducationHistory(data.educationHistory)
        setSelectedEdu(null)
      }
    } catch (err) {
      console.error("Failed to delete education history card:", err)
    }
  }

  const handleAddNewEducation = () => {
    const newEdu: Education = {
      institution: "New Institution",
      years: "Year - Year",
      qualification: "Degree / Course",
      status: "Achieved",
      grade: { label: "Grade Achieved", achieved: "1st" }
    }
    setSelectedEdu(newEdu)
  }

  // CRUD for University Modules
  const handleUpdateModule = async (updated: Module) => {
    try {
      const res = await fetch("/api/portfolio")
      if (!res.ok) return
      const data = await res.json()

      const exists = data.modules.some((m: Module) => m.id === updated.id)
      if (exists) {
        data.modules = data.modules.map((m: Module) =>
          m.id === updated.id ? updated : m
        )
      } else {
        data.modules.push(updated)
      }

      const saveRes = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updatedData: data })
      })

      if (saveRes.ok) {
        setModules(data.modules)
        setSelectedMod(null)
        const confetti = (await import("canvas-confetti")).default
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } })
      }
    } catch (err) {
      console.error("Failed to update module details:", err)
    }
  }

  const handleDeleteModule = async (id: string) => {
    try {
      const res = await fetch("/api/portfolio")
      if (!res.ok) return
      const data = await res.json()

      data.modules = data.modules.filter((m: Module) => m.id !== id)

      const saveRes = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updatedData: data })
      })

      if (saveRes.ok) {
        setModules(data.modules)
        setSelectedMod(null)
      }
    } catch (err) {
      console.error("Failed to delete module:", err)
    }
  }

  const handleAddNewModule = () => {
    const newMod: Module = {
      id: `mod-${Date.now()}`,
      name: "New Module",
      year: 4,
      semester: 1,
      moduleGrade: "Grade",
      description: "Enter module details description."
    }
    setSelectedMod(newMod)
  }

  // CRUD for Certificates
  const handleCertificateUpdated = async (updated: Certificate) => {
    try {
      const res = await fetch("/api/portfolio")
      if (!res.ok) return
      const data = await res.json()

      const exists = data.certificates.some((c: Certificate) => c.id === updated.id)
      if (exists) {
        data.certificates = data.certificates.map((cert: Certificate) =>
          cert.id === updated.id ? updated : cert
        )
      } else {
        data.certificates.push(updated)
      }

      const saveRes = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updatedData: data })
      })

      if (saveRes.ok) {
        setCertificates(data.certificates)
        setSelectedCert(null)
        const confetti = (await import("canvas-confetti")).default
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } })
      }
    } catch (err) {
      console.error("Failed to save certificate updates:", err)
    }
  }

  const handleCertificateDeleted = async (id: string) => {
    try {
      const res = await fetch("/api/portfolio")
      if (!res.ok) return
      const data = await res.json()

      data.certificates = data.certificates.filter((cert: Certificate) => cert.id !== id)

      const saveRes = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updatedData: data })
      })

      if (saveRes.ok) {
        setCertificates(data.certificates)
        setSelectedCert(null)
      }
    } catch (err) {
      console.error("Failed to delete certificate:", err)
    }
  }

  const handleAddNewCertificate = () => {
    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      title: "New Certificate",
      description: "Description of your new certificate.",
      image: "https://pub-699441ce0cfb40449cc458823a3f1ed2.r2.dev/portfolio/media/placeholder.webp"
    }
    setSelectedCert(newCert)
  }

  return (
    <ScrollAnimation>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-10 mt-2 border-b border-gray-200 dark:border-gray-700/50 pb-4 max-w-5xl mx-auto">
          <div className="flex gap-4">
            <TabButton id="modules" label="University Modules" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabButton id="certificates" label="Certificates" activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          {isAdmin && activeTab === 'certificates' && (
            <button
              onClick={handleAddNewCertificate}
              className="bg-green-500 hover:bg-green-600 active:scale-95 transition-all text-white font-semibold px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 text-sm shadow-md"
            >
              <Plus className="w-4 h-4" /> Add Certificate
            </button>
          )}
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
              <div className="flex justify-between items-center mb-8 max-w-4xl mx-auto border-b border-gray-200 dark:border-gray-750 pb-3">
                <motion.h1 
                  className="text-3xl font-bold font-press-start-2p"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <HoverText>Academic Qualifications</HoverText>
                </motion.h1>
                {isAdmin && (
                  <button
                    onClick={handleAddNewEducation}
                    className="bg-green-500 hover:bg-green-600 active:scale-95 transition-all text-white font-semibold px-3 py-1.5 rounded-lg cursor-pointer flex items-center gap-1.5 text-xs shadow"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Education
                  </button>
                )}
              </div>
              <div className="grid gap-6 max-w-4xl mx-auto mb-12">
                {educationHistory.map((edu) => (
                  <EducationCard 
                    key={edu.institution} 
                    education={edu} 
                    isAdmin={isAdmin} 
                    onSelect={(item) => setSelectedEdu(item)}
                  />
                ))}
              </div>
              
              <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto border-b border-gray-200 dark:border-gray-750 pb-3">
                <motion.h2 
                  className="text-2xl font-bold font-press-start-2p"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <HoverText>University Modules</HoverText>
                </motion.h2>
                {isAdmin && (
                  <button
                    onClick={handleAddNewModule}
                    className="bg-green-500 hover:bg-green-600 active:scale-95 transition-all text-white font-semibold px-3 py-1.5 rounded-lg cursor-pointer flex items-center gap-1.5 text-xs shadow"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Module
                  </button>
                )}
              </div>
              <div className="grid gap-6 max-w-4xl mx-auto">
                {Array.from(new Set(modules.map(m => m.year))).sort((a, b) => b - a).map((year) => (
                  <div key={year} className="mb-4">
                    <h3 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-400 border-b-2 border-blue-100 dark:border-blue-900 pb-2">
                      Year {year}
                    </h3>
                    {[1, 2].map((semester) => {
                      const yearSemesterModules = modules.filter(module => module.year === year && module.semester === semester);
                      if (yearSemesterModules.length === 0) return null;
                      
                      return (
                        <div key={semester} className="mb-8 last:mb-0">
                          <h4 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            Semester {semester}
                          </h4>
                          <div className="space-y-4">
                            {yearSemesterModules.map((module) => (
                              <ModuleCard 
                                key={module.id} 
                                module={module} 
                                isAdmin={isAdmin} 
                                onSelect={(item) => setSelectedMod(item)}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
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
                <CertificatesSection certificates={certificates} isAdmin={isAdmin} onSelect={(cert) => setSelectedCert(cert)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Certificate Modal */}
        <AnimatePresence>
          {selectedCert && (
            <CertificateModal 
              certificate={selectedCert} 
              isAdmin={isAdmin} 
              onCertificateUpdated={handleCertificateUpdated} 
              onCertificateDeleted={handleCertificateDeleted}
              onClose={() => setSelectedCert(null)} 
            />
          )}
        </AnimatePresence>

        {/* Education Modal */}
        <AnimatePresence>
          {selectedEdu && (
            <EducationModal
              education={selectedEdu}
              isAdmin={isAdmin}
              onUpdate={handleUpdateEducation}
              onDelete={handleDeleteEducation}
              onClose={() => setSelectedEdu(null)}
            />
          )}
        </AnimatePresence>

        {/* Module Modal */}
        <AnimatePresence>
          {selectedMod && (
            <ModuleModal
              module={selectedMod}
              isAdmin={isAdmin}
              onUpdate={handleUpdateModule}
              onDelete={handleDeleteModule}
              onClose={() => setSelectedMod(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </ScrollAnimation>
  )
}