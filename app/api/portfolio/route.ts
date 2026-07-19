import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { getPortfolioFromR2, savePortfolioToR2 } from "@/lib/r2"
import { defaultPortfolioData } from "@/lib/default-portfolio"

export async function GET() {
  try {
    let data = await getPortfolioFromR2()
    if (!data) {
      console.log("Seeding R2 with default portfolio data...")
      const success = await savePortfolioToR2(defaultPortfolioData)
      if (success) {
        data = defaultPortfolioData
      } else {
        return NextResponse.json({ error: "Failed to seed default portfolio data" }, { status: 500 })
      }
    }
    return NextResponse.json(data)
  } catch (error: any) {
    console.error("Error fetching portfolio database:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch portfolio data" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")?.value
  if (session !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { updatedData } = await request.json()
    if (!updatedData) {
      return NextResponse.json({ error: "Invalid payload data" }, { status: 400 })
    }

    const success = await savePortfolioToR2(updatedData)
    if (!success) {
      return NextResponse.json({ error: "Failed to save portfolio data to Cloudflare R2" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: updatedData })
  } catch (error: any) {
    console.error("Error updating portfolio:", error)
    return NextResponse.json({ error: error.message || "Failed to update portfolio" }, { status: 500 })
  }
}
