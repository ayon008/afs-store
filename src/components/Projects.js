'use client';

import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { PROJECTS_DATA } from "../constants/projects";
import HorizontalScroller from "./HorizontalScroller";
import useMediaQuery from "./hooks/useMediaQuery";

export default function Projects() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [cardWidth, setCardWidth] = useState(0);
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await fetch('/api/wc/products');
        const result = await response.json();
        const products = result.data.map(product => ({
          ...product,
          price: product.price_html 
            ? product.price_html.replace(/<\/?[^>]+(>|$)/g, "").trim() 
            : `From ${product.price}€`
        }));
        setProductsData(products);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    }
    fetchProductData();
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      const newWidth = isMobile
        ? window.innerWidth / 1.25
        : window.innerWidth / 2;
      setCardWidth(newWidth);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [isMobile]);

  const cardCount = PROJECTS_DATA.length + 1;

  const sectionStyle = {
    background: isMobile
      ? "linear-gradient(to bottom, black 50%, white 50%)"
      : "linear-gradient(to bottom, black 70%, white 30%)",
  };

  return (
    <HorizontalScroller
      title="PROJECTS"
      cardWidth={cardWidth}
      gap={isMobile ? 40 : 80}
      cardCount={cardCount}
      sectionClassName=""
      sectionStyle={sectionStyle}
      trackClassName="z-10"
      renderTrackContent={(width, cardHeight) => (
        <>
          {PROJECTS_DATA.map((project, index) => {
            const productData = productsData.find(p => p.name === project.name) || {};
            return (
              <div
                key={index}
                className="project-card shrink-0"
                style={{ width: `${width}px` }}
              >
                <ProjectCard
                  name={project.name}
                  image={project.image}
                  link={project.link || productData.permalink}
                  dynamicHeight={cardHeight}
                  price={productData.price || null}
                  category={productData.categories?.[0]?.name || project.category || "VERSATILITY"}
                  bestseller={productData.featured ? "BESTSELLER" : null}
                />
              </div>
            );
          })}

          <div
            className="project-card shrink-0 opacity-0 pointer-events-none"
            style={{ width: `${cardWidth}px` }}
          />
        </>
      )}
    />
  );
}
