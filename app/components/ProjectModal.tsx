'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link';


interface Project {
  id: number;
  title: string;
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

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [isLarge, setIsLarge] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev === 0 ? (project.media.images?.length || 1) - 1 : prev - 1))
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev === (project.media.images?.length || 1) - 1 ? 0 : prev + 1))
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
  }, [project.media.images, onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>
          <div className={`relative ${isLarge || showVideo ? 'h-96' : 'h-64'} mb-4`}>
            {project.media.images && project.media.images.length > 0 && !showVideo && (
              <>
                <AnimatePresence initial={false} custom={currentImageIndex}>
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image 
                      src={project.media.images[currentImageIndex]} 
                      alt={`${project.title} - Image ${currentImageIndex + 1}`} 
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-lg" 
                    />
                  </motion.div>
                </AnimatePresence>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? project.media.images!.length - 1 : prev - 1))}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev === project.media.images!.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            {project.media.video && (
              <div className={`absolute inset-0 ${showVideo ? 'block' : 'hidden'}`}>
                <video 
                  src={project.media.video} 
                  controls 
                  className="w-full h-full object-cover rounded-lg"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            {project.media.video && project.media.images && (
              <button
                onClick={() => {
                  setShowVideo(!showVideo)
                  setIsLarge(showVideo)
                }}
                className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                {showVideo ? 'Show Images' : 'Show Video'}
              </button>
            )}
            {!showVideo && (
              <button
                onClick={() => setIsLarge(!isLarge)}
                className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                {isLarge ? 'Make Smaller' : 'Make Larger'}
              </button>
            )}
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Technologies Used:</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Project Details:</h3>
            <p 
              className="text-gray-600 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: project.details }}
            />
          </div>
          <div className="flex justify-between">
            {project.github && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
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
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Live Demo
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ProjectModal

