'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Pencil, Plus, Quote, MessageSquareQuote } from 'lucide-react'
import HoverText from '../components/HoverText'
import EditableText from '../components/EditableText'
import RecommendationModal from '../components/RecommendationModal'
import { Linkedin } from '../components/BrandIcons'
import { celebrate, useCatalog } from '@/lib/portfolio-store'
import { useIsAdmin } from '@/lib/use-admin'
import { DEFAULT_RECOMMENDATIONS, LINKEDIN_PROFILE } from '@/lib/default-content'
import { Recommendation } from '@/lib/types'

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('')

const Avatar = ({ rec }: { rec: Recommendation }) =>
  rec.avatar ? (
    // Small, already-sized thumbnails from R2; next/image adds nothing here.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={rec.avatar} alt={rec.name} className="w-14 h-14 rounded-full object-cover shrink-0" />
  ) : (
    <div className="w-14 h-14 rounded-full shrink-0 bg-gradient-to-br from-blue-500 to-blue-800 text-white flex items-center justify-center font-bold text-lg">
      {initials(rec.name)}
    </div>
  )

interface CardProps {
  rec: Recommendation
  index: number
  isAdmin: boolean
  onEdit: () => void
}

const AdminPencil = ({ onEdit }: { onEdit: () => void }) => (
  <button
    onClick={onEdit}
    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-gray-100 transition-all cursor-pointer"
    title="Edit recommendation"
  >
    <Pencil className="w-4 h-4" />
  </button>
)

/** Mirrors LinkedIn's own recommendation layout so it reads as one at a glance. */
const LinkedInCard = ({ rec, index, isAdmin, onEdit }: CardProps) => {
  const [expanded, setExpanded] = useState(false)
  const long = rec.text.length > 420

  const name = rec.linkedin ? (
    <a href={rec.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#0A66C2] hover:underline">
      {rec.name}
    </a>
  ) : (
    rec.name
  )

  return (
    <motion.article
      className="break-inside-avoid mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700/50 p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
    >
      <header className="flex items-start gap-4">
        <Avatar rec={rec} />
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-lg leading-tight text-gray-900 dark:text-gray-100">{name}</h2>
          {rec.headline && <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug">{rec.headline}</p>}
          {(rec.date || rec.relationship) && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {[rec.date, rec.relationship].filter(Boolean).join(', ')}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {isAdmin && <AdminPencil onEdit={onEdit} />}
          <Linkedin className="w-5 h-5 text-[#0A66C2] dark:text-[#70B5F9]" />
        </div>
      </header>
      <p className={`mt-4 text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line ${long && !expanded ? 'line-clamp-6' : ''}`}>
        {rec.text}
      </p>
      {long && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 text-sm font-semibold text-gray-500 hover:text-[#0A66C2] cursor-pointer"
        >
          {expanded ? 'Show less' : '…see more'}
        </button>
      )}
    </motion.article>
  )
}

const QuoteCard = ({ rec, index, isAdmin, onEdit }: CardProps) => (
  <motion.figure
    className="break-inside-avoid mb-6 relative bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700/50 p-6"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
  >
    {isAdmin && (
      <div className="absolute top-3 right-3">
        <AdminPencil onEdit={onEdit} />
      </div>
    )}
    <Quote className="w-7 h-7 text-blue-500 mb-3" />
    <blockquote className="text-lg italic text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line">“{rec.text}”</blockquote>
    <figcaption className="mt-4 text-sm">
      <span className="font-semibold text-gray-900 dark:text-gray-100">
        {rec.linkedin ? (
          <a href={rec.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            {rec.name}
          </a>
        ) : (
          rec.name
        )}
      </span>
      {rec.headline && <span className="text-gray-500 dark:text-gray-400">, {rec.headline}</span>}
    </figcaption>
  </motion.figure>
)

export default function RecommendationsPage() {
  const { data, save } = useCatalog()
  const isAdmin = useIsAdmin()
  const [selected, setSelected] = useState<Recommendation | null>(null)

  const recommendations = data?.recommendations ?? DEFAULT_RECOMMENDATIONS

  const handleUpdate = async (updated: Recommendation) => {
    const saved = await save((draft) => {
      const list = draft.recommendations ?? []
      const index = list.findIndex((r) => r.id === updated.id)
      if (index === -1) list.push(updated)
      else list[index] = updated
      draft.recommendations = list
    })
    if (saved) {
      setSelected(null)
      celebrate()
    }
  }

  const handleDelete = async (id: string) => {
    const saved = await save((draft) => {
      draft.recommendations = (draft.recommendations ?? []).filter((r) => r.id !== id)
    })
    if (saved) setSelected(null)
  }

  const handleAdd = () =>
    setSelected({ id: `rec-${Date.now()}`, name: '', text: '', source: 'linkedin' })

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-center mb-10">
        <motion.h1
          className="text-xl sm:text-3xl md:text-4xl font-bold mb-6 font-press-start-2p"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HoverText>Recommendations</HoverText>
        </motion.h1>
        <EditableText id="recommendations.intro" className="max-w-2xl mx-auto">
          {(text) => <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{text}</p>}
        </EditableText>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={`${LINKEDIN_PROFILE}details/recommendations/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold text-sm transition-colors"
          >
            <Linkedin className="w-4 h-4" /> See them on LinkedIn
          </a>
          {isAdmin && (
            <button
              onClick={handleAdd}
              className="bg-green-500 hover:bg-green-600 active:scale-95 transition-all text-white font-semibold px-4 py-2 rounded-lg cursor-pointer inline-flex items-center gap-2 text-sm shadow-md"
            >
              <Plus className="w-4 h-4" /> Add Recommendation
            </button>
          )}
        </div>
      </div>

      {recommendations.length === 0 ? (
        <div className="max-w-xl mx-auto text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700/50 p-10">
          <MessageSquareQuote className="w-10 h-10 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-700 dark:text-gray-300">
            Recommendations are on their way. In the meantime, my LinkedIn has the latest.
          </p>
        </div>
      ) : (
        <div className="columns-1 md:columns-2 gap-6">
          {recommendations.map((rec, i) => {
            const Card = rec.source === 'quote' ? QuoteCard : LinkedInCard
            return <Card key={rec.id} rec={rec} index={i} isAdmin={isAdmin} onEdit={() => setSelected(rec)} />
          })}
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <RecommendationModal
            recommendation={selected}
            isAdmin={isAdmin}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
