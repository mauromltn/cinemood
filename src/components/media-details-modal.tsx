"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { X } from 'lucide-react'
import type { MovieDetails, TVShowDetails, Provider } from "@/lib/types"

interface MediaDetailsModalProps {
  details: MovieDetails | TVShowDetails | null
  type: "movie" | "tv"
  onClose: () => void
}

export function MediaDetailsModal({ details, type, onClose }: MediaDetailsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Blocca lo scroll del body quando il modale è aperto
    if (details) {
      document.body.style.overflow = "hidden"
    }

    // Gestisce la chiusura con il tasto ESC
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEscape)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleEscape)
    }
  }, [details, onClose])

  // Chiude il modale se si clicca fuori dal contenuto
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  if (!details) return null

  const title = type === "movie" ? (details as MovieDetails).title : (details as TVShowDetails).name
  const releaseDate =
    type === "movie"
      ? new Date((details as MovieDetails).release_date).toLocaleDateString("it-IT")
      : new Date((details as TVShowDetails).first_air_date).toLocaleDateString("it-IT")
  const backdropPath = details.backdrop_path
  const backdropUrl = backdropPath
    ? `https://image.tmdb.org/t/p/original${backdropPath}`
    : "/placeholder.svg?height=1080&width=1920"

  // Estrai le piattaforme di streaming
  const watchProviders = details.watch_providers?.results?.IT
  const streamingProviders = watchProviders?.flatrate || []
  const rentProviders = watchProviders?.rent || []
  const buyProviders = watchProviders?.buy || []

  // Funzione per renderizzare le piattaforme
  const renderProviders = (providers: Provider[], title: string) => {
    if (providers.length === 0) return null

    return (
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-400 mb-2">{title}</h4>
        <div className="flex flex-wrap gap-2">
          {providers.map((provider) => (
            <div key={provider.provider_id} className="flex flex-col items-center">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                  alt={provider.provider_name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 40px, 48px"
                />
              </div>
              <span className="text-[10px] sm:text-xs mt-1 text-center max-w-[60px] truncate">
                {provider.provider_name}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/80"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="relative bg-neutral-900 sm:rounded-lg overflow-hidden w-full h-full sm:max-w-4xl sm:w-full sm:max-h-[90vh] flex flex-col"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 sm:p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          aria-label="Chiudi"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>

        {/* Immagine di sfondo */}
        <div className="relative h-[200px] sm:h-[250px] md:h-[300px] w-full">
          <Image
            src={backdropUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{title}</h2>
            <p className="text-sm sm:text-base text-gray-300 mt-1 sm:mt-2">{releaseDate}</p>
          </div>
        </div>

        {/* Contenuto scrollabile */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          {/* Generi */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {details.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-orange-700 text-white text-xs sm:text-sm rounded-full"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Valutazione */}
          <div className="flex items-center mb-3 sm:mb-4">
            <div className="bg-neutral-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm">
              <span className="font-bold">{details.vote_average.toFixed(1)}</span>/10
            </div>
            <span className="ml-2 text-xs sm:text-sm text-gray-400">
              {details.vote_count} {details.vote_count === 1 ? "voto" : "voti"}
            </span>
          </div>

          {/* Trama */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Trama</h3>
            <p className="text-sm sm:text-base text-gray-300">{details.overview || "Nessuna trama disponibile."}</p>
          </div>

          {/* Informazioni aggiuntive */}
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {type === "movie" && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-1">Durata</h3>
                <p className="text-sm sm:text-base text-gray-300">
                  {(details as MovieDetails).runtime
                    ? `${(details as MovieDetails).runtime} minuti`
                    : "Non disponibile"}
                </p>
              </div>
            )}

            {type === "tv" && (
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-1">Stagioni</h3>
                  <p className="text-sm sm:text-base text-gray-300">{(details as TVShowDetails).number_of_seasons}</p>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-1">Episodi</h3>
                  <p className="text-sm sm:text-base text-gray-300">{(details as TVShowDetails).number_of_episodes}</p>
                </div>
              </div>
            )}

            {/* Piattaforme di streaming */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Dove guardare</h3>
              {streamingProviders.length === 0 && rentProviders.length === 0 && buyProviders.length === 0 ? (
                <p className="text-sm sm:text-base text-gray-300">Nessuna piattaforma disponibile in Italia.</p>
              ) : (
                <div>
                  {renderProviders(streamingProviders, "Streaming")}
                  {renderProviders(rentProviders, "Noleggio")}
                  {renderProviders(buyProviders, "Acquisto")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
