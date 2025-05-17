export interface Movie {
  id: number
  title: string
  poster_path: string | null
  vote_average: number
  release_date: string
  overview: string
  genre_ids: number[]
}

export interface TVShow {
  id: number
  name: string
  poster_path: string | null
  vote_average: number
  first_air_date: string
  overview: string
  genre_ids: number[]
}

export interface Genre {
  id: number
  name: string
}

export interface WatchProviders {
  results: {
    IT?: {
      flatrate?: Provider[]
      rent?: Provider[]
      buy?: Provider[]
    }
  }
}

export interface Provider {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface MovieDetails extends Omit<Movie, "genre_ids"> {
  genres: Genre[]
  runtime: number | null
  tagline: string | null
  backdrop_path: string | null
  vote_count: number
  status: string
  watch_providers?: WatchProviders
}

export interface TVShowDetails extends Omit<TVShow, "genre_ids"> {
  genres: Genre[]
  number_of_seasons: number
  number_of_episodes: number
  backdrop_path: string | null
  vote_count: number
  status: string
  tagline: string | null
  episode_run_time: number[]
  watch_providers?: WatchProviders
}

// Tipo combinato per i risultati di ricerca
export type MediaItem = (Movie | TVShow) & { media_type: "movie" | "tv" }
