'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, X } from 'lucide-react'
import CardSaint from './CardSaint'
import VirtueBadge from './VirtueBadge'

import saintsDataRaw from '../data/saints.json'
import virtuesData from '../data/virtues.json'

// Typage
interface Saint {
  id: string
  name: string
  virtues: string[]
  period: string
  country: string
  type: string
  shortDescription: string
  image: string
  [key: string]: unknown
}

const saintsData: Saint[] = Object.values(saintsDataRaw) as Saint[]
const virtuesList = Object.keys(virtuesData)
const periodsList = Array.from(new Set(saintsData.map(s => s.period)))
const countriesList = Array.from(new Set(saintsData.map(s => s.country)))
const typesList = Array.from(new Set(saintsData.map(s => s.type)))

interface SearchWithFiltersProps {
  initialVirtue?: string
  initialSearch?: string
}

export default function SearchWithFilters({ initialVirtue = '', initialSearch = '' }: SearchWithFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [selectedVirtues, setSelectedVirtues] = useState<string[]>(initialVirtue ? [initialVirtue] : [])
  const [selectedPeriod, setSelectedPeriod] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filteredSaints = useMemo(() => {
    return saintsData.filter((saint) => {
      const matchesSearch =
        saint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        saint.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesVirtues =
        selectedVirtues.length === 0 ||
        selectedVirtues.some(v => saint.virtues.includes(v))

      const matchesPeriod = !selectedPeriod || saint.period === selectedPeriod
      const matchesCountry = !selectedCountry || saint.country === selectedCountry
      const matchesType = !selectedType || saint.type === selectedType

      return matchesSearch && matchesVirtues && matchesPeriod && matchesCountry && matchesType
    })
  }, [searchTerm, selectedVirtues, selectedPeriod, selectedCountry, selectedType])

  const toggleVirtue = (virtue: string) => {
    setSelectedVirtues(prev =>
      prev.includes(virtue) ? prev.filter(v => v !== virtue) : [...prev, virtue]
    )
  }

  const clearFilters = () => {
    setSelectedVirtues([])
    setSelectedPeriod('')
    setSelectedCountry('')
    setSelectedType('')
    setSearchTerm('')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Barre de recherche */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Rechercher un saint par nom ou description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
        />
      </div>

      {/* Bouton ouverture modale sur mobile/tablette */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
        >
          <Filter size={18} />
          <span>Filtres</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <h3 className="font-playfair text-lg font-semibold">Filtres</h3>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Vertus</h4>
              <div className="space-y-2">
                {virtuesList.map(virtue => (
                  <label key={virtue} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedVirtues.includes(virtue)}
                      onChange={() => toggleVirtue(virtue)}
                      className="rounded text-gold focus:ring-gold"
                    />
                    <VirtueBadge virtue={virtue} />
                  </label>
                ))}
              </div>
            </div>

            <FilterSelect label="Période" value={selectedPeriod} setValue={setSelectedPeriod} options={periodsList} />
            <FilterSelect label="Pays" value={selectedCountry} setValue={setSelectedCountry} options={countriesList} />
            <FilterSelect label="Type" value={selectedType} setValue={setSelectedType} options={typesList} />
          </div>
        </div>

        {/* Résultats */}
        <div className="flex-1">
          {(selectedVirtues.length > 0 || selectedPeriod || selectedCountry || selectedType) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedVirtues.map(virtue => (
                <div key={virtue} className="flex items-center space-x-1">
                  <VirtueBadge virtue={virtue} />
                  <button onClick={() => toggleVirtue(virtue)} className="text-gray-500 hover:text-gray-700">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {filteredSaints.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredSaints.map(saint => (
                <CardSaint key={saint.id} saint={saint} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Search size={48} className="mx-auto mb-4 text-gray-400" />
              Aucun saint trouvé. Essayez de modifier vos filtres.
            </div>
          )}
        </div>
      </div>

      {/* ✅ Nouvelle modale compacte et centrée */}
      {showFilters && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40"
          onClick={() => setShowFilters(false)} // clic fond = ferme
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-[90%] max-w-md max-h-[80vh] overflow-y-auto p-6 relative"
            onClick={(e) => e.stopPropagation()} // empêche fermeture si on clique dedans
          >
            <button
              onClick={() => setShowFilters(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={22} />
            </button>

            <h3 className="font-playfair text-lg font-semibold mb-4 text-center">Filtres</h3>

            <div className="space-y-6">
              {/* Vertus */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Vertus</h4>
                <div className="space-y-2">
                  {virtuesList.map(virtue => (
                    <label key={virtue} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedVirtues.includes(virtue)}
                        onChange={() => toggleVirtue(virtue)}
                        className="rounded text-gold focus:ring-gold"
                      />
                      <VirtueBadge virtue={virtue} />
                    </label>
                  ))}
                </div>
              </div>

              <FilterSelect label="Période" value={selectedPeriod} setValue={setSelectedPeriod} options={periodsList} />
              <FilterSelect label="Pays" value={selectedCountry} setValue={setSelectedCountry} options={countriesList} />
              <FilterSelect label="Type" value={selectedType} setValue={setSelectedType} options={typesList} />
            </div>

            <div className="mt-6">
              <button
                onClick={() => setShowFilters(false)}
                className="w-full bg-gold text-white py-2 rounded-lg font-medium"
              >
                Appliquer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function FilterSelect({
  label,
  value,
  setValue,
  options
}: {
  label: string
  value: string
  setValue: (v: string) => void
  options: string[]
}) {
  return (
    <div>
      <h4 className="font-semibold text-gray-800 mb-3">{label}</h4>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-gold"
      >
        <option value="">Tous</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}
