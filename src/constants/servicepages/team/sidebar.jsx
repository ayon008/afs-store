'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const Sidebar = () => {
  const [active, setActive] = useState('#Foils');

  const navItems = [
    { label: 'Foils production', href: '#Foils' },
    { label: 'Board production', href: '#Board' },
    { label: 'Design office', href: '#Design' },
    { label: 'LOGISTICS', href: '#Logistics' },
    { label: 'Trade', href: '#Trade' },
    { label: 'Marketing', href: '#Marketing' },
    { label: 'Administration', href: '#Administration' },
  ];

  const handleClick = (e, href) => {
    e.preventDefault(); // stop default instant jump
    setActive(href);

    const section = document.querySelector(href);
    if (section) {
      const yOffset = -100; // offset for sticky header if any
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Update active link on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      for (const item of navItems) {
        const section = document.querySelector(item.href);
        if (section) {
          const top = section.offsetTop - 120;
          const bottom = top + section.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActive(item.href);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside
      className="
        w-72
        h-full
        sticky
        top-28
        left-0
        p-8
        ml-16
        bg-transparent
        font-['alliance_no.2',sans-serif]
        z-40
      "
      style={{ alignSelf: 'flex-start' }}
    >
      <h2 className="text-[22px] font-bold mb-10 text-black tracking-wide">
        AFS Team
      </h2>

      <nav className="flex flex-col gap-6">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className={`
              flex items-center
              text-[17px]
              font-semibold
              transition-all duration-300
              ${active === item.href ? 'text-black translate-x-1' : 'text-gray-600 hover:text-black'}
            `}
          >
            {active === item.href && (
              <ChevronRight
                size={18}
                strokeWidth={2.5}
                className="text-black mr-2 transition-transform duration-300"
              />
            )}
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
