'use client'

import { useCallback, useState } from 'react'

/**
 * Pushes a picked file through `/api/upload` into R2 and hands back its public
 * URL. Images are transcoded to WebP server-side, so the returned URL may have
 * a different extension than the file that went in.
 */
export function useUpload(folder: string) {
  const [uploading, setUploading] = useState(false)

  const upload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>): Promise<string | null> => {
      const file = e.target.files?.[0]
      if (!file) return null

      setUploading(true)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        if (!res.ok) {
          const { error } = await res.json().catch(() => ({ error: null }))
          alert(error || 'Failed to upload file.')
          return null
        }
        const data = await res.json()
        return data.url as string
      } catch (err) {
        console.error(err)
        alert('Error uploading file to Cloudflare R2.')
        return null
      } finally {
        setUploading(false)
        // Let the same file be re-picked if the upload failed.
        e.target.value = ''
      }
    },
    [folder]
  )

  return { upload, uploading }
}
