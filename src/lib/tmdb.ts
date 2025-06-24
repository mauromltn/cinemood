import type { Movie, TVShow, MovieDetails, TVShowDetails, WatchProviders, Videos, Credits } from "./types"

const TMDB_API_KEY = process.env.TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

// Mappa degli ID dei generi ai loro nomi
const movieGenres: Record<number, string> = {
  28: "Azione",
  12: "Avventura",
  16: "Animazione",
  35: "Commedia",
  80: "Crime",
  99: "Documentario",
  18: "Drammatico",
  10751: "Famiglia",
  14: "Fantasy",
  36: "Storico",
  27: "Horror",
  10402: "Musica",
  9648: "Mistero",
  10749: "Romantico",
  878: "Fantascienza",
  10770: "Film TV",
  53: "Thriller",
  10752: "Guerra",
  37: "Western",
}

const tvGenres: Record<number, string> = {
  10759: "Azione & Avventura",
  16: "Animazione",
  35: "Commedia",
  80: "Crime",
  99: "Documentario",
  18: "Drammatico",
  10751: "Famiglia",
  10762: "Bambini",
  9648: "Mistero",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "Guerra & Politica",
  37: "Western",
}

async function fetchFromTMDB(endpoint: string) {
  const url = `${BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=it-IT`

  const response = await fetch(url, { next: { revalidate: 3600 } }) // Cache per 1 ora

  if (!response.ok) {
    throw new Error(`Errore durante il recupero dei dati da TMDB: ${response.status}`)
  }

  return response.json()
}

export async function getTrendingMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB("/trending/movie/week")
  return data.results
}

export async function getTrendingTVShows(): Promise<TVShow[]> {
  const data = await fetchFromTMDB("/trending/tv/week")
  return data.results
}

export function getGenreNames(genreIds: number[], type: "movie" | "tv"): string[] {
  const genreMap = type === "movie" ? movieGenres : tvGenres
  return genreIds
    .map((id) => genreMap[id])
    .filter(Boolean)
    .slice(0, 2) // Limitiamo a 2 generi per non sovraccaricare la UI
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
  const details = await fetchFromTMDB(`/movie/${id}`)
  const watchProviders = await getWatchProviders("movie", id)
  const videos = await getVideos("movie", id)
  const credits = await getCredits("movie", id)
  return { ...details, watch_providers: watchProviders, videos, credits }
}

export async function getTVShowDetails(id: number): Promise<TVShowDetails> {
  const details = await fetchFromTMDB(`/tv/${id}`)
  const watchProviders = await getWatchProviders("tv", id)
  const videos = await getVideos("tv", id)
  const credits = await getCredits("tv", id)
  return { ...details, watch_providers: watchProviders, videos, credits }
}

export async function getWatchProviders(type: "movie" | "tv", id: number): Promise<WatchProviders> {
  return fetchFromTMDB(`/${type}/${id}/watch/providers`)
}

export async function getVideos(type: "movie" | "tv", id: number): Promise<Videos> {
  return fetchFromTMDB(`/${type}/${id}/videos`)
}

export async function getCredits(type: "movie" | "tv", id: number): Promise<Credits> {
  return fetchFromTMDB(`/${type}/${id}/credits`)
}

// Tipo combinato per i risultati di ricerca
export type MediaItem = (Movie | TVShow) & { media_type: "movie" | "tv" }

interface TMDBSearchResult {
  media_type: string
  vote_average?: number
}

interface TMDBSearchResponse {
  results: TMDBSearchResult[]
  total_pages: number
  total_results: number
  page: number
}

// Funzione di ricerca aggiornata per combinare e ordinare i risultati
export async function searchMedia(query: string, page = 1) {
  if (!query.trim()) {
    return {
      results: [],
      total_pages: 0,
      total_results: 0,
      page: 1,
    }
  }

  try {
    // Utilizziamo la ricerca multi per ottenere sia film che serie TV
    const multiUrl = `${BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&language=it-IT&query=${encodeURIComponent(
      query,
    )}&page=${page}`

    const response = await fetch(multiUrl)

    if (!response.ok) {
      throw new Error(`Errore nella ricerca: ${response.status}`)
    }

    const data = await response.json() as TMDBSearchResponse

    // Filtriamo i risultati per includere solo film e serie TV
    const filteredResults = data.results.filter((item: TMDBSearchResult) => item.media_type === "movie" || item.media_type === "tv")

    // Ordiniamo i risultati per voto medio (dal più alto al più basso)
    const sortedResults = filteredResults.sort((a: TMDBSearchResult, b: TMDBSearchResult) => {
      // Gestisci i casi in cui vote_average potrebbe essere null o undefined
      const voteA = a.vote_average || 0
      const voteB = b.vote_average || 0
      return voteB - voteA
    })

    return {
      results: sortedResults as MediaItem[],
      total_pages: data.total_pages || 0,
      total_results: data.total_results || 0,
      page: data.page || 1,
    }
  } catch (error) {
    console.error("Errore durante la ricerca:", error)
    throw error
  }
}
