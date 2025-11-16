'use client';

import React, { useEffect, useState } from "react";
import Container from "./Container";
import Heading from "./Heading";
import ProjectCard from "./ProjectCard";
import HorizontalScroller from "./HorizontalScroller";
import { NEWS_DATA } from "../constants/news";
import useMediaQuery from "./hooks/useMediaQuery";
import { theme } from "../theme";

export default function News() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [cardWidth, setCardWidth] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = isMobile ? window.innerWidth : window.innerWidth * 0.65;
      const height = isMobile ? window.innerHeight * 0.4 : window.innerHeight * 0.55;
      setCardWidth(width);
      setCardHeight(height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const cardCount = NEWS_DATA.length;

  if (isMobile) {
    // Stack vertically on mobile
    return (
      <Container className={ `bg-white ${theme.paddingVertical}`}>
        <Heading text="NEWS" size="text-150px" color="text-black" />
        <div className="flex flex-col gap-6 mt-6">
          {NEWS_DATA.map((item, index) => (
            <div key={index}>
              <ProjectCard
                isNews
                name={item.name}
                image={item.image}
                link={item.link}
                date={item.date}
                month={item.month}
                year={item.year}
                dynamicHeight={cardHeight}
              />
            </div>
          ))}
        </div>
      </Container>
    );
  }

  return (
    <HorizontalScroller
      title="NEWS"
      titleColor="text-black"
      cardWidth={cardWidth}
      gap={80}
      cardCount={cardCount}
      sectionClassName="bg-white"
      renderTrackContent={(width) => (
        <>
          {NEWS_DATA.map((item, index) => (
            <div
              key={index}
              className="project-card shrink-0"
              style={{ width: `${width}px` }}
            >
              <ProjectCard
                isNews
                name={item.name}
                image={item.image}
                link={item.link}
                date={item.date}
                month={item.month}
                year={item.year}
                dynamicHeight={cardHeight}
              />
            </div>
          ))}
          <div
            className="project-card shrink-0 opacity-0 pointer-events-none"
            style={{ width: `${cardWidth}px` }}
          />
        </>
      )}
    />
  );
}
