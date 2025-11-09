'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import VirtueBadge from './VirtueBadge'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Saint {
  id: string
  name: string
  virtues: string[]
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

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        <Image
          src={saint.image}
          alt={saint.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-2">
          {saint.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3">{saint.period}</p>
        
        <p className="text-gray-700 mb-4 line-clamp-2">
          {saint.shortDescription}
        </p>

        {/* Vertus */}
        <div className="flex flex-wrap gap-2 mb-4">
          {saint.virtues.slice(0, 2).map((virtue) => (
            <VirtueBadge key={virtue} virtue={virtue} />
          ))}
          {saint.virtues.length > 2 && (
            <span className="text-xs text-gray-500 self-center">
              +{saint.virtues.length - 2}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <Link 
            href={`/saint/${saint.id}`}
            className="text-gold hover:text-gold-dark font-medium text-sm transition-colors"
          >
            En savoir plus →
          </Link>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center text-gray-500 hover:text-gray-700 text-sm"
          >
            {isExpanded ? (
              <>
                Réduire <ChevronUp size={16} className="ml-1" />
              </>
            ) : (
              <>
                Étendre <ChevronDown size={16} className="ml-1" />
              </>
            )}
          </button>
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