'use client';

import React from 'react';

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
        w-72
        min-h-screen
        text-gray-800
        p-8
        pt-12
        mt-25
        ml-16
        sticky
        top-24
        font-['Inter']
        bg-transparent
      "
    >
      <div className="space-y-6">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="
              block
              text-lg font-semibold
              tracking-wide
              text-gray-500
              hover:text-black
              transition-colors
              duration-200
              leading-snug
              max-w-[12rem]
            "
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
