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

export interface Recommendation {
  id: string
  name: string
  headline?: string // e.g. "Sales Leader @ Insights"
  relationship?: string // e.g. "Managed Mark directly"
  date?: string
  text: string
  linkedin?: string // the recommender's profile URL
  avatar?: string
  source: "linkedin" | "quote"
}

export interface ImpactStat {
  value: string // "£12,693", "73.9 min", "90%"
  label: string
  detail?: string
}

export interface ImpactScenario {
  scale: string
  hours: string
  value: string
  revenue: string
}

export interface ImpactQuote {
  text: string
  author: string
}

export interface ImpactCaseStudy {
  id: string
  title: string
  organisation: string
  period?: string
  summary: string
  stats: ImpactStat[]
  scenarios?: ImpactScenario[]
  quotes?: ImpactQuote[]
  footnote?: string
}

export interface PortfolioData {
  projects: Project[]
  jobExperiences: Experience[]
  otherExperiences: Experience[]
  educationHistory: Education[]
  modules: Module[]
  certificates: Certificate[]
  // Optional so catalogs saved before these sections existed stay valid;
  // pages fall back to the defaults in `lib/default-content.ts`.
  content?: Record<string, string>
  recommendations?: Recommendation[]
  impact?: ImpactCaseStudy[]
}
