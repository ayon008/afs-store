"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import NAV_LINKS from "@/constants/navlinks";

export default function ServicesPage() {
  const [navbarHeight, setNavbarHeight] = useState(0);
  
  // Get services data from NAV_LINKS
  const servicesData = NAV_LINKS.find(link => link.isService)?.sublinks || [];

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
      {/* Hero Section */}
      <div
        className="relative w-screen h-[80vh] overflow-hidden -mx-[calc((100vw-100%)/2)] mb-25"
        style={{ marginTop: `-${navbarHeight}px` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Services</h1>
          <p className="text-center text-xl max-w-2xl px-4">
            Expert guidance and support for all your foiling needs
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-16">
        {servicesData.map((service, index) => (
          <Link 
            key={index} 
            href={`/category/${service.id}`}
            className="group bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3">{service.name}</h2>
              <p className="text-gray-600">
                Professional {service.name.toLowerCase()} services tailored to your needs
              </p>
              <div className="mt-4 text-blue-600 group-hover:text-blue-800">
                Learn more →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}