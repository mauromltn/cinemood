"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft, ChevronLeft, ChevronRight, AlertCircle, Sparkles } from "lucide-react"
import { MediaCard } from "@/components/Carrousel/media-card"
import type { MediaItem } from "@/lib/types"

type RecommendationsResults = {
  results: MediaItem[]
  total_pages: number
  total_results: number
  page: number
}

export default function RecommendationsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialPage = Number.parseInt(searchParams.get("page") || "1", 10)

  // Parametri dall'analisi di Groq
  const groqGenres = searchParams.get("genres")
  const groqReasoning = searchParams.get("reasoning")
  const mood = searchParams.get("mood")
  const activity = searchParams.get("activity")
  const preferredType = searchParams.get("type")

  const [currentPage, setCurrentPage] = useState(initialPage)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<RecommendationsResults | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Usa useCallback per stabilizzare la funzione fetchRecommendations
  const fetchRecommendations = useCallback(async (page = 1) => {
    setIsLoading(true)
    setError(null)

    try {
      // Usa i generi analizzati da Groq se disponibili
      let genreIds: string[] = []

      if (groqGenres) {
        genreIds = groqGenres.split(",")
        console.log("Usando generi da Groq AI:", genreIds)
      } else {
        // Fallback se non ci sono generi da Groq
        genreIds = ["35", "18", "28", "12"] // Mix generico
        console.log("Usando generi fallback:", genreIds)
      }

      // Costruisci la query per l'API
      const params = new URLSearchParams()
      params.append("genres", genreIds.join(","))
      params.append("page", page.toString())

      if (preferredType) {
        params.append("type", preferredType)
      } else {
        params.append("type", "all")
      }

      // Chiama l'API per ottenere consigli basati sui generi di Groq
      const response = await fetch(`/api/recommendations?${params.toString()}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Errore ${response.status}`)
      }

      const data = await response.json()

      setResults(data)
      setCurrentPage(page)
    } catch (error) {
      console.error("Errore durante il recupero dei consigli:", error)
      setError(error instanceof Error ? error.message : "Si è verificato un errore durante il recupero dei consigli")
    } finally {
      setIsLoading(false)
    }
  }, [groqGenres, preferredType]) // Aggiungi le dipendenze qui

  // Esegui la ricerca quando la pagina viene caricata
  useEffect(() => {
    fetchRecommendations(initialPage)
  }, [initialPage, fetchRecommendations]) // Ora fetchRecommendations è incluso nelle dipendenze

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return

    const maxPage = results?.total_pages || 0

    if (newPage > maxPage) return

    setCurrentPage(newPage)

    // Update URL with new page
    const params = new URLSearchParams()
    if (groqGenres) params.append("genres", groqGenres)
    if (groqReasoning) params.append("reasoning", groqReasoning)
    if (mood) params.append("mood", mood)
    if (activity) params.append("activity", activity)
    if (preferredType) params.append("type", preferredType)
    params.append("page", newPage.toString())
    router.push(`/recommendations?${params.toString()}`)

    fetchRecommendations(newPage)

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
            className="flex items-center gap-2 text-neutral-400 hover:text-white mb-4"
          >
            <ArrowLeft size={18} />
            <span>Torna indietro</span>
          </button>

          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-orange-700" />
            <h1 className="text-xl sm:text-2xl font-bold">Contenuti selezionati per te</h1>
          </div>

          {groqReasoning && (
            <div className="bg-blue-900/20 border border-blue-700 rounded-2xl p-4 mb-6">
              <p className="text-sm text-blue-200">
                <strong>Analisi AI:</strong> {groqReasoning}
              </p>
            </div>
          )}
        </div>

        {isLoading && (
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

        {results && !isLoading && !error && (
          <div className="space-y-10">
            {results.results.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-neutral-400">Nessun consiglio trovato</p>
                <p className="text-neutral-500 mt-2">Prova a rifare il quiz con risposte diverse</p>
              </div>
            ) : (
              <>
                <section>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {results.results.map((item) => (
                      <div key={`${item.media_type}-${item.id}`} className="justify-self-center">
                        <MediaCard item={item} />
                      </div>
                    ))}
                  </div>
                </section>

                {/* Paginazione */}
                {results.total_pages > 1 && (
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
                        Pagina {currentPage} di {results.total_pages}
                      </span>
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= results.total_pages}
                      className={`p-2 rounded-full ${
                        currentPage >= results.total_pages
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
