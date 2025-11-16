import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';


export default function HeroPage() {
  // --- Refs for GSAP ---
  // We create refs to give GSAP direct access to the DOM elements
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const headlineRef = useRef(null);
  const paragraphRef = useRef(null);
  const chatBubbleRef = useRef(null);
  const containerRef = useRef(null);

  // --- GSAP Animation ---
  // This useEffect hook runs once when the component mounts
  useEffect(() => {
    // Ensure GSAP is loaded
    if (gsap) {
      // Set initial states (before animation)
      // We set opacity to 0 so they are invisible until the animation starts
      gsap.set([
        headlineRef.current,
        paragraphRef.current,
        leftImageRef.current,
        rightImageRef.current,
        chatBubbleRef.current,
      ], { opacity: 0 });

      gsap.set(headlineRef.current, { y: 50 });
      gsap.set(paragraphRef.current, { y: 30 });
      gsap.set(leftImageRef.current, { x: -100 });
      gsap.set(rightImageRef.current, { x: 100 });

      // Create the animation timeline
      const tl = gsap.timeline({ defaults: { duration: 1.2, ease: 'power3.out' } });

      // Add animations to the timeline
      tl.to(leftImageRef.current, {
        opacity: 1,
        x: 0,
      })
      .to(rightImageRef.current, {
        opacity: 1,
        x: 0,
      }, "<") // "<" starts this animation at the same time as the previous one
      .to(headlineRef.current, {
        opacity: 1,
        y: 0,
      }, "-=0.8") // "-=0.8" starts this 0.8s before the previous animation ends
      .to(paragraphRef.current, {
        opacity: 1,
        y: 0,
      }, "-=0.9") // Stagger the text animation slightly
      .to(chatBubbleRef.current, {
        opacity: 1,
        duration: 0.5
      }, "-=0.5");
    }
  }, []); // Empty dependency array means this runs only once on mount

  return (
    <>
      <Head>
        <title>The Best Design to Win</title>
        <meta name="description" content="AFS Pure foils for demanding riders" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main container: 
        - min-h-screen: Ensures it's at least the full viewport height
        - bg-black: Sets the black background
        - text-white: Sets default text color to white
        - overflow-hidden: Prevents horizontal scrollbars from the images
      */}
      <main
        ref={containerRef}
        className="relative flex items-center justify-center min-h-screen bg-black text-white overflow-hidden font-sans"
      >
        {/* --- Left Image ---
            - absolute: Positions it relative to the 'main' container
            - z-0: Places it in the background, behind the text
            - top-1/2 -translate-y-1/2: Vertically centers it
            - left-0 -translate-x-1/3: Positions it on the left and moves it 1/3 of its width off-screen
            - w-[60vw] md:w-[40vw]: Sets a responsive width based on the viewport
            - max-w-lg: Prevents it from getting too large
        */}
        <div
          ref={leftImageRef}
          className="absolute z-0 top-1/2 -translate-y-1/2 left-0 w-[60vw] md:w-[40vw] max-w-md lg:max-w-lg -translate-x-1/3"
        >
          <img
            src="https://afs-foiling.com/wp-content/uploads/2024/03/Pure700_UHM95_0001.png"
            alt="AFS Pure 700 Foil"
            className="w-full h-auto"
          />
        </div>

        {/* --- Right Image ---
            - Same logic as the left image, but mirrored to the right side
        */}
        <div
          ref={rightImageRef}
          className="absolute z-0 top-1/2 -translate-y-1/2 right-0 w-[60vw] md:w-[40vw] max-w-md lg:max-w-lg translate-x-1/3"
        >
          <img
            src="https://afs-foiling.com/wp-content/uploads/2024/03/Pure900_UHM95_0001.png"
            alt="AFS Pure 900 Foil"
            className="w-full h-auto"
          />
        </div>

        {/* --- Text Content ---
            - relative: Ensures it stacks on top of the z-0 images
            - z-10: Explicitly sets its stack order above the images
            - max-w-lg: Constrains the width of the text for readability
            - text-center: Aligns text to the center
        */}
        <div className="relative z-10 flex flex-col items-center max-w-lg px-6 text-center">
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
          >
            The best design to win
          </h1>
          <p
            ref={paragraphRef}
            className="text-base md:text-lg text-gray-300 max-w-md"
          >
            AFS Pure foils are designed for demanding riders looking for high
            performance. Whether you're involved in the competition circuit or
            just want to shoot the breeze with friends, perfect your freestyle
            manoeuvres or carve out some nice curves on the waves and connect
            multiple rides, then the Pures are for you.
          </p>
        </div>



      </main>
    </>
  );
}
