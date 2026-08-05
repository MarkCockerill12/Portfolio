'use client'

import { useCallback, useEffect, useState } from 'react'
import { defaultPortfolioData } from './default-portfolio'
import { PortfolioData } from './types'

/**
 * Client-side cache for the single `portfolio.json` catalog.
 *
 * Every page used to fetch `/api/portfolio` and `/api/auth` on mount, so moving
 * between Projects, Experience and Qualifications hit both routes again each
 * time. These module-level caches survive client navigation, so each is
 * fetched once per page load and shared by whichever pages are mounted.
 */
let cache: PortfolioData | null = null
let inFlight: Promise<PortfolioData> | null = null
const subscribers = new Set<(data: PortfolioData) => void>()

function publish(data: PortfolioData) {
  cache = data
  for (const notify of subscribers) notify(data)
}

function load(): Promise<PortfolioData> {
  inFlight ??= fetch('/api/portfolio')
    .then((res) => {
      if (!res.ok) throw new Error(`Portfolio request failed: ${res.status}`)
      return res.json() as Promise<PortfolioData>
    })
    .finally(() => {
      inFlight = null
    })
  return inFlight
}

/**
 * Reads the portfolio catalog, seeded with the bundled defaults so the page
 * paints immediately, then swapped for the live copy from R2.
 *
 * `save` takes a mutator, applies it to the freshest server copy, persists the
 * whole catalog and pushes the result to every mounted page.
 */
export function usePortfolio() {
  const [data, setData] = useState<PortfolioData>(cache ?? defaultPortfolioData)

  useEffect(() => {
    subscribers.add(setData)
    if (cache) {
      setData(cache)
    } else {
      load()
        .then(publish)
        .catch((err) => console.error('Failed to load portfolio catalog:', err))
    }
    return () => {
      subscribers.delete(setData)
    }
  }, [])

  const save = useCallback(async (mutate: (draft: PortfolioData) => void) => {
    try {
      // Re-read before writing: the whole catalog is replaced on save, so this
      // avoids clobbering sections edited from another tab.
      const draft = structuredClone(await load())
      mutate(draft)

      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updatedData: draft }),
      })
      if (!res.ok) return false

      publish(draft)
      return true
    } catch (err) {
      console.error('Failed to save portfolio catalog:', err)
      return false
    }
  }, [])

  return { data, save }
}

/** Fires the shared celebration burst used after a successful admin edit. */
export async function celebrate() {
  const confetti = (await import('canvas-confetti')).default
  confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } })
}
