'use client';

import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Header from './sections/header';

const MotionImage = motion(Image);

export default function ZoomScrollSection() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Smooth zoom from bottom
  const zoom = useTransform(heroScrollProgress, [0, 0.5], [1, 1.3]);
  const translateY = useTransform(heroScrollProgress, [0, 0.5], [0, 120]);

  return (
    <div className="flex flex-col min-w-[100vw] space-y-20">
      <Header />
      {/* HERO / ZOOM SECTION */}
      <section ref={heroRef} className="relative w-screen h-[160vh] overflow-hidden text-white">
        {/* Background */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: "url('/images/fly/i1.png')",
            scale: zoom,
            y: translateY,
            transformOrigin: 'center bottom',
          }}
        />

        {/* Center heading */}
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center leading-tight">
            AFS Fly – Performance,
            <br />
            Accessibility and Reliability
          </h1>
        </div>

        {/* Bottom info columns */}
        <div className="absolute bottom-16 left-0 w-full flex flex-col md:flex-row justify-between z-20 text-white px-10 md:px-24 space-y-8 md:space-y-0">
          <div className="flex-1 max-w-sm">
            <h2 className="text-2xl font-bold mb-3">Immersive board design</h2>
            <p className="text-sm leading-relaxed">
              The distribution of volumes is optimized and balanced, resulting
              in a board with the best ratio of performance, accessibility, and
              reliability.
            </p>
          </div>

          <div className="flex-1 max-w-sm">
            <p className="text-sm leading-relaxed">
              Its nose bulb provides forgiveness during start-up phases, but
              also for landing jumps.
            </p>
          </div>

          <div className="flex-1 max-w-sm">
            <p className="text-sm leading-relaxed">
              A clever blend of generous volume for forgiveness and reduced
              volume in the contact zones for maximum feel and precision.
            </p>
          </div>
        </div>

      </section>

      {/* FEATURE SCROLL SECTION */}
      <FeatureScrollSection />

      <EfficientPumpingSection />

      <BelowBluredSection />

      <TextureSection />

      <ConcaveDeckSection />

      <TailShapeSection />

      <BoardSpecsSection />
    </div>
  );
}

function EfficientPumpingSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Fade in at ~15% scroll, stay visible, fade out near 85%
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  // Optional: subtle movement
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={ref}
      className="relative w-screen h-[70vh] flex flex-col justify-center items-center overflow-hidden bg-white text-black"
    >
      <motion.div
        style={{ opacity, y }}
        className="max-w-3xl text-center px-6"
      >
        <h2 className="text-4xl md:text-5xl font-semibold mb-6">
          Efficient pumping
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          The rigidity of the construction combined with perfect volume distribution ensures
          excellent pumping efficiency for endless wave connections.
        </p>
      </motion.div>
    </section>
  );
}

/* ---------------- Feature Scroll Section ----------------*/

const BLOCKS_CONFIG = [
  {
    title: 'Easy ride',
    text: 'Its generous volume and length make it easy to row and catch waves. Its smooth outline ensures tolerance when manoeuvring.',
    align: 'left',
    offset: -50,
    fadeStart: 0,
    fadeEnd: 0.15,
  },
  {
    title: 'Multi-positioning straps',
    text: 'Multi-positioning straps inserts for set-up wing 3x straps or surf 2x straps (goofy or regular).',
    align: 'right',
    offset: 0,
    fadeStart: 0.35,
    fadeEnd: 0.5,
  },
  {
    title: 'Smooth shape',
    text: 'The hull is optimized thanks to a double concave on the bow, flattened out at the stern, which is the most efficient way to glide on these boards.',
    align: 'left',
    offset: 50,
    fadeStart: 0.7,
    fadeEnd: 0.85,
  },
];

function Block({
  title,
  text,
  align = 'left',
  offset = 0,
  fadeStart = 0,
  fadeEnd = 0.15,
  scrollYProgress,
}) {
  // Each block gets a slightly offset parallax motion
  const y = useTransform(scrollYProgress, [0, 1], [-90 + offset, 80 + offset]);
  const opacity = useTransform(scrollYProgress, [fadeStart, fadeEnd], [0, 1]);

  return (
    <motion.div
      style={{ y, opacity }}
      className={`flex w-full ${align === 'right' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`space-y-4 max-w-md ${align === 'right' ? 'text-right' : 'text-left'}`}>
        <h2 className="text-4xl md:text-5xl font-bold">{title}</h2>
        <p className="text-sm md:text-base leading-relaxed">{text}</p>
      </div>
    </motion.div>
  );
}

function FeatureScrollSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  return (
    <section
      ref={ref}
      className="relative w-screen min-h-[400vh] flex flex-col justify-center items-center bg-white text-black overflow-visible"
    >
      {/* Background images */}
      <div className="absolute inset-0 flex items-center justify-center z-0 will-change-transform overflow-visible">
        {/* 👇 shift container slightly to the right */}
        <div className="relative w-[70vw] translate-x-[5vw] overflow-visible">
          <Image
            src="/images/fly/bc.png"
            alt="Surfboard front"
            width={1200}
            height={800}
            className="relative z-10 object-contain w-full h-auto select-none"
            priority
          />

          <Image
            src="/images/fly/bcd.png"
            alt="Surfboard back"
            width={1200}
            height={800}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20%] z-0 object-contain w-full h-auto select-none"
          />
        </div>
      </div>

      {/* Content blocks */}
      <div className="relative z-10 flex flex-col justify-center space-y-[70vh] px-8 w-full py-[25vh]">
        {BLOCKS_CONFIG.map((block, idx) => (
          <Block key={idx} {...block} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}


function TextureSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]); // Subtle parallax

  return (
    <section
      ref={ref}
      className="relative w-screen h-[80vh] flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: "url('/images/fly/texture.png')",
          y,
        }}
      />
      {/* Top-left text */}
      <div className="absolute top-20 left-20 max-w-[380px] z-10">
        <p className="font-bold text-5xl leading-snug text-black">
          One shot PVC Sandwich Construction
        </p>
      </div>

      {/* Bottom-right text */}
      <div className="absolute bottom-20 right-20 max-w-[600px] text-left z-10">
        <p className="font-semibold text-xl leading-relaxed text-black">
          We follow a unique manufacturing process during which all layers of
          fabrics, reinforcements and housings are applied in a double-shell
          mold, then baked using a process that allows ideal polymerization of
          the resins for perfect reproduction and an optimal weight/solidity
          ratio.
        </p>
      </div>
    </section>
  );
}

function ConcaveDeckSection() {
  const ref = useRef(null);

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Control the image scale factor (zoom)
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.5, 0.8]);

  return (
    <section
      ref={ref}
      className="relative w-screen min-h-screen flex flex-col justify-center items-center bg-white text-black overflow-hidden py-24"
    >
      {/* Title + subtitle */}
      <div className="text-center mb-12 px-6 z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Concave deck</h2>
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Optimum precision and control of the foil thanks to a hollow deck that
          brings you closer to the foil and lowers your center of gravity.
        </p>
      </div>

      {/* Scalable surfboard image */}
      <MotionImage
        src="/images/fly/board.png"
        alt="Concave deck surfboard"
        width={1400}
        height={900}
        style={{ scale }}
        className="w-[85%] md:w-[75%] lg:w-[65%] object-contain select-none will-change-transform z-0"
      />

      {/* Right-aligned text blocks */}
      <div className="w-full max-w-6xl mt-16 px-8 flex flex-col md:flex-row justify-end text-left text-gray-800 space-y-8 md:space-y-0 md:space-x-8 z-10">
        <p className="max-w-md text-base md:text-lg leading-relaxed">
          Its nose bulb provides forgiveness during start-up phases, but also
          for landing jumps.
        </p>
        <p className="max-w-md text-base md:text-lg leading-relaxed">
          A clever blend of generous volume for forgiveness and reduced volume
          in the contact zones for maximum feel and precision.
        </p>
      </div>
    </section>
  );
}

function BelowBluredSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-30% 0px -30% 0px', // triggers when section is ~30% visible
  });

  return (
    <section
      ref={ref}
      className="relative w-screen min-h-screen flex flex-col justify-center items-center bg-white overflow-hidden py-32"
    >
      {/* Enlarged blurred background board */}
      <MotionImage
        src="/images/fly/blurred.png"
        alt="Blurred board background"
        initial={{ scale: 1.5, opacity: 0 }}
        animate={isInView ? { scale: 1.85, opacity: 0.9 } : { scale: 1.5, opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        fill
        className="absolute inset-0 w-full h-full object-contain object-center pointer-events-none select-none"
      />

      {/* Left image (lowered slightly) */}
      <MotionImage
        src="/images/fly/left.png"
        alt="Left wing"
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 20 } : { opacity: 0, y: 100 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        width={380}
        height={260}
        className="absolute left-0 top-[52%] -translate-y-1/2 w-[300px] md:w-[380px] rounded-lg shadow-lg ml-12 md:ml-24"
      />

      {/* Right image (raised slightly) */}
      <MotionImage
        src="/images/fly/right.png"
        alt="Right wing"
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: -20 } : { opacity: 0, y: 100 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        width={380}
        height={260}
        className="absolute right-0 top-[42%] -translate-y-1/2 w-[300px] md:w-[380px] rounded-lg shadow-lg mr-12 md:mr-24"
      />

      {/* Center text */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.4 }}
        className="relative z-10 text-center max-w-2xl px-6"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Touch down tolerance
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          The softness of the rails and hull provide forgiveness for your
          touches with a gentle bounce.
        </p>
      </motion.div>
    </section>
  );
}
function TailShapeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const variants = {
    hidden: { opacity: 0, y: -150, x: -150 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[75vh] flex flex-col md:flex-row items-center justify-between bg-white py-16"
    >
      {/* Image at absolute left */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[50vw] max-w-[800px] z-0"
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        <Image
          src="/images/fly/diagonal.png"
          alt="Innovative tail shape"
          width={800}
          height={600}
          className="block w-full h-auto object-contain rounded-lg"
          priority
        />
      </motion.div>

      {/* Text content */}
      <div className="relative z-10 ml-auto w-full md:w-1/2 px-6 md:px-12">
        <h2 className="text-5xl font-bold text-black mb-4">
          Innovative tail shape
        </h2>
        <p className="text-gray-700 max-w-md">
          Inspired by the T Tail used in a number of practices, the wideners
          provided the lateral stability needed for start-up phases, while
          retaining the exceptional glide of the mid-hull pin tail.
        </p>
      </div>
    </section>
  );
}




const BoardSpecsSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);


  return (
    <section
      ref={ref}
      className="relative w-screen min-h-[60vh] flex flex-col md:flex-row justify-center items-start bg-white py-16 px-8 gap-12 overflow-hidden"
    >
      {/* Left Column */}
      <div className="w-full md:w-1/2 flex flex-col items-center text-center">
        <motion.div style={{ y }} className="w-full flex justify-center space-y-10">
          <Image
            src="/images/fly/s1.png"
            alt="Fly"
            width={220}
            height={220}
            className="max-w-[220px] h-auto"
          />
        </motion.div>

        <h3 className="text-3xl font-extrabold mt-18 mb-4 tracking-tight">
          Fly 4&#39;8
        </h3>

        <table className="text-left border-collapse text-lg font-semibold w-full max-w-md">
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="pr-6 py-2 text-gray-700">Volume</td>
              <td className="py-2">39 L</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="pr-6 py-2 text-gray-700">Length</td>
              <td className="py-2">4&#39;8 / 142.2 cm</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="pr-6 py-2 text-gray-700">Width</td>
              <td className="py-2">19.5&quot; / 49.5 cm</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="pr-6 py-2 text-gray-700">Weight</td>
              <td className="py-2">4.9 kg</td>
            </tr>
            <tr>
              <td className="pr-6 py-2 text-gray-700">Box</td>
              <td className="py-2">US double rail</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-1/2 flex flex-col items-center text-center">
        <motion.div style={{ y }} className="w-full flex justify-center">
          <Image
            src="/images/fly/sss.png"
            alt="Fly"
            width={650}
            height={420}
            className="max-w-[650px] h-auto"
          />
        </motion.div>

        <h3 className="text-3xl font-extrabold mt-18 mb-4 tracking-tight">
          Fly 5&#39;2 / 5&#39;4 / 5&#39;8 / 6&#39;0
        </h3>

        <table className="text-left border-collapse text-lg font-semibold w-full max-w-md">
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="pr-6 py-2 text-gray-700">Volume</td>
              <td className="py-2">65 / 75 / 90 / 103 L</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="pr-6 py-2 text-gray-700">Length</td>
              <td className="py-2">
                5&#39;2 (157.4 cm) / 5&#39;4 (162.5 cm) / 5&#39;8 (172.7 cm) / 6&#39;0 (182.8 cm)
              </td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="pr-6 py-2 text-gray-700">Width</td>
              <td className="py-2">
                23.5&quot; (59.6 cm) / 24.5&quot; (62.2 cm) / 25&quot; (63.5 cm) / 25¼&quot; (64.5 cm)
              </td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="pr-6 py-2 text-gray-700">Weight</td>
              <td className="py-2">6.1 / 6.2 / 6.4 / 6.8 kg</td>
            </tr>
            <tr>
              <td className="pr-6 py-2 text-gray-700">Box</td>
              <td className="py-2">US double rail</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};


