'use client'

import { createContext, createElement, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { PortfolioData } from './types'

/**
 * The catalog the server read from R2 while rendering the page. Passed down
 * through context rather than written into the module cache, because on the
 * server that cache would be shared by every request.
 */
const InitialCatalog = createContext<PortfolioData | null>(null)

export function CatalogProvider({ initial, children }: { initial: PortfolioData | null; children: ReactNode }) {
  return createElement(InitialCatalog.Provider, { value: initial }, children)
}

/**
 * Client-side cache for the single `portfolio.json` catalog.
 *
 * Every page used to fetch `/api/portfolio` and `/api/auth` on mount, so moving
 * between Projects, Experience and Qualifications hit both routes again each
 * time. These module-level caches survive client navigation, so each is
 * fetched once per page load and shared by whichever pages are mounted.
 *
 * Holds no bundled seed: `usePortfolio` adds the full default catalog for the
 * pages that list projects, while pages that only show editable text use
 * `useCatalog` directly and keep the 600-line seed out of their bundle.
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
 * Applies `mutate` to the freshest server copy, persists the whole catalog
 * and pushes the result to every mounted page. Resolves to whether it saved.
 */
export async function saveCatalog(mutate: (draft: PortfolioData) => void) {
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
}

/**
 * The live catalog. Starts from the copy the server rendered with, so the first
 * paint already shows R2 data; `null` only if the server could not read R2,
 * until the client fetch lands.
 */
export function useCatalog() {
  const initial = useContext(InitialCatalog)
  const [data, setData] = useState<PortfolioData | null>(cache ?? initial)

  useEffect(() => {
    subscribers.add(setData)
    if (cache) {
      setData(cache)
    } else if (initial) {
      publish(initial)
    } else {
      load()
        .then(publish)
        .catch((err) => console.error('Failed to load portfolio catalog:', err))
    }
    return () => {
      subscribers.delete(setData)
    }
  }, [initial])

  const save = useCallback(saveCatalog, [])
  return { data, save }
}

/** Fires the shared celebration burst used after a successful admin edit. */
export async function celebrate() {
  const confetti = (await import('canvas-confetti')).default
  confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } })
}
