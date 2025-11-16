// components/GWASection.tsx

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const GWASection = () => {
  const ref = useRef(null);
  const textRef = useRef(null);
  const imagesRef = useRef(null);

  const isSectionInView = useInView(ref, { amount: 0.5 });
  const isTextInView = useInView(textRef, { amount: 0.5 });
  const isImagesInView = useInView(imagesRef, { amount: 0.3 });

  const textVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section ref={ref} className="bg-black text-white py-20 px-4 min-h-screen flex flex-col justify-center items-center overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Title - always visible initially, centered on small, left on md */}
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center md:text-left mb-8 md:mb-0"
          initial={{ opacity: 1 }}
          animate={{ opacity: isSectionInView ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          Why develop<br />with our GWA<br />riders?
        </motion.h2>

        {/* Paragraph - slides in from right on scroll down, slides back on scroll up */}
        <motion.p
          ref={textRef}
          className="text-lg md:text-xl max-w-md mx-auto md:mx-0 md:ml-auto text-center md:text-left"
          variants={textVariants}
          animate={isTextInView ? 'visible' : 'hidden'}
        >
          Because they operate in the most demanding environment there is: international competition. Every centimeter gained, every smoother pump, every bit of flight control can decide a heat and push a foil’s performance ceiling even higher.
        </motion.p>

        {/* Images - appear one by one on scroll down, disappear on scroll up */}
        <motion.div
          ref={imagesRef}
          className="flex flex-wrap justify-center md:justify-start gap-4 mt-12"
          initial="hidden"
          animate={isImagesInView ? 'visible' : 'hidden'}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.3,
              },
            },
            hidden: {
              transition: {
                staggerChildren: 0.1, // Faster stagger on hide
                staggerDirection: -1, // Reverse order on hide
              },
            },
          }}
        >
          {[
            'https://afs-foiling.com/wp-content/uploads/2025/09/Axel-portrait-1-BD-1.png',
            'https://afs-foiling.com/wp-content/uploads/2025/09/Capture-decran-2025-09-16-a-11.34.56-1.png',
            'https://afs-foiling.com/wp-content/uploads/2025/09/PORTAIT-AXEL-GERARD-5-2.png',
            'https://afs-foiling.com/wp-content/uploads/2025/09/Capture-decran-2025-09-16-a-11.33.26-2.png',
          ].map((src, index) => (
            <motion.div
              key={index}
              className="relative w-32 h-40 md:w-48 md:h-60 overflow-hidden rounded-lg"
              variants={imageVariants}
            >
              <Image
                src={src}
                alt={`Rider image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GWASection;