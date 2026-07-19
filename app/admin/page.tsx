"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ShieldAlert, KeyRound } from "lucide-react"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if already authenticated
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setIsAuthenticated(true)
        }
      })
      .catch(() => {})
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        setIsAuthenticated(true)
        router.push("/")
      } else {
        const data = await res.json()
        setError(data.error || "Incorrect password")
      }
    } catch (err) {
      setError("Failed to connect to authentication server")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/auth", { method: "DELETE" })
      if (res.ok) {
        setIsAuthenticated(false)
        router.refresh()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl p-8 max-w-md w-full text-center"
        >
          <div className="bg-green-100 dark:bg-green-950 p-4 rounded-full text-green-600 dark:text-green-400 w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <KeyRound className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Admin Authenticated</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            You are currently signed in as an administrator. Pencil edit controls are unlocked across projects, experience, and qualifications modals.
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => router.push("/")}
              className="bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all text-white font-semibold py-2.5 rounded-lg cursor-pointer"
            >
              Go to Home Page
            </button>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-red-500 text-sm font-semibold transition-all py-2 rounded-lg cursor-pointer"
              disabled={loading}
            >
              {loading ? "Signing out..." : "Sign Out"}
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl p-8 max-w-md w-full"
      >
        <div className="bg-blue-100 dark:bg-blue-950 p-4 rounded-full text-blue-600 dark:text-blue-400 w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">Admin Dashboard</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-6">
          Please enter your administrator password to unlock page customization controls.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm w-full text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs font-semibold bg-red-500/10 p-2.5 rounded-lg text-center">
              ❌ {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all text-white font-semibold py-2.5 rounded-lg cursor-pointer flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Authenticate"}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
