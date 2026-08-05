import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { GitHubMark } from './BrandIcons'
import { Project } from '@/lib/types'

interface ProjectCardProps {
  project: Project
  onSelect: () => void
  /** Eager-loads the thumbnail. Only worth it for cards above the fold. */
  priority?: boolean
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, priority = false }) => {
  return (
    <button 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer w-full" 
      onClick={onSelect} 
    >
      <div className="relative w-full h-48">
        {project.media.images?.length ? (
          <Image 
            src={project.media.images[0]} 
            alt={project.title} 
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
          />
        ) : project.media.video && (
          <video 
            src={project.media.video} 
            className="w-full h-full object-cover"
            muted
            playsInline
          >
            <track kind="captions" />
          </video>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span 
              key={tech} 
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs font-semibold px-2.5 py-0.5 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 justify-between">
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-blue-500 hover:text-blue-600 transition-colors" 
              onClick={(e) => e.stopPropagation()}
            >
              <GitHubMark className="w-5 h-5 mr-1" />
              GitHub
            </a>
          )}
          {project.huggingface && (
            <a 
              href={project.huggingface} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-orange-500 hover:text-orange-600 transition-colors" 
              onClick={(e) => e.stopPropagation()}
            >
              <Image src="https://pub-699441ce0cfb40449cc458823a3f1ed2.r2.dev/portfolio/media/hf-logo.webp" alt="Hugging Face" width={20} height={20} className="mr-1" />
              HuggingFace
            </a>
          )}
          {project.demo && (
            <a 
              href={project.demo} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-green-500 hover:text-green-600 transition-colors" 
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-5 h-5 mr-1" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </button>
  )
}

export default ProjectCard