import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, title, description }) {
  return (
    <>
      <Head>
        <title>{title || 'Football Live'}</title>
        <meta name="description" content={description || 'Suivez les matchs de football en direct'} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main>
        {children}
      </main>
      
      <Footer />
    </>
  );
}