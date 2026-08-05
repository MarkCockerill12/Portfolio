import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import sharp from "sharp"
import { uploadMediaToR2 } from "@/lib/r2"

/** Vercel caps serverless request bodies at ~4.5 MB, so reject early with a clear message. */
const MAX_BYTES = 4.5 * 1024 * 1024
const ALLOWED_PREFIXES = ["image/", "video/"]
/** Animated and vector formats are stored as-is; re-encoding them to WebP loses the point. */
const PASSTHROUGH_IMAGES = ["image/gif", "image/svg+xml"]

export async function POST(request: Request) {
  const cookieStore = await cookies()
  if (cookieStore.get("admin_session")?.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file")
    const folder = (formData.get("folder") as string) || "portfolio/media"

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (!ALLOWED_PREFIXES.some((prefix) => file.type.startsWith(prefix))) {
      return NextResponse.json({ error: "Only image and video uploads are allowed" }, { status: 415 })
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: `File is ${(file.size / 1024 / 1024).toFixed(1)} MB; the limit is 4.5 MB` },
        { status: 413 }
      )
    }

    // Keep the key inside the intended prefix: a crafted folder or filename
    // must not be able to climb out of portfolio/media.
    const safeFolder = folder.replace(/\.\./g, "").replace(/^\/+|\/+$/g, "")
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
    let key = `${safeFolder}/${Date.now()}-${sanitizedName}`

    let buffer = Buffer.from(await file.arrayBuffer())
    let contentType = file.type

    if (file.type.startsWith("image/") && !PASSTHROUGH_IMAGES.includes(file.type)) {
      try {
        buffer = await sharp(buffer).webp({ quality: 85 }).toBuffer()
        contentType = "image/webp"
        key = key.replace(/(\.[^./]*)?$/, ".webp")
      } catch (sharpError) {
        console.warn("Sharp image conversion failed; uploading original format.", sharpError)
      }
    }

    const publicUrl = await uploadMediaToR2(buffer, key, contentType || "application/octet-stream")
    if (!publicUrl) {
      return NextResponse.json({ error: "Failed to upload file to R2" }, { status: 500 })
    }

    return NextResponse.json({ success: true, url: publicUrl })
  } catch (error: any) {
    console.error("R2 Upload Error:", error)
    return NextResponse.json({ error: error.message || "Failed to upload file to R2" }, { status: 500 })
  }
}
