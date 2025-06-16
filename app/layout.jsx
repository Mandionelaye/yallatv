import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://yallatv.vercel.app"),
  keywords: [ "YALLA TV","football", "scores", "live", "matchs", "en direct", "foot", "foot live", "foot en direct", "foot en direct live", "foot live en direct", "Yalla", "yalla live", "yallaTv" ],
  title: {
    default: "Yallatv - Scores en Direct",
    template: "%s | Yalla Live",
  },
  openGraph: {
     type: "website",
     locale: "fr_FR",
     url: "https://yallatv.vercel.app",
     title: "Yallatv - Scores en Direct",
     description:"Suivez les matchs de football en direct en temps-REAL sur Yallatv !",
     siteName: "Yallatv",
     images: [
       {
        url: "https://yallatv.vercel.app/icon.png",
        width: 800,
        height: 600,
        alt: "Yallatv",
      },
     ]
  }
};





export default function RootLayout({ children }) {
  return (
    <html lang="fr">
       <head>
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet" />
       </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-gray-50 font-sans text-black">
          {children}
        </div>
      </body>
    </html>
  );
}
