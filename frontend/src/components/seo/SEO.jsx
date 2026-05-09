import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title = "KITS Akshar — Institutional OS", 
  description = "A Fully Dynamic Visual Content Operating System designed for immersive institutional experiences.",
  canonical = "https://kitsakshar.edu",
  type = "website",
  name = "KITS Akshar"
}) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={name} />

      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
