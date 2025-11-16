import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function WhitebirdSection() {
  const { scrollYProgress } = useScroll()

  const createParallax = (factor) => useTransform(scrollYProgress, [0, 1], [0, factor])

  const images = [
    {
      src: 'https://afs-foiling.com/wp-content/uploads/2024/03/78_V2_0001-1.png.webp',
      alt: 'Whitebird far left',
      y: createParallax(40),
      rotate: -10,
      offsetY: 100,
      scale: 0.9,
    },
    {
      src: 'https://afs-foiling.com/wp-content/uploads/2024/03/AFS-Whitebird-planche-downwind-%E2%80%93-2-1.png.webp',
      alt: 'Whitebird left mid',
      y: createParallax(60),
      rotate: -5,
      offsetY: 60,
      scale: 0.95,
    },
    {
      src: 'https://afs-foiling.com/wp-content/uploads/2024/03/58_0002-1.png.webp',
      alt: 'Whitebird center',
      y: createParallax(20),
      rotate: 0,
      offsetY: 0,
      scale: 1.05,
    },
    {
      src: 'https://afs-foiling.com/wp-content/uploads/2024/03/3D-afs-whitebird-3-scaled-1-scaled.png.webp',
      alt: 'Whitebird right mid',
      y: createParallax(50),
      rotate: 5,
      offsetY: 60,
      scale: 0.95,
    },
    {
      src: 'https://afs-foiling.com/wp-content/uploads/2024/03/78_V2_0002-1.png.webp',
      alt: 'Whitebird far right',
      y: createParallax(70),
      rotate: 10,
      offsetY: 100,
      scale: 0.9,
    },
  ]

  return (
    <section className="relative w-full bg-black text-white overflow-hidden flex flex-col items-center justify-center py-24">
      {/* Boards */}
      <div className="relative flex justify-center items-end gap-2 md:gap-6 lg:gap-10 xl:gap-14 2xl:gap-20">
        {images.map((img, i) => (
          <motion.div
            key={i}
            style={{ y: img.y }}
            className="relative"
          >
            <div
              className="relative"
              style={{
                transform: `translateY(${img.offsetY}px) rotate(${img.rotate}deg) scale(${img.scale})`,
                transformOrigin: 'bottom center',
              }}
            >
              <div className="relative w-28 md:w-40 lg:w-52 xl:w-60 2xl:w-64 aspect-[1/3]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 160px, (max-width: 1280px) 250px, 350px"
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Text */}
      <div className="mt-20 text-center px-4 max-w-2xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
          The Whitebird range expands
        </h2>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
          Two larger boards measuring 7'8" and 8'2" offering an excellent balance between accessibility and performance for light wind wing and downwind sup foil. <br />
          The third additional size is a smaller 5'8" for even greater compactness.
        </p>
      </div>

      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-40" />
    </section>
  )
}
