'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- SVG Icons (Converted from HTML) ---
// I've converted the most important inline SVGs from the HTML into reusable React components.

const IconSearch = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21.8572 21L15.8572 15M17.8572 10C17.8572 13.866 14.7232 17 10.8572 17C6.99118 17 3.85718 13.866 3.85718 10C3.85718 6.13401 6.99118 3 10.8572 3C14.7232 3 17.8572 6.13401 17.8572 10Z" stroke="white" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="square"></path></svg>
);
const IconUser = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 20.5714V17.1429C4 16.2335 4.42143 15.3615 5.17157 14.7185C5.92172 14.0755 6.93913 13.7143 8 13.7143H12H16C17.0609 13.7143 18.0783 14.0755 18.8284 14.7185C19.5786 15.3615 20 16.2335 20 17.1429V20.5714M16 6.85714C16.1205 9.14337 14.2894 11.1429 12 11.1429C9.7106 11.1429 7.87952 9.14337 8 6.85714C8.1142 4.6901 9.82995 3 12 3C14.17 3 15.8858 4.6901 16 6.85714Z" stroke="white" strokeWidth="1.5" strokeLinecap="square"></path></svg>
);
const IconCart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><g clipPath="url(#clip0_5161_3419)"><path d="M2.88725 18.6806C1.76607 18.6806 0.857178 19.5836 0.857178 20.6974C0.857178 21.8113 1.76607 22.7142 2.88725 22.7142C4.00843 22.7142 4.91733 21.8113 4.91733 20.6974C4.91733 19.5836 4.00843 18.6806 2.88725 18.6806ZM2.88725 18.6806H14.0527M2.88725 18.6806V8.28564C2.88725 7.73336 2.43954 7.28564 1.88725 7.28564H0.857178M14.0527 18.6806C12.9315 18.6806 12.0226 19.5836 12.0226 20.6974C12.0226 21.8113 12.9315 22.7142 14.0527 22.7142C15.1738 22.7142 16.0827 21.8113 16.0827 20.6974C16.0827 19.5836 15.1738 18.6806 14.0527 18.6806ZM14.0527 18.6806H18" stroke="white" strokeWidth="1.5" strokeLinecap="square"></path><rect x="4.28577" y="1.71436" width="19.7143" height="15.4286" rx="2" fill="#1D98FF"></rect></g><defs><clipPath id="clip0_5161_3419"><rect width="24" height="24" fill="white"></rect></clipPath></defs></svg>
);
const IconFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="22" viewBox="0 0 44 22" fill="none"><rect x="0.312219" y="4.31295" width="17.3741" height="12.8741" rx="2.19066" fill="white" stroke="#F5F5F5" strokeWidth="0.625902"></rect><mask id="mask0_15332_16859" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="-1" y="4" width="19" height="14"><rect x="0.312219" y="4.31295" width="17.3741" height="12.8741" rx="0.938853" fill="white" stroke="white" strokeWidth="0.625902"></rect></mask><g mask="url(#mask0_15332_16859)"><rect x="11.999" y="4" width="6" height="13.5" fill="#F44653"></rect><path fillRule="evenodd" clipRule="evenodd" d="M-0.000732422 17.5H5.99927V4H-0.000732422V17.5Z" fill="#1035BB"></path></g><path d="M25.488 17H23.408V5.336H31.376V7.176H25.488V10.904H30.736V12.664H25.488V17ZM35.1718 17H33.0918V5.336H38.9158C41.2038 5.336 42.3878 6.648 42.3878 8.776C42.3878 10.168 41.7158 11.192 40.6278 11.576V11.688H41.1558C42.0038 11.688 42.4198 12.136 42.4198 13.048V17H40.2758V12.712H35.1718V17ZM35.1718 7.16V11H38.4038C39.5078 11 40.1638 10.424 40.1638 9.512V8.632C40.1638 7.656 39.4918 7.16 38.4038 7.16H35.1718Z" fill="white"></path></svg>
);
const IconBuyArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10.2857 1.71484L1.71429 10.2863M10.2857 1.71484H2.57144M10.2857 1.71484V9.42913" stroke="white" strokeWidth="2"></path></svg>
);
const IconPlay = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"><rect x="1.5" y="1.5" width="53" height="53" rx="26.5" stroke="white" strokeWidth="3" strokeDasharray="10 10"></rect><path d="M37 26.2679C38.3333 27.0377 38.3333 28.9623 37 29.7321L25 36.6603C23.6667 37.4301 22 36.4678 22 34.9282L22 21.0718C22 19.5322 23.6667 18.5699 25 19.3397L37 26.2679Z" fill="white"></path></svg>
);
const IconToggle = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 6H12C12.7956 6 13.5587 6.31607 14.1213 6.87868C14.6839 7.44129 15 8.20435 15 9V19M15 19L11 15M15 19L19 15" stroke="#333333" strokeWidth="2" strokeLinecap="square"></path></svg>
);
const IconGuideArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none"><path d="M10.2857 4.71484L1.71429 13.2863M10.2857 4.71484H2.57144M10.2857 4.71484V12.4291" stroke="#1D98FF" strokeWidth="1.5"></path></svg>
);

// --- Data (Extracted from HTML) ---

// Product variation data
const productVariations = [
  {"attributes":{"attribute_surface":"2.5m2"},"display_price":669,"is_in_stock":false,"price_html":"<span class=\"woocommerce-Price-amount amount\"><bdi>669,00<span class=\"woocommerce-Price-currencySymbol\">&euro;<\/span><\/bdi><\/span><p class=\"delivery-note\">Date pr\u00e9vue de d\u00e9part : Monday, September 15, 2025<\/p>"},
  {"attributes":{"attribute_surface":"1.5m2"},"display_price":589,"is_in_stock":false,"price_html":"<span class=\"woocommerce-Price-amount amount\"><bdi>589,00<span class=\"woocommerce-Price-currencySymbol\">&euro;<\/span><\/bdi><\/span><p class=\"delivery-note\">Date pr\u00e9vue de d\u00e9part : Sunday, November 30, 2025<\/p>"},
  {"attributes":{"attribute_surface":"3m2"},"display_price":709,"is_in_stock":true,"price_html":"<span class=\"woocommerce-Price-amount amount\"><bdi>709,00<span class=\"woocommerce-Price-currencySymbol\">&euro;<\/span><\/bdi><\/span><p class=\"delivery-note\">Date pr\u00e9vue de d\u00e9part : Monday, September 15, 2025<\/p>"},
  {"attributes":{"attribute_surface":"4m2"},"display_price":739,"is_in_stock":true,"price_html":"<span class=\"woocommerce-Price-amount amount\"><bdi>739,00<span class=\"woocommerce-Price-currencySymbol\">&euro;<\/span><\/bdi><\/span><p class=\"delivery-note\">Date pr\u00e9vue de d\u00e9part : Monday, September 15, 2025<\/p>"},
  {"attributes":{"attribute_surface":"5m2"},"display_price":779,"is_in_stock":true,"price_html":"<span class=\"woocommerce-Price-amount amount\"><bdi>779,00<span class=\"woocommerce-Price-currencySymbol\">&euro;<\/span><\/bdi><\/span><p class=\"delivery-note\">Date pr\u00e9vue de d\u00e9part : Monday, September 15, 2025<\/p>"},
  {"attributes":{"attribute_surface":"6m2"},"display_price":839,"is_in_stock":true,"price_html":"<span class=\"woocommerce-Price-amount amount\"><bdi>839,00<span class=\"woocommerce-Price-currencySymbol\">&euro;<\/span><\/bdi><\/span><p class=\"delivery-note\">Date pr\u00e9vue de d\u00e9part : Monday, September 15, 2025<\/p>"}
];

// Gallery data
const galleryItems = [
  { type: 'image', url: 'https://afs-foiling.com/wp-content/uploads/2024/02/afs-d-lite-1-1024x1024.png' },
  { type: 'video', url: 'https://youtu.be/PV-xkAwbDp4', thumb: 'https://afs-foiling.com/wp-content/uploads/2024/08/lite-prez.png.webp' },
  { type: 'video', url: 'https://www.youtube.com/shorts/QVeEaWHhFag', thumb: 'https://afs-foiling.com/wp-content/uploads/2024/08/lite-laurent.png.webp' },
  { type: 'image', url: 'https://afs-foiling.com/wp-content/uploads/2024/02/afs-d-lite-3-1024x1024.png' },
  { type: 'image', url: 'https://afs-foiling.com/wp-content/uploads/2024/02/afs-d-lite-4-1024x1024.png.webp' },
  { type: 'image', url: 'https://afs-foiling.com/wp-content/uploads/2024/02/afs-d-lite-5-1024x1024.png' },
  { type: 'image', url: 'https://afs-foiling.com/wp-content/uploads/2024/02/afs-d-lite-6-1024x1024.png' },
];


/**
 * ---------------------------------
 * MAIN PAGE COMPONENT
 * ---------------------------------
 */
export default function ProductPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBuyingSectionOpen, setIsBuyingSectionOpen] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  // --- Animation Refs ---
  const mainHeaderRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroImageRef = useRef(null);
  const wingInnerRef = useRef(null);
  const deliteImgRef = useRef(null);
  const ultraHRef = useRef(null);
  const ultraSecDivRef = useRef(null);
  const imgScaleRef = useRef(null);
  const horizontalScrollRef = useRef(null);
  const horizontalContentRef = useRef(null);
  const factsContainerRef = useRef(null);
  const innHRef = useRef(null);
  const innImgRef = useRef(null);
  const wingGalleryRef = useRef(null);
  const innDvRef = useRef(null);
  const bottomImgRef = useRef(null);
  
  // --- Animation Logic ---
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Main Header Animation (Slides up on scroll)
    gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    }).fromTo(mainHeaderRef.current, { y: 0 }, { y: "-100%", ease: "none" });

    // 2. Hero Text & Image Animations
    gsap.fromTo(heroTextRef.current, 
      { opacity: 0, y: 120 }, 
      { opacity: 1, y: 0, ease: "power2.out", delay: 0.5 }
    );

    // 3. Parallax scroll animations (Responsive)
    ScrollTrigger.matchMedia({
      // Desktop
      "(min-width: 1025px)": function () {
        gsap.timeline({
          scrollTrigger: { trigger: ".about-section", start: "top bottom", end: "center center", scrub: true }
        }).fromTo(heroTextRef.current, {}, { y: -120, ease: "none" }, "hero_scroll")
          .fromTo(wingInnerRef.current, { y: -180 }, { y: 0, ease: "none" }, "hero_scroll");

        gsap.timeline({
          scrollTrigger: { trigger: ".about-section", start: "center center", end: "center center", endTrigger: ".wing-section", scrub: true }
        }).fromTo(deliteImgRef.current, {}, { scale: 1.5, y: -120 }, "play_smae")
          .fromTo(ultraHRef.current, { y: -120 }, { y: 0 }, "play_smae");

        gsap.timeline({
          scrollTrigger: { trigger: ".ultra_sec", start: "top bottom", end: "center center", scrub: true }
        }).fromTo(ultraSecDivRef.current, { y: -200 }, { y: 0, ease: "none" });

        gsap.timeline({
          scrollTrigger: { trigger: innDvRef.current, start: "top bottom", end: "center center", scrub: true }
        }).fromTo(innHRef.current, { y: -80 }, { y: 0, ease: "none" }, "play_smae")
          .fromTo(factsContainerRef.current, { y: 0 }, { y: -80, ease: "none" }, "play_smae")
          .fromTo(innImgRef.current, { scale: 1.2 }, { scale: 1, ease: "none" }, "play_smae");
      },
      // Mobile
      "(max-width: 1024px)": function () {
        gsap.timeline({
          scrollTrigger: { trigger: ".about-section", start: "top bottom", end: "center center", scrub: true }
        }).fromTo(heroTextRef.current, {}, { y: -20, ease: "none" }, "hero_scroll")
          .fromTo(wingInnerRef.current, { y: -40 }, { y: 0, ease: "none" }, "hero_scroll");

        gsap.timeline({
          scrollTrigger: { trigger: ".about-section", start: "center center", end: "center center", endTrigger: ".wing-section", scrub: true }
        }).fromTo(deliteImgRef.current, {}, { scale: 1.5, y: -20 }, "play_smae")
          .fromTo(ultraHRef.current, { y: -40 }, { y: 0 }, "play_smae");

        gsap.timeline({
          scrollTrigger: { trigger: ".ultra_sec", start: "top bottom", end: "center center", scrub: true }
        }).fromTo(ultraSecDivRef.current, { y: -80 }, { y: 0, ease: "none" });

        gsap.timeline({
          scrollTrigger: { trigger: innDvRef.current, start: "top bottom", end: "center center", scrub: true }
        }).fromTo(innHRef.current, { y: -40 }, { y: 0, ease: "none" }, "play_smae")
          .fromTo(factsContainerRef.current, { y: 0 }, { y: -80, ease: "none" }, "play_smae")
          .fromTo(innImgRef.current, { scale: 1.2 }, { scale: 1, ease: "none" }, "play_smae");
      }
    });

    // 4. Image Scale Animation
    const imgScaleAnim = gsap.timeline();
    imgScaleAnim.fromTo(imgScaleRef.current, { scale: 1 }, { scale: 3, ease: "power1.out" }, "play_smae")
                .fromTo(imgScaleRef.current, { y: "0%" }, { y: "-40%", ease: "none" }, "play_smae_i");
    ScrollTrigger.create({
        animation: imgScaleAnim,
        trigger: imgScaleRef.current,
        start: "center center",
        end: "bottom top",
        scrub: true
    });

    // 5. Horizontal Scroll Section
    const getScrollAmount = () => {
        if (horizontalContentRef.current) {
            return -(horizontalContentRef.current.scrollWidth - window.innerWidth);
        }
        return 0;
    };
    gsap.to(horizontalContentRef.current, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
            trigger: horizontalScrollRef.current,
            start: "bottom bottom",
            end: () => "+=" + (-1 * getScrollAmount() + 1000),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
        }
    });

    // 6. Final Gallery Section Animation
    gsap.timeline({
        scrollTrigger: {
            trigger: wingGalleryRef.current,
            start: "top bottom",
            end: "center center",
            scrub: true
        }
    }).fromTo(wingGalleryRef.current, { y: -80 }, { y: 0, ease: "none" }, "play_smae")
      .fromTo(bottomImgRef.current, { scale: 1.2 }, { scale: 1, ease: "none" }, "play_smae");

    // Clean up ScrollTrigger instances on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // --- Event Handlers ---

  const handleVariationSelect = (variation) => {
    setSelectedVariation(variation);
  };
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleBuyClick = () => {
    setIsBuyingSectionOpen(!isBuyingSectionOpen);
    if (!isBuyingSectionOpen) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentPriceHtml = selectedVariation 
    ? selectedVariation.price_html 
    : From <span class="woocommerce-Price-amount amount"><bdi>589,00<span class="woocommerce-Price-currencySymbol">€</span></bdi></span>;

  return (
    <div className="bg-white text-neutral-800 antialiased">
      {/* GTM Noscript */}
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5FM2D85" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} aria-hidden="true"></iframe></noscript>

      {/* --- Main Header (Sticky, animates up) --- */}
      <header 
        ref={mainHeaderRef} 
        className="fixed top-0 left-0 right-0 z-50 w-full bg-black text-white transition-transform duration-300"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image src="https://afs-foiling.com/wp-content/uploads/2025/01/logo-afs-since-2009-2.svg" alt="AFS Foiling" width={150} height={45} />
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="p-2 z-50 relative">
                <span className="sr-only">Open menu</span>
                <div className="space-y-1.5">
                  <span className={block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}}></span>
                  <span className={block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}}></span>
                  <span className={block w-5 h-0.5 bg-gray-300 transition-all duration-300 ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}}></span>
                </div>
              </button>
            </div>

            {/* Desktop Nav & Icons */}
            <div className="hidden md:flex items-center space-x-6">
              <nav className="hidden lg:block">
                {/* Simplified Nav - The Mega Menu is too complex for this example, but this is where it would be triggered */}
                <Link href="/product-category/foiling/wing-foil/" className="text-sm font-medium text-gray-300 hover:text-white px-3 py-2">Wingfoil</Link>
                <Link href="/product-category/foiling/downwind-foil/" className="text-sm font-medium text-gray-300 hover:text-white px-3 py-2">Downwind</Link>
                <Link href="/product-category/foiling/prone-foil/" className="text-sm font-medium text-gray-300 hover:text-white px-3 py-2">Prone Foil</Link>
                <Link href="/whatsnew/" className="text-sm font-medium text-gray-300 hover:text-white px-3 py-2">Whatsnew</Link>
                <Link href="/support/" className="text-sm font-medium text-gray-300 hover:text-white px-3 py-2">Service</Link>
              </nav>
              
              <div className="flex items-center space-x-4">
                <button className="text-gray-300 hover:text-white"><IconSearch /></button>
                <Link href="/fr/mon-compte/" className="text-gray-300 hover:text-white"><IconUser /></Link>
                <button onClick={() => setIsCartOpen(true)} className="relative text-gray-300 hover:text-white">
                  <IconCart />
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
                </button>
                <button className="hidden lg:block"><IconFlag /></button>
              </div>
            </div>
          </div>
        </div>

        {/* --- Mega Menu (Mobile & Desktop) --- */}
        {/* This is a simplified version. The original is a massive multi-level React component. */}
        <div className={fixed top-0 left-0 h-full w-full bg-black z-40 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden overflow-y-auto pt-20}>
          <nav className="flex flex-col p-4 space-y-2 text-white">
            <h3 className="text-gray-400 uppercase text-sm px-2">Produits</h3>
            <Link href="/product-category/foiling/wing-foil/" className="block px-2 py-3 text-lg">Wingfoil</Link>
            <Link href="/product-category/foiling/downwind-foil/" className="block px-2 py-3 text-lg">Downwind</Link>
            <Link href="/product-category/foiling/prone-foil/" className="block px-2 py-3 text-lg">Prone Foil</Link>
            <Link href="/product-category/foiling/sup-foil-foiling/" className="block px-2 py-3 text-lg">Sup Foil</Link>
            <Link href="/product-category/foiling/dockstart/" className="block px-2 py-3 text-lg">Dockstart</Link>
            <Link href="/product-category/foiling/windfoiling/" className="block px-2 py-3 text-lg">Windfoil</Link>
            <hr className="border-gray-700 my-4" />
            <Link href="/whatsnew/" className="block px-2 py-3 text-lg">Whatsnew</Link>
            <Link href="/support/" className="block px-2 py-3 text-lg">Service</Link>
          </nav>
        </div>
      </header>

      {/* --- Product Header (Sticky, appears under main header) --- */}
      <section className="sticky top-0 z-30 bg-white shadow-md" style={{ paddingTop: '80px' }}> {/* pt-20 (h-20) to offset for main header */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold">D-Lite</h1>
            <div className="flex items-center space-x-4">
              <a href="#reviews" className="hidden md:block text-sm font-medium text-gray-600 hover:text-black">Reviews</a>
              <a href="#caracteristiques" className="hidden md:block text-sm font-medium text-gray-600 hover:text-black">Features</a>
              <button 
                onClick={handleBuyClick} 
                className="bg-blue-600 text-white px-5 py-2.5 text-sm font-semibold rounded-full flex items-center space-x-2 transition hover:bg-blue-700"
              >
                <IconBuyArrow />
                <span>{isBuyingSectionOpen ? 'Learn More' : 'Buy'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- Main Product Content --- */}
      {/* This section toggles with the "Buy" section */}
      <main className={transition-all duration-300 ${isBuyingSectionOpen ? 'hidden' : 'block'}}>
        
        {/* --- Hero Section --- */}
        <section className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden">
          <div className="absolute inset-0 bg-black">
            <Image
              ref={heroImageRef}
              src="https://afs-foiling.com/wp-content/uploads/2024/02/afs-d-lite-5-1.png"
              alt="D-Lite Wingfoil"
              fill
              className="object-cover opacity-50"
              priority
            />
          </div>
          <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-20 md:pb-32 text-white">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold max-w-4xl hero_h">
              The D-lite offers an incredibly light and intuitive navigation experience.
            </h2>
            <p ref={heroTextRef} className="mt-6 text-lg md:text-xl max-w-2xl text-gray-200">
              Add to that soft handles for optimal safety, and you have the perfect wing to take with you everywhere, whether for summer or winter sessions.
            </p>
          </div>
        </section>

        {/* --- About Section --- */}
        <section className="py-20 md:py-32 bg-white text-center about-section">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Narrow Span</h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 mb-4">
              The D-lite's design is remarkably compact, allowing you to concentrate fully on your navigation without your wing rubbing in the water.
            </p>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700">
              This exceptional feature makes every phase of flight and take-off completely instinctive.
            </p>
          </div>
        </section>

        {/* --- Wing Section (Parallax) --- */}
        <section className="relative h-[120vh] wing-section" ref={wingInnerRef}>
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <Image
              ref={deliteImgRef}
              src="https://afs-foiling.com/wp-content/uploads/2024/02/afs-d-lite-8-1-1-1-scaled.png.webp"
              alt="D-Lite Wing construction"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end pb-20 md:pb-32 bg-gradient-to-t from-black/70 to-transparent">
              <div className="container mx-auto px-4 text-white text-center">
                <h2 ref={ultraHRef} className="text-4xl md:text-6xl font-bold mb-6">Ultra Light Wing</h2>
                <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200 mb-4">
                  The lightness of the D-lite offers exceptional maneuverability, while its balance allows you to perform maneuvers without the slightest fatigue.
                </p>
                <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
                  You can indulge in hours of sailing to master your jibes and tacks, ensuring intense pleasure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Ultra Section --- */}
        <section className="relative pt-20 md:pt-32 pb-96 bg-black text-white ultra_sec">
          <div ref={ultraSecDivRef}>
            <Image
              src="https://afs-foiling.com/wp-content/uploads/2024/02/afs-d-lite-2-1-1-e1705064826702.png.webp"
              alt="D-Lite Wing profile"
              width={1918}
              height={1949}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl -mt-48 md:-mt-80"
            />
            <div className="relative z-10 container mx-auto px-4 text-center mt-48 md:mt-96">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Ultra Light Wing</h2>
              <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200 mb-4">
                Thanks to its progressive power, navigating with the D-lite is surprisingly easy.
              </p>
              <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200 mb-4">
                The rear hand allows you to regulate the power of the wing naturally, giving you the confidence to accelerate or decelerate without any fear of “overspeed.”
              </p>
              <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
                This gives you considerable power reserves for rapid acceleration when needed.
              </p>
            </div>
          </div>
        </section>

        {/* --- Image Scale Section --- */}
        <section className="relative h-[200vh] w-full overflow-hidden wing_scale">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center">
            <div ref={imgScaleRef} className="w-full max-w-lg md:max-w-xl">
              <Image
                src="https://afs-foiling.com/wp-content/uploads/2024/02/afs-d-lite-6-1.png"
                alt="D-Lite details"
                width={1920}
                height={1619}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="absolute bottom-20 md:bottom-32 left-0 right-0 z-10">
            <div className="container mx-auto px-4 text-center">
              <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700">
                The usable power of the D-lite also lends itself well to freestyle and wave riding, where its ease of use and light weight contribute to effortless performance.
              </p>
            </div>
          </div>
        </section>

        {/* --- Horizontal Scroll Section --- */}
        <section ref={horizontalScrollRef} className="relative h-[150vh] bg-black text-white overflow-hidden lastpin">
          <div ref={horizontalContentRef} className="flex flex-nowrap h-screen items-center px-16">
            <div className="flex-shrink-0 w-screen px-8 md:px-16">
              <h2 className="text-4xl md:text-6xl font-bold max-w-3xl">Soft Handles for safe, precise riding</h2>
            </div>
            <div className="flex-shrink-0 w-screen px-8 md:px-16 space-y-6">
              <h4 className="text-2xl md:text-3xl font-medium max-w-3xl">
                The soft handles are a real asset, offering maximum protection in the event of a fall, for both rider and equipment.
              </h4>
              <h4 className="text-2xl md:text-3xl font-medium max-w-3xl">
                They eliminate any apprehension at every stage of sailing, allowing you to explore a multitude of maneuvers with complete peace of mind.
              </h4>
            </div>
            <div className="flex-shrink-0 w-screen px-8 md:px-16 space-y-6">
              <h4 className="text-2xl md:text-3xl font-medium max-w-3xl">
                The ideal position of the front handle facilitates not only navigation, but also handling of the wing on land and at sea.
              </h4>
              <h4 className="text-2xl md:text-3xl font-medium max-w-3xl">
                It requires very little effort and is naturally self-supporting, opening the door to extended freefly sessions.
              </h4>
            </div>
          </div>
        </section>

        {/* --- Other Features --- */}
        <section ref={innDvRef} className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div ref={innImgRef} className="w-full md:w-1/2">
                <Image
                  src="https://afs-foiling.com/wp-content/uploads/2023/11/afs-d-lite-2-1-e1700493847303.png"
                  alt="Inflation System"
                  width={520}
                  height={520}
                  className="w-full h-auto"
                />
              </div>
              <div ref={factsContainerRef} className="w-full md:w-1/2">
                <h2 ref={innHRef} className="text-4xl md:text-6xl font-bold mb-6">Innovative Inflation System</h2>
                <div className="space-y-6 text-gray-700 text-lg">
                  <p>
                    They eliminate any apprehension at every stage of sailing, allowing you to explore a multitude of maneuvers with complete peace of mind.
                  </p>
                  <p>
                    A single inflation nozzle, designed to be compatible with most pumps on the market. Coupled with a one-pump system that allows you to inflate the wing in one go. Its deflation valve allows you to deflate the wing and get back to the warmth more quickly during winter sessions!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Final Gallery --- */}
        <section ref={wingGalleryRef} className="py-20 md:py-32 bg-gray-100 wing_gallery">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8" ref={bottomImgRef}>
              <Image src="https://afs-foiling.com/wp-content/uploads/2024/02/Group-5.png" alt="Feature 1" width={304} height={304} />
              <Image src="https://afs-foiling.com/wp-content/uploads/2024/02/Group-3.png" alt="Feature 2" width={304} height={304} />
              <Image src="https://afs-foiling.com/wp-content/uploads/2024/02/Group-6.png" alt="Feature 3" width={304} height={304} />
              <Image src="https://afs-foiling.com/wp-content/uploads/2024/02/Group-2-4.png" alt="Feature 4" width={304} height={304} />
              <Image src="https://afs-foiling.com/wp-content/uploads/2024/02/Group-4.png" alt="Feature 5" width={304} height={304} />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold max-w-4xl mx-auto text-center mt-16 md:mt-24 wing_gallery_h">
              Finally, with its practical, compact bag, you can transport your wing with ease, whatever your means of travel. The D-lite also comes with its own safety leash, for a carefree and decidedly positive experience.
            </h2>
          </div>
        </section>

      </main>

      {/* --- Buying Section (Toggled by "Buy" button) --- */}
      <section className={bg-gray-50 afs_buying_sec ${isBuyingSectionOpen ? 'block' : 'hidden'}} style={{ minHeight: '100vh', paddingTop: '80px' }}>
        <div className="container mx-auto px-4 py-8">
          <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <a href="https://afs-foiling.com" className="hover:text-blue-600">Home</a> /
            <a href="https://afs-foiling.com/product-category/foiling/" className="hover:text-blue-600"> FOILING</a> /
            <a href="https://afs-foiling.com/product-category/foiling/wing-foil/" className="hover:text-blue-600"> Wing Foil</a> /
            <a href="https://afs-foiling.com/product-category/foiling/wing-foil/wingfoil-wing/" className="hover:text-blue-600"> Wing</a> /
            <span className="text-gray-700"> D-Lite</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Gallery (Swiper) */}
            <div>
              <Swiper
                spaceBetween={10}
                slidesPerView={1}
                onSlideChange={(swiper) => setActiveGalleryIndex(swiper.activeIndex)}
                className="mb-2"
              >
                {galleryItems.map((item, index) => (
                  <SwiperSlide key={index} className="aspect-square bg-gray-100">
                    <Image
                      src={item.type === 'image' ? item.url : item.thumb}
                      alt={D-Lite Gallery Image ${index + 1}}
                      width={1024}
                      height={1024}
                      className="w-full h-full object-cover"
                    />
                    {item.type === 'video' && <IconPlay />}
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="flex space-x-2 overflow-x-auto">
                {galleryItems.map((item, index) => (
                  <div 
                    key={index} 
                    className={flex-shrink-0 w-16 h-16 border-2 cursor-pointer ${activeGalleryIndex === index ? 'border-blue-600' : 'border-transparent'}}
                  >
                    <Image
                      src={item.type === 'image' ? item.url : item.thumb}
                      alt={Thumbnail ${index + 1}}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                    {item.type === 'video' && <IconPlay />}
                  </div>
                ))}
              </div>
            </div>

            {/* Product Form */}
            <div className="pt-4">
              <h1 className="text-3xl font-bold">D-Lite</h1>
              <p className="text-gray-600 my-4">
                Lightweight and intuitive – Leash, bag, repair kit<br/><br/>
                The perfect kite to take with you everywhere, whether for summer or winter sessions.
              </p>
              
              <div 
                className="text-3xl font-light my-4"
                dangerouslySetInnerHTML={{ __html: currentPriceHtml }}
              />

              <a href="#" className="text-blue-600 flex items-center space-x-1 text-sm font-medium mb-4">
                <IconGuideArrow />
                <span>Size guide</span>
              </a>

              <form>
                <div className="mb-4">
                  <label className="text-sm font-semibold mb-2 block">Surface</label>
                  <div className="flex flex-wrap gap-2">
                    {productVariations.map((variation) => (
                      <button
                        key={variation.attributes.attribute_surface}
                        type="button"
                        onClick={() => handleVariationSelect(variation)}
                        className={`py-2 px-4 border rounded font-medium text-sm
                          ${selectedVariation?.attributes.attribute_surface === variation.attributes.attribute_surface
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'}
                          ${!variation.is_in_stock ? 'opacity-50 line-through cursor-not-allowed' : ''}
                        `}
                        disabled={!variation.is_in_stock}
                      >
                        {variation.attributes.attribute_surface}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <input 
                    type="number" 
                    defaultValue="1" 
                    min="1"
                    className="w-16 border border-gray-300 rounded p-2.5 text-center"
                  />
                  <button 
                    type="submit" 
                    className="flex-1 bg-blue-600 text-white px-6 py-3 text-sm font-semibold rounded-full uppercase tracking-wide transition hover:bg-blue-700 disabled:opacity-50"
                    disabled={!selectedVariation}
                  >
                    Add to cart
                  </button>
                </div>
              </form>

              {/* Info Blocks */}
              <div className="mt-8 space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold">Warranty</h3>
                  <p className="text-sm">All our products come with a 2-year guarantee.</p>
                </div>
                <div>
                  <h3 className="font-semibold">After-sales service</h3>
                  <p className="text-sm">Free return within 15 days</p>
                </div>
                <div>
                  <h3 className="font-semibold">Payment methods</h3>
                  <p className="text-sm">Secure payment. Quick and easy.</p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <span className="text-sm text-blue-600 font-medium">AFS product expert</span>
                  <h4 className="text-lg font-bold my-1">Need help choosing your equipment?</h4>
                  <p className="text-sm text-gray-600">We’re here to provide you with comprehensive answers and advice to help you make the right choice.</p>
                </div>
                <a href="#" className="flex-shrink-0 bg-white text-blue-600 border border-blue-600 px-5 py-2.5 text-sm font-semibold rounded-full flex items-center space-x-2 transition hover:bg-blue-50">
                  <IconGuideArrow />
                  <span>Make an appointment by phone</span>
                </a>
              </div>
            </div>
          </div>

          {/* Features Accordion */}
          <div className="my-16" id="caracteristiques">
            <h2 className="text-3xl font-bold mb-6">Features</h2>
            <div className="border-t border-gray-200">
              <AccordionItem title="Dimensions">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Size (m2)</th>
                        <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Wingspan (m)</th>
                        <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (Kg)</th>
                        <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Handles</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr><td className="px-4 py-2">1.5</td><td className="px-4 py-2">1.6</td><td className="px-4 py-2">1.3</td><td className="px-4 py-2">Flexible</td></tr>
                      <tr><td className="px-4 py-2">2.5</td><td className="px-4 py-2">2.2</td><td className="px-4 py-2">1.7</td><td className="px-4 py-2">Flexible</td></tr>
                      <tr><td className="px-4 py-2">3</td><td className="px-4 py-2">2.4</td><td className="px-4 py-2">1.8</td><td className="px-4 py-2">Flexible</td></tr>
                      <tr><td className="px-4 py-2">4</td><td className="px-4 py-2">2.9</td><td className="px-4 py-2">2.1</td><td className="px-4 py-2">Flexible</td></tr>
                      <tr><td className="px-4 py-2">5</td><td className="px-4 py-2">3.3</td><td className="px-4 py-2">2.4</td><td className="px-4 py-2">Flexible</td></tr>
                      <tr><td className="px-4 py-2">6</td><td className="px-4 py-2">3.4</td><td className="px-4 py-2">2.8</td><td className="px-4 py-2">Flexible</td></tr>
                    </tbody>
                  </table>
                </div>
              </AccordionItem>
              <AccordionItem title="Size guide">
                {/* Size guide content */}
              </AccordionItem>
              <AccordionItem title="Program" />
              <AccordionItem title="FAQ" />
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <AppFooter />

      {/* --- Side Cart --- */}
      <SideCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}


/**
 * ---------------------------------
 * SUB-COMPONENTS
 * (Kept in one file as requested)
 * ---------------------------------
 */

// --- Accordion Component ---
function AccordionItem({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!children) return null; // Don't render empty toggles

  return (
    <><div className="border-b border-gray-200">
          <h3>
              <button
                  type="button"
                  className="flex justify-between items-center w-full py-5 px-2 text-left text-gray-800"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-expanded={isOpen}
              >
                  <span className="font-medium">{title}</span>
                  <span className={transform} transition-transform duration-200 $ {...isOpen ? 'rotate-45' : ''} />}>
                  <IconToggle />
              </span>
          </button>
      </h3><div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
      >
              <div className="p-5 pt-0">
                  {children}
              </div>
          </div></>
    </div>
  );
}

// --- Side Cart Component ---
function SideCart({ isOpen, onClose }) {
  return (
    <div 
      className={fixed inset-0 z-[999] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>
      
      {/* Cart Content */}
      <div 
        className={relative z-10 float-right h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium uppercase">Your Cart</h2>
            <button onClick={onClose} className="flex items-center space-x-2 text-sm uppercase text-gray-600 hover:text-black">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              <span>Close</span>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6">
            <p className="text-center text-gray-500">No products in the cart.</p>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-between items-center text-lg font-medium mb-4">
              <span>Subtotal:</span>
              <span>0,00€</span>
            </div>
            <Link href="/basket/" className="w-full bg-blue-600 text-white px-5 py-3 text-sm font-semibold rounded-full flex items-center justify-center space-x-2 transition hover:bg-blue-700">
              <IconBuyArrow />
              <span>Continue to basket</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Footer Component ---
function AppFooter() {
  return (
    <footer className="bg-black text-gray-400">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Info Blocks */}
          <InfoBlock title="Click & Collect" />
          <InfoBlock title="Secure payment in 3 or 4 instalments" />
          <InfoBlock title="Advice from enthusiasts" />
          <InfoBlock title="Satisfied or your money back" />
          <InfoBlock title="Worldwide delivery" subtitle="Detax available" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-800 pt-12">
          {/* Newsletter */}
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Subscribe to our newsletter</h2>
            <p className="text-sm mb-4">We won’t send you spam; we’ll only let you know about new products and events.</p>
            <form className="flex">
              <input type="email" placeholder="person@email.com" className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-l-md p-2 text-sm focus:outline-none focus:border-blue-500" />
              <button type="submit" className="bg-gray-700 p-2 rounded-r-md hover:bg-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="20" viewBox="0 0 23 20" fill="none"><path d="M21.3286 9.9999L1.27141 9.9999M21.3286 9.9999L12.7326 18.5713M21.3286 9.9999L12.7326 1.42847" stroke="#808080" strokeWidth="1.5" strokeLinecap="square"></path></svg>
              </button>
            </form>
          </div>

          {/* About Us */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">ABOUT US</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/afs-advanced/" className="hover:text-white">AFS ADVANCED</Link></li>
              <li><Link href="/made-in-france/" className="hover:text-white">MADE IN FRANCE</Link></li>
              <li><Link href="/the-team/" className="hover:text-white">TEAM</Link></li>
              <li><Link href="/legal-notice/" className="hover:text-white">LEGAL NOTICE</Link></li>
              <li><Link href="/general-terms-and-conditions-of-sale/" className="hover:text-white">TERMS AND CONDITIONS</Link></li>
              <li><Link href="/privacy-policy/" className="hover:text-white">PRIVACY POLICY</Link></li>
            </ul>
          </div>

          {/* Socials & Equipment */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">AFS</h2>
            <ul className="space-y-2 text-sm mb-6">
              <li><a href="https://www.instagram.com/afsfoils/" className="hover:text-white">INSTAGRAM</a></li>
              <li><a href="https://www.facebook.com/afsfoils/" className="hover:text-white">FACEBOOK</a></li>
              <li><a href="https://www.youtube.com/channel/UCv-LqvRBRFQWBSJSeIZK_5g" className="hover:text-white">YOUTUBE</a></li>
            </ul>
            <h2 className="text-xl font-bold text-white mb-4">EQUIPMENT WING</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/product-category/foiling/wing-foil/#produit" className="hover:text-white">WINGFOIL EQUIPMENT</Link></li>
              <li><Link href="/downwind-2025-guide/#materiel" className="hover:text-white">DOWNWIND EQUIPMENT</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-4">
        <div className="container mx-auto px-4 text-center text-xs text-gray-500">
          Foil and Co, All rights are reserved. ©2024
        </div>
      </div>
    </footer>
  );
}

// Footer Info Block Component
function InfoBlock({ title, subtitle }) {
  return (
    <div className="text-center md:text-left">
      {/* Icon would go here */}
      <p className="font-semibold text-white mb-1">{title}</p>
      {subtitle && <p className="text-sm">{subtitle}</p>}
    </div>
  );
}