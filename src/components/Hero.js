'use client';

import { useEffect, useRef } from 'react';
import Overlay from './Overlay';
import { theme } from '../theme';
import Container from './Container';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '../context/ContentContext';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const videoRef = useRef(null);
  const heroRef = useRef(null);

  const { content } = useContent();
  const overlayData = content?.overlays || [];
  const hasOverlay = overlayData.length > 0;

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (heroRef.current && footer) {
      gsap.to(heroRef.current, {
        opacity: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top bottom',
          end: 'top 75%',
          scrub: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Attempt to autoplay the video (muted). Keep as a separate effect so
  // autoplay is attempted even if there is no overlay data.
  useEffect(() => {
    const playVideo = async () => {
      if (!videoRef.current) return;

      try {
        videoRef.current.currentTime = 0;
        videoRef.current.muted = true;
        // try calling play(); browser may still block it depending on policy
        await videoRef.current.play();
      } catch (error) {
        // Log the error so it's easy to diagnose if autoplay is blocked
        console.debug('Hero video play() failed (autoplay may be blocked):', error);
      }
    };

    playVideo();
  }, []);

  return (
    <div ref={heroRef} className="hidden sm:block relative bg-black w-full h-[calc(100vh-100px)]"> {/* Hidden on mobile (< 640px), visible on tablet/desktop */}
      {/* Single video background: put as a sibling to Container so stacking is explicit */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          className="w-full h-full object-cover opacity-0 transition-opacity duration-700"
          onCanPlay={() => {
            try {
              // fade in when ready
              if (videoRef.current) videoRef.current.style.opacity = '1';
              console.debug('Hero video can play');
            } catch (e) {
              console.debug('Hero video onCanPlay handler error', e);
            }
          }}
          onError={(e) => console.debug('Hero video error', e)}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          {/* fallback text for very old browsers */}
          Your browser does not support the video tag.
        </video>
      </div>

      <Container className={`relative z-10 h-full flex flex-col overflow-hidden w-full ${theme.paddingVerticalMenu}`}>
        {/* Overlay content */}
        <div className={`relative z-20 w-full h-full flex flex-col ${theme.paddingHorizontal}`}>
          {hasOverlay && (
            <Overlay
              {...overlayData[0]}
            />
          )}
        </div>
      </Container>
    </div>
  );
}