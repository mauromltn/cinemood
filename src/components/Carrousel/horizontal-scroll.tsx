"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MediaCard } from "./media-card"
import type { Movie, TVShow } from "@/lib/types"

interface HorizontalScrollProps {
  items: (Movie | TVShow)[]
  type: "movie" | "tv"
}

export function HorizontalScroll({ items, type }: HorizontalScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return

    // Calcola la larghezza di scorrimento in base alla dimensione del contenitore
    const scrollAmount = Math.max(container.clientWidth * 0.75, 240) // Almeno 240px o 75% della larghezza visibile
    const currentScroll = container.scrollLeft

    if (direction === "left") {
      container.scrollTo({
        left: currentScroll - scrollAmount,
        behavior: "smooth",
      })
    } else {
      container.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const handleScroll = () => {
    const container = scrollContainerRef.current
    if (!container) return

    // Mostra la freccia sinistra solo se non siamo all'inizio
    setShowLeftArrow(container.scrollLeft > 0)

    // Mostra la freccia destra solo se non siamo alla fine
    const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10
    setShowRightArrow(!isAtEnd)
  }

  // Controlla lo stato delle frecce all'inizio e quando cambia la dimensione dello schermo
  useEffect(() => {
    handleScroll()
    window.addEventListener("resize", handleScroll)
    return () => window.removeEventListener("resize", handleScroll)
  }, [])

  return (
    <div className="relative">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide gap-4 sm:gap-5 pb-8 pt-2"
        onScroll={handleScroll}
      >
        {items.map((item) => (
          <MediaCard key={item.id} item={item} type={type} />
        ))}
      </div>

      {/* Controlli di navigazione */}
      <div className="absolute -bottom-5 right-0 flex space-x-2">
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="p-1.5 sm:p-2 bg-neutral-900 rounded-full hover:bg-neutral-800 transition-colors border text-white cursor-pointer"
            aria-label="Scorri a sinistra"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="p-1.5 sm:p-2 bg-neutral-900 rounded-full hover:bg-neutral-800 transition-colors border text-white cursor-pointer"
            aria-label="Scorri a destra"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>
    </div>
  )
}
