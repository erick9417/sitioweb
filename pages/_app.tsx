import Head from 'next/head';
import '../globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Plantillas Premium | Bienestar y Confort</title>
        <meta name="description" content="Descubre nuestras plantillas premium diseñadas con tecnología de vanguardia. Máximo confort, soporte superior y diseño personalizado." />
        <meta name="keywords" content="plantillas premium, salud postural, confort, bienestar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
