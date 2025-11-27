'use client'

import { useState, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import CardSaint from './CardSaint'
import saintsDataRaw from '../data/saints.json'

// Typage
interface Saint {
  id: string
  name: string
  period: string
  country: string
  type: string
  feastDay: string
  shortDescription: string
  image: string
  cover: string
  [key: string]: unknown
}

const saintsData: Saint[] = Object.values(saintsDataRaw) as Saint[]

const countriesList = Array.from(new Set(saintsData.map(s => s.country)))
const typesList = Array.from(new Set(saintsData.map(s => s.type)))

interface SearchWithFiltersProps {
  initialSearch?: string
}
// Convertit "5e siècle" -> [5], "5e-6e siècle" -> [5,6]
function parseCentury(period: string): number[] {
  const match = period.match(/(\d+)(?:e|er)(?:-(\d+)(?:e)?)?/)

  if (!match) return []

  const start = parseInt(match[1], 10)
  const end = match[2] ? parseInt(match[2], 10) : start

  const list: number[] = []
  for (let c = start; c <= end; c++) list.push(c)

  return list
}

function matchesCentury(selected: string, saintPeriod: string): boolean {
  if (!selected) return true

  const selectedC = parseCentury(selected)
  const saintC = parseCentury(saintPeriod)

  // Si aucun siècle détecté
  if (selectedC.length === 0 || saintC.length === 0) return false

  // Test de chevauchement : au moins un siècle en commun
  return selectedC.some(c => saintC.includes(c))
}

export default function SearchWithFilters({ initialSearch = '' }: SearchWithFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [selectedPeriod, setSelectedPeriod] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
 
  const filteredSaints = useMemo(() => {
    return saintsData.filter((saint) => {
      const matchesSearch =
        saint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        saint.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPeriod = matchesCentury(selectedPeriod, saint.period)
 const matchesCountry = !selectedCountry || saint.country === selectedCountry
    
      return matchesSearch && matchesPeriod && matchesCountry 
    })
  }, [searchTerm, selectedPeriod, selectedCountry])
// Génère une liste unique de siècles à partir de toutes les périodes
const periodsList = Array.from(
  new Set(
    saintsData
      .flatMap(s => parseCentury(s.period)) // ex : "5e-6e" -> [5,6]
  )
)
  .sort((a, b) => a - b) // tri croissant
  .map(c => `${c}e siècle`) // formatage en texte


 function sortByClosestFeastDay(saints: Saint[]) {
  const today = new Date()
  const currentYear = today.getFullYear()

  return [...saints].sort((a, b) => {
    // 1️⃣ S'il manque une date → envoyer à la fin
    if (!a.feastDay) return 1
    if (!b.feastDay) return -1

    const [dayA, monthA] = a.feastDay.split('/').map(Number)
    const [dayB, monthB] = b.feastDay.split('/').map(Number)

    // 2️⃣ Si date invalide → à la fin
    if (!dayA || !monthA) return 1
    if (!dayB || !monthB) return -1

    // 3️⃣ Construire les dates de cette année
    let dateA = new Date(currentYear, monthA - 1, dayA)
    let dateB = new Date(currentYear, monthB - 1, dayB)

    // 4️⃣ Si la fête est déjà passée → ajouter 1 an
    if (dateA < today) {
      dateA = new Date(currentYear + 1, monthA - 1, dayA)
    }
    if (dateB < today) {
      dateB = new Date(currentYear + 1, monthB - 1, dayB)
    }

    return dateA.getTime() - dateB.getTime()
  })
}




  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* 🔹 FILTRES HORIZONTAUX */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center md:justify-center">

      <div className="w-full sm:w-full md:w-auto">
  <FilterSelect
    label="Période"
    value={selectedPeriod}
    setValue={setSelectedPeriod}
    options={periodsList}
  />
</div>


      <div className="hidden md:flex">
  <FilterSelect
    label="Pays"
    value={selectedCountry}
    setValue={setSelectedCountry}
    options={countriesList}
  />
</div>


      
      </div>

      {/* Barre de recherche */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Rechercher un saint par nom ou description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
        />
      </div>

      {/* Tags affichés */}
      {(selectedPeriod || selectedCountry ) && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedPeriod && (
            <FilterTag label={selectedPeriod} onRemove={() => setSelectedPeriod('')} />
          )}
          {selectedCountry && (
            <FilterTag label={selectedCountry} onRemove={() => setSelectedCountry('')} />
          )}
        
        </div>
      )}

      {/* Résultats */}
      {filteredSaints.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortByClosestFeastDay(filteredSaints).map(saint => (

            <CardSaint key={saint.id} saint={saint} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <Search size={48} className="mx-auto mb-4 text-gray-400" />
          Aucun catholique trouvé. Essayez de modifier vos filtres.
        </div>
      )}
    </div>
  )
}


/* ----------------------------- Composants utiles ----------------------------- */

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
    <div className="flex flex-col text-sm">
      <span className="font-semibold text-gray-800 mb-1">{label}</span>

      <div className="relative">
        {/* Icône flèche */}
        <svg
          className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
        </svg>

        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
        className="
  appearance-none
  w-full md:w-44
  border border-gray-300
  bg-white
  rounded-lg md:rounded-xl
  px-3 py-2
  pr-8
  shadow-sm
  text-gray-700
  transition-all
  focus:ring-2 focus:ring-gold focus:border-gold
  hover:border-gray-400
"

        >
          <option value="">Tous</option>
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    </div>
  )
}


function FilterTag({
  label,
  onRemove
}: {
  label: string
  onRemove: () => void
}) {
  return (
    <div className="flex items-center space-x-1 bg-gray-200 px-3 py-1 rounded-full text-sm">
      <span>{label}</span>
      <button onClick={onRemove} className="text-gray-600 hover:text-gray-800">
        <X size={14} />
      </button>
    </div>
  )
}
