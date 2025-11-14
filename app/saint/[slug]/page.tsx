import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Share2, Calendar, MapPin } from 'lucide-react'
import VirtueBadge from '../../components/VirtueBadge'
import CollapsibleSection from '../../components/CollapsibleSection'
import saintsData from '../../data/saints.json'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function SaintPage({ params }: PageProps) {
  const { slug } = await params
  const saint = saintsData[slug as keyof typeof saintsData]

  if (!saint) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation discrète */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-gold hover:text-gold-dark font-medium transition-colors group"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Retour à l&apos;accueil
          </Link>
        </div>

        {/* En-tête épuré */}
        <div className="text-center mb-12">
          {/* Image du saint avec effet de halo */}
          <div className="relative mx-auto mb-6 w-32 h-32 md:w-45 md:h-45">
            <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-sky/20 rounded-full blur-md transform scale-110" />
            <div className="relative w-full h-full bg-gray-100 rounded-full border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
              <span className="text-gray-400 text-sm text-center px-2">
                {saint.name}
              </span>
              {/* 
              <Image
                src={saint.image}
                alt={saint.name}
                fill
                className="object-cover"
              />
              */}
            </div>
          </div>

          {/* Titre et informations essentielles */}
          <div className="space-y-4">
            <h1 className="font-playfair text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
              {saint.name}
            </h1>

            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200">
                <Calendar size={14} />
                <span>{saint.period}</span>
              </div>
              <div className="flex items-center space-x-1 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200">
                <MapPin size={14} />
                <span>{saint.country}</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200 capitalize">
                {saint.type}
              </div>
            </div>

            
          </div>
        </div>

     
       {/* Sections détaillées : biographie découpée */}
<div className="space-y-6 max-w-3xl mx-auto">
  {saint.biography &&
    Object.entries(saint.biography).map(([sectionKey, sectionText]) => (
      <CollapsibleSection 
        key={sectionKey} 
        title={sectionKey.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
        defaultOpen={sectionKey === Object.keys(saint.biography)[0]} // ouvre la première section
      >
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {sectionText}
          </p>
        </div>
      </CollapsibleSection>
  ))}


        </div>

        {/* Saints similaires - Section discrète */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="font-playfair text-xl font-semibold text-gray-800 mb-6 text-center">
            Découvrir d&apos;autres saints
          </h2>
          <div className="flex justify-center">
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gold text-white rounded-full hover:bg-gold-dark transition-colors font-medium"
            >
              Explorer tous les saints
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const saint = saintsData[slug as keyof typeof saintsData]

  return {
    title: `${saint?.name} - Vie des Saints`,
    description: saint?.shortDescription,
  }
}