'use client';

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./Container";
import Heading from "./Heading";
import { theme } from "../theme";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroller({
  cardWidth,
  gap = 80,
  cardCount,
  sectionClassName = "",
  titleColor = "text-white",
  sectionStyle = {},
  trackClassName = "",
  renderTrackContent,
  title = "", // e.g., "PROJECTS" or "NEWS"
}) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const titleRef = useRef(null);
  const [dimensions, setDimensions] = useState({ titleHeight: 0, cardHeight: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (!sectionRef.current || !titleRef.current) return;

      const viewportHeight = window.innerHeight;
      const titleElement = titleRef.current;
      const titleHeight = titleElement.getBoundingClientRect().height;
      
      // Title space: 20% from top
      const titleTopSpace = viewportHeight * 0.2;
      
      // Bottom space: 20% from bottom
      const bottomSpace = viewportHeight * 0.2;
      
      // Estimate text container height (py-4 = 2rem = 32px + text height ~60px)
      const textContainerHeight = 92;
      
      // Card height calculation:
      // Available space = viewport - titleTopSpace - bottomSpace - textHeight
      // Card overlaps 50% of title bottom, so we add back 50% of title height
      const availableSpace = viewportHeight - titleTopSpace - bottomSpace - textContainerHeight;
      const cardHeight = availableSpace + (titleHeight * 0.5);
      
      setDimensions({ titleHeight, cardHeight });
    };

    // Initial calculation
    updateDimensions();

    // Recalculate on resize
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [title]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || cardWidth === 0 || dimensions.cardHeight === 0) return;

    // Calculate total width for horizontal scroll
    const totalWidth = (cardWidth + gap) * cardCount - window.innerWidth;

    // Set initial track width
    gsap.set(track, {
      width: (cardWidth + gap) * cardCount,
    });

    // Animate track horizontally
    const scrollTrigger = gsap.to(track, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Cleanup ScrollTrigger instances on component unmount
    return () => {
      scrollTrigger.scrollTrigger?.kill();
    };
  }, [cardWidth, gap, cardCount, dimensions.cardHeight]);

  const titleTopSpace = typeof window !== 'undefined' ? window.innerHeight * 0.2 : 0;
  // ADJUST THIS VALUE TO MOVE TRACK CONTENT UP/DOWN
  // Positive values move down, negative values move up
  const verticalAdjustment = -50; // Change this to fine-tune vertical position
  const cardTopPosition = titleTopSpace + (dimensions.titleHeight * 0.5) + verticalAdjustment;

  return (
    <section
      ref={sectionRef}
      className={`relative h-screen w-full overflow-hidden ${sectionClassName}`}
      style={{ scrollSnapAlign: "start", ...sectionStyle }}
    >
      {/* Title - Positioned at 20% from top */}
      {title && (
        <div 
          className="absolute left-0 right-0 z-10"
          style={{ top: `${titleTopSpace}px` }}
        >
          <Container className={theme.paddingTop}>
            <div ref={titleRef}>
              <Heading
                text={title}
                size="text-[60px]  xl:text-[140px] 2xl:text-[160px]"
                centered={false}
                color={titleColor}
                isAnimate
              />
            </div>
          </Container>
        </div>
      )}

      {/* Track - Positioned to overlap 50% of title bottom */}
      <div
        ref={trackRef}
        className={`absolute left-0 flex px-10 ${trackClassName}`}
        style={{ 
          top: `${cardTopPosition}px`,
          gap: `${gap}px`, 
          zIndex: 1 
        }}
      >
        {renderTrackContent(cardWidth, dimensions.cardHeight)}
      </div>
    </section>
  );
}