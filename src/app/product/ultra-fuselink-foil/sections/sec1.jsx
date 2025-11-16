"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex items-center justify-end min-h-[120vh] bg-black text-white overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://afs-foiling.com/wp-content/uploads/2024/06/Ultra750UHM85_0001-1.png"
        alt="AFS Foiling Ultra"
        fill
        priority
        className="object-cover object-center opacity-90"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/60 to-transparent" />

      {/* Animated Text */}
      <div
        ref={textRef}
        className="relative z-10 max-w-xl mr-24 md:mr-32 lg:mr-40 text-right space-y-4 will-change-transform"
      >
        {/* H1 */}
        <h1
          className='font-[700] leading-[70px] text-[70px]'
          style={{
            fontFamily: '"alliance no.2", sans-serif',
            color: "rgb(255,255,255)",
          }}
        >
          <span className="text-blue-500">Morph with</span> <br />
          <span className="text-blue-500">the elements,</span> <br />
          <span className="text-white">transcend yourself</span>
        </h1>

        {/* Paragraph */}
        <p
          className='font-[600] leading-[26.4px] text-[22px]'
          style={{
            fontFamily: '"alliance no.2", sans-serif',
            color: "rgb(51,51,51)",
          }}
        >
          <strong style={{ color: "white" }}>
            DW Performance By Laurent Borgna :
          </strong>{" "}
          The Ultra was designed to deliver maximum performance to downwind enthusiasts and/or competitors. With a wide range of uses, maximum efficiency, and infinite glide, it has been nicknamed the “glide-ator.” Cover miles effortlessly.
        </p>
      </div>
    </section>
  );
}
