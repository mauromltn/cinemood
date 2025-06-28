import { NextResponse } from "next/server"

/*
 * GENERI SUPPORTATI:
 * 
 * FILM:
 * 28: Azione, 12: Avventura, 16: Animazione, 35: Commedia, 80: Crime,
 * 99: Documentario, 18: Drammatico, 10751: Famiglia, 14: Fantasy, 36: Storico,
 * 27: Horror, 10402: Musica, 9648: Mistero, 10749: Romantico, 878: Fantascienza,
 * 10770: Film TV, 53: Thriller, 10752: Guerra, 37: Western
 * 
 * SERIE TV:
 * 10759: Azione e Avventura, 16: Animazione, 35: Commedia, 80: Crime,
 * 99: Documentario, 18: Drammatico, 10751: Famiglia, 10762: Kids, 9648: Mistero,
 * 10763: News, 10764: Reality, 10765: Sci-Fi & Fantasy, 10766: Soap,
 * 10767: Talk, 10768: Guerra e Politica, 37: Western
 * 
 * GENERI COMUNI (stesso ID per film e TV): 16, 35, 80, 99, 18, 10751, 9648, 37
 */

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
    const requests: { url: string; type: "movie" | "tv" }[] = []
    
    if (type === "all" || type === "movie") {
      requests.push({
        url: `${baseUrl}/discover/movie?api_key=${apiKey}&language=it-IT&sort_by=popularity.desc&with_genres=${genreIds.join(",")}&page=${page}`,
        type: "movie"
      })
    }
    
    if (type === "all" || type === "tv") {
      requests.push({
        url: `${baseUrl}/discover/tv?api_key=${apiKey}&language=it-IT&sort_by=popularity.desc&with_genres=${genreIds.join(",")}&page=${page}`,
        type: "tv"
      })
    }

    // Esegui le richieste in parallelo
    const responses = await Promise.all(requests.map(req => fetch(req.url)))

    // Verifica che tutte le risposte siano valide
    for (let i = 0; i < responses.length; i++) {
      if (!responses[i].ok) {
        throw new Error(`Errore nella richiesta all'API TMDB per ${requests[i].type}: ${responses[i].status}`)
      }
    }

    // Converti le risposte in JSON e associale al tipo
    const dataWithTypes = await Promise.all(
      responses.map(async (response, index) => ({
        data: await response.json(),
        type: requests[index].type
      }))
    )

    // Combina i risultati
    const combinedResults = []
    let totalResults = 0
    let totalPages = 0

    for (const { data, type: mediaType } of dataWithTypes) {
      // Aggiungi il tipo di media a ogni risultato
      const results = data.results.map((item: any) => ({ ...item, media_type: mediaType }))
      combinedResults.push(...results)
      
      totalResults += data.total_results
      totalPages = Math.max(totalPages, data.total_pages)
    }

    // Ordina per popolarità (i più in tendenza per primi)
    combinedResults.sort((a, b) => b.popularity - a.popularity)

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
