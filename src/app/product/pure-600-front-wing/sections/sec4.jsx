import React, { useEffect, useRef } from 'react';

// IMPORTANT: In a real Next.js environment, you would install and import
// these libraries: import { gsap } from 'gsap'; import { ScrollTrigger } from 'gsap/ScrollTrigger';
// For this single-file demo, we assume 'gsap' and 'ScrollTrigger' are loaded globally
// (e.g., via <script> tags in index.html) and register the plugin.
// If they are not available globally, the animation will not run, and an error will be logged.

// Component for a single step in the development process
const ProcessStep = ({ title, description, imgUrl, alt }) => {
    // State to handle image loading failure and switch to a placeholder
    const [imageError, setImageError] = React.useState(false);

    // Fallback placeholder setup
    const fallbackUrl = "https://placehold.co/400x400/171717/ffffff?text=Image%20Placeholder";
    const imageSource = imageError ? fallbackUrl : imgUrl;

    return (
        <div className="flex flex-col space-y-4">
            {/* Image Container: Using aspect-square to force a square ratio like the original */}
            <div className="aspect-square w-full bg-neutral-900 flex items-center justify-center overflow-hidden rounded-lg">
                <img
                    // Using the provided URLs with error handling
                    src={imageSource}
                    alt={alt}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${imageError ? 'opacity-50' : 'opacity-100'}`}
                    onError={() => {
                        console.error(`Failed to load image: ${imgUrl}`);
                        setImageError(true);
                    }}
                />
            </div>

            {/* Text Block: Small font size and tight leading to mimic the original caption style */}
            <p className="text-white text-xs font-light leading-relaxed max-w-sm">
                {/* Title is bold and uppercase */}
                <span className="font-extrabold uppercase">{title} </span>
                {description}
            </p>
        </div>
    );
};

// Main Application Component
const App = () => {
    // Refs to hold references to the DOM elements we want to animate
    const stepsRef = useRef([]);

    // Data for the three columns
    const processSteps = [
        {
            title: "A.M.A.T.S Advanced -",
            description: "our innovation lab, we believe true performance happens when technical innovation meets real-world testing. Our engineers design, test, refine, always fail, and improve. We keep pushing the boundaries of design and performance.",
            imgUrl: "https://afs-foiling.com/wp-content/uploads/2025/09/Rectangle-8-1.png",
            alt: "Close-up of a worker operating machinery, representing the manufacturing process.",
        },
        {
            title: "The PURE 800",
            description: "is that dialogue brought to life. Built over nearly a year of work with Axel Gaert, a young wingfoil prodigy and GWA Vice World Champion, this foil is a genuine performance accelerator—a concentrated dose of speed, control, and freedom.",
            imgUrl: "https://afs-foiling.com/wp-content/uploads/2025/09/Rectangle-9.png",
            alt: "A glossy, reflective, dark red abstract detail shot, symbolizing high performance.",
        },
        {
            title: "What we're offering you today",
            description: "What we’re offering you today is Axel’s World Cup setup. Not a replica. Not a toned-down version. The real deal. The exact foil he rides in competition. The one that took him to the next level.",
            imgUrl: "https://afs-foiling.com/wp-content/uploads/2025/09/Rectangle-10.png",
            alt: "An athlete performing a jump on a hydrofoil board against a forested background.",
        }
    ];

    // GSAP ScrollTrigger Animation Setup
    useEffect(() => {
        // Access global GSAP/ScrollTrigger variables
        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;

        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn("GSAP or ScrollTrigger not found. Animation skipped.");
            return;
        }

        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        stepsRef.current.forEach((step, i) => {
            if (step) {
                // Determine the vertical movement based on the element's index.
                // Elements that are staggered lower (i=1, 2) should move less to keep the staggered look.
                const movementDistance = 100 - (i * 30); // e.g., 100px for index 0, 70px for index 1, 40px for index 2

                gsap.fromTo(step, {
                    // Start position: Move elements slightly down initially
                    y: movementDistance, 
                }, {
                    // End position: Move them up to their original position as user scrolls
                    y: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: step,
                        start: "top bottom", // Start when element enters viewport from bottom
                        end: "top center", // End when element reaches center of viewport
                        scrub: 1.5, // Link animation smoothly to scroll position
                        // markers: true, // Uncomment for debugging scroll position
                    }
                });
            }
        });

        // Cleanup ScrollTrigger instances on component unmount
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []); // Empty dependency array runs once on mount

    return (
        // Main container with black background and Inter font (Tailwind default)
        // Added overflow-hidden to prevent scroll effects from causing horizontal scroll
        <div className="min-h-screen bg-black flex justify-center py-20 px-6 sm:px-12 md:px-20 overflow-hidden">
            <div className="max-w-screen-xl w-full">
                {/* Header Section: Large, bold, uppercase text with line break */}
                <h1 className="text-white text-4xl sm:text-6xl md:text-7xl font-extrabold mb-16 sm:mb-24 uppercase tracking-tighter leading-none">
                    DEVELOPMENT
                    <br />
                    PROCESS
                </h1>

                {/* Content Grid: 1 column on mobile, 3 columns on larger screens */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
                    {processSteps.map((step, index) => (
                        <div 
                            key={index} 
                            // Store a reference to this div
                            ref={el => (stepsRef.current[index] = el)}
                            // Apply staggered margins for non-mobile views to create the initial offset
                            className={`
                                ${index === 1 ? 'md:mt-16' : ''}
                                ${index === 2 ? 'md:mt-32' : ''}
                            `}
                        >
                            <ProcessStep {...step} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;