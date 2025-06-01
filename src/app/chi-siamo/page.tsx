import Link from "next/link"
import { ArrowLeft, Film, Heart, Users, Target } from "lucide-react"

export default function ChiSiamoPage() {
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
          <h1 className="text-4xl font-bold mb-4">Chi siamo</h1>
          <p className="text-xl text-neutral-400">La storia dietro Cinemood e la nostra missione</p>
        </div>

        {/* Mission */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-orange-700" />
            <h2 className="text-3xl font-bold">La nostra missione</h2>
          </div>
          <p className="text-lg text-neutral-300 leading-relaxed">
            Cinemood nasce dalla convinzione che il cinema e le serie TV non siano solo intrattenimento, ma potenti
            strumenti emotivi capaci di accompagnarci, consolarci e ispirarci. La nostra missione è creare un ponte tra
            le tue emozioni e il contenuto perfetto per te, trasformando ogni serata in un&apos;esperienza
            cinematografica su misura.
          </p>
        </div>

        {/* Story */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Film className="w-8 h-8 text-orange-700" />
            <h2 className="text-3xl font-bold">La nostra storia</h2>
          </div>
          <div className="space-y-4 text-neutral-300 leading-relaxed">
            <p>
              Tutto è iniziato con una semplice domanda: &quot;Cosa guardo stasera?&quot; Quante volte ci siamo trovati
              a scorrere infinite liste di film e serie TV senza riuscire a decidere? Quante volte abbiamo scelto
              qualcosa che non rispecchiava il nostro stato d&apos;animo del momento?
            </p>
            <p>
              Abbiamo capito che la scelta di cosa guardare non dovrebbe essere casuale, ma dovrebbe riflettere chi
              siamo e come ci sentiamo. Per questo abbiamo creato Cinemood: un sistema intelligente che comprende le tue
              emozioni e ti guida verso il contenuto che può davvero arricchire la tua esperienza.
            </p>
            <p>
              Utilizzando tecnologie avanzate di analisi del linguaggio naturale e un database curato di contenuti
              cinematografici, Cinemood trasforma il modo in cui scopri nuovi film e serie TV.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-8 h-8 text-orange-700" />
            <h2 className="text-3xl font-bold">I nostri valori</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-neutral-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-orange-400">Personalizzazione</h3>
              <p className="text-neutral-300">
                Crediamo che ogni persona sia unica, così come le sue emozioni e preferenze. Le nostre raccomandazioni
                sono sempre personalizzate e mai generiche.
              </p>
            </div>
            <div className="bg-neutral-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-orange-400">Semplicità</h3>
              <p className="text-neutral-300">
                La tecnologia dovrebbe semplificare la vita, non complicarla. Cinemood è intuitivo e facile da usare per
                chiunque.
              </p>
            </div>
            <div className="bg-neutral-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-orange-400">Privacy</h3>
              <p className="text-neutral-300">
                Rispettiamo la tua privacy. I tuoi dati emotivi sono trattati con la massima cura e non vengono mai
                condivisi con terze parti.
              </p>
            </div>
            <div className="bg-neutral-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-orange-400">Qualità</h3>
              <p className="text-neutral-300">
                Curiamo attentamente ogni raccomandazione, assicurandoci che ogni suggerimento sia rilevante e di alta
                qualità.
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-orange-700" />
            <h2 className="text-3xl font-bold">Il team</h2>
          </div>
          <p className="text-neutral-300 leading-relaxed">
            Siamo un team di appassionati di cinema, tecnologia e psicologia emotiva. Combiniamo competenze tecniche
            avanzate con una profonda comprensione dell&apos;esperienza umana per creare qualcosa di veramente speciale.
            Ogni membro del team contribuisce con la propria expertise per rendere Cinemood sempre migliore.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center bg-neutral-900 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Unisciti alla nostra community</h3>
          <p className="text-neutral-400 mb-6">Scopri come Cinemood può trasformare le tue serate</p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-orange-700 hover:bg-orange-600 text-white font-bold rounded-full transition-colors"
          >
            Inizia Ora
          </Link>
        </div>
      </div>
    </div>
  )
}
