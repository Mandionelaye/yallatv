import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function MatchCard({ match }) {
  function getMatchId(url) {
    
    const parts = url.split('/');
    return parts[parts.length - 2];
  }
  console.log("elm",match.matchviewUrl);
  return (
    // <div className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow">
    //   <div className="flex justify-between items-center mb-2">
    //     <span className="text-gray-600">
    //       {format(new Date(match.fixture.date), 'PPPp', { locale: fr })}
    //     </span>
    //     <span className={`px-2 py-1 rounded text-xs font-semibold ${
    //       match.fixture.status.short === 'FT' ? 'bg-green-100 text-green-800' :
    //       match.fixture.status.short === 'NS' ? 'bg-blue-100 text-blue-800' :
    //       'bg-yellow-100 text-yellow-800'
    //     }`}>
    //       {match.fixture.status.short}
    //     </span>
    //   </div>

    //   <div className="flex items-center justify-center">
    //     <div className="flex items-center">
    //       <p className="font-semibold text-black me-2">{match.teams.home.name}</p>
    //     </div>

    //     <div className="mx-4 flex justify-center items-center">
    //       <img src={match.teams.home.logo} alt="elm"  className="w-8 h-8 m-auto"/>
    //       {match.fixture.status.short === 'FT' ? (
    //         <span className="text-2xl font-bold text-black mx-2">
    //           {match.goals.home} - {match.goals.away}
    //         </span>
    //       ) : (
    //         <span className="text-xl text-black mx-2">vs</span>
    //       )}
    //       <img src={match.teams.away.logo} alt="elm"  className="w-8 h-8 m-auto"/>
    //     </div>

    //     <div className="flex items-center">
    //       <p className="font-semibold text-black ">{match.teams.away.name}</p>
    //     </div>
    //   </div>

    //   <div className="mt-4 text-center">
    //     <Link href={`/matches/${match.fixture.id}`} className="text-blue-600 hover:text-blue-800 text-sm">
    //       Voir les détails →
    //     </Link>
    //   </div>
    // </div>

    <Link href={`/matches/${getMatchId(match.matchviewUrl)}`}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="relative">
        <img
          src={match.thumbnail}
          alt={`${match.homeTeam} vs ${match.awayTeam}`}
          className="w-full h-48 object-cover object-top"
        />
        <div className="absolute top-2 left-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs font-semibold text-gray-700">
          {match.competition}
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
          <i className="fas fa-clock mr-1"></i> {new Date(match.date).toLocaleDateString()}
        </div>
        {match.videos[0].title === "Live Stream" && (
          <div className="absolute top-2 right-2 bg-[#EE5253] text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
            LIVE
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">{match.title}</span>
            {/* <span className="text-lg font-bold">
              {match.homeScore} - {match.awayScore}
            </span>
            <span className="font-semibold">{match.awayTeam}</span> */}
          </div>
          <button className="text-[#1DD1A1] hover:text-[#EE5253] transition-colors">
            <i className="fas fa-play-circle text-xl"></i>
          </button>
        </div>

        <div className="text-sm text-gray-500">
          {new Date(match.date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>
    </Link>
  );
}
