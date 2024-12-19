import Image from 'next/image'
import { X } from 'lucide-react'
import React from 'react'

interface Project {
  id: number
  title: string
  description: string
  image: string
  github: string
  technologies: string[]
  details: string
}

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <X className="w-6 h-6" />
            </button>
          </div>
          <Image src={project.image} alt={project.title} width={800} height={400} className="w-full h-64 object-cover rounded-lg mb-4" />
          <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
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
            <p className="text-gray-600 dark:text-gray-300">{project.details}</p>
          </div>
          <div className="flex justify-between">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal

