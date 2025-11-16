import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react';

export default function WhitebirdSection() {
  const sectionRef = useRef(null); 
  const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"] 
  })
  
  const createParallax = (factor, offset = 0) => 
    useTransform(scrollYProgress, [0, 1], [-factor + offset, factor + offset])

  const images = [
    {
      src: 'https://afs-foiling.com/wp-content/uploads/2024/03/78_V2_0001-1.png.webp',
      alt: 'Whitebird leftmost',
      y: createParallax(120, 320),
    },
    {
      src: 'https://afs-foiling.com/wp-content/uploads/2024/03/AFS-Whitebird-planche-downwind-%E2%80%93-2-1.png.webp',
      alt: 'Whitebird second from left',
      y: createParallax(120, 90),
    },
    {
      src: 'https://afs-foiling.com/wp-content/uploads/2024/03/3D-afs-whitebird-3-scaled-1-scaled.png.webp',
      alt: 'Whitebird third from left',
      y: createParallax(150),
    },
    {
      src: 'https://afs-foiling.com/wp-content/uploads/2024/03/58_0002-1.png.webp',
      alt: 'Whitebird center',
      y: createParallax(320),
    },
    {
      src: 'https://afs-foiling.com/wp-content/uploads/2024/03/58_0002-1.png.webp',
      alt: 'Whitebird third from right',
      y: createParallax(260, 90),
    },
    {
      src: 'https://afs-foiling.com/wp-content/uploads/2024/03/78_V2_0002-1.png.webp',
      alt: 'Whitebird rightmost',
      y: createParallax(190, 200),
    },
  ]

  return (
    <section ref={sectionRef} className="relative w-full bg-black text-white overflow-hidden flex flex-col items-center justify-center py-32 pb-64">
      
      {/* Images container with lower z-index */}
      <div className="relative z-10 flex flex-row items-end justify-center gap-1 md:gap-1 lg:gap-1 xl:gap-1">
        {images.map((img, i) => (
          <motion.img
            key={i}
            src={img.src}
            alt={img.alt}
            style={{ y: img.y }}
            className="w-44 md:w-72 lg:w-80 xl:w-80 2xl:w-84 aspect-[1/2] object-contain"
          />
        ))}
      </div>

      {/* Text section - positioned below images but with higher z-index to overlap */}
      <div className="relative z-20 mt-2 text-center px-4 max-w-2xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
          The Whitebird range expands
        </h2>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
          Two larger boards measuring 7'8" and 8'2" offering an excellent balance between accessibility and performance for light wind wing and downwind sup foil. <br />
          The third additional size is a smaller 5'8" for even greater compactness.
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-40" />
    </section>
  )
}