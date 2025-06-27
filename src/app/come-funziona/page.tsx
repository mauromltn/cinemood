import Link from "next/link"
import { ArrowLeft, Brain, Search, Heart, Sparkles } from "lucide-react"

export default function ComeFunzionaPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna alla home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Come funziona Cinemood</h1>
          <p className="text-xl text-neutral-400">
            Scopri come trasformiamo il tuo stato d&apos;animo in raccomandazioni perfette
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-orange-700 rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">1. Fai il Quiz Emotivo</h2>
              <p className="text-neutral-300 leading-relaxed">
                Inizia cliccando sul pulsante &quot;FAI IL QUIZ&quot; nella home page. Ti faremo alcune domande semplici
                sul tuo umore, le tue preferenze e come ti senti in questo momento. Il quiz richiede solo 2-3 minuti e
                include una sezione dove puoi scrivere liberamente i tuoi pensieri.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-orange-700 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">2. Analisi delle Emozioni</h2>
              <p className="text-neutral-300 leading-relaxed">
                Utilizziamo tecnologie avanzate di intelligenza artificiale per analizzare le tue risposte e
                identificare il tuo stato emotivo attuale. Il nostro sistema riconosce emozioni come gioia, tristezza,
                rabbia e paura, e le combina con le tue preferenze per creare un profilo personalizzato.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-orange-700 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">3. Raccomandazioni Personalizzate</h2>
              <p className="text-neutral-300 leading-relaxed">
                Basandoci sulla tua analisi emotiva, ti suggeriamo film e serie TV perfetti per il tuo stato
                d&apos;animo. Se sei felice, potresti ricevere commedie e avventure. Se ti senti malinconico, potremmo
                suggerirti drammi toccanti o film romantici. Ogni raccomandazione è pensata per accompagnare e
                migliorare il tuo umore.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-orange-700 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">4. Scopri e Guarda</h2>
              <p className="text-neutral-300 leading-relaxed">
                Esplora i nostri suggerimenti, leggi le trame, guarda i trailer e scopri dove guardare ogni titolo. Ogni
                film e serie TV include informazioni dettagliate, valutazioni e piattaforme di streaming disponibili in
                Italia. Clicca su qualsiasi titolo per vedere tutti i dettagli.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-neutral-900 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4">Pronto a iniziare?</h3>
          <p className="text-neutral-400 mb-6">Scopri subito cosa guardare in base al tuo umore</p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-orange-700 hover:bg-orange-600 text-white font-bold rounded-full transition-colors"
          >
            Fai il Quiz Ora
          </Link>
        </div>
      </div>
    </div>
  )
}
