"use client";
import React, { useEffect, useState } from "react";

export default function TeamSidebarClient({ items = [], topOffset = 157 }) {
  const [active, setActive] = useState(items[0]?.id ?? null);

  useEffect(() => {
    const onScroll = () => {
      let current = active;
      for (let i = 0; i < items.length; i++) {
        const el = document.getElementById(items[i].id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // If the top of the element is at or above the offset, it's considered active
        if (rect.top <= topOffset + 4) {
          current = items[i].id;
        }
      }
      if (current !== active) setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [items, active, topOffset]);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // Make sure the nav becomes active immediately
    setActive(id);
  };

  return (
    <div className="w-full">
      <h3 className="text-xl uppercase font-semibold">Équipe AFS</h3>
      <ul className="mt-4 space-y-6">
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`uppercase font-semibold text-base leading-[130%] cursor-pointer transition-colors duration-150 ${
              active === item.id ? "text-black" : "text-gray-400"
            }`}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
