"use client";
import { NextSeo } from 'next-seo';
import Layout from '../../../components/Layout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMatchById } from '@/lib/apiFoot';

export default function MatchDetail({params}) {
  const [match, setMatch] = useState(null); // [match, setMatch]
  const [statistics, setStatistics] = useState(null);

  const { id } = params;
  
  const router = useRouter();

  
  useEffect(() => {
    const fetchMatch = async () => {
      const data = await getMatchById(id);
      console.log("data",data);
      
      setMatch(data);
    };
    fetchMatch();
  }, [id]);


  if (router.isFallback) {
    return (
      <Layout>
        <div>Chargement...</div>
      </Layout>
    );
  }

  if (!match) {
    return (
      <Layout title="Match non trouvé">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold">Match non trouvé {id}</h1>
          <p className="mt-4">Le match que vous recherchez n'existe pas ou a été supprimé.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title={`${match.title}`}
      description={`Résultat: ${match.title}`}
    >
      <NextSeo
        openGraph={{
          title: `${match.title}`,
          description: `Score: ${match.title}`,
          images: [
            {
              url: match.thumbnail,
              alt: `${match.title}`,
              width: 800,
              height: 600,
            },
          ],
        }}
      />
      
      {/* ${match.videos[0].embed} */}

      {/* <div  dangerouslySetInnerHTML={{ __html: match.videos[1].embed }} ></div> */}

    <div className='container mx-auto px-2 pt-24 pb-12'>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

           <iframe
              src={match.matchviewUrl}
              frameBorder="0"
              allowFullScreen
              className="w-full min-h-screen"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title={match.title}
                ></iframe>

            {/* Vidéo et informations du match */}
            {/* <div className="">
              {
                match.videos?.map((video, index) => (
                  <div  key={index} dangerouslySetInnerHTML={{ __html: video.embed }} ></div>
                ))
              }
            </div> */}
            
            {/* Onglets d'information */}
            {/* <div className="p-6">
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
              
              Contenu de l'onglet Résumé
              <div>
                 <iframe
                    src={match.matchviewUrl}
                    frameBorder="0"
                    allowFullScreen
                    className="w-full min-h-screen"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    title={match.title}
                  ></iframe>
              </div>
            </div> */}
      </div>
    </div>

    </Layout>


    // <>
    //    hello  {match.title}
    // </>
  );
}
