"use client"

import { useState } from "react"
import Image from "next/image"
import type { Movie, TVShow, MovieDetails, TVShowDetails, MediaItem } from "@/lib/types"
import { getGenreNames } from "@/lib/tmdb"
import { MediaDetailsModal } from "./media-details-modal"
import { Film, Tv } from "lucide-react"

interface MediaCardProps {
  item: Movie | TVShow | MediaItem
  type?: "movie" | "tv" // Ora opzionale, può essere derivato da MediaItem
}

export function MediaCard({ item, type: propType }: MediaCardProps) {
  const [details, setDetails] = useState<MovieDetails | TVShowDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Determina il tipo di media (film o serie TV)
  const type = propType || ("media_type" in item ? item.media_type : "movie")

  // Determina il titolo in base al tipo
  const title = type === "movie" ? (item as Movie).title : (item as TVShow).name

  // Ottieni i generi
  const genreNames = getGenreNames(item.genre_ids, type)

  const posterPath = item.poster_path
  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w300${posterPath}`
    : "/placeholder.svg?height=450&width=300"

  const handleClick = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/media/${type}/${item.id}`)
      if (!response.ok) throw new Error("Errore nel recupero dei dettagli")

      const data = await response.json()
      setDetails(data)
    } catch (error) {
      console.error("Errore:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex-shrink-0 w-32 sm:w-37 md:w-50 cursor-pointer" onClick={handleClick}>
        <div className="group rounded-2xl overflow-hidden bg-card hover:scale-105 transition-transform duration-200 border border-gray-800">
          <div className="relative h-[180px] sm:h-[210px] md:h-[270px] w-full">
            <Image
              src={posterUrl || "/placeholder.svg"}
              alt={title}
              fill
              objectFit="cover"
              className="rounded-b-2xl"
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* Indicatore del tipo di media */}
            <div className="absolute top-2 right-2 bg-black/70 p-1 rounded-full backdrop-blur-lg">
              {type === "movie" ? <Film size={14} className="text-white" /> : <Tv size={14} className="text-white" />}
            </div>

            {/* Badge del voto */}
            {item.vote_average > 0 && (
              <div className="absolute top-2 left-2 bg-black/70 px-1.5 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-lg">
                {item.vote_average.toFixed(1)}
              </div>
            )}
          </div>
          <div className="p-2 pt-2.5 pb-4">
            <h3 className="font-medium text-xs sm:text-sm truncate">{title}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {genreNames.map((genre, index) => (
                <span
                  key={index}
                  className="text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 bg-orange-700 text-white rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {details && <MediaDetailsModal details={details} type={type} onClose={() => setDetails(null)} />}
    </>
  )
}
