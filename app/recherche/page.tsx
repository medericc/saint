import SearchWithFilters from '../components/SearchWithFilters'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recherche - Vie des Saints',
  description: 'Recherchez et filtrez les saints par vertu, période, pays et type',
}

export default function RecherchePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cream">
      {/* En-tête */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Recherche Avancée
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explorez notre collection de saints. Filtrez par vertu, période historique, 
              pays d&apos;origine ou type de sainteté pour trouver l&apos;inspiration qui vous correspond.
            </p>
          </div>
        </div>
      </div>

      {/* Composant de recherche avec filtres */}
      <SearchWithFilters />
    </div>
  )
}