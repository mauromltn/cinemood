"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, ArrowLeft } from "lucide-react"
import { MediaCard } from "@/components/Carrousel/media-card"
import type { Movie, TVShow } from "@/lib/types"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<{ movies: Movie[]; tvShows: TVShow[] } | null>(null)

  // Esegui la ricerca quando la pagina viene caricata con un parametro di query
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery)
    }
  }, [initialQuery])

  const performSearch = async (query: string) => {
    if (!query.trim()) return

    setIsSearching(true)
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`)
      if (!response.ok) throw new Error("Errore durante la ricerca")

      const results = await response.json()
      setSearchResults(results)
    } catch (error) {
      console.error("Errore durante la ricerca:", error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    // Aggiorna l'URL con il parametro di ricerca
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    performSearch(searchQuery)
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:p-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-neutral-400 hover:text-white mb-4">
            <ArrowLeft size={18} />
            <span>Torna indietro</span>
          </button>

          <h1 className="text-2xl font-bold mb-6">Cerca film e serie TV</h1>

          <form onSubmit={handleSearch} className="flex w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cerca film e serie TV..."
              className="flex-1 px-4 py-3 bg-neutral-800 text-white rounded-l-full focus:outline-none focus:ring-1 focus:ring-inset focus:ring-orange-700"
              autoFocus
            />
            <button
              type="submit"
              className="px-6 py-3 bg-orange-700 hover:bg-orange-600 text-white rounded-r-full transition-colors flex items-center gap-2"
              disabled={isSearching}
            >
              <Search size={18} />
              {isSearching ? "Ricerca..." : "Cerca"}
            </button>
          </form>
        </div>

        {isSearching && (
          <div className="flex justify-center my-12">
            <div className="w-10 h-10 border-4 border-neutral-600 border-t-orange-700 rounded-full animate-spin"></div>
          </div>
        )}

        {searchResults && !isSearching && (
          <div className="space-y-10">
            {searchResults.movies.length === 0 && searchResults.tvShows.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-neutral-400">Nessun risultato trovato per &ldquo;{searchParams.get("q")}&rdquo;</p>
                <p className="text-neutral-500 mt-2">Prova con un altro termine di ricerca</p>
              </div>
            ) : (
              <>
                {searchResults.movies.length > 0 && (
                  <section>
                    <h2 className="text-xl font-bold mb-4">Film ({searchResults.movies.length})</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {searchResults.movies.map((movie) => (
                        <div key={movie.id} className="w-full">
                          <MediaCard item={movie} type="movie" />
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {searchResults.tvShows.length > 0 && (
                  <section>
                    <h2 className="text-xl font-bold mb-4">Serie TV ({searchResults.tvShows.length})</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {searchResults.tvShows.map((tvShow) => (
                        <div key={tvShow.id} className="w-full">
                          <MediaCard item={tvShow} type="tv" />
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
