'use client'

import { startTransition, useCallback, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'

/**
 * Crossfades the main content between routes using the View Transitions API.
 *
 * Next's own `experimental.viewTransition` flag needs React's `<ViewTransition>`
 * component, which only exists in React's experimental channel — so instead this
 * intercepts internal link clicks and drives `document.startViewTransition`
 * around the client-side navigation.
 *
 * `router.push` returns before React has committed the new route, so the
 * transition is held open by a promise that resolves once `usePathname`
 * reports the new URL, i.e. once the new page has actually rendered.
 *
 * Browsers without the API (Firefox < 144) simply navigate instantly.
 */
export default function ViewTransitions() {
  const router = useRouter()
  const pathname = usePathname()

  const resolveRef = useRef<(() => void) | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Releases the held transition. The API freezes interaction until the
  // callback promise settles, so this must run even if navigation stalls.
  const finish = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    resolveRef.current?.()
    resolveRef.current = null
  }, [])

  // The new route has committed and painted.
  useEffect(() => {
    finish()
  }, [pathname, finish])

  useEffect(() => () => finish(), [finish])

  useEffect(() => {
    if (typeof document.startViewTransition !== 'function') return
    if (globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onClick = (event: MouseEvent) => {
      // Leave anything the browser should handle natively alone: new tabs,
      // middle/right clicks, downloads, external hosts and in-page anchors.
      if (event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = (event.target as Element | null)?.closest?.('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || anchor.hasAttribute('download')) return
      if (anchor.target && anchor.target !== '_self') return
      if (anchor.getAttribute('rel')?.includes('external')) return

      const url = new URL(href, location.href)
      if (url.origin !== location.origin) return
      // Same page: either a hash jump or a no-op. Nothing to crossfade.
      if (url.pathname === location.pathname) return

      // Next's <Link> has its own delegated handler on `document`, registered
      // during hydration and therefore ahead of this one. Stopping propagation
      // here in the capture phase keeps Link from navigating on its own; this
      // component drives the same navigation inside the transition instead.
      event.preventDefault()
      event.stopPropagation()

      document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            resolveRef.current = resolve
            // Safety valve: never leave the page frozen if the route never lands.
            timerRef.current = setTimeout(finish, 800)
            startTransition(() => router.push(url.pathname + url.search + url.hash))
          })
      )
    }

    // Capture phase: must run before Link's bubble-phase handler.
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [router, finish])

  return null
}
