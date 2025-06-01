import Link from "next/link"
import { ArrowLeft, Shield, Eye, Database, Lock } from "lucide-react"

export default function PrivacyPage() {
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
            <Shield className="w-8 h-8 text-orange-700" />
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-xl text-neutral-400">
            La tua privacy è importante per noi. Ecco come proteggiamo i tuoi dati.
          </p>
          <p className="text-sm text-neutral-500 mt-2">Ultimo aggiornamento: 1 gennaio 2025</p>
        </div>

        <div className="space-y-8">
          {/* Introduzione */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-orange-700" />
              Introduzione
            </h2>
            <p className="text-neutral-300 leading-relaxed">
              Cinemood (&quot;noi&quot;, &quot;nostro&quot; o &quot;il servizio&quot;) rispetta la tua privacy e si
              impegna a proteggere i tuoi dati personali. Questa Privacy Policy spiega come raccogliamo, utilizziamo e
              proteggiamo le tue informazioni quando utilizzi il nostro servizio.
            </p>
          </section>

          {/* Dati raccolti */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Database className="w-6 h-6 text-orange-700" />
              Dati che raccogliamo
            </h2>
            <div className="space-y-4">
              <div className="bg-neutral-900 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-orange-400">Dati del Quiz</h3>
                <p className="text-neutral-300">
                  Raccogliamo le tue risposte al quiz emotivo, inclusi il tuo umore, le tue preferenze e il testo libero
                  che inserisci. Questi dati vengono utilizzati esclusivamente per generare raccomandazioni
                  personalizzate.
                </p>
              </div>
              <div className="bg-neutral-900 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-orange-400">Dati di Utilizzo</h3>
                <p className="text-neutral-300">
                  Raccogliamo informazioni su come utilizzi il servizio, come le pagine visitate e i film/serie TV
                  visualizzati. Questi dati ci aiutano a migliorare l&apos;esperienza utente.
                </p>
              </div>
              <div className="bg-neutral-900 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-orange-400">Dati Tecnici</h3>
                <p className="text-neutral-300">
                  Raccogliamo informazioni tecniche di base come il tipo di browser e il dispositivo utilizzato per
                  ottimizzare le prestazioni del servizio.
                </p>
              </div>
            </div>
          </section>

          {/* Come utilizziamo i dati */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Come utilizziamo i tuoi dati</h2>
            <ul className="space-y-3 text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-orange-700 mt-1">•</span>
                <span>Per generare raccomandazioni personalizzate di film e serie TV</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-700 mt-1">•</span>
                <span>Per migliorare l&apos;accuratezza del nostro algoritmo di raccomandazione</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-700 mt-1">•</span>
                <span>Per analizzare l&apos;utilizzo del servizio e migliorare l&apos;esperienza utente</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-700 mt-1">•</span>
                <span>Per fornire supporto tecnico quando richiesto</span>
              </li>
            </ul>
          </section>

          {/* Condivisione dati */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Condivisione dei dati</h2>
            <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
              <p className="text-green-300 font-semibold mb-2">La nostra promessa:</p>
              <p className="text-neutral-300">
                Non vendiamo, affittiamo o condividiamo mai i tuoi dati personali con terze parti per scopi commerciali.
                I tuoi dati emotivi rimangono privati e vengono utilizzati esclusivamente per migliorare la tua
                esperienza su Cinemood.
              </p>
            </div>
          </section>

          {/* Sicurezza */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6 text-orange-700" />
              Sicurezza dei dati
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Implementiamo misure di sicurezza appropriate per proteggere i tuoi dati personali contro accesso non
              autorizzato, alterazione, divulgazione o distruzione.
            </p>
            <ul className="space-y-2 text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-orange-700 mt-1">•</span>
                <span>Crittografia dei dati in transito e a riposo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-700 mt-1">•</span>
                <span>Accesso limitato ai dati solo al personale autorizzato</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-700 mt-1">•</span>
                <span>Monitoraggio continuo per rilevare attività sospette</span>
              </li>
            </ul>
          </section>

          {/* Diritti dell'utente */}
          <section>
            <h2 className="text-2xl font-bold mb-4">I tuoi diritti</h2>
            <p className="text-neutral-300 mb-4">Hai il diritto di:</p>
            <ul className="space-y-2 text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-orange-700 mt-1">•</span>
                <span>Accedere ai tuoi dati personali</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-700 mt-1">•</span>
                <span>Richiedere la correzione di dati inesatti</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-700 mt-1">•</span>
                <span>Richiedere la cancellazione dei tuoi dati</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-700 mt-1">•</span>
                <span>Opporti al trattamento dei tuoi dati</span>
              </li>
            </ul>
            <p className="text-neutral-300 mt-4">
              Per esercitare questi diritti, contattaci all&apos;indirizzo:
              <a href="mailto:dev.montane@gmail.com" className="text-orange-400 hover:text-orange-300 ml-1">
                dev.montane@gmail.com
              </a>
            </p>
          </section>

          {/* Cookie */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Cookie e tecnologie simili</h2>
            <p className="text-neutral-300 leading-relaxed">
              Utilizziamo cookie tecnici necessari per il funzionamento del servizio. Non utilizziamo cookie di
              profilazione o di tracciamento per scopi pubblicitari. I cookie tecnici ci aiutano a mantenere le tue
              preferenze e migliorare le prestazioni del sito.
            </p>
          </section>

          {/* Modifiche */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Modifiche alla Privacy Policy</h2>
            <p className="text-neutral-300 leading-relaxed">
              Potremmo aggiornare questa Privacy Policy periodicamente. Ti notificheremo eventuali modifiche
              significative pubblicando la nuova Privacy Policy su questa pagina e aggiornando la data di &quot;Ultimo
              aggiornamento&quot; in alto.
            </p>
          </section>

          {/* Contatti */}
          <section className="bg-neutral-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Contattaci</h2>
            <p className="text-neutral-300 mb-4">
              Se hai domande su questa Privacy Policy o sui tuoi dati personali, contattaci:
            </p>
            <div className="space-y-2">
              <p className="text-neutral-300">
                <strong>Email:</strong>
                <a href="mailto:dev.montane@gmail.com" className="text-orange-400 hover:text-orange-300 ml-1">
                  dev.montane@gmail.com
                </a>
              </p>
              <p className="text-neutral-300">
                <strong>Oggetto:</strong> Richiesta Privacy - Cinemood
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
