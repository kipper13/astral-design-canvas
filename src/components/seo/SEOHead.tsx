import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  keywords?: string[];
  author?: string;
  robots?: string;
  jsonLd?: object;
}

export const SEOHead = ({
  title = 'Christian Kevin Flores - Creative Designer & Developer',
  description = 'Creative designer specializing in landing pages, funnels, and conversion-focused web experiences. Boost your conversions with strategic design.',
  canonical = 'https://astral-design-canvas.vercel.app',
  ogImage = 'https://astral-design-canvas.vercel.app/og-image.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  keywords = ['web design', 'landing page', 'conversion optimization', 'UI/UX design', 'creative designer'],
  author = 'Christian Kevin Flores',
  robots = 'index, follow',
  jsonLd
}: SEOHeadProps) => {
  const structuredData = jsonLd || {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Christian Kevin Flores",
    "jobTitle": "Creative Designer",
    "description": description,
    "url": canonical,
    "image": ogImage,
    "sameAs": [
      "https://dribbble.com/kevnflores",
      "https://behance.net/kevnflores", 
      "https://linkedin.com/in/kevnflores",
      "https://instagram.com/kevn.creates"
    ],
    "knowsAbout": [
      "Web Design",
      "Landing Page Design", 
      "Conversion Rate Optimization",
      "UI/UX Design",
      "Brand Identity"
    ],
    "offers": {
      "@type": "Service",
      "serviceType": "Web Design Services",
      "description": "Landing page design, funnel optimization, and conversion-focused web experiences"
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Astral Design Canvas" />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@kevn_creates" />

      {/* Additional SEO */}
      <meta name="theme-color" content="#5e72e4" />
      <meta name="msapplication-TileColor" content="#5e72e4" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};