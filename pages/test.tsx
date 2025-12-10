import Head from 'next/head';

export default function TestPage() {
  return (
    <>
      <Head>
        <title>Test Page</title>
      </Head>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Test Page</h1>
        <p>Esta es una página de prueba</p>
      </div>
    </>
  );
}
