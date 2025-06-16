import Link from "next/link";

export default function MatchLiveCard({ match }) {

     function getMatchId(url) {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }
    
  return (
    <>
      <Link
        href={`/matches/${getMatchId(match.matchviewUrl)}`}
        className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 cursor-pointer"
      >
        <div className="relative">
          <img
            src={match.thumbnail}
            alt={`${match.homeTeam} vs ${match.awayTeam}`}
            className="w-full h-48 object-cover object-top"
          />
          <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center text-white mb-2">
                <span className="text-xl font-bold">{match.homeTeam}</span>
                <span className="mx-3 text-2xl font-bold">
                  {match.homeScore} - {match.awayScore}
                </span>
                <span className="text-xl font-bold">{match.awayTeam}</span>
              </div>
              <span className="bg-[#EE5253] text-white px-3 py-1 rounded-full text-sm font-semibold">
                {match.videos[0].title === "Live Stream" ? "Live" : "Récent"}
              </span>
            </div>
          </div>
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
            <i className="fas fa-clock mr-1"></i> {new Date(match.date).toLocaleTimeString()}
          </div>
        </div>
        <div className="p-3 bg-white">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-600">
              {match.competition}
            </span>
            <button className="text-[#1DD1A1] hover:text-[#EE5253] transition-colors cursor-pointer">
              <i className="fas fa-play-circle text-lg"></i>
            </button>
          </div>
        </div>
      </Link>
    </>
  );
}
