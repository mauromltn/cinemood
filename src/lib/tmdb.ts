import type { Movie, TVShow, MovieDetails, TVShowDetails, WatchProviders } from "./types"

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
  return { ...details, watch_providers: watchProviders }
}

export async function getTVShowDetails(id: number): Promise<TVShowDetails> {
  const details = await fetchFromTMDB(`/tv/${id}`)
  const watchProviders = await getWatchProviders("tv", id)
  return { ...details, watch_providers: watchProviders }
}

export async function getWatchProviders(type: "movie" | "tv", id: number): Promise<WatchProviders> {
  return fetchFromTMDB(`/${type}/${id}/watch/providers`)
}

// Nuova funzione per la ricerca
export async function searchMedia(query: string): Promise<{ movies: Movie[]; tvShows: TVShow[] }> {
  if (!query.trim()) {
    return { movies: [], tvShows: [] }
  }

  const movieResponse = await fetch(
    `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=it-IT&query=${encodeURIComponent(query)}&page=1`,
  )
  const tvResponse = await fetch(
    `${BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&language=it-IT&query=${encodeURIComponent(query)}&page=1`,
  )

  const movieData = await movieResponse.json()
  const tvData = await tvResponse.json()

  return {
    movies: movieData.results || [],
    tvShows: tvData.results || [],
  }
}
