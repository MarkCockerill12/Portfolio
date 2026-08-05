import { timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const COOKIE_NAME = "admin_session"

/** Constant-time compare so a wrong password cannot be narrowed down by timing. */
function matches(candidate: string, expected: string) {
  const a = Buffer.from(candidate)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    const expectedPassword = process.env.ADMIN_PASSWORD

    if (!expectedPassword) {
      return NextResponse.json({ error: "Administration password is not configured on the server environment" }, { status: 500 })
    }

    if (typeof password === "string" && matches(password, expectedPassword)) {
      const cookieStore = await cookies()
      cookieStore.set(COOKIE_NAME, "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        // No maxAge: this is a session cookie, so closing the browser signs
        // the admin out and the password is required again next visit.
        path: "/",
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Incorrect password" }, { status: 401 })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}

export async function GET() {
  const cookieStore = await cookies()
  const authenticated = cookieStore.get(COOKIE_NAME)?.value === "authenticated"
  return NextResponse.json({ authenticated })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
  return NextResponse.json({ success: true })
}
