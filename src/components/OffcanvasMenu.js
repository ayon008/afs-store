'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import NAV_LINKS from '../constants/navlinks';
import Heading from './Heading';
import Container from './Container';
import SkeletonLoader from './utils/SkeletonLoader';

export default function OffcanvasMenu({ onClose }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.classList.add('body-scroll-lock');
    document.body.style.top = `-${scrollY}px`;

    return () => {
      document.body.classList.remove('body-scroll-lock');
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <motion.div
      key="offcanvas"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.8 }}
      className="fixed top-0 right-0 w-full h-screen z-[999] flex flex-col md:flex-row"
    >
      {/* Left: Nav + Logo */}
      <Container className="w-full md:w-8/12 bg-black text-white p-8 flex flex-col justify-center items-center relative h-1/2 md:h-full">
        <Link
          href="/"
          onClick={onClose}
          className="absolute top-4 left-4"
        >
          <Image
            src="/logo.png"
            alt="Alpago Properties Clone"
            width={120}
            height={60}
            priority
            className="mr-2"
          />
        </Link>

        <div className="flex flex-col items-start justify-center space-y-0">
          {NAV_LINKS.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              onClick={onClose}
              className="transition-all"
            >
              <Heading
                text={link.name}
                size="text-[30px] lg:text-[50px]"
                color="text-grayText"
                centered={false}
                className="uppercase"
              />
            </Link>
          ))}
        </div>
      </Container>

      {/* Right: Image with Skeleton */}
      <div className="w-full md:w-4/12 bg-black flex items-center justify-center h-1/2 md:h-full relative">
        {!imgLoaded && (
          <SkeletonLoader className="absolute inset-0 w-full h-full" />
        )}
        <Image
          src="/offcanvas.webp"
          alt="Off Canvas Image"
          width={300}
          height={300}
          className="w-full h-full object-cover"
          onLoad={() => setImgLoaded(true)}
        />
      </div>
    </motion.div>
  );
}
