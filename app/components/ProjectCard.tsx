import Image from 'next/image'
import { Github, ExternalLink } from 'lucide-react'
import React from 'react'

interface Project {
  id: number
  title: string
  description: string
  image: string
  github: string
  technologies: string[]
}

interface ProjectCardProps {
  project: Project
  onSelect: () => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer" onClick={onSelect}>
      <Image src={project.image} alt={project.title} width={400} height={200} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs font-semibold px-2.5 py-0.5 rounded">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-between">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-500 hover:text-blue-600" onClick={(e) => e.stopPropagation()}>
            <Github className="w-5 h-5 mr-1" />
            GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard

