import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

interface Project {
  id: number;
  title: string;
  description: string;
  media: {
    images?: string[];
    video?: string;
  };
  github?: string;
  huggingface?: string;
  demo?: string;
  technologies: string[];
}

interface ProjectCardProps {
  project: Project
  onSelect: () => void
}

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

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
        <div className="flex flex-wrap gap-4 justify-between">
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-blue-500 hover:text-blue-600 transition-colors" 
              onClick={(e) => e.stopPropagation()}
            >
              <GitHubIcon className="w-5 h-5 mr-1" />
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