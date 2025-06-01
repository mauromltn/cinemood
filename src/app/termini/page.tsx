import Link from "next/link"
import { ArrowLeft, FileText, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

export default function TerminiPage() {
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
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-orange-700" />
            <h1 className="text-4xl font-bold">Termini di Servizio</h1>
          </div>
          <p className="text-xl text-neutral-400">Le regole e condizioni per l&apos;utilizzo di Cinemood</p>
          <p className="text-sm text-neutral-500 mt-2">Ultimo aggiornamento: 1 gennaio 2025</p>
        </div>

        <div className="space-y-8">
          {/* Accettazione */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Accettazione dei Termini</h2>
            <p className="text-neutral-300 leading-relaxed">
              Utilizzando Cinemood, accetti di essere vincolato da questi Termini di Servizio. Se non accetti questi
              termini, ti preghiamo di non utilizzare il nostro servizio.
            </p>
          </section>

          {/* Descrizione servizio */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Descrizione del Servizio</h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Cinemood è un servizio gratuito che fornisce raccomandazioni personalizzate di film e serie TV basate
              sull&apos;analisi del tuo stato emotivo attraverso un quiz interattivo.
            </p>
            <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-blue-300 font-semibold mb-1">Cosa offriamo:</p>
                  <ul className="text-neutral-300 space-y-1">
                    <li>• Quiz emotivo personalizzato</li>
                    <li>• Raccomandazioni di film e serie TV</li>
                    <li>• Informazioni dettagliate sui contenuti</li>
                    <li>• Piattaforme di streaming disponibili</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Uso accettabile */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Uso Accettabile</h2>
            <div className="space-y-4">
              <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-green-300 font-semibold mb-2">È permesso:</p>
                    <ul className="text-neutral-300 space-y-1">
                      <li>• Utilizzare il servizio per scopi personali</li>
                      <li>• Completare il quiz più volte</li>
                      <li>• Condividere le raccomandazioni con amici</li>
                      <li>• Fornire feedback costruttivo</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-300 font-semibold mb-2">È vietato:</p>
                    <ul className="text-neutral-300 space-y-1">
                      <li>• Utilizzare il servizio per scopi commerciali non autorizzati</li>
                      <li>• Tentare di compromettere la sicurezza del sistema</li>
                      <li>• Inserire contenuti offensivi o inappropriati nel quiz</li>
                      <li>• Copiare o redistribuire i nostri contenuti senza autorizzazione</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Proprietà intellettuale */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Proprietà Intellettuale</h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Cinemood e tutti i suoi contenuti, funzionalità e caratteristiche sono di proprietà esclusiva di Cinemood
              e sono protetti da copyright, marchi e altre leggi sulla proprietà intellettuale.
            </p>
            <p className="text-neutral-300 leading-relaxed">
              I dati sui film e serie TV sono forniti da The Movie Database (TMDB) e sono soggetti ai loro termini di
              utilizzo.
            </p>
          </section>

          {/* Limitazioni */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Limitazioni del Servizio</h2>
            <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-yellow-300 font-semibold mb-2">Importante:</p>
                  <ul className="text-neutral-300 space-y-2">
                    <li>
                      • Le raccomandazioni sono suggerimenti basati su algoritmi e non garantiscono la soddisfazione
                      personale
                    </li>
                    <li>• La disponibilità dei contenuti sulle piattaforme di streaming può variare</li>
                    <li>
                      • Il servizio potrebbe non essere sempre disponibile a causa di manutenzione o problemi tecnici
                    </li>
                    <li>• Non siamo responsabili per i contenuti di terze parti</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Esclusione di Responsabilità</h2>
            <p className="text-neutral-300 leading-relaxed">
              Cinemood è fornito &quot;così com&apos;è&quot; senza garanzie di alcun tipo. Non garantiamo che il
              servizio soddisfi le tue aspettative o che sia privo di errori. L&apos;utilizzo del servizio è a tuo
              rischio e pericolo.
            </p>
          </section>

          {/* Modifiche */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Modifiche ai Termini</h2>
            <p className="text-neutral-300 leading-relaxed">
              Ci riserviamo il diritto di modificare questi Termini di Servizio in qualsiasi momento. Le modifiche
              saranno pubblicate su questa pagina con una nuova data di aggiornamento. L&apos;uso continuato del
              servizio dopo le modifiche costituisce accettazione dei nuovi termini.
            </p>
          </section>

          {/* Legge applicabile */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Legge Applicabile</h2>
            <p className="text-neutral-300 leading-relaxed">
              Questi Termini di Servizio sono regolati dalle leggi italiane. Qualsiasi controversia sarà soggetta alla
              giurisdizione esclusiva dei tribunali italiani.
            </p>
          </section>

          {/* Contatti */}
          <section className="bg-neutral-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Contatti</h2>
            <p className="text-neutral-300 mb-4">Per domande sui Termini di Servizio, contattaci:</p>
            <div className="space-y-2">
              <p className="text-neutral-300">
                <strong>Email:</strong>
                <a href="mailto:dev.montane@gmail.com" className="text-orange-400 hover:text-orange-300 ml-1">
                  dev.montane@gmail.com
                </a>
              </p>
              <p className="text-neutral-300">
                <strong>Oggetto:</strong> Domanda Termini di Servizio - Cinemood
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
