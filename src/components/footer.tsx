export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 mt-30 py-8">
      <div className="container mx-auto px-14 md:px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Logo e descrizione */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold">Cinemood</h2>
            <p className="text-neutral-600 mt-2">
              Una collezione di film e serie TV per il tuo intrattenimento.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Instagram" className="text-neutral-600 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="Facebook" className="text-neutral-600 hover:text-white">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" aria-label="Twitter" className="text-neutral-600 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-neutral-600 hover:text-white">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Link di navigazione */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14">
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Prodotto</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-neutral-600 hover:text-white">Panoramica</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-white">Prezzi</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-white">Marketplace</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-white">Funzionalità</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Azienda</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-neutral-600 hover:text-white">Chi siamo</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-white">Team</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-white">Carriere</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Risorse</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-neutral-600 hover:text-white">Aiuto</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-white">Vendite</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-white">Pubblicità</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-white">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t pt-4 text-center text-sm text-neutral-600">
          © 2025 Cinemood. Tutti i diritti riservati. <a href="#" className="hover:underline">Termini e condizioni</a> | <a href="#" className="hover:underline">Politica sulla privacy</a>
        </div>
      </div>
    </footer>
  )
}