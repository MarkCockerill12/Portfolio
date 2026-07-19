import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import { PortfolioData } from "./types"

const { R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_ENDPOINT, R2_BUCKET_NAME } = process.env

const s3Client = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT || "",
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID || "",
    secretAccessKey: R2_SECRET_ACCESS_KEY || "",
  },
})

const DATA_KEY = "portfolio/portfolio.json"

export async function getPortfolioFromR2(): Promise<PortfolioData | null> {
  try {
    const command = new GetObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: DATA_KEY,
    })
    const response = await s3Client.send(command)
    if (!response.Body) return null
    const dataStr = await response.Body.transformToString()
    return JSON.parse(dataStr)
  } catch (err: any) {
    if (err.name === "NoSuchKey") {
      console.log("portfolio.json not found in R2 bucket.")
      return null
    }
    console.error("Error reading portfolio database from R2:", err)
    throw err
  }
}

export async function savePortfolioToR2(data: PortfolioData): Promise<boolean> {
  try {
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: DATA_KEY,
      Body: JSON.stringify(data, null, 2),
      ContentType: "application/json",
      CacheControl: "no-cache, no-store, must-revalidate",
    })
    await s3Client.send(command)
    return true
  } catch (err) {
    console.error("Error saving portfolio database to R2:", err)
    return false
  }
}

export async function uploadMediaToR2(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string
): Promise<string | null> {
  try {
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: fileName,
      Body: fileBuffer,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000",
    })
    await s3Client.send(command)
    return `${process.env.R2_PUBLIC_URL}/${fileName}`
  } catch (err) {
    console.error("Error uploading file to R2:", err)
    return null
  }
}
