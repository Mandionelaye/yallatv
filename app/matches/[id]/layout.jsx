import { getMatchById } from "@/lib/apiFoot";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
   const { id } = (await params) || params;
   const match = await getMatchById(id);
   
 const title = `Suivez le match ${match.title} - sur yallatv`;
  const description = `Suivez le match de football ${match.title} ${match.videos[0].title === "Live Stream"? "en direct" : "en replay"} en temps-REAL sur Yallatv !`;

    const baseUrl = process.env.NODE_ENV === "development"
  ? "http://localhost:3000"
  : "https://yallatv.vercel.app";


  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: `${baseUrl}/matches/${id}`,
      title,
      description,
      siteName: "Yallatv",
      images: [
        {
          url: match.thumbnail,
          width: 800,
          height: 600,
          alt: match.title,
        },
      ],
    },
  };
}

export default function LayoutMatche({ children }) {
  return <div>{children}</div>;
}
