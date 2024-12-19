'use client'

import { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import React from 'react'

const projects = [
  {
    id: 1,
    title: "Visual Novel Addon",
    description: "A soft sequel(?) to Doki Doki Literature Club",
    image: "/placeholder.svg",
    github: "https://github.com/yourusername/pixel-art-generator",
    technologies: ["RenPy", "PicsArt", "Visual Stdio Code"],
    details: "This project combines my love for art and coding. Users can create pixel art, animate it, and share their creations with a community of artists. It features a custom-built drawing engine and real-time collaboration tools."
  },
  {
    id: 2,
    title: "3D Animation- Star wars",
    description: "Yep, I made a Star Wars animation",
    image: "/placeholder.svg",
    github: "https://github.com/yourusername/rpg-inventory",
    technologies: ["Blender", "DaVinci Resolve",],
    details: "Inspired by my favorite RPGs, I created a robust inventory system that game developers can easily integrate into their projects. It supports item stacking, weight limits, equipment slots, and a drag-and-drop interface."
  },
  {
    id: 3,
    title: "3D Animation- Penthouse",
    description: "Animation",
    image: "/placeholder.svg",
    github: "https://github.com/yourusername/creative-coding-sketchbook",
    technologies: ["Blender", "DaVinci Resolve",],
    details: "This project showcases my experiments with creative coding. Each sketch is an interactive piece of art that responds to user input or generates unique patterns. It's a fusion of my programming skills and artistic vision."
  },
  {
    id: 4,
    title: "3D Animation- IRL Springtrap",
    description: "Animation",
    image: "/placeholder.svg",
    github: "https://github.com/yourusername/creative-coding-sketchbook",
    technologies: ["Blender", "DaVinci Resolve",],
    details: "This project showcases my experiments with creative coding. Each sketch is an interactive piece of art that responds to user input or generates unique patterns. It's a fusion of my programming skills and artistic vision."
  },
  {
    id: 5,
    title: "Shrimp",
    description: "Shrimp",
    image: "/placeholder.svg",
    github: "https://github.com/yourusername/creative-coding-sketchbook",
    technologies: ["C#", "Pure uncompromising genious",],
    details: "This project showcases my experiments with creative coding. Each sketch is an interactive piece of art that responds to user input or generates unique patterns. It's a fusion of my programming skills and artistic vision."
  },
]
//
export default function Projects() {
  type Project = {
    id: number;
    title: string;
    description: string;
    image: string;
    github: string;
    technologies: string[];
    details: string;
  };

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
//

  
return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center font-press-start-2p">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onSelect={() => setSelectedProject(project)} />
        ))}
      </div>
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  )
}

