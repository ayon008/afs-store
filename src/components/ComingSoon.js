"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { unSlugify } from "../utils/slugUtils";

export default function ComingSoon() {
  const params = useParams();
  const [navbarHeight, setNavbarHeight] = useState(0);
  
  // Get category name from URL and format it
  const categoryName = unSlugify(params.category || '');
  
  // Detect and sync with fixed Navbar height
  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (navbar) setNavbarHeight(navbar.offsetHeight);

    const handleResize = () => {
      const nav = document.querySelector("nav");
      if (nav) setNavbarHeight(nav.offsetHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col px-6 md:px-10 gap-8">
      <div
        className="relative w-screen h-[80vh] overflow-hidden -mx-[calc((100vw-100%)/2)] mb-25"
        style={{ marginTop: `-${navbarHeight}px` }}
      >
        <div className="absolute inset-0 bg-gray-900"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{categoryName}</h1>
          <div className="text-xl md:text-2xl mb-8">Coming Soon</div>
          <p className="text-center text-gray-300 max-w-md px-4">
            We&apos;re working on bringing you amazing products in this category.
            Check back soon for updates!
          </p>
        </div>
      </div>
    </div>
  );
}