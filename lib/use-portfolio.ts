'use client'

import { defaultPortfolioData } from './default-portfolio'
import { celebrate, useCatalog } from './portfolio-store'

export { celebrate }

/**
 * Reads the portfolio catalog. Pages render with the live R2 copy the server
 * passed down; the bundled defaults are only an offline fallback for when R2
 * could not be read, so new projects belong in R2 alone.
 *
 * `save` takes a mutator, applies it to the freshest server copy, persists the
 * whole catalog and pushes the result to every mounted page.
 */
export function usePortfolio() {
  const { data, save } = useCatalog()
  return { data: data ?? defaultPortfolioData, save }
}
