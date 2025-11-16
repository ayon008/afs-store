"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const handleBuyClick = () => {
    router.push("/product/details/silk-complete-foil");
  };

  const navItems = [{ name: "Features", href: "#feature" }];

  return (
    <header className="w-full bg-black text-white top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between">
        {/* Left — Logo */}
        <div className="flex-shrink-0">
          <a
            href="#"
            className="text-xl sm:text-2xl font-bold tracking-tight cursor-pointer select-none"
          >
           silk-complete-foil
          </a>
        </div>

        {/* Right — Desktop Nav + Button */}
        <nav className="hidden md:flex items-center space-x-5 ml-auto">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-base font-medium hover:text-gray-300 transition duration-150"
            >
              {item.name}
            </a>
          ))}

          {/* Divider */}
          <div className="w-px h-5 bg-gray-700"></div>

          {/* Buy Button */}
          <button
            onClick={handleBuyClick}
            className="flex items-center justify-center space-x-1 
                       px-3 py-1.5 text-sm font-semibold text-white 
                       bg-[#1d98ff] hover:bg-[#1080db] 
                       rounded-md transition duration-150"
            aria-label="Buy the product"
          >
            BUY IT
            <ArrowRight className="w-4 h-4 hidden sm:inline" />
          </button>
        </nav>

        {/* Mobile — Only Buy Button */}
        <div className="md:hidden ml-auto">
          <button
            onClick={handleBuyClick}
            className="flex items-center justify-center space-x-1 
                       px-3 py-1.5 text-sm font-semibold text-white 
                       bg-[#1d98ff] hover:bg-[#1080db] 
                       rounded-md transition duration-150"
            aria-label="Buy the product"
          >
            BUY IT
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
