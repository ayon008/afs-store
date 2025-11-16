"use client"; // This component MUST be a Client Component for GSAP animations

import Image from 'next/image';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

export default function DockStarPage() {

  useEffect(() => {
    // --- This is all the GSAP animation logic from the original page ---

    // 1. Hero Animation (Image pin/scale/rotate)
    ScrollTrigger.matchMedia({
      "(min-width: 1025px)": function () {
        let hero_tl = gsap.timeline();
        hero_tl
          .to(".hero_img", {
            scale: 1,
            duration: 0.7,
            rotate: 0,
            y: 150,
            transformOrigin: "center center",
          })
          .to(".hero_img", {
            opacity: 0,
            y: 100,
            duration: 1,
            ease: "power2.out"
          });

        ScrollTrigger.create({
          animation: hero_tl,
          trigger: ".hero",
          start: "top 140",
          end: "bottom center",
          endTrigger: ".pinned",
          pin: ".hero_pin",
          scrub: true,
          pinSpacing: false,
        });
      },
      "(max-width: 1024px)": function () {
        let hero_tl = gsap.timeline();
        hero_tl
          .to(".hero_img", {
            scale: 1.7,
            duration: 0.7,
            rotate: 0,
            y: 50,
            transformOrigin: "center center",
          })
          .to(".hero_img", {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power2.out"
          });

        ScrollTrigger.create({
          animation: hero_tl,
          trigger: ".hero",
          start: "top 50",
          end: "bottom center",
          endTrigger: ".pinned",
          pin: ".hero_pin",
          scrub: true,
          pinSpacing: false,
        });
      }
    });

    // 2. Scroll/Stickers Animation
    let hero_tl_1 = gsap.timeline();
    hero_tl_1
      .fromTo(".scroll", { opacity: 1 }, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
      }, "play_same")
      .fromTo(".stickers_1", { y: '20vh' }, {
        y: 0,
        duration: 1.5,
        ease: "power2.out"
      }, "play_same");

    ScrollTrigger.create({
      animation: hero_tl_1,
      trigger: ".hero",
      start: "center 140",
      end: "center center",
      endTrigger: '.about',
      scrub: true,
    });

    // 3. Pinned Stickers Animation
    let pinned_tl_1st = gsap.timeline();
    pinned_tl_1st
      .to(".sticker", { y: '-15vh' }, "play_same")
      .to(".stickers", { y: '-15vh' }, "play_same")
      .fromTo(".pinned_2", { y: -80, opacity: 0, }, {
        y: 0,
        opacity: 1,
        ease: "power2.out"
      }, "play_same")
      .fromTo(".pinned_text_inner", { y: 80 }, {
        y: 0,
        ease: "power2.out"
      }, "play_same");

    ScrollTrigger.create({
      animation: pinned_tl_1st,
      trigger: ".about",
      start: "bottom center",
      end: "center center",
      endTrigger: '.pinned',
      scrub: true,
    });
//5. 

    // 4. Pinned Text Gradient/Image Animation
ScrollTrigger.matchMedia({
  // 💻 Desktop animations
  "(min-width: 1025px)": function () {
    const pinned_tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 0.8 },
    });

    // Initialize spans for gradient animation
    document.querySelectorAll(".pinned_text span").forEach((el) => {
      el.style.display = "inline-block";
      el.style.webkitBackgroundClip = "text";
      el.style.webkitTextFillColor = "transparent";
      el.style.background = "linear-gradient(90deg, #ffffff 0%, #ffffff 100%)";
    });

    pinned_tl
      .fromTo(
        ".pinned_2",
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 0.8 },
        "start"
      )
      .fromTo(
        ".pinned_text",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        "start+=0.2"
      )
      .fromTo(
        ".pinned_text_inner",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8 },
        "start+=0.4"
      )
      .fromTo(
        ".pinned_img2",
        { opacity: 0, y: 60, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1.1, 
          duration: 1.2,
          ease: "power2.out" 
        },
        "start+=0.6"
      )
      .to(
        ".pinned_text span",
        {
          background: "linear-gradient(90deg, #6059A5 0%, #C62B9A 100%)",
          duration: 0.8,
          ease: "power2.inOut"
        },
        "start+=0.8"
      )
      .to(
        ".pinned_p span",
        { color: "#ffffffb3", duration: 0.4 },
        "start+=1"
      );

    ScrollTrigger.create({
      animation: pinned_tl,
      trigger: ".pinned",
      start: "top center+=100",
      end: "bottom center",
      scrub: false,
      toggleActions: "play none none reverse",
    });
  },

  // 📱 Mobile / Tablet
  "(max-width: 1024px)": function () {
    const pinned_tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 0.6 },
    });

    // Initialize spans for gradient animation
    document.querySelectorAll(".pinned_text span").forEach((el) => {
      el.style.display = "inline-block";
      el.style.webkitBackgroundClip = "text";
      el.style.webkitTextFillColor = "transparent";
      el.style.background = "linear-gradient(90deg, #ffffff 0%, #ffffff 100%)";
    });

    pinned_tl
      .fromTo(
        ".pinned_2",
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.6 },
        "start"
      )
      .fromTo(
        ".pinned_text",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        "start+=0.2"
      )
      .fromTo(
        ".pinned_text_inner",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6 },
        "start+=0.3"
      )
      .fromTo(
        ".pinned_img2",
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1.1, duration: 1 },
        "start+=0.4"
      )
      .to(
        ".pinned_text span",
        {
          background: "linear-gradient(90deg, #6059A5 0%, #C62B9A 100%)",
          duration: 0.6,
          ease: "power2.inOut"
        },
        "start+=0.6"
      )
      .to(
        ".pinned_p span",
        { color: "#ffffffb3", duration: 0.3 },
        "start+=0.8"
      );

    ScrollTrigger.create({
      animation: pinned_tl,
      trigger: ".pinned",
      start: "top center+=60",
      end: "bottom center",
      scrub: false,
      toggleActions: "play none none reverse",
    });
  },
});


    // 5. Feature Heading Animation
    let feature_tl = gsap.timeline();
    feature_tl
      .fromTo(".feature_heading", { y: '-300', opacity: 0 }, {
        y: 0,
        opacity: 1,
        ease: "power2.out"
      }, "play_same")
      .fromTo(".pinned_img2", { y: 0 }, {
        y: -60,
        duration: 0.7,
        ease: "power2.out"
      }, "play_same");

    ScrollTrigger.create({
      animation: feature_tl,
      trigger: ".feature",
      start: "top bottom",
      end: "top 140",
      scrub: true,
    });

    // 6. Feature Box Animations
    let feature_tl_2 = gsap.timeline();
    feature_tl_2
      .fromTo(".feature_inner_h", { y: -120, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out"
      }, "play_same")
      .fromTo(".feature_inner_1", { y: 0 }, {
        y: -120,
        duration: 0.7,
        ease: "power2.out"
      }, "play_same")
      .fromTo(".feature_box_1", { y: 80, }, {
        y: 0,
        duration: 0.7,
        ease: "power2.out"
      }, "play_same")
      .fromTo(".feature_box_2", { y: 120, }, {
        y: 0,
        duration: 0.7,
        ease: "power2.out"
      }, "play_same")
      .fromTo(".feature_box_3", { y: 160, }, {
        y: 0,
        duration: 0.7,
        ease: "power2.out"
      }, "play_same")
      .fromTo(".feature_box_4", { y: 200, }, {
        y: 0,
        duration: 0.7,
        ease: "power2.out"
      }, "play_same")
      .fromTo(".box_inner", { y: 80, }, {
        y: 0,
        duration: 0.7,
        ease: "power2.out"
      }, "play_same");

    ScrollTrigger.create({
      animation: feature_tl_2,
      trigger: ".feature",
      start: "top top",
      end: "center center",
      endTrigger: '.feature_inner',
      scrub: true,
    });

    // 7. Horizontal Heading Animation
    let horizontal_anim__tl = gsap.timeline();
    horizontal_anim__tl.fromTo(".horizontal_h", { y: -120, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    }, "play_same");

    ScrollTrigger.create({
      animation: horizontal_anim__tl,
      trigger: ".feature",
      start: "bottom center",
      end: "bottom 140",
      scrub: true,
    });

    // 8. Horizontal Scroll
    function getScrollAmount() {
      let factsContainer = document.querySelector('.factsContainer_sm');
      if (factsContainer) {
        let totalWidth = factsContainer.scrollWidth;
        return -(totalWidth - window.innerWidth);
      }
      return 0;
    }

    let scroll_tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.lastpin',
        start: window.innerWidth > 768 ? "top 140" : "top 0",
        pin: true,
        scrub: 1,
        end: () => `+=${getScrollAmount() * -1}`,
        invalidateOnRefresh: true
      }
    });

    scroll_tl.to('.factsContainer_sm', {
      x: () => getScrollAmount(),
      ease: "none"
    });

    // 9. Progress Bar Animation (inside horizontal scroll)
    document.querySelectorAll(".progress_bar").forEach(bar => {
      gsap.fromTo(
        bar,
        {
          width: 'calc(100vh - 10vw)',
          background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.00) 0%, #000 100%), linear-gradient(90deg, #6059A5 0%, #C62B9A 100%)'
        },
        {
          width: 3200, 
          background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.00) 100%, #000 100%), linear-gradient(90deg, #6059A5 0%, #C62B9A 100%)',
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar,
            containerAnimation: scroll_tl,
            start: "left left",
            end: "right right",
            endTrigger: ".box_last",
            scrub: true,
          }
        });
    });

    // 10. Horizontal Box Text Animation (inside horizontal scroll)
    let hori_box_tl = gsap.timeline();
    hori_box_tl
      .to(".hori_box_h_2 span", {
        background: "linear-gradient(90deg, #6059A5 0%, #C62B9A 100%)",
        webkitTextFillColor: 'transparent',
      })
      .to(".hori_box_h_3 span", {
        background: "linear-gradient(90deg, #6059A5 0%, #C62B9A 100%)",
        webkitTextFillColor: 'transparent',
      })
      .to(".hori_box_h_4 span", {
        background: "linear-gradient(90deg, #6059A5 0%, #C62B9A 100%)",
        webkitTextFillColor: 'transparent',
      });

    ScrollTrigger.create({
      animation: hori_box_tl,
      containerAnimation: scroll_tl,
      trigger: ".fact",
      start: "left left",
      end: "right right",
      endTrigger: ".box_last",
      scrub: true,
    });

    // 11. End Text Animation
    let end_text_div_tl = gsap.timeline();
    end_text_div_tl
      .fromTo(".end_text_div_h", { y: -120, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, "play_same");

    ScrollTrigger.create({
      animation: end_text_div_tl,
      trigger: ".end_text_div",
      start: "top bottom",
      end: "center center",
      scrub: true,
    });

    // 12. End Text Pin Animation
    ScrollTrigger.matchMedia({
      "(min-width: 1025px)": function () {
        let end_text_div_fade_tl = gsap.timeline();
        end_text_div_fade_tl.fromTo(".end_text_div_p", {
          opacity: 0,
          scale: 0.8,
        }, {
          opacity: 1,
          duration: 1,
          scale: 1,
          ease: "power2.out"
        }, "play_same");

        ScrollTrigger.create({
          animation: end_text_div_fade_tl,
          trigger: ".end_text_div",
          start: "center center+=120",
          end: "200% center",
          pin: true,
          scrub: true,
        });
      },
      "(max-width: 1024px)": function () {
        let end_text_div_fade_tl = gsap.timeline();
        end_text_div_fade_tl.fromTo(".end_text_div_p", {
          opacity: 0,
          scale: 0.9,
        }, {
          opacity: 1,
          duration: 0.8,
          scale: 1,
          ease: "power2.out"
        }, "play_same");

        ScrollTrigger.create({
          animation: end_text_div_fade_tl,
          trigger: ".end_text_div",
          start: "center center+=40",
          end: "200% center",
          pin: true,
          scrub: true,
        });
      }
    });

    // --- End of GSAP logic ---
    
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, []); // Empty dependency array ensures this runs only once


  return (
    // Main wrapper with the consistent dark background
    <div className="bg-[rgb(10,10,10)] text-white font-sans overflow-x-hidden">
      
      {/* --- Hero Section --- */}
      <section 
        className="hero elementor-section elementor-element-aab9f36 elementor-section-full_width elementor-section-height-min-height elementor-section-items-stretch relative min-h-[100vh]"
        // Inherits dark background
      >
        <div className="elementor-container elementor-column-gap-default max-w-[1140px] mx-auto px-4">
          <div className="relative">
            <section 
              className="hero_pin elementor-section elementor-element-ac1504a elementor-section-height-min-height h-[700.2px] max-h-[700.2px] relative"
            >
              <div 
                className="hero_img elementor-element-4231929 elementor-absolute w-full h-full will-change-transform"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  transform: 'perspective(0.8px) rotate(45deg) scale(1.7, 1.7)',
                  transformOrigin: '382.4px 239.387px',
                  opacity: 1,
                }}
              >
                <Image
                  fetchPriority="high"
                  decoding="async"
                  width={1583}
                  height={991}
                  src="https://afs-foiling.com/wp-content/uploads/2025/06/dock-star-1.png.webp"
                  className="w-full h-full object-contain"
                  alt="AFS - dock-star"
                  sizes="100vw"
                  priority
                />
              </div>
            </section>
            
            <section className="hero_inner elementor-section elementor-element-5eef337 relative z-10 text-center py-12">
              <div className="max-w-2xl mx-auto">
                <h2 className="hero_heading text-5xl md:text-7xl font-bold text-white">
                  DOCK-STAR
                </h2>
                <h2 className="hero_heading_2 text-4xl md:text-6xl font-bold text-white mt-4">
                  Glide &amp; Shine
                </h2>
                <p className="hero_p text-lg md:text-xl text-white mt-6">
                  Forget everything you thought you knew about Dockstart — the star of pontoons is born
                </p>
              </div>
            </section>
            
            <div 
              className="scroll elementor-element-6962427 elementor-absolute z-10 will-change-transform"
              style={{
                position: 'absolute',
                bottom: '5vh',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            >
              <ul className="flex flex-col items-center gap-2 text-[#605AA5]">
                <li className="flex gap-2 items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M6.99998 1.16669V12.25M6.99998 12.25L11.6666 7.75002M6.99998 12.25L2.33331 7.75002" stroke="#605AA5" strokeWidth="1.8"></path>
                  </svg>
                  <span className="text-sm">Scroll to learn more</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- About Section (Stickers) --- */}
<section
  className="about elementor-section elementor-element-4e3599c elementor-section-height-min-height elementor-section-items-stretch relative min-h-screen py-24 px-4 bg-transparent"
>
  <div className="max-w-4xl mx-auto text-white text-sm md:text-lg font-semibold">
    <div className="flex flex-wrap gap-x-4 gap-y-8">
      {/* # FLY AS YOU ARE: A STAR (Top Left) */}
      <div
        className="stickers_1 w-auto will-change-transform bg-purple-600/80 px-2 py-1 rounded"
        style={{ transform: 'translateY(20vh)' }}
      >
        <p># FLY AS YOU ARE: A STAR</p>
      </div>

      {/* # DOCK-STAR IS YOUR STAGE. (Top Right) */}
      <div
        className="stickers_1 w-auto will-change-transform ml-[15vw] bg-pink-600/80 px-2 py-1 rounded"
        style={{ transform: 'translateY(20vh)' }}
      >
        <p># DOCK-STAR IS YOUR STAGE.</p>
      </div>

      {/* # WITH A GLITTER FINISH (Mid-Left) */}
      <div
        className="w-auto absolute top-1/2 left-1/4 -translate-y-1/2 bg-pink-600/80 px-2 py-1 rounded"
      >
        <p># WITH A GLITTER FINISH</p>
      </div>

      {/* # CATCHES EYES AND WAKES (Mid-Right) */}
      <div className="w-auto absolute top-[55%] right-1/4 -translate-y-1/2 bg-purple-600/80 px-2 py-1 rounded">
        <p># CATCHES EYES AND WAKES</p>
      </div>

      {/* # ULTRA-LIGHT (Lower Left) */}
      <div className="sticker w-auto absolute bottom-1/4 left-1/4 bg-purple-600/80 px-2 py-1 rounded">
        <p># ULTRA-LIGHT</p>
      </div>

      {/* # RAZOR-SHARP (Lower Right) */}
      <div className="stickers w-auto absolute bottom-1/4 right-1/4 bg-pink-600/80 px-2 py-1 rounded">
        <p># RAZOR-SHARP</p>
      </div>
    </div>
  </div>
</section>


      {/* --- Pinned Text Section --- */}
<section 
  className="pinned relative min-h-screen py-24 px-6 text-white bg-transparent overflow-hidden"
>
  <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center h-full">
    
    {/* Small intro text */}
    <p 
      className="pinned_2 text-sm md:text-base tracking-wide font-medium text-white/70 will-change-transform"
      style={{ opacity: 0, transform: 'translateY(-80px)' }}
    >
      Be the star of the dock with DOCK-STAR.
    </p>

    {/* Main heading (line breaks adjusted like image) */}
    <h2 className="pinned_text text-4xl md:text-6xl font-bold mt-6 leading-tight max-w-5xl">
      <span className="text-[#a175ff]">Designed to shine</span> — both visually<br className="hidden md:block" />
      and underfoot. But above all,<br className="hidden md:block" />
      <span className="text-[#d46cff]">designed for you.</span>
    </h2>

    {/* Paragraph grid */}
    <div 
      className="pinned_text_inner grid grid-cols-1 md:grid-cols-2 gap-10 mt-12 md:mt-16 text-left text-gray-300 text-base md:text-lg leading-relaxed will-change-transform"
      style={{ transform: 'translateY(60px)' }}
    >
      <p className="pinned_p">
        <span className="text-white font-semibold">It's fun, instinctive, and terribly addictive.</span>{" "}
        An explosive mix of skate culture, beach vibes, and total freedom on the water. 
        With it, your creativity takes the lead.
      </p>
      <p className="pinned_p">
        A board for those who want it all: style, glide, and maximum lightness.{" "}
        <span className="text-white font-semibold">AFS innovation for fun and liberating skiing.</span>
      </p>
    </div>

    {/* Larger Centered Image */}
    <div 
      className="pinned_img2 relative mt-20 w-full max-w-[2000px] mx-auto opacity-0"
    >
      <img
        src="https://afs-foiling.com/wp-content/uploads/2025/06/dock-star-3.png.webp"
        alt="Dock Star Board"
        className="w-full h-auto object-contain scale-125"
      />
    </div>
  </div>
</section>




{/* --- Feature Section --- */}
      <section 
        className="lastpin elementor-section elementor-element-d992302 relative min-h-screen bg-black text-white"
      >
        <div className="max-w-[1140px] mx-auto px-4 py-24">
          <h2 
            className="horizontal_h text-4xl md:text-6xl font-bold mb-16 will-change-transform"
            style={{ opacity: 0, transform: 'translateY(-120px)' }}
          >
            Why are you going to shine with the DOCK-STAR?
          </h2>

          <div 
            // We now use flex-col to stack the title row, divider, and body row vertically.
            // The width remains 400vw to allow all three rows to scroll horizontally together.
            className="factsContainer_sm flex flex-col mt-12 will-change-transform"
            style={{ width: '400vw' }} // 4 slides, mandatory for horizontal scroll pinning
          >
            
            {/* ROW 1: FEATURE HEADERS (Titles and Numbers) */}
            <div className="flex flex-shrink-0 mb-1">
              {/* Header 1 */}
              <div className="w-screen flex-none px-4 lg:px-12">
                <div className="max-w-7xl mx-auto flex items-start">
                  <span className="text-xl font-bold text-purple-400 mr-4 mt-[-2px] whitespace-nowrap">01</span>
                  {/* Updated h3 for 28px size, 600 weight, 28px line height */}
                  <h3 className="text-3xl font-semibold leading-7 text-white tracking-wider">Easier and more effective pumping</h3>
                </div>
              </div>

              {/* Header 2 */}
              <div className="w-screen flex-none px-4 lg:px-12">
                <div className="max-w-7xl mx-auto flex items-start">
                  <span className="text-xl font-bold text-purple-400 mr-4 mt-[-2px] whitespace-nowrap">02</span>
                  {/* Updated h3 for 28px size, 600 weight, 28px line height */}
                  <h3 className="text-3xl font-semibold leading-7 text-white tracking-wider">Precise and reassuring control</h3>
                </div>
              </div>

              {/* Header 3 */}
              <div className="w-screen flex-none px-4 lg:px-12">
                <div className="max-w-7xl mx-auto flex items-start">
                  <span className="text-xl font-bold text-purple-400 mr-4 mt-[-2px] whitespace-nowrap">03</span>
                  {/* Updated h3 for 28px size, 600 weight, 28px line height */}
                  <h3 className="text-3xl font-semibold leading-7 text-white tracking-wider">Unlimited expression</h3>
                </div>
              </div>

              {/* Header 4 */}
              <div className="w-screen flex-none px-4 lg:px-12">
                <div className="max-w-7xl mx-auto flex items-start">
                  <span className="text-xl font-bold text-purple-400 mr-4 mt-[-2px] whitespace-nowrap">04</span>
                  {/* Updated h3 for 28px size, 600 weight, 28px line height */}
                  <h3 className="text-3xl font-semibold leading-7 text-white tracking-wider">Uncompromising style</h3>
                </div>
              </div>
            </div>

            {/* ROW 2: SINGLE CONTINUOUS DIVIDER */}
            {/* w-full here refers to the 400vw width of the parent container */}
            <div className="h-0.5 w-full bg-purple-500/50 flex-shrink-0"></div>

            {/* ROW 3: FEATURE BODIES (Descriptions and Key Takeaways) */}
            <div className="flex pt-4"> 
              {/* Body 1 */}
              <div className="w-screen flex-none px-4 lg:px-12">
                <div className="max-w-7xl mx-auto flex flex-col items-start">
                  {/* Updated p for 20px size, 500 weight, 24px line height */}
                  <p className="text-gray-300 text-xl font-medium leading-6 max-w-xl mb-2"> 
                    Rigid construction + instinctive foot placement = every push propels you even further.
                    You ride longer, with more fluidity and less breathlessness.
                  </p>
                  {/* Updated p for 400 weight and tighter line height (leading-snug) */}
                  <p className="text-2xl md:text-4xl font-normal leading-snug tracking-tighter">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                      Less effort, more fluidity, more time on the water.
                    </span>
                  </p>
                </div>
              </div>

              {/* Body 2 */}
              <div className="w-screen flex-none px-4 lg:px-12">
                <div className="max-w-7xl mx-auto flex flex-col items-start">
                  {/* Updated p for 20px size, 500 weight, 24px line height */}
                  <p className="text-gray-300 text-xl font-medium leading-6 max-w-xl mb-2"> 
                    Lightweight and easy to handle (1.75 kg), it offers a real connection to the foil.
                  </p>
                  {/* Updated p for 400 weight and tighter line height (leading-snug) */}
                  <p className="text-2xl md:text-4xl font-normal leading-snug tracking-tighter">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                      You progress faster, with confidence.
                    </span>
                  </p>
                </div>
              </div>

              {/* Body 3 */}
              <div className="w-screen flex-none px-4 lg:px-12">
                <div className="max-w-7xl mx-auto flex flex-col items-start">
                  {/* Updated p for 20px size, 500 weight, 24px line height */}
                  <p className="text-gray-300 text-xl font-medium leading-6 max-w-xl mb-2"> 
                    Responsive and responsive: it follows your progress and your wildest trick ideas.
                  </p>
                  {/* Updated p for 400 weight and tighter line height (leading-snug) */}
                  <p className="text-2xl md:text-4xl font-normal leading-snug tracking-tighter">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                      Tricks, long sessions, or tight lines — she's ready.
                    </span>
                  </p>
                </div>
              </div>

              {/* Body 4 */}
              <div className="w-screen flex-none px-4 lg:px-12">
                <div className="max-w-7xl mx-auto flex flex-col items-start">
                  {/* Updated p for 20px size, 500 weight, 24px line height */}
                  <p className="text-gray-300 text-xl font-medium leading-6 max-w-xl mb-2"> 
                    A board that stands out and makes you unforgettable on the water.
                  </p>
                  {/* Updated p for 400 weight and tighter line height (leading-snug) */}
                  <p className="text-2xl md:text-4xl font-normal leading-snug tracking-tighter">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                      Unique on the water, high-performance underfoot.
                    </span>
                  </p>
                </div>
              </div>
            </div>

          </div>
          
          <div 
            className="progress_bar absolute bottom-12 left-0 h-1"
            style={{ 
              width: 'calc(100vh - 10vw)',
              background: 'linear-gradient(90deg, rgba(0, 0, 0, 0) 92.9441%, rgb(0, 0, 0) 100%), linear-gradient(90deg, rgb(96, 89, 165) 0%, rgb(198, 43, 154) 100%)',
            }}
          ></div>
        </div>
      </section>

      {/* --- Horizontal Scroll Section --- */}
      <section 
        className="lastpin elementor-section elementor-element-d992302 relative min-h-screen bg-black text-white"
      >
        <div className="max-w-[1140px] mx-auto px-4 py-24">
          <h2 
            className="horizontal_h text-4xl md:text-6xl font-bold mb-16 will-change-transform"
            style={{ opacity: 0, transform: 'translateY(-120px)' }}
          >
            Why are you going to shine with the DOCK-STAR?
          </h2>

          <div 
            // We now use flex-col to stack the title row, divider, and body row vertically.
            // The width remains 400vw to allow all three rows to scroll horizontally together.
            className="factsContainer_sm flex flex-col mt-12 will-change-transform"
            style={{ width: '400vw' }} // 4 slides, mandatory for horizontal scroll pinning
          >
            
            {/* ROW 1: FEATURE HEADERS (Titles and Numbers) */}
            <div className="flex flex-shrink-0 mb-1">
              {/* Header 1 */}
              <div className="w-screen flex-none px-4 lg:px-12">
                <div className="max-w-7xl mx-auto flex items-start">
                  <span className="text-xl font-bold text-purple-400 mr-4 mt-[-2px] whitespace-nowrap">01</span>
                  <h3 className="text-xl font-bold text-white tracking-wider">Easier and more effective pumping</h3>
                </div>
              </div>

              {/* Header 2 */}
              <div className="w-screen flex-none px-4 lg:px-12">
                <div className="max-w-7xl mx-auto flex items-start">
                  <span className="text-xl font-bold text-purple-400 mr-4 mt-[-2px] whitespace-nowrap">02</span>
                  <h3 className="text-xl font-bold text-white tracking-wider">Precise and reassuring control</h3>
                </div>
              </div>

              {/* Header 3 */}
              <div className="w-screen flex-none px-4 lg:px-12">
                <div className="max-w-7xl mx-auto flex items-start">
                  <span className="text-xl font-bold text-purple-400 mr-4 mt-[-2px] whitespace-nowrap">03</span>
                  <h3 className="text-xl font-bold text-white tracking-wider">Unlimited expression</h3>
                </div>
              </div>

              {/* Header 4 */}
              <div className="w-screen flex-none px-4 lg:px-12">
                <div className="max-w-7xl mx-auto flex items-start">
                  <span className="text-xl font-bold text-purple-400 mr-4 mt-[-2px] whitespace-nowrap">04</span>
                  <h3 className="text-xl font-bold text-white tracking-wider">Uncompromising style</h3>
                </div>
              </div>
            </div>

            {/* ROW 2: SINGLE CONTINUOUS DIVIDER */}
            {/* w-full here refers to the 400vw width of the parent container */}
            <div className="h-0.5 w-full bg-purple-500/50 flex-shrink-0"></div>

            {/* ROW 3: FEATURE BODIES (Descriptions and Key Takeaways) */}
            <div className="flex pt-6">
              {/* Body 1 */}
              <div className="w-screen flex-none px-4 lg:px-12">
                <div className="max-w-7xl mx-auto flex flex-col items-start">
                  <p className="text-gray-300 text-base max-w-xl mb-4">
                    Rigid construction + instinctive foot placement = every push propels you even further.
                    You ride longer, with more fluidity and less breathlessness.
                  </p>
                  <p className="text-2xl md:text-4xl font-extrabold leading-tight tracking-tighter">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                      Less effort, more fluidity, more time on the water.
                    </span>
                  </p>
                </div>
              </div>

              {/* Body 2 */}
              <div className="w-screen flex-none px-4 lg:px-12">
                <div className="max-w-7xl mx-auto flex flex-col items-start">
                  <p className="text-gray-300 text-base max-w-xl mb-4">
                    Lightweight and easy to handle (1.75 kg), it offers a real connection to the foil.
                  </p>
                  <p className="text-2xl md:text-4xl font-extrabold leading-tight tracking-tighter">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                      You progress faster, with confidence.
                    </span>
                  </p>
                </div>
              </div>

              {/* Body 3 */}
              <div className="w-screen flex-none px-4 lg:px-12">
                <div className="max-w-7xl mx-auto flex flex-col items-start">
                  <p className="text-gray-300 text-base max-w-xl mb-4">
                    Responsive and responsive: it follows your progress and your wildest trick ideas.
                  </p>
                  <p className="text-2xl md:text-4xl font-extrabold leading-tight tracking-tighter">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                      Tricks, long sessions, or tight lines — she's ready.
                    </span>
                  </p>
                </div>
              </div>

              {/* Body 4 */}
              <div className="w-screen flex-none px-4 lg:px-12">
                <div className="max-w-7xl mx-auto flex flex-col items-start">
                  <p className="text-gray-300 text-base max-w-xl mb-4">
                    A board that stands out and makes you unforgettable on the water.
                  </p>
                  <p className="text-2xl md:text-4xl font-extrabold leading-tight tracking-tighter">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                      Unique on the water, high-performance underfoot.
                    </span>
                  </p>
                </div>
              </div>
            </div>

          </div>
          
          <div 
            className="progress_bar absolute bottom-12 left-0 h-1"
            style={{ 
              width: 'calc(100vh - 10vw)',
              background: 'linear-gradient(90deg, rgba(0, 0, 0, 0) 92.9441%, rgb(0, 0, 0) 100%), linear-gradient(90deg, rgb(96, 89, 165) 0%, rgb(198, 43, 154) 100%)',
            }}
          ></div>
        </div>
      </section>

      {/* --- End Text Pin Section --- */}

    </div>
  );
}