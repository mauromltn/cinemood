import Link from "next/link"
import { ArrowLeft, Mail, MessageCircle, HelpCircle, Bug } from "lucide-react"

export default function ContattiPage() {
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
          <h1 className="text-4xl font-bold mb-4">Contatti</h1>
          <p className="text-xl text-neutral-400">
            Siamo qui per aiutarti. Contattaci per qualsiasi domanda o suggerimento.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-neutral-900 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-6 h-6 text-orange-700" />
              <h2 className="text-xl font-bold">Supporto Generale</h2>
            </div>
            <p className="text-neutral-300 mb-4">
              Hai domande su come funziona Cinemood o hai bisogno di aiuto con il quiz?
            </p>
            <a
              href="mailto:dev.montane@gmail.com"
              className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
            >
              <Mail className="w-4 h-4" />
              dev.montane@gmail.com
            </a>
          </div>

          <div className="bg-neutral-900 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Bug className="w-6 h-6 text-orange-700" />
              <h2 className="text-xl font-bold">Segnala un Problema</h2>
            </div>
            <p className="text-neutral-300 mb-4">Hai trovato un bug o qualcosa non funziona come dovrebbe?</p>
            <a
              href="mailto:dev.montane@gmail.com"
              className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
            >
              <Mail className="w-4 h-4" />
              dev.montane@gmail.com
            </a>
          </div>

          <div className="bg-neutral-900 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-6 h-6 text-orange-700" />
              <h2 className="text-xl font-bold">Feedback e Suggerimenti</h2>
            </div>
            <p className="text-neutral-300 mb-4">
              Hai idee per migliorare Cinemood o vuoi condividere la tua esperienza?
            </p>
            <a
              href="mailto:dev.montane@gmail.com"
              className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
            >
              <Mail className="w-4 h-4" />
              dev.montane@gmail.com
            </a>
          </div>

          <div className="bg-neutral-900 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-orange-700" />
              <h2 className="text-xl font-bold">Contatto Generale</h2>
            </div>
            <p className="text-neutral-300 mb-4">Per qualsiasi altra richiesta o informazione.</p>
            <a
              href="mailto:dev.montane@gmail.com"
              className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
            >
              <Mail className="w-4 h-4" />
              dev.montane@gmail.com
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Domande Frequenti</h2>
          <div className="space-y-6">
            <div className="bg-neutral-900 p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-2 text-orange-400">Come funziona l&apos;analisi delle emozioni?</h3>
              <p className="text-neutral-300">
                Utilizziamo algoritmi di intelligenza artificiale per analizzare le tue risposte al quiz e identificare
                il tuo stato emotivo. Questo ci permette di suggerirti contenuti che si allineano perfettamente con il
                tuo umore.
              </p>
            </div>

            <div className="bg-neutral-900 p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-2 text-orange-400">I miei dati sono sicuri?</h3>
              <p className="text-neutral-300">
                Assolutamente sì. Rispettiamo la tua privacy e non condividiamo mai i tuoi dati con terze parti. Tutte
                le informazioni sono trattate in conformità con le normative sulla privacy.
              </p>
            </div>

            <div className="bg-neutral-900 p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-2 text-orange-400">Posso rifare il quiz?</h3>
              <p className="text-neutral-300">
                Certamente! Puoi rifare il quiz ogni volta che vuoi per ottenere nuove raccomandazioni basate sul tuo
                umore attuale. Il tuo stato emotivo può cambiare, e noi siamo qui per adattarci a te.
              </p>
            </div>

            <div className="bg-neutral-900 p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-2 text-orange-400">Da dove provengono i dati sui film?</h3>
              <p className="text-neutral-300">
                Utilizziamo l&apos;API di The Movie Database (TMDB), una delle fonti più complete e aggiornate per
                informazioni su film e serie TV. Questo ci garantisce dati accurati e sempre aggiornati.
              </p>
            </div>
          </div>
        </div>

        {/* Response Time */}
        <div className="bg-orange-900/20 border border-orange-700 rounded-2xl p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Tempi di Risposta</h3>
          <p className="text-neutral-300">
            Ci impegniamo a rispondere a tutte le email entro 24-48 ore. Per problemi urgenti, utilizza l&apos;indirizzo
            di supporto generale.
          </p>
        </div>
      </div>
    </div>
  )
}
