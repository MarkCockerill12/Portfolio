import { Code, Palette, Gamepad, Lightbulb } from 'lucide-react'

const skills = [
  {
    category: "Programming Languages & Frameworks",
    items: ["JavaScript/TypeScript", "Python", "React", "Java", "C/C++/C#", "SQL", "html/css", "Tailwind"],
    icon: <Code className="w-6 h-6" />
  },
  {
    category: "Art, Design & Animation",
    items: ["Digital Illustration", "UI/UX Design", "3D Modeling", "2D/3D Animation", "Drawing/Sketching"],
    icon: <Palette className="w-6 h-6" />
  },
  {
    category: "Applications/Tools",
    items: ["CAD Inventor", "Blender", "Krita", "Microsoft Word, Excel, PowerPoint, Access", "Visual Studio/Visual Studio Code", "MySQL", "Docker", "Github", "Cisco Packet", "Arduino", "DaVinci Resolve", "VirtualBox"],
    icon: <Gamepad className="w-6 h-6" />
  },
  {
    category: "Other Computer Related Skills",
    items: ["Understanding of Networking and Addresses", "Physical Computer Installations/Assembly", "Video Editing", "Audio Reactive Visuals",],
    icon: <Lightbulb className="w-6 h-6" />
  },
  {
    category: "Other Skills",
    items: ["Independant Working", "Teamwork", "Problem-Solving", "Leadership", "Communication", "Working under pressure", "Motivated and Enthusiastic"],
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

