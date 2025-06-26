import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const genresParam = searchParams.get("genres")
    const type = searchParams.get("type") || "all"
    const page = Number.parseInt(searchParams.get("page") || "1", 10)

    if (!genresParam) {
      return NextResponse.json({ error: "Il parametro genres è obbligatorio" }, { status: 400 })
    }

    const genreIds = genresParam.split(",").map(Number)

    // Costruisci le URL per le richieste all'API TMDB
    const apiKey = process.env.TMDB_API_KEY
    const baseUrl = "https://api.themoviedb.org/3"

    // Determina quali endpoint chiamare in base al tipo
    const endpoints = []
    if (type === "all" || type === "movie") {
      // Ordina per popolarità per mostrare i contenuti in tendenza per primi
      endpoints.push(
        `${baseUrl}/discover/movie?api_key=${apiKey}&language=it-IT&sort_by=popularity.desc&with_genres=${genreIds.join(",")}&page=${page}`,
      )
    }
    if (type === "all" || type === "tv") {
      // Ordina per popolarità per mostrare i contenuti in tendenza per primi
      endpoints.push(
        `${baseUrl}/discover/tv?api_key=${apiKey}&language=it-IT&sort_by=popularity.desc&with_genres=${genreIds.join(",")}&page=${page}`,
      )
    }

    // Esegui le richieste in parallelo
    const responses = await Promise.all(endpoints.map((url) => fetch(url)))

    // Verifica che tutte le risposte siano valide
    for (const response of responses) {
      if (!response.ok) {
        throw new Error(`Errore nella richiesta all'API TMDB: ${response.status}`)
      }
    }

    // Converti le risposte in JSON
    const data = await Promise.all(responses.map((response) => response.json()))

    // Combina i risultati
    let combinedResults = []
    let totalResults = 0
    let totalPages = 0

    if (type === "all") {
      // Se cerchiamo sia film che serie TV, combiniamo i risultati
      const movieData = data[0]
      const tvData = data[1]

      // Aggiungi il tipo di media a ogni risultato
      const movieResults = movieData.results.map((item: any) => ({ ...item, media_type: "movie" }))
      const tvResults = tvData.results.map((item: any) => ({ ...item, media_type: "tv" }))

      // Combina e ordina per popolarità (i più in tendenza per primi)
      combinedResults = [...movieResults, ...tvResults].sort((a, b) => b.popularity - a.popularity)

      totalResults = movieData.total_results + tvData.total_results
      totalPages = Math.max(movieData.total_pages, tvData.total_pages)
    } else {
      // Se cerchiamo solo film o solo serie TV, usiamo direttamente i risultati
      combinedResults = data[0].results.map((item: any) => ({ ...item, media_type: type }))
      totalResults = data[0].total_results
      totalPages = data[0].total_pages
    }

    // Non filtriamo più per qualità - mostriamo tutti i risultati
    // Manteniamo solo il filtro per il poster per evitare contenuti senza immagine
    const filteredResults = combinedResults.filter((item: any) => {
      return item.poster_path // Solo contenuti con poster
    })

    return NextResponse.json({
      results: filteredResults,
      total_results: totalResults,
      total_pages: totalPages,
      page,
    })
  } catch (error) {
    console.error("Errore durante il recupero dei consigli:", error)
    return NextResponse.json(
      { error: "Si è verificato un errore durante il recupero dei consigli", details: (error as Error).message },
      { status: 500 },
    )
  }
}
