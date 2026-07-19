"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldCheck } from "lucide-react"

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("portfolio-cookie-consent")
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("portfolio-cookie-consent", "accepted")
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50"
        >
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-xl p-5 md:p-6 flex flex-col gap-4">
            <div className="flex gap-3 items-start">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-2.5 rounded-lg text-blue-600 dark:text-blue-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm md:text-base">
                  Cookie Notice
                </h4>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  We use cookies to enhance your experience and keep you authenticated as an administrator. By browsing, you consent to our use of essential cookies.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2 text-xs font-semibold">
              <button
                onClick={handleAccept}
                className="bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all text-white px-4 py-2 rounded-lg cursor-pointer"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
