"use client";

import Footer from "@/components/Footer";
import MatchCard from "@/components/MatchCard";
import MatchLiveCard from "@/components/MatchLiveCard";
import Navbar from "@/components/Navbar";
import { getAllMatches, getLatestMatches } from "@/lib/apiFoot";
// import { fetchScorebatHighlights } from "@/lib/fetchdata";
// import { matchesData } from "@/lib/elmData";
import { useEffect, useState } from "react";

export default function page() {
    const [activeFilter, setActiveFilter] = useState('tous');
    const [searchQuery, setSearchQuery] = useState('');
    const [matchesData, setMatchesData] = useState([]);
    const [featuredMatches, setFeaturedMatches] = useState([]);
   // Filtrer les matchs en direct pour la section "Matchs du Moment"

    // recupérer les données des matchs en direct et des matchs récents
  const fetchMatchesData = async () => {
    try {

        const [response, featuredMatchesDat] = await Promise.all([
                getAllMatches(),
                getLatestMatches(12),
              ]);
      setMatchesData(response);
      setFeaturedMatches(featuredMatchesDat);
    } catch (error) {
      console.error('Error fetching matches data:', error);
    }

  }


  // Charger les données des matchs en direct et des matchs récents au montage du composant
  useEffect(() => {
    fetchMatchesData();
  }, []);

  // Filtrer les matchs selon le filtre actif
  const filteredMatches = matchesData?.filter(match => {
    if (activeFilter === 'tous') return true;
    return match.competition.toLowerCase().includes(activeFilter.toLowerCase());
  }).filter(match => {
    if (!searchQuery) return true;
    return match.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           match.competition.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  return (
    <>
       <Navbar />
       <main className="container mx-auto px-4 pt-24 pb-12">
          {/* Section "Matchs du Moment" */}
            <section className="mb-10 relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1DD1A1] to-[#F9CA24] opacity-90"></div>
              <div className="absolute bottom-0 right-0 opacity-10">
                <i className="fas fa-lion text-9xl"></i>
              </div>
              
              <div className="relative p-6">
                <h2 className="text-3xl font-bold text-white mb-6 font-['Poppins']">
                  <i className="fas fa-fire mr-2"></i> Matchs du Moment
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredMatches.map(match => (
                     <MatchLiveCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            </section>

             {/* Système de filtrage */}
            <section className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-4 rounded-lg shadow-md">
                <div className="flex flex-wrap gap-3 mb-4 md:mb-0">
                  <button 
                    onClick={() => setActiveFilter('tous')} 
                    className={`px-4 py-2 rounded-full font-medium transition-colors !rounded-button cursor-pointer whitespace-nowrap ${activeFilter === 'tous' ? 'bg-[#F9CA24] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    <i className="fas fa-globe-africa mr-2"></i> Tous
                  </button>
                  <button 
                    onClick={() => setActiveFilter('Ligue 1')} 
                    className={`px-4 py-2 rounded-full font-medium transition-colors !rounded-button cursor-pointer whitespace-nowrap ${activeFilter === 'Ligue 1' ? 'bg-[#F9CA24] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    <i className="fas fa-futbol mr-2"></i> Ligue 1
                  </button>
                  <button 
                    onClick={() => setActiveFilter('ENGLAND: Premier League')} 
                    className={`px-4 py-2 rounded-full font-medium transition-colors !rounded-button cursor-pointer whitespace-nowrap ${activeFilter === 'ENGLAND: Premier League' ? 'bg-[#F9CA24] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    <i className="fas fa-futbol mr-2"></i> Premier League
                  </button>
                  <button 
                    onClick={() => setActiveFilter('SPAIN: La Liga')} 
                    className={`px-4 py-2 rounded-full font-medium transition-colors !rounded-button cursor-pointer whitespace-nowrap ${activeFilter === 'SPAIN: La Liga' ? 'bg-[#F9CA24] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    <i className="fas fa-futbol mr-2"></i> La Liga
                  </button>
                  <button 
                    onClick={() => setActiveFilter('WORLD: FIFA Club World Championship')} 
                    className={`px-4 py-2 rounded-full font-medium transition-colors !rounded-button cursor-pointer whitespace-nowrap ${activeFilter === 'WORLD: FIFA Club World Championship' ? 'bg-[#F9CA24] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    <i className="fas fa-trophy mr-2"></i> Cup World club
                  </button>
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher un match..."
                    className="pl-10 pr-4 py-2 border-none rounded-full bg-gray-100 focus:ring-2 focus:ring-[#1DD1A1] focus:outline-none w-full md:w-64 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>
            </section>





                        {/* Grille de résumés */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-gray-800 font-['Poppins']">
                Résumés Récents
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMatches.map(match => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
              
              {filteredMatches.length === 0 && (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500 text-lg">Aucun match trouvé pour votre recherche.</p>
                </div>
              )}
            </section>

       </main>

       <Footer />
    </>
  )
}
