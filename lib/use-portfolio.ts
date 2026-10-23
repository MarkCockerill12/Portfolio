'use client'

import { defaultPortfolioData } from './default-portfolio'
import { celebrate, useCatalog } from './portfolio-store'

export { celebrate }

/**
 * Reads the portfolio catalog, seeded with the bundled defaults so the page
 * paints immediately, then swapped for the live copy from R2.
 *
 * `save` takes a mutator, applies it to the freshest server copy, persists the
 * whole catalog and pushes the result to every mounted page.
 */
export function usePortfolio() {
  const { data, save } = useCatalog()
  return { data: data ?? defaultPortfolioData, save }
}
