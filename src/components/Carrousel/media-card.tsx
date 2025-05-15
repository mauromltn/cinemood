"use client"

import { useState } from "react"
import Image from "next/image"
import type { Movie, TVShow, MovieDetails, TVShowDetails } from "@/lib/types"
import { getGenreNames } from "@/lib/tmdb"
import { MediaDetailsModal } from "./media-details-modal"

interface MediaCardProps {
  item: Movie | TVShow
  type: "movie" | "tv"
}

export function MediaCard({ item, type }: MediaCardProps) {
  const [details, setDetails] = useState<MovieDetails | TVShowDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const title = type === "movie" ? (item as Movie).title : (item as TVShow).name
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
      <div className="flex-shrink-0 w-[160px] cursor-pointer" onClick={handleClick}>
        <div className="rounded-lg overflow-hidden bg-card hover:scale-105 transition-transform duration-200 border">
          <div className="relative h-[240px] w-full">
            <Image
              src={posterUrl}
              alt={title} fill className="object-cover"
              placeholder="blur"
              blurDataURL="/placeholder.svg"
              sizes="160px"
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          <div className="p-2">
            <h3 className="font-medium text-sm truncate">{title}</h3>
            <div className="mt-1 flex flex-wrap gap-1">
              {genreNames.map((genre, index) => (
                <span key={index} className="text-[10px] px-1.5 py-0.5 bg-orange-700 text-white rounded-full">
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
