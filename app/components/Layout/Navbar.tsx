'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">✝</span>
            </div>
            <span className="font-playfair text-xl text-gray-800">Vie des Saints</span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gold transition-colors">
              Accueil
            </Link>
            <Link href="/recherche" className="text-gray-700 hover:text-gold transition-colors">
              Recherche
            </Link>
            <Link href="/a-propos" className="text-gray-700 hover:text-gold transition-colors">
              À propos
            </Link>
          </div>

          {/* Menu Mobile */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200">
            <div className="px-4 py-2 space-y-4">
              <Link href="/" className="block py-2 text-gray-700 hover:text-gold">
                Accueil
              </Link>
              <Link href="/recherche" className="block py-2 text-gray-700 hover:text-gold">
                Recherche
              </Link>
              <Link href="/a-propos" className="block py-2 text-gray-700 hover:text-gold">
                À propos
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}