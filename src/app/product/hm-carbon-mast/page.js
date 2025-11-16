
"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Header from "./header";

// NOTE: I'm including the full component definitions below for completeness,
// but the key change is in the Home and AFSOptimizedShapeSection components.

const Home = () => {
    return (
        <div className="bg-black w-full">
            <Header />
            {/* Added mb-32 for vertical spacing */}
            <div className="mb-32">
                <AFSHero />
            </div>
            {/* Added mb-32 for vertical spacing */}
            <div className="mb-32">
                <AFSSizeSection />
            </div>

            <AFSOptimizedShapeSection />
            <div className="mt-32">
                <SimpleTextSection />
            </div>
            <div className="mt-32">
                <AFSCarbonConstructionSection />
            </div>
            <div className="mt-32">
                <AFSFuseLinkSection />
            </div>

        </div>
    );
};


export default Home;
const AFSHero = () => {
    return (
        <section className="relative flex items-center justify-center h-screen bg-black overflow-hidden">
            {/* Background Images (stacked) */}
            <img
                src="https://afs-foiling.com/wp-content/uploads/2023/11/HM80-1.png"
                alt="AFS HM 80"
                className="absolute top-1/2 left-1/2 w-[90%] max-w-7xl transform -translate-x-[55%] -translate-y-1/2 opacity-80 object-contain"
            />
            <img
                src="https://afs-foiling.com/wp-content/uploads/2023/11/HM85-1-1-1.png"
                alt="AFS HM 85"
                className="absolute top-1/2 left-1/2 w-[90%] max-w-7xl transform -translate-x-[45%] -translate-y-1/2 opacity-90 object-contain"
            />

            {/* Subtle Dark Overlay */}

            <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
                    Glide, cruising comfort and control
                </h1>
                <p className="text-base sm:text-lg md:text-xl font-light max-w-2xl leading-relaxed">
                    The AFS HM range has been specially designed to provide the ideal
                    combination of glide, rigidity and versatility. They will enable you
                    to practice all disciplines.
                </p>
            </div>

        </section>
    );
};


const AFSSizeSection = () => {
    return (
        <section className="relative bg-black text-white overflow-hidden pt-24 pb-96">
            {/* Content Layer */}
            <div className="relative z-20 container mx-auto px-6 max-w-6xl">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
                        Which size to choose?
                    </h2>
                </motion.div>

                {/* Two-Column Text */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-200 text-base md:text-lg leading-relaxed">
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="space-y-4"
                    >
                        <p>The 85cm length provides great versatility and tolerance in use.</p>
                        <p>
                            No need for a lot of bottom, easy curves without getting
                            overwhelmed, absolute rigidity and pumping is very effective. It’s
                            the ideal weapon if you spend more than 60% of your time on wing
                            foil and the rest on sup foil, surf foil,...
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="space-y-4"
                    >
                        <p>
                            Its 80 cm length makes it a mast between the surf and wing
                            programs.
                        </p>
                        <p>It’s perfect if you’re on a 50/50 ratio.</p>
                    </motion.div>
                </div>
            </div>

            {/* Image Stack (unchanged) */}
            <div className="absolute bottom-0 left-0 w-full flex justify-center items-end z-10 overflow-hidden">
                <img
                    src="https://afs-foiling.com/wp-content/uploads/2023/11/HM85-1-2-1-e1701789412660.png"
                    alt="AFS HM 85"
                    className="w-full h-auto relative z-0 translate-y-2 object-contain"
                />
                <img
                    src="https://afs-foiling.com/wp-content/uploads/2023/11/HM80-2-e1701792756267.png"
                    alt="AFS HM 80"
                    className="w-full h-auto absolute bottom-0 left-1/2 transform translate-y-40 -translate-x-[40%] z-10 object-contain"
                />
            </div>
        </section>
    );
};



const AFSOptimizedShapeSection = () => {
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Calculate image transforms based on scroll position
    const image1TranslateY = scrollY * 0.15; // Moves slower upwards
    const image2TranslateY = scrollY * 0.25; // Moves faster upwards
    const image1TranslateX = scrollY * 0.05; // Subtle horizontal movement
    const image2TranslateX = scrollY * -0.05; // Subtle horizontal movement in opposite direction

    // --- NEW STATIC VERTICAL OFFSET CONSTANTS ---
    const image1StaticY = -150; // Move left image 150px up (relative to tvhop-0)
    const image2StaticY = 400;  // Move right image 150px down (relative to bottom-0)

    return (
        <section className="relative not-first:bg-black text-white py-24 flex items-center h-[160vh] w-full justify-center overflow-hidden">

            {/* Dark Overlay for readability (Added bg-black/60 and z-10) */}
            <div className="absolute inset-0"></div>

            {/* Background Images with Scroll-Based Transforms */}

            {/* LEFT IMAGE: Appears HIGHER. z-20 ensures it's layered on top of the right image. */}
            <img
                src="https://afs-foiling.com/wp-content/uploads/2023/11/mast_HM80.png"
                alt="Optimized Shape Top"
                // Added z-20 for layering control, as requested in previous step
                className="absolute inset-0 w-full h-full object-cover z-0 -translate-x-40"
                style={{
                    // Combine static offset with scroll-based parallax:
                    transform: `translateY(${image1StaticY + image1TranslateY}px) translateX(${image1TranslateX}px)`,
                }}
            />

            {/* RIGHT IMAGE: Appears LOWER. z-0 ensures it's layered below the left image. */}
            <img
                src="https://afs-foiling.com/wp-content/uploads/2023/11/HM80-3-e1701794569892.png"
                alt="Optimized Shape Bottom"
                className="absolute inset-0 w-full h-full object-cover z-20 translate-x-40"
                style={{
                    // Combine static offset with scroll-based parallax:
                    // Note: image2TranslateY is negative for parallax, so we subtract it from the static offset
                    transform: `translateY(${image2StaticY - image2TranslateY}px) translateX(${image2TranslateX}px)`,
                }}
            />

            {/* Text Content (z-30 ensures it's on top of everything) */}
            <div className="relative z-30 text-center w-full px-0">
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
                    Optimized shape
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
                    The mat is designed in two distinct zones:
                </p>
                <div className="space-y-6 text-base md:text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto text-left">
                    <p>
                        The lower part, immersed for navigation with a rope and a thickness
                        providing manoeuvrability and glide.
                    </p>
                    <p>
                        The upper part, with a rope and a thickness evolving
                        towards the plate to ensure a rigid connection with the
                        board. In comparison, an aluminum mat will need to be
                        thicker, resulting in a heavier mat with less glide.
                    </p>
                </div>
            </div>
        </section>
    );
};


function SimpleTextSection() {
    return (
        <section className="relative z-30 w-full flex justify-center py-24">
            <div className="max-w-xl text-center text-white">
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
                    Lightweight and maintenance free
                </h2>

                <div className="space-y-6 text-base md:text-lg text-gray-200 leading-relaxed">
                    <p>
                        The full carbon HM construction makes the foil both stiff and light.
                        In the same way, you will not be bothered with marine aggressions
                        such as corrosion that could weaken it.
                    </p>
                </div>
            </div>
        </section>
    );
}

const AFSCarbonConstructionSection = () => {
    // Placeholder URL for the carbon fiber background image.
    // Replace this with your actual image URL when ready.
    const backgroundImage = 'https://afs-foiling.com/wp-content/uploads/2023/11/17820231_SL-092619-23740-39-1-2.png';

    return (
        <section className="relative text-white py-24 min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image - Carbon Fiber Texture */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-70" // opacity-70 for a slightly muted effect
                style={{ backgroundImage: `url(${backgroundImage})` }}
            ></div>

            {/* Dark Overlay for text readability (optional, adjust opacity as needed) */}

            {/* Main Content Area */}
            <div className="relative z-20 flex flex-col items-center justify-center w-full h-full px-6 max-w-7xl mx-auto py-20">
                {/* Centered Heading and Subheading */}
                <div className="max-w-2xl text-center text-white">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
                        High Modulus Carbon Construction
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                        Our AFS HM masts are manufactured to the highest quality
                        standards.
                    </p>
                </div>

                {/* Bottom-Right Justified Paragraph */}
                <div className="w-full flex justify-end mt-auto pt-20"> {/* mt-auto pushes it to bottom, pt-20 for spacing from above content */}
                    <p className="text-base md:text-lg text-gray-200 leading-relaxed max-w-md text-right">
                        The term &quot;HM&quot; stands for High Modulus, designating a type of
                        carbon with a higher Young&apos;s modulus than standard carbon.
                        In other words, it has a greater capacity to maintain its shape
                        under stress. HM carbon fiber is up to 1.5 times stiffer than
                        standard carbon. These properties enable us to use fewer
                        fibers to achieve superior stiffness.
                    </p>
                </div>
            </div>
        </section>
    );
};




const AFSFuseLinkSection = () => {
    const sectionRef = useRef(null); // Ref to the section to measure its position
    const [scaleFactor, setScaleFactor] = useState(1);
    const [scrollY, setScrollY] = useState(0);

    // Placeholder URL for the background image.
    // Replace this with your actual image URL when ready.
    const backgroundImage = 'https://afs-foiling.com/wp-content/uploads/2023/11/Fuselink_1000_4-1.png';

    // Handler for scroll event
    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (sectionRef.current) {
            const sectionTop = sectionRef.current.offsetTop;
            const sectionHeight = sectionRef.current.offsetHeight;
            const windowHeight = window.innerHeight;

            // Calculate the scroll progress for this section
            // 0 when section starts appearing, 1 when it's fully scrolled past
            const scrollProgress = (scrollY - (sectionTop - windowHeight)) / (sectionHeight + windowHeight);

            // We want the image to scale down as it scrolls off, and scale up as it comes on.
            // Let's define a minScale and maxScale
            const minScale = 0.8; // Minimum scale when fully scrolled off
            const maxScale = 1.0; // Maximum scale when fully in view

            // Scale factor interpolation
            // Clamp progress between 0 and 1
            const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

            // Scale from maxScale to minScale as progress goes from 0 to 1
            const currentScale = maxScale - (clampedProgress * (maxScale - minScale));

            setScaleFactor(currentScale);
        }
    }, [scrollY]); // Recalculate scaleFactor when scrollY changes

    return (
        <section
            ref={sectionRef} // Attach the ref here
            className="relative bg-black text-white py-24 min-h-screen flex items-center overflow-hidden"
        >
            {/* Background Image with Dynamic Scale */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    transform: `scale(${scaleFactor})`,
                    transition: 'transform 0.1s linear', // Smooth out scale changes slightly
                }}
            ></div>


            {/* Main Content Area */}
            {/* Main Content Area */}
            <div
                // CHANGED: Removed max-w-7xl mx-auto to allow content to hug the left edge.
                // Added absolute inset-0 and changed to flex-col to control vertical alignment more precisely.
                className="absolute inset-0 z-20 flex flex-col justify-end w-full px-6 pl-20 md:px-12 h-full pb-20"
            >
                {/* Left-aligned Heading and Paragraph */}
                {/* CHANGED: Removed max-w-xl and added mr-auto to ensure the block stays left. */}
                <div className="text-left mr-auto">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
                        Fuse Link Connection
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
                        This system is based on a conical assembly for
                        connecting the mast around the fuselage, thus
                        preserving the latter&apos;s inertia. We also refined the
                        fuselage to maximize its performance, ensuring
                        exceptional rigidity and optimum flow.
                    </p>
                    <Link href="/product/fuselink-fuselage" className="text-red-500 hover:text-red-400 font-bold uppercase text-sm tracking-wide">
                        Read More <span className="ml-1 text-base">➔</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

