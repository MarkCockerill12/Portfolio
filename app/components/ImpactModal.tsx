'use client'

import { useState } from 'react'
import ModalShell from './ModalShell'
import { ImpactCaseStudy } from '@/lib/types'

interface ImpactModalProps {
  study: ImpactCaseStudy
  onClose: () => void
  isAdmin?: boolean
  onUpdate?: (updated: ImpactCaseStudy) => void
  onDelete?: (id: string) => void
}

const inputClass =
  "w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
const labelClass = "text-xs font-semibold text-gray-500 dark:text-gray-400"

// Lists are edited one row per line with " | " between columns, which keeps a
// five-column table editable without a grid of tiny inputs.
const toLines = (rows: string[][]) => rows.map((cols) => cols.join(' | ')).join('\n')
const fromLines = (text: string) =>
  text
    .split('\n')
    .map((line) => line.split('|').map((col) => col.trim()))
    .filter((cols) => cols[0])

/** Admin editor for one case study on the Value I Bring page. */
export default function ImpactModal({ study, onClose, isAdmin = false, onUpdate, onDelete }: ImpactModalProps) {
  const [title, setTitle] = useState(study.title)
  const [organisation, setOrganisation] = useState(study.organisation)
  const [period, setPeriod] = useState(study.period ?? '')
  const [summary, setSummary] = useState(study.summary)
  const [stats, setStats] = useState(toLines(study.stats.map((s) => [s.value, s.label, s.detail ?? ''])))
  const [scenarios, setScenarios] = useState(
    toLines((study.scenarios ?? []).map((s) => [s.scale, s.hours, s.value, s.revenue]))
  )
  const [quotes, setQuotes] = useState(toLines((study.quotes ?? []).map((q) => [q.text, q.author])))
  const [footnote, setFootnote] = useState(study.footnote ?? '')

  if (!isAdmin) return null

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate?.({
      ...study,
      title,
      organisation,
      period: period || undefined,
      summary,
      stats: fromLines(stats).map(([value, label = '', detail]) => ({ value, label, detail: detail || undefined })),
      scenarios: fromLines(scenarios).map(([scale, hours = '', value = '', revenue = '']) => ({ scale, hours, value, revenue })),
      quotes: fromLines(quotes).map(([text, author = '']) => ({ text, author })),
      footnote: footnote || undefined,
    })
  }

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${study.title}"?`)) {
      onDelete?.(study.id)
    }
  }

  return (
    <ModalShell title={title || 'Case study'} onClose={onClose} isAdmin={isAdmin} isEditing>
      <form onSubmit={handleSave} className="p-6 overflow-y-auto max-h-[calc(90vh-60px)] space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Edit Case Study</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1 sm:col-span-1">
            <label className={labelClass}>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} required />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Organisation</label>
            <input value={organisation} onChange={(e) => setOrganisation(e.target.value)} className={inputClass} required />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Period</label>
            <input value={period} onChange={(e) => setPeriod(e.target.value)} className={inputClass} placeholder="2026 pilot" />
          </div>
        </div>

        <div className="space-y-1">
          <label className={labelClass}>Summary</label>
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} className={`${inputClass} resize-y leading-relaxed`} required />
        </div>

        <div className="space-y-1">
          <label className={labelClass}>Headline stats, one per line: value | label | small print</label>
          <textarea value={stats} onChange={(e) => setStats(e.target.value)} rows={6} className={`${inputClass} resize-y font-mono text-xs leading-relaxed`} />
        </div>

        <div className="space-y-1">
          <label className={labelClass}>Rollout table, one row per line: scale | hours | value of time | sales capacity (leave empty to hide)</label>
          <textarea value={scenarios} onChange={(e) => setScenarios(e.target.value)} rows={4} className={`${inputClass} resize-y font-mono text-xs leading-relaxed`} />
        </div>

        <div className="space-y-1">
          <label className={labelClass}>Quotes, one per line: quote | who said it</label>
          <textarea value={quotes} onChange={(e) => setQuotes(e.target.value)} rows={5} className={`${inputClass} resize-y font-mono text-xs leading-relaxed`} />
        </div>

        <div className="space-y-1">
          <label className={labelClass}>Sources and assumptions</label>
          <textarea value={footnote} onChange={(e) => setFootnote(e.target.value)} rows={4} className={`${inputClass} resize-y leading-relaxed`} />
        </div>

        <div className="flex gap-2 justify-between pt-4">
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg text-sm font-semibold transition-all cursor-pointer"
          >
            Delete
          </button>
          <div className="flex gap-2 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer font-semibold"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-all cursor-pointer">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </ModalShell>
  )
}
