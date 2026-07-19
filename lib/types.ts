export interface Project {
  id: number
  title: string
  description: string
  media: {
    images?: string[]
    video?: string
  }
  github?: string
  huggingface?: string
  demo?: string
  technologies: string[]
  details: string
  categories: string[]
}

export interface ExperienceItem {
  id: string
  text: string // Stored as HTML or plain string to support dynamic rendering/editing
}

export interface Experience {
  id: string
  title: string
  website?: string
  items: ExperienceItem[]
  icon: string // Stored as icon name key, e.g. "Code" | "Palette" | "Gamepad" | "FishSymbol"
}

export interface Qualification {
  subject: string
  level: string
  grade: string
}

export interface Education {
  institution: string
  years: string
  qualification?: string
  status?: string
  grade?: {
    achieved: string
    label: string
  }
  qualifications?: Qualification[]
}

export interface SubProject {
  name: string
  grade: string
  description: string
}

export interface Module {
  id: string
  name: string
  year: number
  semester: number
  moduleGrade: string
  description: string
  projects?: SubProject[]
}

export interface Certificate {
  id: string
  title: string
  description: string
  image: string
}

export interface PortfolioData {
  projects: Project[]
  jobExperiences: Experience[]
  otherExperiences: Experience[]
  educationHistory: Education[]
  modules: Module[]
  certificates: Certificate[]
}
