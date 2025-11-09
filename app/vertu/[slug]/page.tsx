import Link from 'next/link'
import { notFound } from 'next/navigation'
import CardSaint from '../../components/CardSaint'
import VirtueBadge from '../../components/VirtueBadge'
import virtuesData from '../../data/virtues.json'
import saintsData from '../../data/saints.json'
import saintsByVirtue from '../../data/saintsByVirtue.json'

interface PageProps {
  params: {
    slug: string
  }
}

export default function VirtuePage({ params }: PageProps) {
  const virtue = virtuesData[params.slug as keyof typeof virtuesData]

  if (!virtue) {
    notFound()
  }

  const saintIds = saintsByVirtue[params.slug as keyof typeof saintsByVirtue] || []
  const saints = saintIds.map(id => saintsData[id as keyof typeof saintsData]).filter(Boolean)

  const sortedSaints = saints.sort((a, b) => {
    const periodOrder = ['5e siècle', '12e-13e siècle', '17e siècle', '19e siècle']
    return periodOrder.indexOf(a.period) - periodOrder.indexOf(b.period)
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* En-tête de la vertu */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="text-6xl">{virtue.icon}</div>
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Vertu de {virtue.name}
          </h1>

          {/* 🌟 Ajout du badge de la vertu ici */}
          <div className="flex justify-center mb-6">
            <VirtueBadge virtue={params.slug}>{virtue.name}</VirtueBadge>
          </div>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            {virtue.description}
          </p>

          {/* Citation biblique */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-gold/20">
            <blockquote className="text-lg italic text-gray-700 mb-2">
              &quot;{virtue.bibleQuote.text}&quot;
            </blockquote>
            <cite className="text-gray-500 not-italic">
              {virtue.bibleQuote.reference}
            </cite>
          </div>
        </div>

        {/* Saints associés */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-gray-800">
              Saints exemplaires
              <span className="text-gold ml-2">({saints.length})</span>
            </h2>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Trier par :</span>
              <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-gold">
                <option>Période</option>
                <option>Nom</option>
              </select>
            </div>
          </div>

          {saints.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedSaints.map(saint => (
                <div key={saint.id}>
                  <CardSaint saint={saint} />
                  
                  {/* 🌿 Exemple optionnel : afficher les vertus du saint */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {saint.virtues.map(v => (
                      <VirtueBadge key={v} virtue={v} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4 text-6xl">{virtue.icon}</div>
              <h3 className="font-playfair text-xl font-semibold text-gray-600 mb-2">
                Aucun saint trouvé
              </h3>
              <p className="text-gray-500">
                Aucun saint n&apos;est actuellement associé à cette vertu.
              </p>
            </div>
          )}
        </div>

        {/* Autres vertus */}
        <div className="mt-16">
          <h2 className="font-playfair text-2xl font-semibold text-center text-gray-800 mb-8">
            Découvrir d&apos;autres vertus
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(virtuesData)
              .filter(([slug]) => slug !== params.slug)
              .map(([slug, virtueData]) => (
                <Link
                  key={slug}
                  href={`/vertu/${slug}`}
                  className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="text-3xl mb-2">{virtueData.icon}</div>
                  <h3 className="font-semibold text-gray-800">{virtueData.name}</h3>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const virtue = virtuesData[params.slug as keyof typeof virtuesData]
  
  return {
    title: `Vertu de ${virtue?.name} - Vie des Saints`,
    description: virtue?.description,
  }
}
