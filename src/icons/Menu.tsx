"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Menu({ isOpen, setIsOpen }) {
  const top = useRef(null);
  const middle = useRef(null);
  const bottom = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useGSAP(() => {
    gsap.to(top.current, {
      rotate: isOpen ? 45 : 0,
      duration: 0.5,
      transformOrigin: "left center",
    });
    gsap.to(middle.current, {
      opacity: isOpen ? 0 : 1,
      duration: 0.5,
    });
    gsap.to(bottom.current, {
      rotate: isOpen ? -45 : 0,
      duration: 0.5,
      transformOrigin: "left center",
    });
  }, [isOpen]);

  return (
    <div className="block md:hidden cursor-pointer">
      <button
        className="w-10 flex flex-col justify-between h-6 cursor-pointer"
        type="button"
        aria-label="Toggle navigation menu"
        aria-controls="mobile-navigation"
        onClick={toggleMenu}
      >
        <div ref={top} className="h-[2px] w-8 bg-white"></div>
        <div ref={middle} className="h-[2px] w-8 bg-white"></div>
        <div ref={bottom} className="h-[2px] w-8 bg-white"></div>
      </button>
    </div>
  );
}
