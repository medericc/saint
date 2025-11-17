'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import VirtueBadge from './VirtueBadge'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Saint {
  id: string
  name: string
cover: string
  period: string
  image: string
  shortDescription: string
  fullDescription?: string
}

interface CardSaintProps {
  saint: Saint
}

export default function CardSaint({ saint }: CardSaintProps) {
  const [isExpanded, setIsExpanded] = useState(false)
const rawName = saint.name

// Mots à retirer sur desktop
const desktopName = rawName
  .replace(/bienheureuse\s*/i, "")
  .replace(/bienheureux\s*/i, "")
  .trim()

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        <Image
          src={saint.cover}
          alt={saint.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
     <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-2">

  {/* Nom complet sur mobile */}
  <span className="block md:hidden">
    {rawName}
  </span>

  {/* Nom sans "bienheureuse" sur desktop */}
  <span className="hidden md:block">
    {desktopName}
  </span>
</h3>

        
        <p className="text-gray-600 text-sm mb-3">{saint.period}</p>
        
        <p className="text-gray-700 mb-4 line-clamp-2">
          {saint.shortDescription}
        </p>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <Link 
            href={`/saint/${saint.id}`}
            className="text-gold hover:text-gold-dark font-medium text-sm transition-colors"
          >
            En savoir plus →
          </Link>
          
         
        </div>

        {/* Section étendue */}
        {isExpanded && saint.fullDescription && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-gray-600 text-sm">{saint.fullDescription}</p>
          </div>
        )}
      </div>
    </div>
  )
}