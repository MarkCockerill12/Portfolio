'use client'

import { ReactNode, useState } from 'react'
import { Pencil, RotateCcw } from 'lucide-react'
import { celebrate, useCatalog } from '@/lib/portfolio-store'
import { useIsAdmin } from '@/lib/use-admin'
import { DEFAULT_CONTENT } from '@/lib/default-content'

interface EditableTextProps {
  /** Key into `content` in portfolio.json; its fallback lives in DEFAULT_CONTENT. */
  id: string
  /** Renders the current text, so each page keeps its own markup and motion. */
  children: (text: string) => ReactNode
  /** Classes for the wrapper, e.g. to keep the admin pencil next to centred text. */
  className?: string
  rows?: number
}

/**
 * A block of page copy that an admin can rewrite in place. Line breaks are
 * kept, so a blank line in the editor shows as a new paragraph.
 */
export default function EditableText({ id, children, className = '', rows = 6 }: EditableTextProps) {
  const { data, save } = useCatalog()
  const isAdmin = useIsAdmin()
  const [draft, setDraft] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const fallback = DEFAULT_CONTENT[id] ?? ''
  const text = data?.content?.[id] ?? fallback

  const persist = async (value: string | null) => {
    setSaving(true)
    const saved = await save((catalog) => {
      const content = { ...catalog.content }
      // Resetting drops the override so later changes to the default show through.
      if (value === null) delete content[id]
      else content[id] = value
      catalog.content = content
    })
    setSaving(false)
    if (saved) {
      setDraft(null)
      celebrate()
    } else {
      alert('Saving failed. Check that you are still signed in as admin.')
    }
  }

  if (draft !== null) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          persist(draft)
        }}
        className={`space-y-2 text-left ${className}`}
      >
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={rows}
          autoFocus
          className="w-full min-h-[6rem] bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-base text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y leading-relaxed"
        />
        <div className="flex items-center gap-2 justify-end">
          {data?.content?.[id] !== undefined && (
            <button
              type="button"
              onClick={() => persist(null)}
              disabled={saving}
              className="mr-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 hover:text-red-500 cursor-pointer"
              title="Go back to the original text"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset to default
            </button>
          )}
          <button
            type="button"
            onClick={() => setDraft(null)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white rounded-lg text-sm font-semibold transition-all cursor-pointer"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className={`relative whitespace-pre-line ${className}`}>
      {children(text)}
      {isAdmin && (
        <button
          onClick={(e) => {
            // Some blocks sit inside clickable cards; editing should not open them.
            e.stopPropagation()
            setDraft(text)
          }}
          className="absolute -top-3 -right-3 p-1.5 bg-white dark:bg-gray-700 shadow rounded-full text-gray-500 hover:text-blue-500 transition-all cursor-pointer"
          title="Edit text"
          aria-label="Edit text"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  )
}
