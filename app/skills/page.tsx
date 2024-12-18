import { Code, Palette, Gamepad, Lightbulb } from 'lucide-react'

const skills = [
  {
    category: "Programming Languages & Frameworks",
    items: ["JavaScript", "TypeScript", "Python", "React", "Node.js", "Unity (C#)"],
    icon: <Code className="w-6 h-6" />
  },
  {
    category: "Art & Design",
    items: ["Digital Illustration", "UI/UX Design", "3D Modeling", "Pixel Art"],
    icon: <Palette className="w-6 h-6" />
  },
  {
    category: "Game Development",
    items: ["Game Design", "Level Design", "Sprite Animation", "Game AI"],
    icon: <Gamepad className="w-6 h-6" />
  },
  {
    category: "Creative Coding",
    items: ["Generative Art", "Interactive Installations", "Data Visualization", "Audio Reactive Visuals"],
    icon: <Lightbulb className="w-6 h-6" />
  }
]

export default function Skills() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center font-press-start-2p">Skills & Experience</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skillSet, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              {skillSet.icon}
              <h2 className="text-2xl font-bold ml-2">{skillSet.category}</h2>
            </div>
            <ul className="list-disc list-inside">
              {skillSet.items.map((skill, skillIndex) => (
                <li key={skillIndex} className="mb-2">{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

