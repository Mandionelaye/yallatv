"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const activeTab = usePathname();
  return (
    <>
        {/* En-tête et Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-[#1DD1A1] text-white shadow-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link  href={'/'}  className="flex items-center">
              <span className="text-2xl font-bold font-['Poppins'] tracking-wider">
                <i className="fas fa-futbol mr-2"></i>
                Yalla Live
              </span>
            </Link>
            
            {/* Menu principal - Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              {/* <Link  href={'/'} 
                className={`flex items-center font-['Poppins'] font-semibold cursor-pointer whitespace-nowrap ${activeTab === '/' ? 'text-[#527cee]' : 'text-white'}`}
              >
                <i className="fas fa-home mr-2"></i> Accueil
              </Link> */}
              {/* <Link  href={'/recherche'} 
                className={`flex items-center font-['Poppins'] font-semibold cursor-pointer whitespace-nowrap ${activeTab === '/recherche' ? 'text-[#527cee]' : 'text-white'}`}
              >
                <i className="fas fa-search mr-2"></i> Recherche
              </Link>
              <Link  href={'/favoris'}  
                className={`flex items-center font-['Poppins'] font-semibold cursor-pointer whitespace-nowrap ${activeTab === '/favoris' ? 'text-[#527cee]' : 'text-white'}`}
              >
                <i className="fas fa-star mr-2"></i> Favoris
              </Link> */}
            </nav>
            
            {/* Bouton de connexion */}
            <div className="flex items-center">
              {/* <button className="bg-white text-[#1DD1A1] px-4 py-2 rounded-lg font-semibold shadow-sm hover:bg-gray-100 transition-colors !rounded-button cursor-pointer whitespace-nowrap">
                <i className="fas fa-user mr-2"></i> Connexion
              </button> */}
              
              {/* Bouton menu hamburger - Mobile */}
              <button 
                className="ml-4 hidden text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
              </button>
            </div>
          </div>
          
          {/* Menu mobile */}
          {isMobileMenuOpen && (
            <div className="hidden bg-[#1DD1A1] pb-4">
              <nav className="flex flex-col space-y-4">
                <Link  href={'/'} 
                  className={`flex items-center font-['Poppins'] font-semibold p-2 cursor-pointer whitespace-nowrap ${activeTab === '/' ? 'text-[#EE5253] bg-white bg-opacity-20 rounded-lg' : 'text-white'}`}
                >
                  <i className="fas fa-home mr-2"></i> Accueil
                </Link>
                {/* <Link 
                  href={'/recherche'}
                  className={`flex items-center font-['Poppins'] font-semibold p-2 cursor-pointer whitespace-nowrap ${activeTab === '/recherche' ? 'text-[#EE5253] bg-white bg-opacity-20 rounded-lg' : 'text-white'}`}
                >
                  <i className="fas fa-search mr-2"></i> Recherche
                </Link>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }} 
                  className={`flex items-center font-['Poppins'] font-semibold p-2 cursor-pointer whitespace-nowrap ${activeTab === '/favoris' ? 'text-[#EE5253] bg-white bg-opacity-20 rounded-lg' : 'text-white'}`}
                >
                  <i className="fas fa-star mr-2"></i> Favoris
                </button> */}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}