"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import confetti from "canvas-confetti";

interface CertificateModalProps {
  image: string;
  title: string;
  onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({
  image,
  title,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
  }, [image]);

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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto p-6 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 z-10"
            aria-label="Close"
          >
            <X className="w-7 h-7" />
          </button>
          <div className="flex flex-col items-center justify-center">
            <Image
              src={image}
              alt={title}
              width={900}
              height={700}
              className="object-contain rounded-lg max-h-[70vh] w-auto h-auto"
              priority
            />
            <div className="mt-4 text-lg font-semibold text-center text-gray-800 dark:text-gray-100">
              {title}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CertificateModal;
