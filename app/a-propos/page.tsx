import { Heart, Users, Book, Target } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Esprit du Projet
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une invitation à la contemplation et à la découverte des trésors 
            de la sainteté à travers les siècles.
          </p>
        </div>

        {/* Valeurs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <Heart className="text-blue-600" size={24} />
              </div>
              <h3 className="font-playfair text-xl font-semibold">Inspiration</h3>
            </div>
            <p className="text-gray-600">
              Chaque saint est un reflet unique de l&apos;amour divin, une inspiration 
              pour notre propre chemin de croissance spirituelle.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <Users className="text-green-600" size={24} />
              </div>
              <h3 className="font-playfair text-xl font-semibold">Accessibilité</h3>
            </div>
            <p className="text-gray-600">
              Rendre la richesse de la tradition des saints accessible à tous, 
              dans un format moderne et facile à naviguer.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <Book className="text-purple-600" size={24} />
              </div>
              <h3 className="font-playfair text-xl font-semibold">Éducation</h3>
            </div>
            <p className="text-gray-600">
              Offrir un contenu éducatif de qualité, fidèle aux sources et 
              enrichi de citations et d&apos;enseignements.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                <Target className="text-orange-600" size={24} />
              </div>
              <h3 className="font-playfair text-xl font-semibold">Contemplation</h3>
            </div>
            <p className="text-gray-600">
              Créer un espace paisible propice à la méditation et à la réflexion 
              sur les vertus chrétiennes.
            </p>
          </div>
        </div>

        {/* Notre mission */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-12">
          <h2 className="font-playfair text-2xl font-semibold text-center text-gray-800 mb-6">
            Notre Mission
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">
              Dans un monde souvent agité et complexe, les saints nous offrent 
              des modèles de vie inspirants, des témoins de l&apos;amour de Dieu à 
              travers l&apos;histoire.
            </p>
            <p className="mb-4">
              Ce projet est né du désir de partager ces trésors spirituels 
              avec une nouvelle génération, en utilisant les technologies 
              modernes pour servir un message éternel.
            </p>
            <p>
              Nous croyons que chaque personne, quelle que soit sa situation, 
              peut trouver dans la vie des saints une source d&apos;espérance, 
              de force et d&apos;inspiration pour son propre chemin.
            </p>
          </div>
        </div>

        {/* Sources et crédits */}
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <h2 className="font-playfair text-2xl font-semibold text-center text-gray-800 mb-6">
            Sources et Crédits
          </h2>
          <div className="text-center text-gray-600">
            <p className="mb-4">
              Les contenus de cette application sont basés sur des sources 
              historiques fiables et la tradition de l&apos;Église catholique.
            </p>
            <p>
              Nous nous efforçons de maintenir l&apos;exactitude historique et 
              théologique de toutes les informations présentées.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}