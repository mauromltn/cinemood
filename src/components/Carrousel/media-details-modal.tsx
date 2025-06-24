"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { X, Play, User } from "lucide-react"
import type { MovieDetails, TVShowDetails, Provider, Video, CastMember } from "@/lib/types"

interface MediaDetailsModalProps {
  details: MovieDetails | TVShowDetails | null
  type: "movie" | "tv"
  onClose: () => void
}

export function MediaDetailsModal({ details, type, onClose }: MediaDetailsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [showTrailer, setShowTrailer] = useState(false)

  useEffect(() => {
    // Blocca lo scroll del body quando il modale è aperto
    if (details) {
      document.body.style.overflow = "hidden"
    }

    // Gestisce la chiusura con il tasto ESC
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showTrailer) {
          setShowTrailer(false)
        } else {
          onClose()
        }
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleEscape)
    }
  }, [details, onClose, showTrailer])

  // Chiude il modale se si clicca fuori dal contenuto
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      if (showTrailer) {
        setShowTrailer(false)
      } else {
        onClose()
      }
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

  // Trova il trailer ufficiale
  const trailer =
    details.videos?.results?.find(
      (video: Video) =>
        video.site === "YouTube" && (video.type === "Trailer" || video.type === "Teaser") && video.official,
    ) ||
    details.videos?.results?.find(
      (video: Video) => video.site === "YouTube" && (video.type === "Trailer" || video.type === "Teaser"),
    )

  // Ottieni i primi 15 attori principali per lo scroll orizzontale
  const mainCast = details.credits?.cast?.slice(0, 15) || []

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
        <h4 className="text-sm font-medium text-neutral-400 mb-2">{title}</h4>
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

  // Funzione per renderizzare il cast
  const renderCast = (cast: CastMember[]) => {
    if (cast.length === 0) return null

    return (
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Cast Principale</h3>
        <div className="flex overflow-x-auto scrollbar-hide gap-2 sm:gap-5 pb-4">
          {cast.map((actor) => (
            <div key={actor.id} className="flex-shrink-0 text-center w-20 sm:w-24">
              <div className="relative w-18 h-22 sm:w-24 sm:h-28 mx-auto mb-2 rounded-lg overflow-hidden bg-neutral-800">
                {actor.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt={actor.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 64px, 80px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-6 h-6 sm:w-8 sm:h-8 text-neutral-500" />
                  </div>
                )}
              </div>
              <p className="text-xs text-sm font-medium text-white truncate px-1">{actor.name}</p>
              <p className="text-[10px] sm:text-xs text-neutral-400 truncate px-1">{actor.character}</p>
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

        {/* Trailer Modal */}
        {showTrailer && trailer && (
          <div className="absolute inset-0 z-20 bg-black flex items-center justify-center">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-3 right-3 z-30 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              aria-label="Chiudi trailer"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <div className="w-full h-full max-w-4xl max-h-[80vh] aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`}
                title={trailer.name}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Immagine di sfondo (ora usa il poster) */}
        <div className="relative h-[200px] sm:h-[250px] md:h-[300px] w-full">
          <Image
            src={backdropUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />

          {/* Pulsante Play per il trailer */}
          {trailer && (
            <button
              onClick={() => setShowTrailer(true)}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              aria-label="Guarda il trailer"
            >
              <Play fill="#fff" strokeWidth={4} className="w-9 h-9 sm:w-15 sm:h-15 ml-1" />
            </button>
          )}

          <div className="absolute bottom-0 left-0 p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{title}</h2>
            <p className="text-sm sm:text-base text-neutral-300 mt-1 sm:mt-2">{releaseDate}</p>
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
            <span className="ml-2 text-xs sm:text-sm text-neutral-400">
              {details.vote_count} {details.vote_count === 1 ? "voto" : "voti"}
            </span>
          </div>

          {/* Trama */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Trama</h3>
            <p className="text-sm sm:text-base text-neutral-300">{details.overview || "Nessuna trama disponibile."}</p>
          </div>

          {/* Cast Principale */}
          {renderCast(mainCast)}

          {/* Informazioni aggiuntive */}
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {type === "movie" && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-1">Durata</h3>
                <p className="text-sm sm:text-base text-neutral-300">
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
                  <p className="text-sm sm:text-base text-neutral-300">
                    {(details as TVShowDetails).number_of_seasons}
                  </p>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-1">Episodi</h3>
                  <p className="text-sm sm:text-base text-neutral-300">
                    {(details as TVShowDetails).number_of_episodes}
                  </p>
                </div>
              </div>
            )}

            {/* Piattaforme di streaming */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Dove guardare</h3>
              {streamingProviders.length === 0 && rentProviders.length === 0 && buyProviders.length === 0 ? (
                <p className="text-sm sm:text-base text-neutral-300">Nessuna piattaforma disponibile in Italia.</p>
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
