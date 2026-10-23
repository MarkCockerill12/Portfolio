'use client'

import { useState } from 'react'
import { ClipboardPaste, Trash2 } from 'lucide-react'
import ModalShell from './ModalShell'
import { useUpload } from '@/lib/use-upload'
import { Recommendation } from '@/lib/types'

interface RecommendationModalProps {
  recommendation: Recommendation
  onClose: () => void
  isAdmin?: boolean
  onUpdate?: (updated: Recommendation) => void
  onDelete?: (id: string) => void
}

const inputClass =
  "w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
const labelClass = "text-xs font-semibold text-gray-500 dark:text-gray-400"

const DATE_LINE = /^((?:January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}),?\s*(.*)$/

/**
 * Best-effort split of a recommendation copied straight off LinkedIn, which
 * comes out as: name, headline, "Month D, YYYY, <relationship>", then the text.
 * Everything it fills in stays editable, so a miss only costs a quick fix.
 */
function parseLinkedInPaste(raw: string): Partial<Recommendation> {
  const lines = raw
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !/^(Show (more|less)|…see more|See more|View .* profile|Message|Endorse)$/i.test(l))
  if (lines.length === 0) return {}

  const result: Partial<Recommendation> = {}
  let i = 0
  // "Jane Doe · 2nd" -> "Jane Doe"
  result.name = lines[i++].replace(/\s*·\s*(1st|2nd|3rd\+?)$/i, '')

  const dateIndex = lines.findIndex((l) => DATE_LINE.test(l))
  if (dateIndex > 0) {
    if (dateIndex > i) result.headline = lines.slice(i, dateIndex).join(' ')
    const [, date, relationship] = lines[dateIndex].match(DATE_LINE)!
    result.date = date
    if (relationship) result.relationship = relationship
    i = dateIndex + 1
  } else if (lines.length > 2) {
    result.headline = lines[i++]
  }

  result.text = lines.slice(i).join('\n\n')
  return result
}

/** Admin editor for one card on the Recommendations page. */
export default function RecommendationModal({ recommendation, onClose, isAdmin = false, onUpdate, onDelete }: RecommendationModalProps) {
  const [form, setForm] = useState<Recommendation>(recommendation)
  const [paste, setPaste] = useState('')
  const { upload, uploading } = useUpload('portfolio/media/recommendations')

  if (!isAdmin) return null

  const set = <K extends keyof Recommendation>(key: K, value: Recommendation[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate?.({
      ...form,
      headline: form.headline || undefined,
      relationship: form.relationship || undefined,
      date: form.date || undefined,
      linkedin: form.linkedin || undefined,
      avatar: form.avatar || undefined,
    })
  }

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete the recommendation from "${recommendation.name}"?`)) {
      onDelete?.(recommendation.id)
    }
  }

  return (
    <ModalShell title={form.name || 'Recommendation'} onClose={onClose} isAdmin={isAdmin} isEditing>
      <form onSubmit={handleSave} className="p-6 overflow-y-auto max-h-[calc(90vh-60px)] space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Edit Recommendation</h3>

        <div className="space-y-1 rounded-lg border border-dashed border-blue-300 dark:border-blue-700 p-3">
          <label className={labelClass}>
            Quick fill: copy a recommendation from your LinkedIn profile (name down to the end of the text) and paste it here
          </label>
          <textarea value={paste} onChange={(e) => setPaste(e.target.value)} rows={3} className={`${inputClass} resize-y`} />
          <button
            type="button"
            disabled={!paste.trim()}
            onClick={() => {
              setForm((prev) => ({ ...prev, ...parseLinkedInPaste(paste), source: 'linkedin' }))
              setPaste('')
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg text-xs font-semibold cursor-pointer"
          >
            <ClipboardPaste className="w-3.5 h-3.5" /> Fill the fields below
          </button>
        </div>

        <div className="space-y-1">
          <label className={labelClass}>Type</label>
          <select value={form.source} onChange={(e) => set('source', e.target.value as Recommendation['source'])} className={inputClass}>
            <option value="linkedin">LinkedIn recommendation (card)</option>
            <option value="quote">Quote (from anywhere else)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className={labelClass}>Name</label>
            <input value={form.name} onChange={(e) => set('name', e.target.value)} className={inputClass} required />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Headline / role</label>
            <input value={form.headline ?? ''} onChange={(e) => set('headline', e.target.value)} className={inputClass} placeholder="Sales Leader @ Insights" />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Relationship</label>
            <input value={form.relationship ?? ''} onChange={(e) => set('relationship', e.target.value)} className={inputClass} placeholder="Managed Mark directly" />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Date</label>
            <input value={form.date ?? ''} onChange={(e) => set('date', e.target.value)} className={inputClass} placeholder="October 21, 2026" />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <label className={labelClass}>Their LinkedIn profile URL</label>
            <input value={form.linkedin ?? ''} onChange={(e) => set('linkedin', e.target.value)} className={inputClass} placeholder="https://www.linkedin.com/in/..." />
          </div>
        </div>

        <div className="space-y-1">
          <label className={labelClass}>What they said</label>
          <textarea value={form.text} onChange={(e) => set('text', e.target.value)} rows={8} className={`${inputClass} resize-y leading-relaxed`} required />
        </div>

        <div className="space-y-1">
          <label className={labelClass}>Photo (optional; LinkedIn photo links expire, so upload a copy)</label>
          <div className="flex items-center gap-3">
            {form.avatar && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                <button type="button" onClick={() => set('avatar', undefined)} className="p-1.5 text-gray-500 hover:text-red-500 cursor-pointer" title="Remove photo">
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
            <label className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-2 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-200 cursor-pointer transition-colors">
              {uploading ? 'Uploading...' : 'Upload Photo'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={async (e) => {
                  const url = await upload(e)
                  if (url) set('avatar', url)
                }}
              />
            </label>
          </div>
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
