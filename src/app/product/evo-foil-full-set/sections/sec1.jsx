import React, { useState, useEffect, useRef } from 'react';

// --- Helper Functions & Data ---

/**
 * Loads a script dynamically into the document head.
 * @param {string} src - The source URL of the script.
 * @param {string} id - An ID to prevent duplicate loading.
 * @returns {Promise<void>}
 */
const loadScript = (src, id) => {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.id = id;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Script load error for ${src}`));
    document.head.appendChild(script);
  });
};

// Hardcoded data for remaining components
const heroImage = "https://afs-foiling.com/wp-content/uploads/2025/05/UGlide_0004-1.png.webp";

// --- SVG Icons Components ---

const QuoteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="69" height="57" viewBox="0 0 69 57" fill="none">
    <path d="M26.4 0.200195V9.4002C15 9.4002 11.6 15.2002 11.6 24.0002V29.8002H24.2V56.4002H0V25.0002C0 8.80021 10.2 0.200195 26.4 0.200195ZM68.4 0.200195V9.4002C57 9.4002 53.6 15.2002 53.6 24.0002V29.8002H66.4V56.4002H42V25.0002C42 8.80021 52.2 0.200195 68.4 0.200195Z" fill="#F1750A"></path>
  </svg>
);

// --- React Components ---

/**
 * HeroSection Component
 * Renders the main hero image and title.
 */
const HeroSection = ({ image, heroTitleRef }) => (
  <section className="relative h-[60vh] sm:h-[80vh] w-full overflow-hidden hero-section bg-black">
    {/* Background Image */}
    <div className="absolute inset-0">
      <img
        src={image}
        alt="Enduro GLT Front Wing hero"
        // MODIFICATION: Changed object-cover to object-contain
        className="h-full w-full object-contain hero-img opacity-90"
        style={{ transform: 'scale(1.05)', mixBlendMode: 'lighten' }}
        onError={(e) =>
          (e.currentTarget.src =
            "https://placehold.co/1920x960/111111/666666?text=Hero+Image")
        }
      />

      {/* Gradient Overlay for Smooth Section Blend */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />
      {/* This gradient now seamlessly blends into the black background of the next section */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>

    {/* Hero Text */}
    <div
      ref={heroTitleRef}
      className="absolute bottom-10 sm:bottom-20 left-0 right-0 px-4 sm:px-6 lg:px-8 hero-heading-div"
    >
      <div className="container mx-auto">
        <div className="overflow-hidden">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white hero-heading"
            style={{ transform: "translateY(100%)" }}
          >
            ENDURO <span>1600 GLT</span> – The best of dockstart, enhanced by AFS
            versatility
          </h2>
        </div>
      </div>
    </div>
  </section>

);

/**
 * TextRevealSection Component
 * Renders the "Developed with Gwen" text reveal section.
 */
const TextRevealSection = ({ pinRef, textRef }) => (
  // MODIFICATION: Changed bg-white text-gray-900 to bg-black text-gray-100 for seamless dark theme
<section
  ref={pinRef}
  className="about-section relative w-full bg-black text-gray-100 py-20 md:py-32"
  style={{ minHeight: "100vh" }}
>
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative h-full flex flex-col justify-end gap-8 md:gap-12">
    {/* Main heading block */}
    <div ref={textRef} className="max-w-none lg:w-[90%] mx-auto">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight lg:leading-[1.2] pin-heading">
        Developed with <span>Gwen Le Tutour</span>, an expert rider and renowned instructor, the
        Enduro 1600 GLT was created based on precise specifications, designed to suit all skill
        levels.&nbsp; Thanks to <span>Laurent Borgna's</span> field experience and design expertise,
        this foil offers intuitive lift, long-lasting glide, and reassuring maneuverability. This foil
        is the <span>result of dozens of prototypes</span> and countless hours spent on the water,
        resulting in a true <span>benchmark in Dockstart</span>.&nbsp;
        <span>A foil designed to help you progress, right from your first dockstart.</span>
      </h2>
    </div>

    {/* Bottom-right paragraph */}
    <div className="max-w-sm ml-auto">
      <p className="text-sm md:text-base lg:text-lg text-white/90 leading-relaxed text-right pin-heading-p">
        But its potential doesn't stop there: designed to evolve with you, it also excels at flat
        starts and supports your first steps in{" "}
        <span className="text-reveal-span">downwind paddling</span>.
      </p>
    </div>
  </div>
</section>


);

/**
 * FeaturesStackSection Component
 * Renders the stacking cards feature section.
 */
const FeaturesStackSection = ({ sectionRef, imgRef, cardContainerRef, cardsRef }) => (
  // MODIFICATION: Changed bg-gray-900 to bg-black
<section ref={sectionRef} className="design-card-section relative w-full bg-black py-20 md:py-32">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Main Heading */}
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center">
      A foil designed to take off... <br className="hidden md:block" /> and never stop
    </h2>
    
    {/* Sub-heading */}
    <p className="mt-8 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto text-center">
      With an <span className="font-medium text-orange-500">aspect ratio of 11</span>, this foil offers the best balance between glide, maneuverability, and fun.
    </p>
    
    {/* "Allows for:" text */}
    <p className="mt-12 text-lg md:text-xl text-gray-200 text-center">
      Its design allows for:
    </p>
    
    {/* 4-Column Feature Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16 max-w-7xl mx-auto text-left">
      
      {/* Feature 1 Card: Ultra-efficient */}
      <div className="p-6 flex flex-col h-full min-h-[280px]" style={{ backgroundColor: '#1f1f1f' }}>
        <div className="flex-grow flex items-start">
          {/* Icon 1: Two upward arrows, greyish-blue */}
          <div className="relative h-[20px] w-[20px]">
            <div className="absolute top-0 left-0 w-[8px] h-[8px] border-l-2 border-t-2 border-gray-400 transform rotate-45"></div>
            <div className="absolute bottom-0 right-0 w-[8px] h-[8px] border-l-2 border-t-2 border-gray-400 transform rotate-45"></div>
          </div>
        </div>
        <div className="mt-auto">
          <p className="text-orange-500 font-semibold text-base">An ultra-efficient</p>
          <p className="mt-1 text-gray-300 text-sm">dockstart, even with little momentum.</p>
        </div>
      </div>
      
      {/* Feature 2 Card: Long-distance flight */}
      <div className="p-6 flex flex-col h-full min-h-[280px]" style={{ backgroundColor: '#1f1f1f' }}>
        <div className="flex-grow flex items-start">
          {/* Icon 2: Curved arrow/glide path, greyish-blue */}
          <div className="relative h-[20px] w-[20px] border-b-2 border-r-2 border-gray-400 rounded-br-full">
            <div className="absolute top-[-2px] right-[-2px] w-[6px] h-[6px] border-t-2 border-l-2 border-gray-400 transform rotate-45"></div>
          </div>
        </div>
        <div className="mt-auto">
          <p className="text-orange-500 font-semibold text-base">A long-distance flight</p>
          <p className="mt-1 text-gray-300 text-sm">thanks to seemingly unlimited glide.</p>
        </div>
      </div>
      
      {/* Feature 3 Card: Exceptional handling */}
      <div className="p-6 flex flex-col h-full min-h-[280px]" style={{ backgroundColor: '#1f1f1f' }}>
        <div className="flex-grow flex items-start">
          {/* Icon 3: Dot with expanding circles/waves, greyish-blue */}
          <div className="relative h-[20px] w-[20px] flex items-center justify-center">
            <div className="w-[4px] h-[4px] bg-gray-400 rounded-full"></div>
            <div className="absolute w-[10px] h-[10px] border border-gray-400 rounded-full"></div>
            <div className="absolute w-[16px] h-[16px] border border-gray-400 rounded-full"></div>
          </div>
        </div>
        <div className="mt-auto">
          <p className="text-orange-500 font-semibold text-base">Exceptional handling,</p>
          <p className="mt-1 text-gray-300 text-sm">particularly in yaw and roll to maintain control and dynamism in every turn.</p>
        </div>
      </div>
      
      {/* Feature 4 Card: Bumps */}
      <div className="p-6 flex flex-col h-full min-h-[280px]" style={{ backgroundColor: '#1f1f1f' }}>
        <div className="flex-grow flex items-start">
          {/* Icon 4: Wavy line/profile, greyish-blue */}
          <div className="relative h-[20px] w-[20px]">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-400 rounded-full transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-black rounded-full transform -translate-y-1/2 -rotate-12"></div>
          </div>
        </div>
        <div className="mt-auto">
          <p className="text-orange-500 font-semibold text-base">Bumps</p>
          <p className="mt-1 text-gray-300 text-sm">are essential in dockstart. They help prevent stalling, optimize control, and improve glide at equivalent profiles.</p>
        </div>
      </div>
      
    </div>
  </div>
</section>
);

/**
 * QuoteSection Component
 * Renders a quote block with an image.
 */
const QuoteSection = ({ sectionRef, quoteRef, imgRef, quote, author, title, authorImg }) => (
  // MODIFICATION: Changed bg-gray-900 to bg-black
<section
  ref={sectionRef}
  className="about-3-section relative w-full h-[200vh] bg-black text-white overflow-hidden"
>
  <div className="sticky top-0 h-screen w-full flex flex-col">
    <div className="absolute inset-0">
      <img
        ref={imgRef}
        src={imgRef.current?.src}
        alt="Enduro GLT Front Wing side view"
        className="w-full h-full object-contain enduro-img-about"
        onError={(e) =>
          (e.currentTarget.src =
            "https://placehold.co/1920x615/262626/555555?text=Foil+Side+View")
        }
      />
    </div>

    {/* PURE BLUR BACKDROP - NO COLOR OVERLAY */}
    <div
      ref={quoteRef}
      className="quote-div absolute inset-x-0 bottom-0 backdrop-blur-lg bg-transparent p-8 md:p-12"
      style={{ transform: "translateY(200%)" }}
    >
      <div className="container mx-auto max-w-4xl">
        <QuoteIcon />
        <p className="mt-6 text-xl md:text-2xl italic">{quote}</p>
        <div className="mt-8 flex items-center gap-4">
          <img
            src={authorImg}
            alt={author}
            className="h-16 w-16 rounded-full object-cover"
            onError={(e) =>
              (e.currentTarget.src =
                "https://placehold.co/60x60/cccccc/777777?text=Author")
            }
          />
          <div>
            <p className="font-bold text-lg">{author}</p>
            <p className="text-sm text-gray-300">{title}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

);



/**
 * useGsapAnimations Hook
 * Encapsulates all the GSAP animation logic.
 * MODIFIED: Added ScrollTrigger.matchMedia for responsive animations.
 */
const useGsapAnimations = (isLoaded) => {
  // Create refs for all animated elements
  const heroTitleRef = useRef(null);
  const textRevealPinRef = useRef(null);
  const textRevealTextRef = useRef(null);
  const featuresStackSectionRef = useRef(null);
  const featuresStackImgRef = useRef(null);
  const featuresStackCardContainerRef = useRef(null);
  const featuresStackCardsRef = useRef([]);
  const quote1SectionRef = useRef(null);
  const quote1QuoteRef = useRef(null);
  const quote1ImgRef = useRef(null);
  const designSectionRef = useRef(null);
  const designCardsRef = useRef([]);
  const designTextMaskRef = useRef(null);
  const quote2SectionRef = useRef(null);
  const quote2QuoteRef = useRef(null);
  const quote2ImgRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;

    const { gsap, ScrollTrigger, SplitType } = window;
    
    // Assign specific images to quote image refs
    // This is a workaround since the ref is used for animation AND src
    if (quote1ImgRef.current) {
        quote1ImgRef.current.src = "https://afs-foiling.com/wp-content/uploads/2025/05/glt_0001.png.webp";
    }
    if (quote2ImgRef.current) {
        quote2ImgRef.current.src = "https://afs-foiling.com/wp-content/uploads/2025/05/glt_0002.png.webp"; // Using same image as placeholder
    }

    // --- Setup Responsive Animations ---
    ScrollTrigger.matchMedia({
    
      // --- Desktop Animations ---
      "(min-width: 768px)": function() {
        // --- 1. Hero Animations ---
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
        heroTl.to(".hero-img", { scale: 1, duration: 1.4 });
        heroTl.to(".hero-heading-div", { y: -160, opacity: 1 }, 0); // Desktop parallax
        
        gsap.to(".hero-heading", { y: 0, duration: 0.7, ease: "power2.out", delay: 0.5 });
        
        // --- 2. Text Reveal Animation ---
        const SplitType = window.SplitType;
        const split = new SplitType(".pin-heading span", { types: "words" });
        const textRevealTl = gsap.timeline({
          scrollTrigger: {
            trigger: textRevealPinRef.current,
            pin: true,
            start: "top top",
            end: "+=200%", // Desktop scroll duration
            scrub: true,
          }
        });
        textRevealTl.to(split.words, {
          color: "#F1750A",
          stagger: 0.1,
          ease: "none"
        });
        textRevealTl.to(".text-reveal-span", {
          color: "#F1750A",
          ease: "none"
        }, "-=0.5");

        // --- 3. Features Stack Animation (BROKEN - kept as-is) ---
        // This logic is from your file but targets refs not present in the
        // FeaturesStackSection JSX. Kept as-is.
        const stackTl = gsap.timeline({
          scrollTrigger: {
            trigger: featuresStackSectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            pin: true,
          }
        });
        stackTl.to(featuresStackImgRef.current, { y: "-22.5%", ease: "none" }, 0);
        stackTl.fromTo(featuresStackCardContainerRef.current, { y: "0%" }, { y: 0, ease: "none" }, 0);
        featuresStackCardsRef.current.forEach((card, index) => {
          if (index > 0) {
            stackTl.fromTo(card,
              { y: 150, scale: 0.9, opacity: 0.5 },
              { 
                y: -(index * 10),
                scale: 1 - (index * 0.02),
                opacity: 1 - (index * 0.1),
                transformOrigin: "center top" 
              },
              `<card${index}`
            );
          } else {
            stackTl.fromTo(card, 
              { y: 150, scale: 0.9, opacity: 0.5 },
              { y: 0, scale: 1, opacity: 1 }, 
              0
            );
          }
        });

        // --- 4. Quote 1 Animation ---
        const quote1Tl = gsap.timeline({
          scrollTrigger: {
            trigger: quote1SectionRef.current,
            start: "top top",
            end: "+=150%", // Desktop scroll duration
            scrub: true,
            pin: true,
          }
        });
        quote1Tl.to(quote1ImgRef.current, { scale: 1.1, opacity: 0.7, ease: "none" });
        quote1Tl.fromTo(quote1QuoteRef.current, { y: '100%' }, { y: 0, ease: "power2.out" }, 0.2);

        // --- 5. Design Section Animation (BROKEN - kept as-is) ---
        // This logic is from your file but targets refs not rendered in App.
        const designTl = gsap.timeline({
          scrollTrigger: {
            trigger: designSectionRef.current,
            start: "top 25%",
            end: "+=150%",
            scrub: true,
            pin: true,
          }
        });
        designCardsRef.current.forEach((card, index) => {
          designTl.fromTo(card, { y: 60, opacity: 0.2 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.2 }, `design-card-start`);
        });
        designTl.to(designTextMaskRef.current, { y: '0%', duration: 1, ease: "power2.out" }, ">-0.5");

        // --- 6. Quote 2 Animation ---
        const quote2Tl = gsap.timeline({
          scrollTrigger: {
            trigger: quote2SectionRef.current,
            start: "top top",
            end: "+=150%", // Desktop scroll duration
            scrub: true,
            pin: true,
          }
        });
        quote2Tl.to(quote2ImgRef.current, { scale: 1.1, opacity: 0.7, ease: "none" });
        quote2Tl.fromTo(quote2QuoteRef.current, { y: '100%' }, { y: 0, ease: "power2.out" }, 0.2);
      
      },
      
      // --- Mobile Animations ---
      "(max-width: 767px)": function() {
        // --- 1. Hero Animations ---
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
        heroTl.to(".hero-img", { scale: 1, duration: 1.4 });
        heroTl.to(".hero-heading-div", { y: -80, opacity: 1 }, 0); // MODIFIED: Shorter parallax
        
        gsap.to(".hero-heading", { y: 0, duration: 0.7, ease: "power2.out", delay: 0.5 });
        
        // --- 2. Text Reveal Animation ---
        const SplitType = window.SplitType;
        const split = new SplitType(".pin-heading span", { types: "words" });
        const textRevealTl = gsap.timeline({
          scrollTrigger: {
            trigger: textRevealPinRef.current,
            pin: true,
            start: "top top",
            end: "+=100%", // MODIFIED: Shorter scroll duration
            scrub: true,
          }
        });
        textRevealTl.to(split.words, {
          color: "#F1750A",
          stagger: 0.1,
          ease: "none"
        });
        textRevealTl.to(".text-reveal-span", {
          color: "#F1750A",
          ease: "none"
        }, "-=0.5");

        // --- 3. Features Stack Animation (BROKEN - kept as-is) ---
        const stackTl = gsap.timeline({
          scrollTrigger: {
            trigger: featuresStackSectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            pin: true,
          }
        });
        stackTl.to(featuresStackImgRef.current, { y: "-22.5%", ease: "none" }, 0);
        stackTl.fromTo(featuresStackCardContainerRef.current, { y: "0%" }, { y: 0, ease: "none" }, 0);
        featuresStackCardsRef.current.forEach((card, index) => {
           if (index > 0) {
            stackTl.fromTo(card,
              { y: 150, scale: 0.9, opacity: 0.5 },
              { 
                y: -(index * 10),
                scale: 1 - (index * 0.02),
                opacity: 1 - (index * 0.1),
                transformOrigin: "center top" 
              },
              `<card${index}`
            );
          } else {
            stackTl.fromTo(card, 
              { y: 150, scale: 0.9, opacity: 0.5 },
              { y: 0, scale: 1, opacity: 1 }, 
              0
            );
          }
        });


        // --- 4. Quote 1 Animation ---
        const quote1Tl = gsap.timeline({
          scrollTrigger: {
            trigger: quote1SectionRef.current,
            start: "top top",
            end: "+=100%", // MODIFIED: Shorter scroll duration
            scrub: true,
            pin: true,
          }
        });
        quote1Tl.to(quote1ImgRef.current, { scale: 1.1, opacity: 0.7, ease: "none" });
        quote1Tl.fromTo(quote1QuoteRef.current, { y: '100%' }, { y: 0, ease: "power2.out" }, 0.2);

        // --- 5. Design Section Animation (BROKEN - kept as-is) ---
        const designTl = gsap.timeline({
          scrollTrigger: {
            trigger: designSectionRef.current,
            start: "top 25%",
            end: "+=150%",
            scrub: true,
            pin: true,
          }
        });
        designCardsRef.current.forEach((card, index) => {
          designTl.fromTo(card, { y: 60, opacity: 0.2 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.2 }, `design-card-start`);
        });
        designTl.to(designTextMaskRef.current, { y: '0%', duration: 1, ease: "power2.out" }, ">-0.5");


        // --- 6. Quote 2 Animation ---
        const quote2Tl = gsap.timeline({
          scrollTrigger: {
            trigger: quote2SectionRef.current,
            start: "top top",
            end: "+=100%", // MODIFIED: Shorter scroll duration
            scrub: true,
            pin: true,
          }
        });
        quote2Tl.to(quote2ImgRef.current, { scale: 1.1, opacity: 0.7, ease: "none" });
        quote2Tl.fromTo(quote2QuoteRef.current, { y: '100%' }, { y: 0, ease: "power2.out" }, 0.2);
      
      }
    });
    
    // Refresh ScrollTrigger after all animations are set up
    ScrollTrigger.refresh();

    return () => {
      // Kill all ScrollTriggers and timelines
      ScrollTrigger.getAll().forEach(st => st.kill());
      gsap.killTweensOf(".hero-heading");
      // This will clean up all animations created inside matchMedia
      ScrollTrigger.matchMedia().revert(); 
    };
  }, [isLoaded]);

  // Return all refs so the components can use them
  return {
    heroTitleRef,
    textRevealPinRef,
    textRevealTextRef,
    featuresStackSectionRef,
    featuresStackImgRef,
    featuresStackCardContainerRef,
    featuresStackCardsRef,
    quote1SectionRef,
    quote1QuoteRef,
    quote1ImgRef,
    designSectionRef,
    designCardsRef,
    designTextMaskRef,
    quote2SectionRef,
    quote2QuoteRef,
    quote2ImgRef,
  };
};

/**
 * Main App Component
 */
export default function App() {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  // Load GSAP and plugins
  useEffect(() => {
    const loadAllScripts = async () => {
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', 'gsap-script');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', 'gsap-scrolltrigger');
        await loadScript('https://cdn.jsdelivr.net/npm/split-type@0.3.4/umd/index.min.js', 'gsap-splittype');
        gsap.registerPlugin(ScrollTrigger); // Register plugin
        setScriptsLoaded(true);
      } catch (error) {
        console.error("Failed to load animation scripts:", error);
      }
    };
    loadAllScripts();
  }, []);

  // Initialize animations once scripts are loaded
  const animationRefs = useGsapAnimations(scriptsLoaded);

  if (!scriptsLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <p className="text-lg font-medium text-gray-300">Loading Product Page...</p>
      </div>
    );
  }

  return (
    // MODIFICATION: Changed bg-white to bg-black for the main wrapper
    <div className="font-inter bg-black">
      
      <main>
        {/* --- Animated Story Sections --- */}
        <HeroSection image={heroImage} heroTitleRef={animationRefs.heroTitleRef} />
        
        <TextRevealSection
          pinRef={animationRefs.textRevealPinRef}
          textRef={animationRefs.textRevealTextRef}
        />
        
        <FeaturesStackSection
          sectionRef={animationRefs.featuresStackSectionRef}
          imgRef={animationRefs.featuresStackImgRef}
          cardContainerRef={animationRefs.featuresStackCardContainerRef}
          cardsRef={animationRefs.featuresStackCardsRef}
        />

        <QuoteSection
          sectionRef={animationRefs.quote1SectionRef}
          quoteRef={animationRefs.quote1QuoteRef}
          imgRef={animationRefs.quote1ImgRef} // Pass the ref
          quote="We wanted to stay true to the spirit of the ENDURO range: an accessible, intuitive, and ultra-versatile foil. Designed to offer maximum glide in light conditions, it is aimed at both dockstart enthusiasts and those who want to get started in downwind riding."
          author="Laurent Borgna"
          title="Designer"
          authorImg="https://afs-foiling.com/wp-content/uploads/2025/05/image-Photoroom-3-1.png.webp"
        />

        <QuoteSection
          sectionRef={animationRefs.quote2SectionRef}
          quoteRef={animationRefs.quote2QuoteRef}
          imgRef={animationRefs.quote2ImgRef} // Pass the ref
          quote="The idea behind this 1600 GLT was to create an accessible and fun foil for dockstart / pumping / flat water paddle up. Whether you're just starting out with Dockstart, or moving on to rockstart and beachstart, this Enduro 1600 GLT is the all-terrain, all-level wing for pumping!"
          author="Gwen Le Tutour"
          title="Tester & Collaborator"
          authorImg="https://afs-foiling.com/wp-content/uploads/2025/05/image-Photoroom-3-1-1.png.webp"
        />
      </main>

    </div>
  );
}
