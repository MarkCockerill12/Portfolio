'use client'

import { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import React from 'react'

const projects = [
  {
    id: 1,
    title: "Pixel Art Generator",
    description: "A web-based tool for creating and sharing pixel art",
    image: "/placeholder.svg",
    github: "https://github.com/yourusername/pixel-art-generator",
    demo: "https://pixel-art-generator-demo.com",
    technologies: ["React", "Canvas API", "Firebase"],
    details: "This project combines my love for art and coding. Users can create pixel art, animate it, and share their creations with a community of artists. It features a custom-built drawing engine and real-time collaboration tools."
  },
  {
    id: 2,
    title: "RPG Inventory System",
    description: "A flexible inventory management system for RPG games",
    image: "/placeholder.svg",
    github: "https://github.com/yourusername/rpg-inventory",
    demo: "https://rpg-inventory-demo.com",
    technologies: ["Unity", "C#", "Scriptable Objects"],
    details: "Inspired by my favorite RPGs, I created a robust inventory system that game developers can easily integrate into their projects. It supports item stacking, weight limits, equipment slots, and a drag-and-drop interface."
  },
  {
    id: 3,
    title: "Creative Coding Sketchbook",
    description: "A collection of interactive generative art pieces",
    image: "/placeholder.svg",
    github: "https://github.com/yourusername/creative-coding-sketchbook",
    demo: "https://creative-coding-sketchbook-demo.com",
    technologies: ["p5.js", "WebGL", "Web Audio API"],
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
    demo: string;
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

