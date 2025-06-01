import Link from "next/link"
import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 mt-16 py-8 bg-neutral-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Logo e descrizione */}
          <div className="mb-6 md:mb-0 md:max-w-sm">
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-xl font-bold text-white">Cinemood</h2>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Scopri film e serie TV perfetti per il tuo stato d&apos;animo. Lascia che le tue emozioni guidino la tua
              prossima visione.
            </p>
            <div className="flex items-center gap-1 mt-3 text-xs text-neutral-500">
              <Heart className="w-3 h-3 text-red-500" />
              <span>Fatto con passione per il cinema</span>
            </div>
          </div>

          {/* Link di navigazione */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">Scopri</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/come-funziona"
                    className="text-neutral-400 hover:text-orange-400 transition-colors text-sm"
                  >
                    Come funziona
                  </Link>
                </li>
                <li>
                  <Link href="/chi-siamo" className="text-neutral-400 hover:text-orange-400 transition-colors text-sm">
                    Chi siamo
                  </Link>
                </li>
                <li>
                  <Link href="/contatti" className="text-neutral-400 hover:text-orange-400 transition-colors text-sm">
                    Contatti
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">Legale</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/privacy" className="text-neutral-400 hover:text-orange-400 transition-colors text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/termini" className="text-neutral-400 hover:text-orange-400 transition-colors text-sm">
                    Termini di servizio
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-neutral-800 text-center">
          <p className="text-sm text-neutral-500">
            © 2025 Cinemood. Tutti i diritti riservati.
            <span className="mx-2">•</span>
            Dati forniti da{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 transition-colors"
            >
              TMDB
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
