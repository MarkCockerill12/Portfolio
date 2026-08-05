'use client'

import { ReactNode, RefObject, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { Pencil } from 'lucide-react'

/**
 * Closes a modal on Escape or on a click landing outside `ref`.
 * Shared by every modal so the listener pairs stay symmetrical.
 */
export function useDismissable(ref: RefObject<HTMLElement | null>, onClose: () => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    globalThis.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      globalThis.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, onClose])
}

interface ModalShellProps {
  title: string
  onClose: () => void
  children: ReactNode
  isAdmin?: boolean
  isEditing?: boolean
  onEdit?: () => void
  /** Extra classes for the centred window title, e.g. to constrain its width. */
  titleClassName?: string
}

/**
 * The macOS-style window chrome shared by the Experience, Education and
 * Module modals: dimmed backdrop, traffic lights, centred title and an
 * optional pencil that flips the body into its edit form.
 */
export default function ModalShell({
  title,
  onClose,
  children,
  isAdmin = false,
  isEditing = false,
  onEdit,
  titleClassName = '',
}: ModalShellProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  useDismissable(modalRef, onClose)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Window Header */}
        <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button onClick={onClose} className="w-3 h-3 bg-red-500 rounded-full cursor-pointer" aria-label="Close" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>

            <div className={`absolute left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2 ${titleClassName}`}>
              <span>{title}</span>
              {isAdmin && !isEditing && (
                <button
                  onClick={onEdit}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-gray-500 dark:hover:text-gray-100 transition-all cursor-pointer flex-shrink-0"
                  aria-label={`Edit ${title}`}
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="w-16"></div>
          </div>
        </div>

        {children}
      </motion.div>
    </motion.div>
  )
}
