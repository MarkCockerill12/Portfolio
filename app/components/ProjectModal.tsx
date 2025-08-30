'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Film, Image as ImageIcon, Github, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Project {
  id: number
  title: string
  media: {
    images?: string[]
    video?: string
  }
  github?: string
  demo?: string
  technologies: string[]
  details: string
  categories: string[]
}

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [isLarge, setIsLarge] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Sound playing functions
  const playSound = (frequency: number, duration: number = 200) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = frequency
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration / 1000)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + duration / 1000)
  }

  const handleGreenButton = () => {
    playSound(800, 150) // Higher pitched sound for green
    setIsLarge(!isLarge) // Maximize/minimize functionality
  }

  const handleYellowButton = () => {
    playSound(400, 200) // Lower pitched sound for yellow
    // You can add minimize to taskbar functionality here if desired
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && !showVideo) {
        setCurrentImageIndex(prev => 
          prev === 0 ? (project.media.images?.length || 1) - 1 : prev - 1
        )
      }
      if (e.key === 'ArrowRight' && !showVideo) {
        setCurrentImageIndex(prev => 
          prev === (project.media.images?.length || 1) - 1 ? 0 : prev + 1
        )
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [project.media.images, onClose, showVideo])

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
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl ${
          isLarge ? 'max-w-7xl w-[95vw]' : 'max-w-5xl w-full'
        } max-h-[90vh] overflow-hidden`}
      >
        {/* Window Controls Header */}
        <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Red Button - Close */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-3 h-3 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center group"
                aria-label="Close"
              >
                <X className="w-2 h-2 text-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
              
              {/* Yellow Button - Minimize */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleYellowButton}
                className="w-3 h-3 bg-yellow-500 hover:bg-yellow-600 rounded-full flex items-center justify-center group"
                aria-label="Minimize"
              >
                <div className="w-2 h-0.5 bg-yellow-800 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
              
              {/* Green Button - Maximize/Restore */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleGreenButton}
                className="w-3 h-3 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center group"
                aria-label={isLarge ? "Restore" : "Maximize"}
              >
                <div className="w-1.5 h-1.5 border border-green-800 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </div>
            
            {/* Window Title */}
            <div className="absolute left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-600 dark:text-gray-300">
              {project.title}
            </div>
            
            <div className="w-16"></div> {/* Spacer for balance */}
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-60px)]">

          <div className={`relative ${isLarge ? 'h-[75vh]' : 'h-[50vh]'} mb-4 rounded-lg overflow-hidden bg-white dark:bg-gray-800`}>
            {project.media.images && project.media.images.length > 0 && !showVideo && (
              <>
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image 
                      src={project.media.images[currentImageIndex]} 
                      alt={`${project.title} - Image ${currentImageIndex + 1}`} 
                      fill
                      className="object-contain"
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      priority
                    />
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full">
                      {currentImageIndex + 1} / {project.media.images.length}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {project.media.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentImageIndex(prev => 
                          prev === 0 ? project.media.images.length - 1 : prev - 1
                        )
                      }}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-all"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentImageIndex(prev => 
                          prev === project.media.images.length - 1 ? 0 : prev + 1
                        )
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-all"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </>
            )}

            {project.media.video && (
              <div className={`w-full h-full ${showVideo ? 'block' : 'hidden'}`}>
                <video 
                  src={project.media.video} 
                  controls 
                  className="w-full h-full object-contain"
                  playsInline
                >
                  <track 
                    kind="captions" 
                    srcLang="en" 
                    src="/path/to/captions.vtt" 
                    label="English"
                    default 
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            <div className="absolute top-4 right-4 flex gap-2">
              {project.media.video && project.media.images && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowVideo(!showVideo)
                  }}
                  className="bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-all flex items-center gap-2"
                >
                  {showVideo ? <ImageIcon className="w-5 h-5" /> : <Film className="w-5 h-5" />}
                  {showVideo ? 'View Images' : 'Play Video'}
                </motion.button>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Technologies Used:</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={tech} 
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 
                             text-xs font-semibold px-2.5 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Project Details:</h3>
              <div 
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: project.details }}
              />
            </div>

            <div className="flex gap-4 justify-end">
              {project.github && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                           px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 
                           transition-colors"
                >
                  <Github className="w-5 h-5" />
                  View on GitHub
                </motion.a>
              )}
              {project.demo && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg 
                           hover:bg-blue-600 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  Live Demo
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ProjectModal