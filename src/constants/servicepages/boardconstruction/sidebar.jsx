'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { label: 'THE MATERIALS', href: '#materials' },
    { label: 'THE BASICS OF CONSTRUCTION', href: '#basics' },
    { label: 'SANDWICH-BAUWEISE', href: '#sandwich' },
    { label: 'TRIAXIAL CARBON CONSTRUCTION', href: '#triaxial' },
  ];

  return (
    <nav
      className="
        w-64
        min-h-screen
        text-gray-800
        p-8
        pl-12
        sticky
        top-24
        font-['Inter']
        bg-transparent
        border-r border-gray-200
      "
    >
      <div className="space-y-4">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="
              flex items-center
              text-base font-semibold
              tracking-wide
              hover:text-red-600
              transition-colors
              duration-200
            "
          >
            <ChevronRight size={16} className="mr-2 opacity-70" />
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
