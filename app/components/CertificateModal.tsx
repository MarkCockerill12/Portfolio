"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Pencil } from "lucide-react";
import confetti from "canvas-confetti";
import { Certificate } from "@/lib/types";

interface CertificateModalProps {
  certificate: Certificate;
  onClose: () => void;
  isAdmin?: boolean;
  onCertificateUpdated?: (updated: Certificate) => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
  isAdmin = false,
  onCertificateUpdated,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(certificate.title);
  const [editDesc, setEditDesc] = useState(certificate.description);

  useEffect(() => {
    // Fire confetti on modal open using default canvas (document body)
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.8 },
      startVelocity: 45,
      gravity: 0.9,
      scalar: 1.2,
      ticks: 200,
      zIndex: 10000,
      disableForReducedMotion: true,
      shapes: ["square", "circle"],
      colors: [
        "#FFD700",
        "#FF69B4",
        "#00CFFF",
        "#FF6347",
        "#7CFC00",
        "#FFB347",
        "#8A2BE2",
        "#FF4500",
      ],
    });
  }, [certificate.image]);

  useEffect(() => {
    setEditTitle(certificate.title);
    setEditDesc(certificate.description);
    setIsEditing(false);
  }, [certificate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onCertificateUpdated?.({
      ...certificate,
      title: editTitle,
      description: editDesc,
    });
    setIsEditing(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto p-6 relative border border-gray-100 dark:border-gray-800"
        >
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            {isAdmin && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500 hover:text-gray-850 dark:hover:text-gray-100 transition-all cursor-pointer"
                title="Edit Certificate Details"
              >
                <Pencil className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500 hover:text-red-500 transition-all cursor-pointer"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4 pt-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Edit Certificate</h3>
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500">Certificate Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500">Description</label>
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  rows={4}
                  className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none leading-relaxed"
                  required
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3.5 py-1.5 border border-gray-300 dark:border-gray-700 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-blue-500 text-white hover:bg-blue-600 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center pt-6">
              <div className="relative w-full h-[55vh] max-h-[500px]">
                <Image
                  src={certificate.image}
                  alt={certificate.title}
                  fill
                  className="object-contain rounded-lg"
                  priority
                />
              </div>
              <div className="mt-6 text-xl font-bold text-center text-gray-900 dark:text-gray-100">
                {certificate.title}
              </div>
              <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
                {certificate.description}
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CertificateModal;
