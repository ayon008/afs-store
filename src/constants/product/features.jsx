import React, { useState, useEffect } from 'react';

export default function Features({ productSlug }) {
  const [openSection, setOpenSection] = useState(null);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleToggle = (sectionTitle) => {
    setOpenSection(prev => (prev === sectionTitle ? null : sectionTitle));
  };

  // Fetch features via Next.js API route
  useEffect(() => {
    // Don't fetch if no productSlug is provided
    if (!productSlug) {
      setLoading(false);
      setFeatures([]);
      return;
    }

    async function fetchProductFeatures() {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to fetch features');
        const data = await res.json();

        const product = data.find(p => p.slug === productSlug);
        
        if (!product?.acf) {
          setFeatures([]);
          setLoading(false);
          return;
        }

        const featuresList = [];
        
        // Add Technical Specifications (caracteristiques)
        if (product.acf.caracteristiques) {
          const caracteristiques = product.acf.caracteristiques;
          
          if (typeof caracteristiques === 'string' && caracteristiques.trim()) {
            featuresList.push({
              title: 'Technical Specifications',
              content: caracteristiques
            });
          } else if (Array.isArray(caracteristiques) && caracteristiques.length > 0) {
            featuresList.push(...caracteristiques);
          }
        }
        
        // Add Size Guide / Compatibility (compatibilite)
        if (product.acf.compatibilite) {
          const compatibilite = product.acf.compatibilite;
          
          if (typeof compatibilite === 'string' && compatibilite.trim()) {
            featuresList.push({
              title: 'Size Guide',
              content: compatibilite
            });
          } else if (Array.isArray(compatibilite) && compatibilite.length > 0) {
            featuresList.push(...compatibilite);
          }
        }

        setFeatures(featuresList);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchProductFeatures();
  }, [productSlug]);

  const FeatureItem = ({ title, content }) => {
    const isOpen = openSection === title;

    const ArrowDown = (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6 6H12C12.7956 6 13.5587 6.31607 14.1213 6.87868C14.6839 7.44129 15 8.20435 15 9V19M15 19L11 15M15 19L19 15"
          stroke="#333333" strokeWidth="2" strokeLinecap="square" />
      </svg>
    );

    return (
      <div className="w-full">
        <button
          onClick={() => handleToggle(title)}
          className="w-full flex justify-between items-center py-4 px-[5rem] bg-transparent focus:outline-none"
        >
          <span
            className="uppercase tracking-wide"
            style={{
              fontFamily: '"Alliance No.2", sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: '19.8px',
              color: 'rgba(17, 17, 17, 0.698)',
            }}
          >
            {title}
          </span>
          {ArrowDown}
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div 
            className="px-[5rem] pb-6 pt-2 bg-transparent feature-content"
            style={{
              fontFamily: '"Alliance No.2", sans-serif',
              fontSize: '16px',
              fontWeight: 500,
              color: 'rgba(17, 17, 17, 0.698)',
            }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
         <style jsx>{`
  .feature-content :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0; /* Increased margin for spacing */
    font-size: 0.9rem; /* Reduced overall font size */
    table-layout: auto;
  }
  .feature-content :global(td),
  .feature-content :global(th) {
    border: none;
    padding: 0.4rem 0; /* Reduced vertical padding */
    text-align: left;
    vertical-align: middle;
    word-wrap: break-word;
  }

  /* Header Styles */
  .feature-content :global(th) {
    background-color: transparent;
    font-weight: 500;
    color: #000; /* Black text */
    padding-bottom: 0.8rem; /* More spacing below header text */
    border-bottom: 1px solid rgba(17, 17, 17, 0.4); /* Darker, slightly thicker line under header */
  }

  /* Row Styles */
  .feature-content :global(tr) {
    border-bottom: 1px solid rgba(17, 17, 17, 0.1); /* Very light gray line between rows */
  }
  .feature-content :global(tr:last-child) {
    border-bottom: none; /* No line under the last row */
  }
  .feature-content :global(tr:nth-child(even)) {
    background-color: transparent; 
  }
  .feature-content :global(tr:hover) {
    background-color: transparent; /* No hover effect */
  }
`}</style>
        </div>
      </div>
    );
  };

  if (loading) return <p className="px-[5rem]">Loading features...</p>;
  if (error) return <p className="px-[5rem] text-red-500">{error}</p>;
  if (!features.length) return <p className="px-[5rem]">No features found.</p>;

  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <h1
        className="mb-6 px-[5rem]"
        style={{
          fontFamily: '"Alliance No.2", sans-serif',
          fontSize: '28px',
          fontWeight: 700,
          lineHeight: '28px',
          color: 'rgb(17, 17, 17)',
        }}
      >
        Features
      </h1>

      <div className="border-y border-gray-300 divide-y divide-gray-300 w-full">
        {features.map((feature, idx) => (
          <FeatureItem
            key={idx}
            title={feature.title || `Feature ${idx + 1}`}
            content={feature.content || 'No details available.'}
          />
        ))}
      </div>
    </div>
  );
}
