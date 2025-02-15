import Image from 'next/image'
import { Github, ExternalLink } from 'lucide-react'

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
}

interface ProjectCardProps {
  project: Project
  onSelect: () => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
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
            priority
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
        <div className="flex justify-between">
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-blue-500 hover:text-blue-600 transition-colors" 
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-5 h-5 mr-1" />
              GitHub
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