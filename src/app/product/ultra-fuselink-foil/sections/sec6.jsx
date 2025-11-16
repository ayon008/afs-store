'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function UltraSection() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scroll = scrollRef.current;

    if (!section || !scroll) return;

    const totalScroll = scroll.scrollWidth - window.innerWidth;

    gsap.to(scroll, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${scroll.scrollWidth}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const images = [
    'https://afs-foiling.com/wp-content/uploads/2024/06/img_wrap-9-e1719538100517.png',
    'https://afs-foiling.com/wp-content/uploads/2024/06/img_wrap-10-e1719538268222.png',
    'https://afs-foiling.com/wp-content/uploads/2024/06/img_wrap-8-e1719380322100.png',
    'https://afs-foiling.com/wp-content/uploads/2024/06/img_wrap-11-e1719538363864.png',
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white w-full h-screen overflow-hidden"
    >
      <div
        ref={scrollRef}
        className="flex items-center gap-8 h-full px-10 no-scrollbar"
      >
        {/* Image Row */}
        {images.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[400px] h-[400px] relative overflow-hidden"
          >
            <Image
              src={src}
              alt={`Ultra HA image ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}

        {/* Specs Table */}
        <div className="flex-shrink-0 bg-black text-white flex flex-col justify-center p-10 w-[480px]">
          <h2 className="text-4xl font-bold mb-6">Ultra HA 750</h2>
          <ul className="space-y-3 text-sm tracking-wide">
            <li className="flex justify-between border-b border-gray-700 pb-2">
              <span>Surface</span>
              <span className="font-semibold">700 cm²</span>
            </li>
            <li className="flex justify-between border-b border-gray-700 pb-2">
              <span>Span</span>
              <span className="font-semibold">1024 mm</span>
            </li>
            <li className="flex justify-between border-b border-gray-700 pb-2">
              <span>Aspect Ratio</span>
              <span className="font-semibold">14</span>
            </li>
            <li className="flex justify-between border-b border-gray-700 pb-2">
              <span>Cord</span>
              <span className="font-semibold">95 mm</span>
            </li>
            <li className="flex justify-between border-b border-gray-700 pb-2">
              <span>Thickness</span>
              <span className="font-semibold">12.3 mm</span>
            </li>
            <li className="flex justify-between border-b border-gray-700 pb-2">
              <span>Fuselage</span>
              <span className="font-semibold">579 mm</span>
            </li>
            <li className="flex justify-between border-b border-gray-700 pb-2">
              <span>Construction</span>
              <span className="font-semibold">UHM Carbon</span>
            </li>
            <li className="flex justify-between">
              <span>Weight</span>
              <span className="font-semibold">TBA</span>
            </li>
          </ul>
        </div>

        {/* Final Image */}
        <div className="flex-shrink-0 w-[480px] h-[400px] relative overflow-hidden">
          <Image
            src="https://afs-foiling.com/wp-content/uploads/2024/06/img_wrap-13-e1719538517132.png"
            alt="Ultra HA 750 Final"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
