import { unstable_cache } from 'next/cache'
import { getPortfolioFromR2 } from './r2'
import { PortfolioData } from './types'

/** Cache tag for the R2 catalog; the admin PUT revalidates it so edits show at once. */
export const PORTFOLIO_TAG = 'portfolio'

/** How long (seconds) a rendered page may serve a catalog edited outside the admin UI. */
export const CATALOG_REVALIDATE = 60

const readCatalog = unstable_cache(getPortfolioFromR2, ['portfolio-catalog'], {
  tags: [PORTFOLIO_TAG],
  revalidate: CATALOG_REVALIDATE,
})

/**
 * The live catalog from R2, read on the server so pages render with real data
 * instead of the bundled seed. Returns null if R2 is unreachable or empty; the
 * client then falls back to fetching `/api/portfolio` itself.
 */
export async function getCatalog(): Promise<PortfolioData | null> {
  try {
    return await readCatalog()
  } catch (err) {
    console.error('Failed to read portfolio catalog from R2:', err)
    return null
  }
}
