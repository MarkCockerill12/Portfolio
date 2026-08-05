'use client'

import { useEffect, useState } from 'react'

/**
 * Shared admin-session state.
 *
 * Kept separate from the portfolio catalog so pages that only need to know
 * "is an admin signed in?" (such as /admin itself) do not pull the bundled
 * default portfolio data into their bundle.
 *
 * Every page used to call `/api/auth` on mount; this caches the answer for the
 * lifetime of the page load and shares it across client navigation.
 */
let adminCache: boolean | null = null
const subscribers = new Set<(value: boolean) => void>()

/** Updates every mounted page after an admin signs in or out. */
export function setAdminSession(value: boolean) {
  adminCache = value
  for (const notify of subscribers) notify(value)
}

/** Reports whether the current visitor holds a valid `admin_session` cookie. */
export function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(adminCache ?? false)

  useEffect(() => {
    subscribers.add(setIsAdmin)
    if (adminCache !== null) {
      setIsAdmin(adminCache)
    } else {
      fetch('/api/auth')
        .then((res) => res.json())
        .then((data) => setAdminSession(Boolean(data.authenticated)))
        .catch(() => setAdminSession(false))
    }
    return () => {
      subscribers.delete(setIsAdmin)
    }
  }, [])

  return isAdmin
}
