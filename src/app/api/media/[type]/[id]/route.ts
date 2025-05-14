import { getMovieDetails, getTVShowDetails } from "@/lib/tmdb"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { type: string; id: string } }) {
  try {
    const { type, id } = params

    if (type !== "movie" && type !== "tv") {
      return NextResponse.json({ error: "Tipo non valido" }, { status: 400 })
    }

    const mediaId = Number.parseInt(id)
    if (isNaN(mediaId)) {
      return NextResponse.json({ error: "ID non valido" }, { status: 400 })
    }

    const details = type === "movie" ? await getMovieDetails(mediaId) : await getTVShowDetails(mediaId)

    return NextResponse.json(details)
  } catch (error) {
    console.error("Errore durante il recupero dei dettagli:", error)
    return NextResponse.json({ error: "Errore durante il recupero dei dettagli" }, { status: 500 })
  }
}
