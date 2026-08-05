'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Film, Image as ImageIcon, ExternalLink, Pencil, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { GitHubMark } from './BrandIcons'
import { useDismissable } from './ModalShell'
import { useUpload } from '@/lib/use-upload'
import { Project } from '@/lib/types'

interface ProjectModalProps {
  project: Project
  onClose: () => void
  isAdmin?: boolean
  onProjectUpdated?: (updatedProject: Project) => void
  onProjectDeleted?: (id: number) => void
}

const ProjectModal: React.FC<ProjectModalProps> = ({ 
  project, 
  onClose,
  isAdmin = false,
  onProjectUpdated,
  onProjectDeleted
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [isLarge, setIsLarge] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Edit form states
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(project.title)
  const [editDesc, setEditDesc] = useState(project.description)
  const [editDetails, setEditDetails] = useState(project.details)
  const [editTech, setEditTech] = useState(project.technologies.join(", "))
  const [editCats, setEditCats] = useState(project.categories.join(", "))
  const [editGithub, setEditGithub] = useState(project.github || "")
  const [editHuggingface, setEditHuggingface] = useState(project.huggingface || "")
  const [editDemo, setEditDemo] = useState(project.demo || "")
  
  // Media edit states
  const [editImages, setEditImages] = useState<string[]>(project.media.images || [])
  const [editVideo, setEditVideo] = useState(project.media.video || "")
  const { upload: uploadImage, uploading } = useUpload("portfolio/media/projects")
  const { upload: uploadVideo, uploading: uploadingVideo } = useUpload("portfolio/media/projects")

  useEffect(() => {
    // Reset edit fields when project changes
    setEditTitle(project.title)
    setEditDesc(project.description)
    setEditDetails(project.details)
    setEditTech(project.technologies.join(", "))
    setEditCats(project.categories.join(", "))
    setEditGithub(project.github || "")
    setEditHuggingface(project.huggingface || "")
    setEditDemo(project.demo || "")
    setEditImages(project.media.images || [])
    setEditVideo(project.media.video || "")
    
    // Auto-enter edit mode for brand new projects
    if (project.title === "New Project Title") {
      setIsEditing(true)
    } else {
      setIsEditing(false)
    }
  }, [project])

  const playSound = (frequency: number, duration: number = 200) => {
    try {
      const audioContext = new (globalThis.AudioContext || (globalThis as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = frequency
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration / 1000)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration / 1000)
    } catch (e) {
      console.warn("AudioContext block", e)
    }
  }

  const handleGreenButton = () => {
    playSound(800, 150)
    setIsLarge(!isLarge)
  }

  const handleYellowButton = () => {
    playSound(400, 200)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = await uploadImage(e)
    if (url) setEditImages((prev) => [...prev, url])
  }

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = await uploadVideo(e)
    if (url) setEditVideo(url)
  }

  const handleRemoveImage = (index: number) => {
    setEditImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    const updated: Project = {
      ...project,
      title: editTitle,
      description: editDesc,
      details: editDetails,
      technologies: editTech.split(",").map(t => t.trim()).filter(Boolean),
      categories: editCats.split(",").map(c => c.trim()).filter(Boolean),
      media: {
        images: editImages,
        video: editVideo || undefined
      },
      github: editGithub || undefined,
      huggingface: editHuggingface || undefined,
      demo: editDemo || undefined
    }
    onProjectUpdated?.(updated)
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
      onProjectDeleted?.(project.id)
      onClose()
    }
  }

  useDismissable(modalRef, onClose)

  // Arrow keys page through the gallery, but only while it is on screen.
  useEffect(() => {
    if (showVideo || isEditing) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const count = project.media.images?.length || 1
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex(prev => (prev === 0 ? count - 1 : prev - 1))
      }
      if (e.key === 'ArrowRight') {
        setCurrentImageIndex(prev => (prev === count - 1 ? 0 : prev + 1))
      }
    }

    globalThis.addEventListener('keydown', handleKeyDown)
    return () => globalThis.removeEventListener('keydown', handleKeyDown)
  }, [project.media.images, showVideo, isEditing])

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
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl ${
          isLarge ? 'max-w-7xl w-[95vw]' : 'max-w-5xl w-full'
        } max-h-[90vh] overflow-hidden`}
      >
        {/* Window Controls Header */}
        <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Red Button - Close */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-3 h-3 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center group cursor-pointer"
                aria-label="Close"
              >
                <X className="w-2 h-2 text-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
              
              {/* Yellow Button - Minimize */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleYellowButton}
                className="w-3 h-3 bg-yellow-500 hover:bg-yellow-600 rounded-full flex items-center justify-center group cursor-pointer"
                aria-label="Minimize"
              >
                <div className="w-2 h-0.5 bg-yellow-800 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
              
              {/* Green Button - Maximize/Restore */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleGreenButton}
                className="w-3 h-3 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center group cursor-pointer"
                aria-label={isLarge ? "Restore" : "Maximize"}
              >
                <div className="w-1.5 h-1.5 border border-green-800 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </div>
            
            {/* Window Title */}
            <div className="absolute left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
              <span>{project.title}</span>
              {isAdmin && !isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-gray-100 transition-all cursor-pointer"
                  title="Edit Project"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            
            <div className="w-16"></div>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} className="p-6 overflow-y-auto max-h-[calc(90vh-60px)] space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Edit Project Details</h3>
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Title</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Short Description</label>
              <input
                type="text"
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Detailed Description (HTML/text)</label>
              <textarea
                value={editDetails}
                onChange={(e) => setEditDetails(e.target.value)}
                rows={5}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none font-mono text-xs leading-relaxed"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={editTech}
                  onChange={(e) => setEditTech(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Categories (comma-separated)</label>
                <input
                  type="text"
                  value={editCats}
                  onChange={(e) => setEditCats(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Project Images</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {editImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-video border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden group bg-gray-50 dark:bg-gray-900">
                    <Image src={img} alt="Preview" fill className="object-contain" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 bg-black/60 hover:bg-red-650 text-white p-1 rounded transition-colors cursor-pointer"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                
                <label className="border border-dashed border-gray-300 dark:border-gray-650 hover:border-blue-500 dark:hover:border-blue-400 rounded-lg aspect-video flex flex-col items-center justify-center cursor-pointer transition-colors bg-gray-50 dark:bg-gray-900/50">
                  <span className="text-xs font-semibold text-gray-550 dark:text-gray-400">
                    {uploading ? "Uploading..." : "+ Upload Image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2 space-y-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Project Video URL (Optional)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editVideo}
                    onChange={(e) => setEditVideo(e.target.value)}
                    className="flex-grow bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
                    placeholder="https://example.com/video.mp4"
                  />
                  <label className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-2 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-200 cursor-pointer flex items-center justify-center shrink-0 transition-colors">
                    {uploadingVideo ? "Uploading..." : "Upload File"}
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                      disabled={uploadingVideo}
                    />
                  </label>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">GitHub Link</label>
                <input
                  type="text"
                  value={editGithub}
                  onChange={(e) => setEditGithub(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Live Demo Link</label>
                <input
                  type="text"
                  value={editDemo}
                  onChange={(e) => setEditDemo(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-between pt-4">
              {isAdmin && project.title !== "New Project Title" && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg text-sm font-semibold transition-all cursor-pointer"
                >
                  Delete Project
                </button>
              )}
              <div className="flex gap-2 ml-auto">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-all cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-60px)]">
            <div className={`relative ${isLarge ? 'h-[75vh]' : 'h-[50vh]'} mb-4 rounded-lg overflow-hidden bg-white dark:bg-gray-800`}>
              {project.media.images && project.media.images.length > 0 && !showVideo && (
                <>
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full"
                    >
                      <Image 
                        src={project.media.images[currentImageIndex]} 
                        alt={`${project.title} - Image ${currentImageIndex + 1}`} 
                        fill
                        className="object-contain"
                        sizes="(max-width: 1200px) 100vw, 1200px"
                        priority
                      />
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full">
                        {currentImageIndex + 1} / {project.media.images.length}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {project.media.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setCurrentImageIndex(prev => 
                            prev === 0 ? project.media.images.length - 1 : prev - 1
                          )
                        }}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-all"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setCurrentImageIndex(prev => 
                            prev === project.media.images.length - 1 ? 0 : prev + 1
                          )
                        }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-all"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                </>
              )}

              {project.media.video && (
                <div className={`w-full h-full ${showVideo ? 'block' : 'hidden'}`}>
                  <video 
                    src={project.media.video} 
                    controls 
                    className="w-full h-full object-contain"
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              <div className="absolute top-4 right-4 flex gap-2">
                {project.media.video && project.media.images && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowVideo(!showVideo)
                    }}
                    className="bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-all flex items-center gap-2"
                  >
                    {showVideo ? <ImageIcon className="w-5 h-5" /> : <Film className="w-5 h-5" />}
                    {showVideo ? 'View Images' : 'Play Video'}
                  </motion.button>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Technologies Used:</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 
                               text-xs font-semibold px-2.5 py-0.5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Project Details:</h3>
                <div 
                  className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200"
                  dangerouslySetInnerHTML={{ __html: project.details }}
                />
              </div>

              <div className="flex gap-4 justify-end">
                {project.github && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                             px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 
                             transition-colors cursor-pointer"
                  >
                    <GitHubMark className="w-5 h-5" />
                    View on GitHub
                  </motion.a>
                )}
                {project.huggingface && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.huggingface}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg 
                             hover:bg-orange-600 transition-colors cursor-pointer"
                  >
                    <Image src="https://pub-699441ce0cfb40449cc458823a3f1ed2.r2.dev/portfolio/media/hf-logo.webp" alt="Hugging Face" width={20} height={20} />
                    View on Hugging Face
                  </motion.a>
                )}
                {project.demo && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg 
                             hover:bg-blue-600 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Live Demo
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default ProjectModal