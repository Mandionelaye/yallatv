// "use client";
// import { NextSeo } from 'next-seo';

// import { useState, useEffect } from 'react';

// import { fetchScorebatHighlights } from '@/lib/fetchdata';
// import { useRouter } from 'next/navigation';
// import Layout from '@/components/Layout';

// export default function Highlights() {
//   const router = useRouter();
//   const [highlights, setHighlights] = useState();
//   const [loading, setLoading] = useState(false);
//   const [filter, setFilter] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     // Rafraîchir les données lors de la navigation client-side
//     const refreshData = async () => {
//       setLoading(true);
//       const freshHighlights = await fetchScorebatHighlights();
//       setHighlights(freshHighlights);
//       setLoading(false);
//     };

//     refreshData();
//   }, [router.asPath]);

//   const filteredHighlights = highlights?.filter(highlight => {
//     // Filtre par compétition
//     const competitionMatch = filter === 'all' || 
//       highlight.competition.toLowerCase().includes(filter.toLowerCase());
    
//     // Filtre par recherche
//     const searchMatch = searchQuery === '' ||
//       highlight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       highlight.competition.toLowerCase().includes(searchQuery.toLowerCase());
    
//     return competitionMatch && searchMatch;
//   });

//   // Extraire les compétitions uniques pour les filtres
//   const competitions = [...new Set(
//     highlights?.map(h => h.competition) || []
//   )].sort();

//   return (
//     <Layout
//       title="Résumés des Matchs" 
//       description="Regardez les résumés des derniers matchs de football"
//     >
//       <NextSeo
//         openGraph={{
//           title: 'Résumés des Matchs - Football Live',
//           description: 'Les meilleurs moments des matchs récents',
//         }}
//       />
      
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-8">Résumés des Matchs</h1>
        
//         {/* Filtres et recherche */}
//         <div className="mb-8 bg-white p-4 rounded-lg shadow">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div className="flex-1">
//               <input
//                 type="text"
//                 placeholder="Rechercher un match ou une compétition..."
//                 className="w-full p-2 border rounded"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
            
//             <div className="flex items-center space-x-2">
//               <label htmlFor="competition-filter" className="whitespace-nowrap">
//                 Compétition:
//               </label>
//               <select
//                 id="competition-filter"
//                 className="p-2 border rounded"
//                 value={filter}
//                 onChange={(e) => setFilter(e.target.value)}
//               >
//                 <option value="all">Toutes</option>
//                 {competitions.map((comp, index) => (
//                   <option key={index} value={comp}>
//                     {comp}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {loading ? (
//           <div className="text-center py-12">
//             <p>Chargement des résumés...</p>
//           </div>
//         ) : filteredHighlights?.length > 0 ? (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredHighlights.map((highlight, index) => (
//               <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//                 <div className="p-4">
//                   <h3 className="text-xl font-semibold mb-2 line-clamp-2">
//                     {highlight.title.replace('Highlights', '').replace('|', '-')}
//                   </h3>
//                   <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
//                     <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
//                       {highlight.competition}
//                     </span>
//                     <span>
//                       {new Date(highlight.date).toLocaleDateString('fr-FR')}
//                     </span>
//                   </div>
//                 </div>
                
//                 <div className="aspect-w-16 aspect-h-9 bg-black">
//                   <iframe
//                     src={highlight.matchviewUrl}
//                     frameBorder="0"
//                     allowFullScreen
//                     className="w-full h-64"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     title={highlight.title}
//                   ></iframe>
//                 </div>
                
//                 <div className="p-4 border-t">
//                   <a
//                     href={highlight.matchviewUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//                   >
//                     Voir sur Scorebat →
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-gray-600">
//               {searchQuery || filter !== 'all' 
//                 ? "Aucun résumé ne correspond à votre recherche." 
//                 : "Aucun résumé disponible pour le moment."}
//             </p>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }

// // export async function getStaticProps() {
// //   const highlights = await fetchScorebatHighlights();

// //   return {
// //     props: {
// //       initialHighlights: highlights || [],
// //     },
// //     revalidate: 3600 // Rafraîchit toutes les heures
// //   };
// // }