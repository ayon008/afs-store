"use client"; // This component must be a Client Component for animations

import Image from 'next/image';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

export default function ProductLandingPage() {

  useEffect(() => {
    // --- This is all the GSAP animation logic from the original page ---
    
    // 1. Hero Parallax
    let tl_hero = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        endTrigger: ".about",
        end: "bottom bottom",
        scrub: true,
      }
    });

    tl_hero
      .to(".hero", { y: -600 }, "tl_hero_anim")
      .to(".animated-heading", { y: 200 }, "tl_hero_anim")
      .to(".about", { opacity: 1 }, "tl_hero_anim");

    // 2. About Section 2 Background Scale
    gsap.timeline({
      scrollTrigger: {
        trigger: ".about_2",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      }
    }).to(".about_2_div_bg", { scale: 1.05 });

    // 3. About Section 2 Text Parallax
    gsap.timeline({
      scrollTrigger: {
        trigger: ".about_2",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      }
    })
    .to(".about", { y: "-120px" }, "tl_3")
    .fromTo(".about_2_inner", { y: "120px" }, { y: "0px" }, "tl_3")
    .fromTo(".about_3_inner", { y: "140px" }, { y: "0px" }, "tl_3");

    // 4. Horizontal Scroll Section
    // Function to get the total scroll amount
    function getScrollAmount() {
      let factsContainer = document.querySelector('.factsContainer_sm');
      if (factsContainer) {
        let totalWidth = factsContainer.scrollWidth;
        return -(totalWidth - window.innerWidth);
      }
      return 0;
    }

    // Horizontal scrolling animation
    let scrollTween = gsap.to('.factsContainer_sm', {
      x: () => getScrollAmount(),
      ease: "none",
      scrollTrigger: {
        trigger: ".factsContainer",
        start: "center center",
        pin: true,
        scrub: 1,
        end: () => `+=${Math.abs(getScrollAmount())}`,
        invalidateOnRefresh: true
      }
    });

    // 5. Nested Animations *inside* Horizontal Scroll
    
    // Slide 2 Image
    gsap.timeline({
      scrollTrigger: {
        trigger: ".innertow",
        containerAnimation: scrollTween,
        start: "left center",
        end: "right right",
        scrub: true,
      }
    }).fromTo(".wb_img_one", { x: "300px" }, { x: "0px" });

    // Slide 2 & 3 Parallax
    gsap.timeline({
      scrollTrigger: {
        trigger: ".innerthree",
        containerAnimation: scrollTween,
        start: "left right",
        end: "right right",
        scrub: true,
      }
    }).fromTo(".innertow", { x: "0" }, { x: "-400px" });
      
    // Slide 1 Vertical Parallax
    gsap.timeline({
      scrollTrigger: {
        trigger: ".fact", // This is the parent of innersecone
        start: "top center",
        end: "bottom bottom",
        scrub: true,
      }
    }).fromTo(".innersecone", { y: "-120px" }, { y: "0px" });

    // 6. Pinned "about_wb" section
    gsap.timeline({
      scrollTrigger: {
        trigger: ".about_wb",
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
        pin: ".about_wb",
      }
    })
    .fromTo(".about_wb_cl", { scale: 1 }, { scale: 1.05 }, "about_wb_anim")
    .fromTo(".about_wb_text", { y: 200 }, { y: 0 }, "about_wb_anim");

    // 7. Pinned "about_5" section
    gsap.timeline({
      scrollTrigger: {
        trigger: ".about_5",
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
        pin: ".about_5",
      }
    })
    .to(".about_5_img", { y: "-90%" })
    .to(".about_5_text", { scale: 0.9, opacity: 0 }, "<"); // "<" syncs start time

    
    // --- Technical Info (Sizes) Animations ---
    
    // We need to re-trigger a refresh for all ScrollTriggers
    // after the component mounts and GSAP runs.
    ScrollTrigger.refresh();

    // Clean up function to kill all triggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, []); // Empty dependency array ensures this runs only once

  
  return (
    // Note: The original used `font-sans` as a base, you can adjust this
    <div className="bg-black text-white font-sans overflow-x-hidden">
      
      {/* Hero Section */}
      <section 
        className="hero elementor-section elementor-element-0184986 elementor-section-full_width elementor-section-height-default"
        // The original `hero` class is needed for the GSAP trigger
      >
        <div className="relative w-full h-[60vh] md:h-[80vh]">
          <Image
            decoding="async" 
            width={1920} 
            height={1920} 
            src="https://afs-foiling.com/wp-content/uploads/2025/02/PP_BB_B_0006.png.webp" 
            className="w-full h-full object-cover" 
            alt="" 
          />
          <div 
            className="animated-heading elementor-element-3173245 elementor-absolute" 
            // `animated-heading` class is needed for GSAP
            style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              width: '90%'
            }}
          >
            <h2 className="text-white text-3xl md:text-5xl font-bold text-center p-4">
              Hybrid / Mid-length experience - By AFS Advanced
            </h2>
          </div>
        </div>
      </section>

      {/* About Section 1 */}
      <section 
        className="about elementor-section elementor-element-8bf700e opacity-0" 
        // `about` class is for GSAP. Start with opacity-0
        style={{ background: 'rgb(255, 255, 255)' }}
      >
        <div className="bg-white py-12 md:py-20 container mx-auto px-4 max-w-4xl text-center">
          <p className="text-xl md:text-2xl leading-relaxed text-black">
            With this hybrid, uncompromising design, every session becomes a unique experience, where performance, glide, and pleasure come together to redefine foil riding.
          </p>
          <div className="mt-12 md:mt-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Born from expertise developed in the world of downwind sailing, the BlackBird Mid-Length pushes the boundaries of board design.
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mt-6 max-w-3xl mx-auto leading-relaxed">
              By reinterpreting the codes of downwind boards to adapt them to the requirements of wingfoiling, we have succeeded in creating a board capable of combining fast takeoff in light winds, exceptional glide, and maneuverability.
            </p>
            <p className="text-lg md:text-xl text-gray-700 mt-4 max-w-3xl mx-auto leading-relaxed">
              Inspired by the BlackBird, a true innovation in the world of downwind riding, its optimized length-to-width ratio allows it to excel in light conditions or on small swells, offering precise control and quick takeoff even with smaller foils.
            </p>
          </div>
        </div>
      </section>

      {/* About Section 2 */}
      <section 
        className="about_2 elementor-section elementor-element-6901697 elementor-section-full_width" 
        // `about_2` class is for GSAP
        style={{ background: 'rgb(20, 20, 20)' }}
      >
        <div className="relative py-20 md:py-32 min-h-[70vh] flex items-center text-white">
          <div 
            className="about_2_div_bg absolute inset-0 z-0"
            // `about_2_div_bg` class for GSAP scale
            style={{
              backgroundImage: 'url(https://afs-foiling.com/wp-content/uploads/2025/02/PP_BB_CF_0005-2.png.webp)',
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              opacity: 0.1,
              transform: 'scale(1)', // Initial state
            }}
          ></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div 
              className="about_2_inner" 
              // `about_2_inner` for GSAP. Initial state set by GSAP `fromTo`
              style={{ transform: 'translateY(120px)' }}
            >
              <h2 className="text-3xl md:text-4xl font-bold max-w-2xl">
                Following in the footsteps of our legendary BlackBird, the BlackBird Mid-Length embodies the very essence of AFS Advanced expertise.
              </h2>
            </div>

            <div 
              className="about_3_inner grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mt-12"
              // `about_3_inner` for GSAP. Initial state set by GSAP `fromTo`
              style={{ transform: 'translateY(140px)' }}
            >
              <div className="space-y-6 text-lg md:text-xl text-gray-300">
                <p>With a high-end carbon construction and a resolutely innovative shape, this board pushes the boundaries of performance and innovation.</p>
                <p>Its design incorporates a <strong>hyper-optimized hull</strong>, the result of several years of research and refinement on the shape of the BlackBird.</p>
              </div>
              <div className="space-y-6 text-lg md:text-xl text-gray-300">
                <p>Manufactured in our French factory using cutting-edge technology, the BlackBird Mid-Length achieves an unprecedented level of optimization, guaranteeing easy takeoffs, good stability, and ultra-high performance gliding.</p>
              </div>
            </div>
            
            <p className="text-center text-gray-400 mt-16 text-lg">
              BlackBird → BlackBird Mid-Length
            </p>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Section */}
      <section 
        className="factsContainer elementor-section elementor-element-9e60dda"
        // `factsContainer` is the trigger and pinning element
        style={{ 
          background: 'rgb(0, 0, 0)', 
          minHeight: '100vh', // Needs height for pinning
          width: '100%',
          overflow: 'hidden' // Hide the overflowing horizontal container
        }}
      >
        <div 
          className="factsContainer_sm elementor-element-c989ee1 flex"
          // `factsContainer_sm` is the element that moves horizontally
          style={{ 
            width: '300vw', // 3 slides * 100vw
            height: '100vh', 
            willChange: 'transform' 
          }}
        >
          
          {/* Slide 1: "A Hybrid Experience..." */}
          <div 
            className="fact innersecone elementor-element-aced5e6 w-screen h-full flex-none flex flex-col justify-center items-center text-center p-8 md:p-24"
            // `fact` and `innersecone` for GSAP
            style={{ 
              color: 'white', 
              willChange: 'transform' // Initial state set by GSAP
            }}
          >
            <p className="text-lg text-gray-400">A Hybrid Experience Without Compromise</p>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 max-w-3xl">
              With the BlackBird Mid-Length, we want to redefine the foil experience by offering a compact yet ultra-efficient hybrid board.
            </h2>
            <p className="text-lg text-gray-300 mt-6 max-w-2xl">
              A true crossover, it adapts to each of your sessions with remarkable optimization. Every detail has been meticulously designed to deliver maximum performance.
            </p>
          </div>

          {/* Slide 2: Image + Text */}
          <div 
            className="fact innertow elementor-element-9b684de w-screen h-full flex-none relative"
            // `innertow` for GSAP
            style={{ 
              background: 'rgb(20, 20, 20)', 
              color: 'white', 
              willChange: 'transform' 
            }}
          >
            <div 
              className="wb_img_one absolute inset-0" 
              // `wb_img_one` for GSAP
              style={{ willChange: 'transform' }} // Initial state set by GSAP
            >
              <Image 
                src="https://afs-foiling.com/wp-content/uploads/2025/02/PP_BB_CF_0007.png.webp" 
                alt="" 
                layout="fill" 
                objectFit="cover" 
                className="opacity-70"
              />
            </div>
            <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-16">
              <p className="text-lg md:text-xl w-full md:w-1/3">
                Improved pumping for immediate and effective grip.
              </p>
              <p className="text-lg md:text-xl w-full md:w-1/3 self-end text-right">
                Deck plans designed for ergonomics and comfort that meet the expectations of the most demanding riders.
              </p>
            </div>
          </div>
          
          {/* Slide 3: Image + Text */}
          <div 
            className="fact innerthree elementor-element-28bdcc2 w-screen h-full flex-none relative"
            // `innerthree` for GSAP
            style={{ 
              background: 'rgb(10, 10, 10)', 
              color: 'white',
              willChange: 'transform' 
            }}
          >
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'url(https://afs-foiling.com/wp-content/uploads/2025/02/PP_BB_B_0007.png.webp)',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                opacity: 0.7,
              }}
            ></div>
            <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-16">
              <p className="text-lg md:text-xl w-full md:w-1/3">
                It is inspired by the first generations of BlackBird (6’2 and 6’4), true benchmarks in the mid-length board market.
              </p>
              <p className="text-lg md:text-xl w-full md:w-1/3 self-end text-right">
                A high-end construction, synonymous with strength and lightness.
              </p>
            </div>
          </div>
          
        </div>
      </section>

      {/* Pinned "about_wb" section */}
      <section 
        className="about_wb elementor-section elementor-element-e27194d grid grid-cols-1 md:grid-cols-2 min-h-screen"
        // `about_wb` for GSAP pin
      >
        <div 
          className="about_wb_cl relative min-h-[300px] md:min-h-0"
          // `about_wb_cl` for GSAP scale
          style={{ 
            backgroundImage: 'url(https://afs-foiling.com/wp-content/uploads/2025/02/PP_BB_CF_0006-1.png.webp)',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            willChange: 'transform',
          }}
        >
        </div>
        <div 
          className="bg-black-100 text-black p-8 md:p-16 flex items-center"
          style={{ background: 'rgb(245, 245, 245)' }}
        >
          <p 
            className="about_wb_text text-lg md:text-xl max-w-xl leading-relaxed"
            // `about_wb_text` for GSAP y-transform
            style={{ willChange: 'transform' }} // Initial state set by GSAP
          >
            This hybrid board opens up a whole new range of possibilities, thanks to its exceptional performance in light winds and its ability to take off quickly and smoothly in calm conditions. Its aerodynamic design and optimized volume distribution also make it a board that is perfectly at home in breezy conditions.
          </p>
        </div>
      </section>

      {/* Pinned "about_5" section */}
      <section 
        className="about_5 elementor-section elementor-element-1455724 relative py-20 md:py-32 bg-white text-black min-h-screen flex items-center justify-center text-center"
        // `about_5` for GSAP pin
      >
        <div className="container mx-auto px-4 z-10 relative">
          <p 
            className="about_5_text text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            // `about_5_text` for GSAP scale/opacity
            style={{ willChange: 'transform, opacity' }}
          >
            Although designed for advanced performance, the BlackBird Mid-Length remains intuitive and accessible. Whether you’re passionate about downwind riding, a fan of performance SUP foiling, or looking for thrills in wing foiling, parawing, or even surf foiling in certain conditions, this board has been designed to adapt to all spots and conditions, without compromise.
          </p>
        </div>
        <div 
          className="about_5_img absolute inset-0 z-0"
          // `about_5_img` for GSAP y-transform
          style={{ willChange: 'transform' }}
        >
          <Image 
            src="https://afs-foiling.com/wp-content/uploads/2025/02/PP_BB_B_0009-2.png.webp" 
            alt="" 
            layout="fill" 
            objectFit="contain"
            objectPosition="center 120%" // Pushes it down to be animated up
          />
        </div>
      </section>

      {/* Technical Info Section (Was not animated in the original, so no GSAP) */}
      <section 
        className="size_div elementor-section elementor-element-d7d29a4 bg-gray-50 py-16 md:py-24"
        style={{ background: 'rgb(245, 245, 245)' }}
      >
        <div className="container mx-auto px-4">
          <h2 className="size_div_text text-3xl md:text-4xl font-bold text-center text-black">
            TECHNICAL INFORMATION
          </h2>
          <div 
            className="size_inner grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          >
            
            {/* Size 1 */}
            <div 
              className="sizesm_1 bg-white p-6 rounded-lg text-center flex flex-col items-center"
              // `sizesm_1` for GSAP
              style={{ background: 'rgb(255, 255, 255)' }}
            >
              <div className="relative w-full h-64 flex justify-center items-center overflow-hidden">
                <Image 
                  src="https://afs-foiling.com/wp-content/uploads/2025/02/PP_BB_B_0009-7.png.webp" 
                  alt="" 
                  width={188} 
                  height={625} 
                  className="h-full w-auto" 
                  style={{ transform: 'translateX(-20%) scale(0.93)' }}
                />
                <Image 
                  src="https://afs-foiling.com/wp-content/uploads/2025/02/PP_BB_CF_0009-1.png.webp" 
                  alt="" 
                  width={188} 
                  height={625} 
                  className="absolute h-full w-auto" 
                  style={{ transform: 'translateX(20%) scale(0.93)' }}
                />
              </div>
              <h3 className="size_name_1 font-semibold text-lg mt-6 text-black">
                BlackBird Mid-Length
              </h3>
              <p className="size_text_1 text-gray-700 mt-2">
                5.6*20.5*75 L
              </p>
            </div>
            
            {/* Size 2 */}
            <div 
              className="sizesm_2 bg-white p-6 rounded-lg text-center flex flex-col items-center"
              style={{ background: 'rgb(255, 255, 255)' }}
            >
              <div className="relative w-full h-64 flex justify-center items-center overflow-hidden">
                <Image 
                  src="https://afs-foiling.com/wp-content/uploads/2025/02/PP_BB_B_0009-7.png.webp" 
                  alt="" 
                  width={188} 
                  height={625} 
                  className="h-full w-auto" 
                  style={{ transform: 'translateX(-20%) scale(0.96)' }}
                />
                <Image 
                  src="https://afs-foiling.com/wp-content/uploads/2025/02/PP_BB_CF_0009-1.png.webp" 
                  alt="" 
                  width={188} 
                  height={625} 
                  className="absolute h-full w-auto" 
                  style={{ transform: 'translateX(20%) scale(0.96)' }}
                />
              </div>
              <h3 className="size_name_2 font-semibold text-lg mt-6 text-black">
                BlackBird Mid-Length
              </h3>
              <p className="size_text_2 text-gray-700 mt-2">
                6’0*22*90 L
              </p>
            </div>
            
            {/* Size 3 */}
            <div 
              className="sizesm_3 bg-black p-6 rounded-lg text-center flex flex-col items-center"
              style={{ background: 'rgb(255, 255, 255)' }}
            >
              <div className="relative w-full h-64 flex justify-center items-center overflow-hidden">
                <Image 
                  src="https://afs-foiling.com/wp-content/uploads/2025/02/PP_BB_B_0009-7.png.webp" 
                  alt="" 
                  width={188} 
                  height={625} 
                  className="size_b_b h-full w-auto" // Class for GSAP
                  style={{ transform: 'translateX(-20%)' }}
                />
                <Image 
                  src="https://afs-foiling.com/wp-content/uploads/2025/02/PP_BB_CF_0009-1.png.webp" 
                  alt="" 
                  width={188} 
                  height={625} 
                  className="size_v_w absolute h-full w-auto" // Class for GSAP
                  style={{ transform: 'translateX(20%)' }}
                />
              </div>
              <h3 className="size_name_3 font-semibold text-lg mt-6 text-black">
                BlackBird Mid-Length
              </h3>
              <p className="size_text_3 text-gray-700 mt-2">
                6.3*22.5*100 L
              </p>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
}