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

export interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
  official: boolean
  published_at: string
}

export interface Videos {
  results: Video[]
}

export interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export interface Credits {
  cast: CastMember[]
}

export interface MovieDetails extends Omit<Movie, "genre_ids"> {
  genres: Genre[]
  runtime: number | null
  tagline: string | null
  backdrop_path: string | null
  vote_count: number
  status: string
  watch_providers?: WatchProviders
  videos?: Videos
  credits?: Credits
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
  videos?: Videos
  credits?: Credits
}

// Tipo combinato per i risultati di ricerca
export type MediaItem = (Movie | TVShow) & { media_type: "movie" | "tv" }
