export default function Footer() {
  return (
    <>
         {/* Pied de page */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 font-['Poppins']">Yalla Live</h3>
              <p className="text-gray-400">
                La meilleure plateforme pour suivre les résumés vidéo des matchs de football en temps réel.
              </p>
              <div className="flex mt-4 space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <i className="fab fa-facebook-f text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <i className="fab fa-youtube text-xl"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 font-['Poppins']">Liens Rapides</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Accueil</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Compétitions</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Équipes</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">À propos</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Contact</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 font-['Poppins']">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Inscrivez-vous pour recevoir les dernières actualités et mises à jour.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="bg-gray-700 text-white px-4 py-2 rounded-l-lg border-none focus:outline-none focus:ring-2 focus:ring-[#1DD1A1] w-full"
                />
                <button className="bg-[#1DD1A1] text-white px-4 py-2 rounded-r-lg hover:bg-[#19b88d] transition-colors !rounded-button cursor-pointer whitespace-nowrap">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 FootSummary. Tous droits réservés.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer">Politique de confidentialité</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer">Conditions d'utilisation</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}