'use client'

import { useState, useEffect } from 'react'
import { Trash2, Plus } from 'lucide-react'
import ModalShell from './ModalShell'
import { Education, Qualification } from '@/lib/types'

interface EducationModalProps {
  education: Education
  onClose: () => void
  isAdmin?: boolean
  onUpdate?: (updated: Education) => void
  onDelete?: (institution: string) => void
}

export default function EducationModal({
  education,
  onClose,
  isAdmin = false,
  onUpdate,
  onDelete
}: EducationModalProps) {
  const [isEditing, setIsEditing] = useState(false)

  const [inst, setInst] = useState(education.institution)
  const [yrs, setYrs] = useState(education.years)
  const [qual, setQual] = useState(education.qualification || "")
  const [stat, setStat] = useState(education.status || "")
  const [gradeAch, setGradeAch] = useState(education.grade?.achieved || "")
  const [gradeLbl, setGradeLbl] = useState(education.grade?.label || "")
  const [subQuals, setSubQuals] = useState<Qualification[]>(education.qualifications || [])

  useEffect(() => {
    setInst(education.institution)
    setYrs(education.years)
    setQual(education.qualification || "")
    setStat(education.status || "")
    setGradeAch(education.grade?.achieved || "")
    setGradeLbl(education.grade?.label || "")
    setSubQuals(education.qualifications || [])

    if (education.institution === "" || education.institution === "New Institution") {
      setIsEditing(true)
    } else {
      setIsEditing(false)
    }
  }, [education])

  const handleAddSubQual = () => {
    setSubQuals(prev => [...prev, { subject: "", level: "A-Level", grade: "A" }])
  }

  const handleRemoveSubQual = (index: number) => {
    setSubQuals(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubQualChange = (index: number, key: keyof Qualification, val: string) => {
    setSubQuals(prev => prev.map((q, i) => i === index ? { ...q, [key]: val } : q))
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate?.({
      ...education,
      institution: inst,
      years: yrs,
      qualification: qual || undefined,
      status: stat || undefined,
      grade: gradeAch ? { achieved: gradeAch, label: gradeLbl || "Achieved Grade" } : undefined,
      qualifications: subQuals.length > 0 ? subQuals : undefined
    })
    setIsEditing(false)
    onClose()
  }

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${education.institution}"?`)) {
      onDelete?.(education.institution)
      onClose()
    }
  }

  return (
    <ModalShell
      title={inst || "Education details"}
      onClose={onClose}
      isAdmin={isAdmin}
      isEditing={isEditing}
      onEdit={() => setIsEditing(true)}
    >
      {isEditing ? (
          <form onSubmit={handleSave} className="p-6 overflow-y-auto max-h-[calc(90vh-60px)] space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Edit Education Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Institution</label>
                <input
                  type="text"
                  value={inst}
                  onChange={(e) => setInst(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Years Active</label>
                <input
                  type="text"
                  value={yrs}
                  onChange={(e) => setYrs(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Qualification</label>
                <input
                  type="text"
                  value={qual}
                  onChange={(e) => setQual(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Status</label>
                <input
                  type="text"
                  value={stat}
                  onChange={(e) => setStat(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Grade Label</label>
                <input
                  type="text"
                  value={gradeLbl}
                  onChange={(e) => setGradeLbl(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g. Achieved Grade"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Grade Achieved</label>
                <input
                  type="text"
                  value={gradeAch}
                  onChange={(e) => setGradeAch(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g. 1st or A"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Sub-Qualifications / School Subjects</label>
                <button
                  type="button"
                  onClick={handleAddSubQual}
                  className="text-xs flex items-center gap-1 text-blue-500 hover:text-blue-600 font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Subject
                </button>
              </div>

              {subQuals.map((sub, index) => (
                <div key={index} className="flex gap-2 items-center bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                  <div className="flex-1 grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Level (e.g. National 5)"
                      value={sub.level}
                      onChange={(e) => handleSubQualChange(index, "level", e.target.value)}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2.5 py-1 text-xs text-foreground focus:outline-none"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Subject (e.g. Maths)"
                      value={sub.subject}
                      onChange={(e) => handleSubQualChange(index, "subject", e.target.value)}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2.5 py-1 text-xs text-foreground focus:outline-none"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Grade (e.g. A)"
                      value={sub.grade}
                      onChange={(e) => handleSubQualChange(index, "grade", e.target.value)}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2.5 py-1 text-xs text-foreground focus:outline-none"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubQual(index)}
                    className="p-1.5 text-gray-400 hover:text-red-500 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              {isAdmin && education.institution !== "" && education.institution !== "New Institution" && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg text-sm font-semibold transition-all cursor-pointer flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Delete Education
                </button>
              )}
              <div className="flex gap-2 ml-auto">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-all cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-60px)] space-y-4">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{education.institution}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{education.years}</p>
            </div>
            <div className="space-y-4">
              {education.qualification && (
                <p className="text-base text-gray-800 dark:text-gray-200">
                  <span className="font-semibold text-gray-500 dark:text-gray-400">{education.status}: </span>
                  {education.qualification}
                </p>
              )}
              {education.grade && (
                <p className="text-base text-gray-800 dark:text-gray-200">
                  <span className="font-semibold text-gray-500 dark:text-gray-400">{education.grade.label}: </span>
                  <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold font-mono">
                    {education.grade.achieved}
                  </span>
                </p>
              )}
              {education.qualifications && education.qualifications.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">School Qualifications</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {education.qualifications.map((q, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-gray-50 dark:bg-gray-900/40 p-2.5 rounded-lg border border-gray-100 dark:border-gray-800/80">
                        <span className="text-xs text-gray-700 dark:text-gray-300">{q.level} {q.subject}</span>
                        <span className="text-xs font-mono font-bold bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300 px-2 py-0.5 rounded">
                          {q.grade}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
      )}
    </ModalShell>
  )
}
