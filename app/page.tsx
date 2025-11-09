'use client'

import { useState } from 'react'
import SearchWithFilters from './components/SearchWithFilters'



export default function Home() {
  const [selectedVirtue, setSelectedVirtue] = useState<string>('')

  const handleVirtueClick = (virtueLabel: string) => {
    // Ex : "Paix ✨" → "paix"
    const virtue = virtueLabel.toLowerCase().split(' ')[0].normalize("NFD").replace(/[\u0300-\u036f]/g, '')
    setSelectedVirtue(virtue)
    // Scroll jusqu’à la recherche
    setTimeout(() => {
      const searchSection = document.getElementById('search-section')
      searchSection?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-cream py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Vie des Saints
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez la vie inspirante des saints et leurs vertus à travers les siècles.
          </p>

       
        </div>
      </section>

     

      {/* 🔎 Recherche avec filtres */}
      <section id="search-section" className="bg-cream border-t border-gray-200">
        <SearchWithFilters initialVirtue={selectedVirtue} />
      </section>
    </div>
  )
}
