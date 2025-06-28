"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, ArrowLeft, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react"
import { MediaCard } from "@/components/Carrousel/media-card"
import type { MediaItem } from "@/lib/types"

type SearchResults = {
  results: MediaItem[]
  total_pages: number
  total_results: number
  page: number
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get("q") || ""
  const initialPage = Number.parseInt(searchParams.get("page") || "1", 10)

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [currentQuery, setCurrentQuery] = useState(initialQuery)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Esegui la ricerca quando la pagina viene caricata
  useEffect(() => {
    if (initialQuery) {
      setCurrentQuery(initialQuery)
      performSearch(initialQuery, initialPage)
    }
  }, [initialQuery, initialPage])

  const performSearch = async (query: string, page: number) => {
    if (!query.trim()) return

    setIsSearching(true)
    setError(null)

    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}&page=${page}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Errore ${response.status}`)
      }

      const results = await response.json()

      // Verifica che i risultati abbiano la struttura attesa
      if (!results.results) {
        throw new Error("Formato di risposta non valido")
      }

      setSearchResults(results)
      setCurrentPage(page)
      setCurrentQuery(query)
    } catch (error) {
      console.error("Errore durante la ricerca:", error)
      setError(error instanceof Error ? error.message : "Si è verificato un errore durante la ricerca")
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    // Reimposta la pagina a 1 quando si effettua una nuova ricerca
    setCurrentPage(1)
    setCurrentQuery(searchQuery)
    // Aggiorna l'URL con il parametro di ricerca
    router.push(`/search?q=${encodeURIComponent(searchQuery)}&page=1`)
    performSearch(searchQuery, 1)
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return

    const maxPage = searchResults?.total_pages || 0

    if (newPage > maxPage) return

    setCurrentPage(newPage)
    router.push(`/search?q=${encodeURIComponent(currentQuery)}&page=${newPage}`)
    performSearch(currentQuery, newPage)

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:p-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
            <button
            onClick={() => {
              if (currentPage === 1) {
              router.push('/');
              } else {
              router.back();
              }
            }}
            className="flex items-center gap-2 text-neutral-400 hover:text-white mb-4 cursor-pointer"
            >
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

        {error && (
          <div className="bg-red-900/30 border border-red-700 rounded-2xl p-4 mb-8 flex items-center gap-3">
            <AlertCircle className="text-red-500 flex-shrink-0" />
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {searchResults && !isSearching && !error && (
          <div className="space-y-10">
            {searchResults.results.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-neutral-400">Nessun risultato trovato per &quot;{currentQuery}&quot;</p>
                <p className="text-neutral-500 mt-2">Prova con un altro termine di ricerca</p>
              </div>
            ) : (
              <>
                <section>
                  <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-8">
                    Risultati
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {searchResults.results.map((item) => (
                      <div key={`${item.media_type}-${item.id}`} className="justify-self-center">
                        <MediaCard item={item} />
                      </div>
                    ))}
                  </div>
                </section>

                {/* Paginazione */}
                {searchResults.total_pages > 1 && (
                  <div className="flex justify-center items-center gap-4 py-8">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-full ${
                        currentPage === 1
                          ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                          : "bg-neutral-800 text-white hover:bg-neutral-700"
                      }`}
                      aria-label="Pagina precedente"
                    >
                      <ChevronLeft size={24} />
                    </button>

                    <div className="text-center">
                      <span className="text-lg font-medium">
                        Pagina {currentPage} di {searchResults.total_pages}
                      </span>
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= searchResults.total_pages}
                      className={`p-2 rounded-full ${
                        currentPage >= searchResults.total_pages
                          ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                          : "bg-neutral-800 text-white hover:bg-neutral-700"
                      }`}
                      aria-label="Pagina successiva"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
