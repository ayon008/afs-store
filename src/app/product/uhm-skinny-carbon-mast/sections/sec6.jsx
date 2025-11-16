import React, { useEffect, useRef } from 'react';

/**
 * A React component for "Section 6" of the AFS Foiling website.
 * It features a large title "LIGHTWEIGHT AND MAINTENANCE-FREE"
 * with a dynamic, horizontally scrolling red ribbon of text
 * positioned in the gap between the text lines.
 *
 * To use this in Next.js, save it as `components/LightweightSection.jsx`
 * and import it into your page.
 */
export default function LightweightSection() {
  const ribbonRef = useRef(null);

  useEffect(() => {
    const ribbonElement = ribbonRef.current;
    if (!ribbonElement) return;

    if (ribbonElement.dataset.duplicated) {
      return;
    }
    ribbonElement.dataset.duplicated = 'true';

    const textContent = ribbonElement.innerHTML;
    ribbonElement.innerHTML = textContent + textContent;

    const animation = ribbonElement.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-50%)' }
      ],
      {
        duration: 20000, 
        iterations: Infinity,
        easing: 'linear',
      }
    );

    return () => {
      animation.cancel();
      if (ribbonElement) {
        ribbonElement.innerHTML = textContent;
        delete ribbonElement.dataset.duplicated;
      }
    };
  }, []);

  return (
    // This section is set to full-width (w-full) and full-screen height (h-screen)
    <section className="relative w-full h-screen min-h-[600px] bg-black text-white flex items-center justify-center overflow-hidden">
      
      {/* The padding 'px-4' was removed from here */}
      <h2 className="relative z-10 text-center text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase leading-none tracking-tight font-['Bahnschrift',_Arial_Black,_sans-serif]">
        
        {/* Padding 'px-4' is now on the text spans */}
        <span className="block px-4">LIGHTWEIGHT AND</span>
        
        {/* This div (the marquee) is 'w-full', so it stretches edge-to-edge */}
        <div
          className="relative w-full h-8 md:h-10 bg-red-600 overflow-hidden my-4 md:my-6" 
        >
          <div
            ref={ribbonRef}
            className="whitespace-nowrap absolute left-0 top-0 h-full flex items-center text-xs md:text-sm lg:text-base font-semibold text-white uppercase tracking-wider"
            style={{ 
              minWidth: '200%', 
              willChange: 'transform',
            }}
          >
            <span className="px-8 py-1 md:py-2">
              <span>DU FOIL. DE LA MÊME FAÇON, VOUS NE SEREZ PLUS EMBÊTÉ AVEC LES AGRESSIONS MARINES COMME LA CORROSION QUI POURRAIT FRAGILISER CE DERNIER.</span>
              <span className="mx-8"></span> 
              <span>DU FOIL. DE LA MÊME FAÇON, VOUS NE SEREZ PLUS EMBÊTÉ AVEC LES AGRESSIONS MARINES COMME LA CORROSION QUI POURRAIT FRAGILISER CE DERNIER.</span>
            </span>
          </div>
        </div>
        
        {/* Padding 'px-4' is also on this text span */}
        <span className="block px-4">MAINTENANCE-FREE</span>
      
      </h2>
    </section>
  );
}