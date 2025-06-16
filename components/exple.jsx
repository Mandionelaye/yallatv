// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';

const Exple = () => {
  const [activeTab, setActiveTab] = useState('accueil');
  const [activeFilter, setActiveFilter] = useState('tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Données des matchs (simulées)
  const matchesData = [
    {
      id: 1,
      homeTeam: 'PSG',
      awayTeam: 'Marseille',
      homeScore: 3,
      awayScore: 1,
      competition: 'Ligue 1',
      date: '2025-06-12',
      duration: '5:24',
      isLive: false,
      imageUrl: 'https://readdy.ai/api/search-image?query=A%20professional%20football%20match%20between%20PSG%20and%20Marseille%20teams%2C%20high%20quality%20sports%20photography%20with%20dynamic%20action%2C%20stadium%20atmosphere%2C%20vibrant%20colors%2C%20clear%20view%20of%20players%20in%20their%20team%20jerseys%2C%20dramatic%20lighting%2C%20passionate%20fans%20in%20background&width=600&height=340&seq=1&orientation=landscape'
    },
    {
      id: 2,
      homeTeam: 'Liverpool',
      awayTeam: 'Man City',
      homeScore: 2,
      awayScore: 2,
      competition: 'Premier League',
      date: '2025-06-12',
      duration: '4:15',
      isLive: true,
      imageUrl: 'https://readdy.ai/api/search-image?query=An%20exciting%20football%20match%20between%20Liverpool%20and%20Manchester%20City%2C%20professional%20sports%20photography%20capturing%20a%20goal%20moment%2C%20stadium%20filled%20with%20fans%2C%20players%20in%20action%2C%20high%20quality%20image%20with%20vibrant%20colors%20and%20clear%20details%20of%20the%20match&width=600&height=340&seq=2&orientation=landscape'
    },
    {
      id: 3,
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      homeScore: 2,
      awayScore: 0,
      competition: 'La Liga',
      date: '2025-06-11',
      duration: '6:30',
      isLive: false,
      imageUrl: 'https://readdy.ai/api/search-image?query=El%20Clasico%20football%20match%20between%20Real%20Madrid%20and%20Barcelona%2C%20intense%20moment%20with%20players%20competing%20for%20the%20ball%2C%20stadium%20atmosphere%20with%20fans%20cheering%2C%20professional%20sports%20photography%20with%20clear%20view%20of%20players%20in%20white%20and%20blue-red%20jerseys&width=600&height=340&seq=3&orientation=landscape'
    },
    {
      id: 4,
      homeTeam: 'Bayern',
      awayTeam: 'Dortmund',
      homeScore: 4,
      awayScore: 1,
      competition: 'Bundesliga',
      date: '2025-06-11',
      duration: '5:10',
      isLive: false,
      imageUrl: 'https://readdy.ai/api/search-image?query=German%20football%20derby%20between%20Bayern%20Munich%20and%20Borussia%20Dortmund%2C%20high%20quality%20sports%20photography%20showing%20players%20in%20red%20and%20yellow%20jerseys%20competing%20intensely%2C%20packed%20stadium%20with%20passionate%20fans%2C%20professional%20lighting%20and%20clear%20view%20of%20the%20action&width=600&height=340&seq=4&orientation=landscape'
    },
    {
      id: 5,
      homeTeam: 'Inter',
      awayTeam: 'AC Milan',
      homeScore: 1,
      awayScore: 1,
      competition: 'Serie A',
      date: '2025-06-10',
      duration: '4:45',
      isLive: false,
      imageUrl: 'https://readdy.ai/api/search-image?query=Milan%20derby%20football%20match%20between%20Inter%20and%20AC%20Milan%2C%20professional%20sports%20photography%20capturing%20an%20intense%20moment%2C%20players%20in%20blue-black%20and%20red-black%20jerseys%20competing%20for%20the%20ball%2C%20stadium%20filled%20with%20passionate%20fans%2C%20dramatic%20lighting&width=600&height=340&seq=5&orientation=landscape'
    },
    {
      id: 6,
      homeTeam: 'Sénégal',
      awayTeam: 'Égypte',
      homeScore: 2,
      awayScore: 0,
      competition: 'CAN',
      date: '2025-06-13',
      duration: '5:50',
      isLive: true,
      imageUrl: 'https://readdy.ai/api/search-image?query=African%20football%20match%20between%20Senegal%20and%20Egypt%20national%20teams%2C%20players%20in%20green%20and%20white%20jerseys%20competing%20intensely%2C%20stadium%20filled%20with%20colorful%20fans%20waving%20flags%2C%20professional%20sports%20photography%20with%20vibrant%20atmosphere%20and%20clear%20action%20shots&width=600&height=340&seq=6&orientation=landscape'
    }
  ];

  // Filtrer les matchs en direct pour la section "Matchs du Moment"
  const featuredMatches = matchesData.filter(match => match.isLive || new Date(match.date).toDateString() === new Date().toDateString());
  
  // Filtrer les matchs selon le filtre actif
  const filteredMatches = matchesData.filter(match => {
    if (activeFilter === 'tous') return true;
    return match.competition === activeFilter;
  }).filter(match => {
    if (!searchQuery) return true;
    return match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) || 
           match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
           match.competition.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Initialisation du graphique pour les statistiques
  useEffect(() => {
    const chartDom = document.getElementById('stats-chart');
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      const option = {
        animation: false,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['Équipe Domicile', 'Équipe Extérieure']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['Tirs', 'Tirs Cadrés', 'Possession', 'Corners', 'Fautes']
        },
        series: [
          {
            name: 'Équipe Domicile',
            type: 'bar',
            data: [18, 8, 65, 7, 12],
            color: '#1DD1A1'
          },
          {
            name: 'Équipe Extérieure',
            type: 'bar',
            data: [12, 4, 35, 3, 14],
            color: '#F9CA24'
          }
        ]
      };
      myChart.setOption(option);
      
      // Redimensionnement du graphique lors du redimensionnement de la fenêtre
      window.addEventListener('resize', () => {
        myChart.resize();
      });
      
      return () => {
        myChart.dispose();
        window.removeEventListener('resize', () => {
          myChart.resize();
        });
      };
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* En-tête et Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-[#1DD1A1] text-white shadow-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-2xl font-bold font-['Poppins'] tracking-wider">
                <i className="fas fa-futbol mr-2"></i>
                FootSummary
              </span>
            </div>
            
            {/* Menu principal - Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setActiveTab('accueil')} 
                className={`flex items-center font-['Poppins'] font-semibold cursor-pointer whitespace-nowrap ${activeTab === 'accueil' ? 'text-[#EE5253]' : 'text-white'}`}
              >
                <i className="fas fa-home mr-2"></i> Accueil
              </button>
              <button 
                onClick={() => setActiveTab('recherche')} 
                className={`flex items-center font-['Poppins'] font-semibold cursor-pointer whitespace-nowrap ${activeTab === 'recherche' ? 'text-[#EE5253]' : 'text-white'}`}
              >
                <i className="fas fa-search mr-2"></i> Recherche
              </button>
              <button 
                onClick={() => setActiveTab('favoris')} 
                className={`flex items-center font-['Poppins'] font-semibold cursor-pointer whitespace-nowrap ${activeTab === 'favoris' ? 'text-[#EE5253]' : 'text-white'}`}
              >
                <i className="fas fa-star mr-2"></i> Favoris
              </button>
            </nav>
            
            {/* Bouton de connexion */}
            <div className="flex items-center">
              <button className="bg-white text-[#1DD1A1] px-4 py-2 rounded-lg font-semibold shadow-sm hover:bg-gray-100 transition-colors !rounded-button cursor-pointer whitespace-nowrap">
                <i className="fas fa-user mr-2"></i> Connexion
              </button>
              
              {/* Bouton menu hamburger - Mobile */}
              <button 
                className="ml-4 md:hidden text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
              </button>
            </div>
          </div>
          
          {/* Menu mobile */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-[#1DD1A1] pb-4">
              <nav className="flex flex-col space-y-4">
                <button 
                  onClick={() => {
                    setActiveTab('accueil');
                    setIsMobileMenuOpen(false);
                  }} 
                  className={`flex items-center font-['Poppins'] font-semibold p-2 cursor-pointer whitespace-nowrap ${activeTab === 'accueil' ? 'text-[#EE5253] bg-white bg-opacity-20 rounded-lg' : 'text-white'}`}
                >
                  <i className="fas fa-home mr-2"></i> Accueil
                </button>
                <button 
                  onClick={() => {
                    setActiveTab('recherche');
                    setIsMobileMenuOpen(false);
                  }} 
                  className={`flex items-center font-['Poppins'] font-semibold p-2 cursor-pointer whitespace-nowrap ${activeTab === 'recherche' ? 'text-[#EE5253] bg-white bg-opacity-20 rounded-lg' : 'text-white'}`}
                >
                  <i className="fas fa-search mr-2"></i> Recherche
                </button>
                <button 
                  onClick={() => {
                    setActiveTab('favoris');
                    setIsMobileMenuOpen(false);
                  }} 
                  className={`flex items-center font-['Poppins'] font-semibold p-2 cursor-pointer whitespace-nowrap ${activeTab === 'favoris' ? 'text-[#EE5253] bg-white bg-opacity-20 rounded-lg' : 'text-white'}`}
                >
                  <i className="fas fa-star mr-2"></i> Favoris
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 pt-24 pb-12">
        {activeTab === 'accueil' && (
          <>
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
                    <div key={match.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
                      <div className="relative">
                        <img 
                          src={match.imageUrl} 
                          alt={`${match.homeTeam} vs ${match.awayTeam}`} 
                          className="w-full h-48 object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                          <div className="text-center">
                            <div className="flex items-center justify-center text-white mb-2">
                              <span className="text-xl font-bold">{match.homeTeam}</span>
                              <span className="mx-3 text-2xl font-bold">{match.homeScore} - {match.awayScore}</span>
                              <span className="text-xl font-bold">{match.awayTeam}</span>
                            </div>
                            <span className="bg-[#EE5253] text-white px-3 py-1 rounded-full text-sm font-semibold">
                              {match.isLive ? 'LIVE' : 'Récent'}
                            </span>
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                          <i className="fas fa-clock mr-1"></i> {match.duration}
                        </div>
                      </div>
                      <div className="p-3 bg-white">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-gray-600">{match.competition}</span>
                          <button className="text-[#1DD1A1] hover:text-[#EE5253] transition-colors cursor-pointer">
                            <i className="fas fa-play-circle text-lg"></i>
                          </button>
                        </div>
                      </div>
                    </div>
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
                    onClick={() => setActiveFilter('Premier League')} 
                    className={`px-4 py-2 rounded-full font-medium transition-colors !rounded-button cursor-pointer whitespace-nowrap ${activeFilter === 'Premier League' ? 'bg-[#F9CA24] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    <i className="fas fa-futbol mr-2"></i> Premier League
                  </button>
                  <button 
                    onClick={() => setActiveFilter('La Liga')} 
                    className={`px-4 py-2 rounded-full font-medium transition-colors !rounded-button cursor-pointer whitespace-nowrap ${activeFilter === 'La Liga' ? 'bg-[#F9CA24] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    <i className="fas fa-futbol mr-2"></i> La Liga
                  </button>
                  <button 
                    onClick={() => setActiveFilter('CAN')} 
                    className={`px-4 py-2 rounded-full font-medium transition-colors !rounded-button cursor-pointer whitespace-nowrap ${activeFilter === 'CAN' ? 'bg-[#F9CA24] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    <i className="fas fa-trophy mr-2"></i> CAN
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
                  <div 
                    key={match.id} 
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setActiveTab('match-details')}
                  >
                    <div className="relative">
                      <img 
                        src={match.imageUrl} 
                        alt={`${match.homeTeam} vs ${match.awayTeam}`} 
                        className="w-full h-48 object-cover object-top"
                      />
                      <div className="absolute top-2 left-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs font-semibold text-gray-700">
                        {match.competition}
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                        <i className="fas fa-clock mr-1"></i> {match.duration}
                      </div>
                      {match.isLive && (
                        <div className="absolute top-2 right-2 bg-[#EE5253] text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
                          LIVE
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{match.homeTeam}</span>
                          <span className="text-lg font-bold">{match.homeScore} - {match.awayScore}</span>
                          <span className="font-semibold">{match.awayTeam}</span>
                        </div>
                        <button className="text-[#1DD1A1] hover:text-[#EE5253] transition-colors">
                          <i className="fas fa-play-circle text-xl"></i>
                        </button>
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        {new Date(match.date).toLocaleDateString('fr-FR', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredMatches.length === 0 && (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500 text-lg">Aucun match trouvé pour votre recherche.</p>
                </div>
              )}
            </section>
          </>
        )}
        
        {activeTab === 'match-details' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Vidéo et informations du match */}
            <div className="relative">
              <img 
                src="https://readdy.ai/api/search-image?query=A%20professional%20football%20match%20between%20Senegal%20and%20Egypt%20national%20teams%2C%20high%20quality%20sports%20photography%20with%20dynamic%20action%2C%20stadium%20atmosphere%20with%20fans%20waving%20Senegalese%20flags%2C%20vibrant%20green%20and%20red%20colors%2C%20clear%20view%20of%20players%20in%20national%20jerseys&width=1200&height=600&seq=7&orientation=landscape" 
                alt="Sénégal vs Égypte" 
                className="w-full h-96 object-cover object-top"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <button className="text-white bg-[#1DD1A1] hover:bg-[#19b88d] p-6 rounded-full transition-colors !rounded-button cursor-pointer whitespace-nowrap">
                  <i className="fas fa-play text-3xl"></i>
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="bg-[#EE5253] text-white px-3 py-1 rounded-full text-sm font-semibold mr-2">
                      TERMINÉ
                    </span>
                    <span className="text-sm">13 Juin 2025</span>
                  </div>
                  <div>
                    <button className="text-white hover:text-[#F9CA24] transition-colors mr-4 cursor-pointer">
                      <i className="fas fa-star text-xl"></i>
                    </button>
                    <button className="text-white hover:text-[#F9CA24] transition-colors cursor-pointer">
                      <i className="fas fa-share-alt text-xl"></i>
                    </button>
                  </div>
                </div>
                <div className="flex justify-center items-center mt-4">
                  <div className="text-center mr-8">
                    <div className="font-bold text-xl">Sénégal</div>
                    <div className="text-4xl font-bold">2</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-xl">Égypte</div>
                    <div className="text-4xl font-bold">0</div>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    CAN 2025 - Finale
                  </span>
                </div>
              </div>
            </div>
            
            {/* Onglets d'information */}
            <div className="p-6">
              <div className="flex border-b border-gray-200 mb-6">
                <button className="px-4 py-2 font-semibold text-[#1DD1A1] border-b-2 border-[#1DD1A1] cursor-pointer whitespace-nowrap">
                  Résumé
                </button>
                <button className="px-4 py-2 font-semibold text-gray-500 hover:text-gray-700 cursor-pointer whitespace-nowrap">
                  Statistiques
                </button>
                <button className="px-4 py-2 font-semibold text-gray-500 hover:text-gray-700 cursor-pointer whitespace-nowrap">
                  Compositions
                </button>
              </div>
              
              {/* Contenu de l'onglet Résumé */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Moments Clés</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-[#1DD1A1] text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-4">
                      <i className="fas fa-futbol"></i>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-semibold">23'</span>
                        <span className="ml-2">But - Sadio Mané (Sénégal)</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">
                        Superbe frappe enroulée depuis l'entrée de la surface qui finit dans la lucarne.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#F9CA24] text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-4">
                      <i className="fas fa-card text-sm"></i>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-semibold">41'</span>
                        <span className="ml-2">Carton Jaune - Mohamed Salah (Égypte)</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">
                        Faute tactique pour arrêter une contre-attaque prometteuse.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#1DD1A1] text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-4">
                      <i className="fas fa-futbol"></i>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-semibold">67'</span>
                        <span className="ml-2">But - Ismaïla Sarr (Sénégal)</span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">
                        Magnifique action collective conclue par Sarr après une passe décisive de Mané.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Statistiques du match */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Statistiques</h3>
                  <div id="stats-chart" className="w-full h-80"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'recherche' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 font-['Poppins']">
              Recherche Avancée
            </h2>
            
            <div className="mb-8">
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Rechercher un match, une équipe ou une compétition..."
                  className="w-full pl-12 pr-4 py-3 border-none rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#1DD1A1] focus:outline-none text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Compétition</label>
                  <div className="relative">
                    <button className="w-full bg-gray-100 p-3 rounded-lg flex items-center justify-between text-gray-700 cursor-pointer whitespace-nowrap">
                      <span>Toutes les compétitions</span>
                      <i className="fas fa-chevron-down"></i>
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Équipe</label>
                  <div className="relative">
                    <button className="w-full bg-gray-100 p-3 rounded-lg flex items-center justify-between text-gray-700 cursor-pointer whitespace-nowrap">
                      <span>Toutes les équipes</span>
                      <i className="fas fa-chevron-down"></i>
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Date</label>
                  <div className="relative">
                    <button className="w-full bg-gray-100 p-3 rounded-lg flex items-center justify-between text-gray-700 cursor-pointer whitespace-nowrap">
                      <span>Toutes les dates</span>
                      <i className="fas fa-calendar"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mb-8">
              <button className="bg-[#1DD1A1] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-[#19b88d] transition-colors !rounded-button cursor-pointer whitespace-nowrap">
                <i className="fas fa-search mr-2"></i> Rechercher
              </button>
            </div>
            
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Compétitions Populaires</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-100 rounded-lg p-4 text-center hover:bg-[#1DD1A1] hover:text-white transition-colors cursor-pointer">
                  <i className="fas fa-trophy text-2xl mb-2"></i>
                  <div className="font-medium">Ligue des Champions</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 text-center hover:bg-[#1DD1A1] hover:text-white transition-colors cursor-pointer">
                  <i className="fas fa-futbol text-2xl mb-2"></i>
                  <div className="font-medium">Premier League</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 text-center hover:bg-[#1DD1A1] hover:text-white transition-colors cursor-pointer">
                  <i className="fas fa-futbol text-2xl mb-2"></i>
                  <div className="font-medium">La Liga</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 text-center hover:bg-[#1DD1A1] hover:text-white transition-colors cursor-pointer">
                  <i className="fas fa-trophy text-2xl mb-2"></i>
                  <div className="font-medium">CAN</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'favoris' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 font-['Poppins']">
              Mes Favoris
            </h2>
            
            <div className="mb-8">
              <div className="flex border-b border-gray-200 mb-6">
                <button className="px-4 py-2 font-semibold text-[#1DD1A1] border-b-2 border-[#1DD1A1] cursor-pointer whitespace-nowrap">
                  Équipes
                </button>
                <button className="px-4 py-2 font-semibold text-gray-500 hover:text-gray-700 cursor-pointer whitespace-nowrap">
                  Matchs
                </button>
                <button className="px-4 py-2 font-semibold text-gray-500 hover:text-gray-700 cursor-pointer whitespace-nowrap">
                  Compétitions
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-100 rounded-lg p-4 flex items-center hover:bg-gray-200 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-[#1DD1A1] rounded-full flex items-center justify-center text-white mr-4">
                    <i className="fas fa-futbol text-xl"></i>
                  </div>
                  <div>
                    <div className="font-semibold">Sénégal</div>
                    <div className="text-sm text-gray-500">Équipe nationale</div>
                  </div>
                  <button className="ml-auto text-[#EE5253] hover:text-red-700 transition-colors cursor-pointer">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-4 flex items-center hover:bg-gray-200 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-[#F9CA24] rounded-full flex items-center justify-center text-white mr-4">
                    <i className="fas fa-futbol text-xl"></i>
                  </div>
                  <div>
                    <div className="font-semibold">PSG</div>
                    <div className="text-sm text-gray-500">Ligue 1</div>
                  </div>
                  <button className="ml-auto text-[#EE5253] hover:text-red-700 transition-colors cursor-pointer">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-4 flex items-center hover:bg-gray-200 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-[#EE5253] rounded-full flex items-center justify-center text-white mr-4">
                    <i className="fas fa-futbol text-xl"></i>
                  </div>
                  <div>
                    <div className="font-semibold">Liverpool</div>
                    <div className="text-sm text-gray-500">Premier League</div>
                  </div>
                  <button className="ml-auto text-[#EE5253] hover:text-red-700 transition-colors cursor-pointer">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-500 mb-4">Vous n'avez pas encore beaucoup de favoris.</p>
              <button 
                onClick={() => setActiveTab('accueil')} 
                className="bg-[#1DD1A1] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-[#19b88d] transition-colors !rounded-button cursor-pointer whitespace-nowrap"
              >
                <i className="fas fa-plus mr-2"></i> Ajouter des favoris
              </button>
            </div>
          </div>
        )}
      </main>
      
      {/* Pied de page */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 font-['Poppins']">FootSummary</h3>
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
    </div>
  );
}

export default App;
