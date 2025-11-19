import React, {ReactNode, useEffect} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  // Redirige por defecto a la página de documentación para que "Doc" quede seleccionada
  useEffect(() => {
    // Navegación simple que funciona en cliente
    window.location.href = '/docs/intro';
  }, []);

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <main style={{padding: '2rem'}}>
        <h1>{siteConfig.title}</h1>
        <p>{siteConfig.tagline}</p>
        <p>
          Serás redirigido a la documentación. Si la redirección no funciona,
          haz clic en este enlace: <Link to="/docs/intro">TBOH Doc</Link>
        </p>
      </main>
    </Layout>
  );
}
