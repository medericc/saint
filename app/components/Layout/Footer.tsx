import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Citation */}
          <div className="col-span-1 md:col-span-2">
            <blockquote className="text-xl italic text-gray-300">
              &quot;La sainteté est la face la plus belle de l&#39;Église.&quot;
            </blockquote>
            <p className="mt-2 text-gray-400">- Pape François</p>
          </div>
          
          {/* Liens */}
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-semibold">Navigation</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-300 hover:text-gold transition-colors">
                Accueil
              </Link>
              <Link href="/recherche" className="block text-gray-300 hover:text-gold transition-colors">
                Recherche
              </Link>
              <Link href="/a-propos" className="block text-gray-300 hover:text-gold transition-colors">
                À propos
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Vie des Saints. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}