import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

export default function Section6() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });
  
  // Images slide down smoothly, then shrink and fade out
  const y = useTransform(scrollYProgress, [0, 0.6, 1], [0, 150, 250]);
  const scale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.5]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative flex flex-col md:flex-row items-center justify-center min-h-screen bg-black text-white px-6 overflow-hidden">
      {/* Left Text */}
      <div className="md:w-1/3 text-left space-y-4">
        <h2 className="text-5xl font-bold">Carbon Sandwich</h2>
        <p className="text-sm text-gray-400 uppercase tracking-wide">
          BASED ON THE SAME MODEL AS THE ESSENTIAL WHITEBIRD 6'6 AND 6'8, THE LARGE WHITEBIRDS HAVE BEEN DESIGNED TO OFFER AN INTUITIVE AND ACCESSIBLE BOARD.
        </p>
        <p className="text-base font-semibold">
          The Whitebird 7’8 and 8’2 offer a perfect balance of stability, accessibility, glide and ease of take-off, sure to get you hooked on downwinds.
        </p>
      </div>

      {/* Center Images */}
      <motion.div
        style={{ y, scale, opacity: imageOpacity }}
        className="relative md:w-1/3 flex items-center justify-center mt-10 md:mt-0"
      >
        {/* Bottom Image (Right) */}
        <Image
          src="https://afs-foiling.com/wp-content/uploads/2024/03/82_V2_0001-1.png.webp"
          alt="Bottom Layer Board"
          width={420}
          height={750}
          className="absolute translate-x-[50px] opacity-90" 
          // ↑ Try adjusting translate-x for horizontal offset (e.g., 5px, 15px)
          // ↑ Adjust width/height slightly if you want a tighter or looser overlap
        />

        {/* Top Image (Left) */}
        <Image
          src="https://afs-foiling.com/wp-content/uploads/2024/03/78_V2_0001.png.webp"
          alt="Top Layer Board"
          width={220}
          height={400}
          className="absolute -translate-x-[50px] z-10"
          // ↑ Try adjusting -translate-x for opposite offset (e.g., -5px, -15px)
        />
      </motion.div>

      {/* Right Text */}
      <div className="md:w-1/3 text-right space-y-4 mt-10 md:mt-0">
        <p className="text-base font-semibold">
          With length for glide and moderate width for stability, these boards are perfect for endless downwinds while surfing incredibly well, even in the smallest waves.
        </p>
      </div>
    </section>
  );
}
