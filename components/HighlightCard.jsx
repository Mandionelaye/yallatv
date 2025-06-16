import Link from 'next/link';

export default function HighlightCard({ highlight }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">
          {highlight.title.replace('Highlights', '').replace('|', '-')}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {highlight.competition}
          </span>
          <span>
            {new Date(highlight.date).toLocaleDateString('fr-FR')}
          </span>
        </div>
      </div>
      
      <div className="aspect-w-16 aspect-h-9 bg-black">
        <iframe
          src={highlight.matchviewUrl}
          frameBorder="0"
          allowFullScreen
          className="w-full h-64"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title={highlight.title}
        ></iframe>
      </div>
      
      <div className="p-4 border-t">
        <Link
          href={highlight.matchviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Voir sur Scorebat →
        </Link>
      </div>
    </div>
  );
}