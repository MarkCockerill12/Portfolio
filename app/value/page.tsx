'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, animate, useInView } from 'motion/react'
import { Pencil, Plus, Quote, Clock, PoundSterling, TrendingUp, Users, Sparkles } from 'lucide-react'
import HoverText from '../components/HoverText'
import EditableText from '../components/EditableText'
import ImpactModal from '../components/ImpactModal'
import { celebrate, useCatalog } from '@/lib/portfolio-store'
import { useIsAdmin } from '@/lib/use-admin'
import { DEFAULT_IMPACT } from '@/lib/default-content'
import { ImpactCaseStudy, ImpactStat } from '@/lib/types'

const STAT_ICONS = [Users, Clock, Sparkles, PoundSterling, TrendingUp]

/**
 * Counts the first number in `value` up from zero the first time it scrolls
 * into view, keeping whatever surrounds it ("£", " min", "%") and its
 * decimal places and thousands separators.
 */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const match = value.match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/)

  const format = (n: number) => {
    if (!match) return value
    const [, prefix, number, suffix] = match
    const decimals = number.split('.')[1]?.length ?? 0
    const digits = n.toLocaleString('en-GB', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: number.includes(','),
    })
    return `${prefix}${digits}${suffix}`
  }

  const [shown, setShown] = useState(() => format(0))

  useEffect(() => {
    if (!match) return
    const target = Number(match[2].replace(/,/g, ''))
    if (!inView) return
    if (globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setShown(value)
      return
    }
    const controls = animate(0, target, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (n) => setShown(format(n)),
      onComplete: () => setShown(value),
    })
    return () => controls.stop()
    // `format` and `match` are derived from `value`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value])

  return <span ref={ref}>{match ? shown : value}</span>
}

const StatTile = ({ stat, index }: { stat: ImpactStat; index: number }) => {
  const Icon = STAT_ICONS[index % STAT_ICONS.length]
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-100 dark:border-gray-700/50 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ scale: 1.03 }}
    >
      <Icon className="w-6 h-6 text-blue-500 dark:text-blue-400 mb-3" />
      <div className="text-3xl font-bold text-blue-700 dark:text-blue-300 tabular-nums">
        <CountUp value={stat.value} />
      </div>
      <p className="mt-1 font-semibold text-gray-800 dark:text-gray-100 leading-snug">{stat.label}</p>
      {stat.detail && <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-snug">{stat.detail}</p>}
    </motion.div>
  )
}

interface CaseStudyProps {
  study: ImpactCaseStudy
  isAdmin: boolean
  onEdit: () => void
}

const CaseStudy = ({ study, isAdmin, onEdit }: CaseStudyProps) => (
  <section className="space-y-8">
    <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700/50">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100">
          {study.organisation}
        </span>
        {study.period && <span className="text-sm text-gray-500 dark:text-gray-400">{study.period}</span>}
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">
        <HoverText>{study.title}</HoverText>
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">{study.summary}</p>
      {isAdmin && (
        <button
          onClick={onEdit}
          className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-gray-100 transition-all cursor-pointer"
          title="Edit case study"
        >
          <Pencil className="w-4 h-4" />
        </button>
      )}
    </div>

    {study.stats.length > 0 && (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {study.stats.map((stat, i) => (
          <StatTile key={`${stat.label}-${i}`} stat={stat} index={i} />
        ))}
      </div>
    )}

    {study.scenarios && study.scenarios.length > 0 && (
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/50 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="text-xl font-bold px-6 pt-6">If it were rolled out further</h3>
        <p className="px-6 pt-1 text-sm text-gray-500 dark:text-gray-400">Every year, with everyone using it once per account each quarter.</p>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left min-w-[560px]">
            <thead>
              <tr className="bg-blue-900 text-white text-sm">
                <th className="px-6 py-3 font-semibold">Scale</th>
                <th className="px-6 py-3 font-semibold text-right">Hours saved</th>
                <th className="px-6 py-3 font-semibold text-right">Value of time</th>
                <th className="px-6 py-3 font-semibold text-right">Sales capacity*</th>
              </tr>
            </thead>
            <tbody>
              {study.scenarios.map((row) => (
                <tr key={row.scale} className="border-t border-gray-100 dark:border-gray-700 odd:bg-gray-50 dark:odd:bg-gray-900/40">
                  <td className="px-6 py-3 font-medium">{row.scale}</td>
                  <td className="px-6 py-3 text-right tabular-nums">{row.hours}</td>
                  <td className="px-6 py-3 text-right tabular-nums">{row.value}</td>
                  <td className="px-6 py-3 text-right tabular-nums font-semibold text-blue-700 dark:text-blue-300">{row.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400">
          *If all of the freed time went back into selling. This is capacity, not income already earned.
        </p>
      </motion.div>
    )}

    {study.quotes && study.quotes.length > 0 && (
      <div>
        <h3 className="text-xl font-bold mb-4">What the people using it said</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {study.quotes.map((quote, i) => (
            <motion.figure
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-100 dark:border-gray-700/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Quote className="w-5 h-5 text-blue-500 mb-2" />
              <blockquote className="text-gray-800 dark:text-gray-200 italic leading-relaxed">“{quote.text}”</blockquote>
              <figcaption className="mt-3 text-sm font-semibold text-gray-500 dark:text-gray-400">{quote.author}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    )}

    {study.footnote && (
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-4xl">{study.footnote}</p>
    )}
  </section>
)

export default function ValuePage() {
  const { data, save } = useCatalog()
  const isAdmin = useIsAdmin()
  const [selected, setSelected] = useState<ImpactCaseStudy | null>(null)

  const studies = data?.impact ?? DEFAULT_IMPACT

  const handleUpdate = async (updated: ImpactCaseStudy) => {
    const saved = await save((draft) => {
      const list = draft.impact ?? structuredClone(DEFAULT_IMPACT)
      const index = list.findIndex((s) => s.id === updated.id)
      if (index === -1) list.push(updated)
      else list[index] = updated
      draft.impact = list
    })
    if (saved) {
      setSelected(null)
      celebrate()
    }
  }

  const handleDelete = async (id: string) => {
    const saved = await save((draft) => {
      draft.impact = (draft.impact ?? structuredClone(DEFAULT_IMPACT)).filter((s) => s.id !== id)
    })
    if (saved) setSelected(null)
  }

  const handleAdd = () =>
    setSelected({
      id: `impact-${Date.now()}`,
      title: 'New piece of work',
      organisation: 'Organisation',
      period: '',
      summary: 'What it does and who it helps.',
      stats: [{ value: '0', label: 'What the number means' }],
    })

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-6 font-press-start-2p"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HoverText>Value I Bring</HoverText>
        </motion.h1>
        <EditableText id="value.intro" className="max-w-3xl mx-auto">
          {(text) => <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{text}</p>}
        </EditableText>
        {isAdmin && (
          <button
            onClick={handleAdd}
            className="mt-6 bg-green-500 hover:bg-green-600 active:scale-95 transition-all text-white font-semibold px-4 py-2 rounded-lg cursor-pointer inline-flex items-center gap-2 text-sm shadow-md"
          >
            <Plus className="w-4 h-4" /> Add Case Study
          </button>
        )}
      </div>

      <div className="space-y-20">
        {studies.map((study) => (
          <CaseStudy key={study.id} study={study} isAdmin={isAdmin} onEdit={() => setSelected(study)} />
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <ImpactModal
            study={selected}
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
