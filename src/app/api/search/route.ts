import { NextResponse } from "next/server"
import { searchMedia } from "@/lib/tmdb"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")
  const page = Number(searchParams.get("page")) || 1

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    const results = await searchMedia(query, page)
    return NextResponse.json(results)
  } catch (error) {
    console.error("Error searching media:", error)
    return NextResponse.json({ error: "Failed to search media" }, { status: 500 })
  }
}
