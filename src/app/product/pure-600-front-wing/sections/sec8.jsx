// components/ImageSequenceSection.jsx
"use client";

import { useRef, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger plugin once
gsap.registerPlugin(ScrollTrigger);

const bgImageUrl = 'https://afs-foiling.com/wp-content/uploads/2025/09/Rectangle-13.png';
const imageSequence = [
  'https://afs-foiling.com/wp-content/uploads/2025/09/Rectangle-12.png', // First
  'https://afs-foiling.com/wp-content/uploads/2025/09/Rectangle-13-2.png', // Second
  'https://afs-foiling.com/wp-content/uploads/2025/09/Rectangle-14-1.png', // Last
];

const ImageSequenceSection = () => {
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Create a ScrollTrigger instance
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      // Pin for a duration, adjusted to be shorter for the new image size.
      // E.g., 3 times the viewport height, or a fixed pixel value if preferred.
      end: `+=${window.innerHeight * 2.5}`, // Shorter pin duration
      pin: true,
      // markers: true, // Uncomment for debugging
      onUpdate: (self) => {
        const progress = self.progress; 
        const totalImages = imageSequence.length;
        // We have `totalImages - 1` transitions to make.
        // Each transition takes up `1 / (totalImages - 1)` of the progress.
        const segmentSize = 1 / (totalImages - 1); 

        // Determine the current image index based on progress
        let newIndex = Math.min(
          Math.floor(progress / segmentSize),
          totalImages - 1 // Ensure it doesn't go out of bounds
        );

        if (newIndex !== currentImageIndex) {
            setCurrentImageIndex(newIndex);
        }
      },
    });

    // --- Optional: Fade in the main content when the pin starts ---
    // This targets the whole content-container to fade it in
    gsap.fromTo(section.querySelector('.content-container'), 
      { opacity: 0 }, 
      { 
        opacity: 1, 
        duration: 0.8, // Slower fade for a smoother intro
        ease: 'power1.out',
        scrollTrigger: { 
          trigger: section, 
          start: 'top top+=100', // Start fading in a bit after pin starts
          end: 'top top', 
          scrub: true 
        }
      }
    );

    return () => {
      trigger.kill();
    };
  }, [currentImageIndex]);

  return (
    // Set a minimum height greater than the pin duration to avoid scroll issues
    // Adjusted to reflect the shorter pin duration
    <div className="relative w-full min-h-[350vh]"> 
      <div 
        ref={sectionRef} 
        className="w-full h-screen relative overflow-hidden flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="content-container absolute inset-0 flex flex-col items-center justify-center p-4">
          
          {/* Fading Overlay for Readability */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

          {/* Text Content */}
          <h2 className="text-white text-4xl sm:text-5xl font-bold mb-8 relative z-10 text-center">
            Who's it for?
          </h2>

          {/* Image and Text Box Container */}
          <div className="flex flex-col md:flex-row items-center justify-center relative z-10">
            
            {/* Image Stack - Adjusted height here */}
            <div className="w-[250px] h-[350px] relative mx-auto md:mr-10"> {/* Shorter height and width */}
              {imageSequence.map((src, index) => (
                <div
                  key={index}
                  // Hide/Show based on the state, transition-opacity is already here
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    currentImageIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  ref={el => (imageRefs.current[index] = el)}
                >
                  <Image 
                    src={src} 
                    alt={`Scroll sequence image ${index + 1}`} 
                    fill 
                    style={{ objectFit: 'cover' }}
                    className="shadow-2xl shadow-black/70 rounded-lg" // Added rounded corners
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>

            {/* Accompanying Text - Removed background */}
            <div className="mt-8 md:mt-0 max-w-xs p-4 text-white"> {/* Removed bg-black/50 and rounded */}
              <p className="text-base text-center md:text-left">
                Riders on the **PURE 700** looking for a **sharper, more radical ride** to unlock the **next level**.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSequenceSection;