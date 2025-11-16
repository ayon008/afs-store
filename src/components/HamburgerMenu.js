"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronDown, Globe } from "lucide-react";
import Link from "next/link";
import NAV_LINKS from "../constants/navlinks";
import { SERVICE_SECTIONS } from "./ServiceSubbar";

// MenuItem Component
const MenuItem = ({ name, href, sublinks, isExpanded, onToggle, onClose, isService }) => {
  if (isService) {
    return (
      <div className="border-b border-gray-200">
        <div 
          className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition duration-150 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            onToggle();
          }}
        >
          <span className="text-base font-semibold text-gray-800">{name}</span>
          <ChevronDown 
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
        {isExpanded && (
          <div className="bg-gray-50 py-4">
            {SERVICE_SECTIONS.map((section, idx) => (
              <div key={idx} className="mb-6 px-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {section.title}
                </h3>
                <div className="flex flex-col gap-2">
                  {section.items.map((item, itemIdx) => (
                    <Link
                      key={itemIdx}
                      href={item.link}
                      className="text-gray-600 hover:text-gray-900 py-1"
                      onClick={onClose}
                    >
                      {item.text}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (sublinks && sublinks.length > 0) {
    return (
      <div className="border-b border-gray-200">
        <div 
          className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition duration-150 cursor-pointer"
          onClick={onToggle}
        >
          <span className="text-base font-semibold text-gray-800">{name}</span>
          <ChevronDown 
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
        {isExpanded && (
          <div className="bg-gray-50 pl-8 py-2">
            {sublinks.map((sublink, idx) => (
              <Link
                key={idx}
                href={sublink.href || href}
                className="block py-2 text-gray-700 hover:text-gray-900 transition duration-150"
                onClick={onClose}
              >
                {sublink.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  // For service items without sublinks, still show as clickable but don't navigate
  if (href === "/services") {
    return (
      <div 
        className="flex items-center px-5 py-3.5 border-b border-gray-200 hover:bg-gray-50 transition duration-150 cursor-pointer"
        onClick={onToggle}
      >
        <span className="text-base font-semibold text-gray-800">{name}</span>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="flex items-center px-5 py-3.5 border-b border-gray-200 hover:bg-gray-50 transition duration-150"
      onClick={onClose}
    >
      <span className="text-base font-semibold text-gray-800">{name}</span>
    </Link>
  );
};

// Main MenuPanel Component
const HamburgerMenu = ({ isOpen, onClose }) => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleItem = (index) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div
      className={`fixed inset-0 bg-white z-[60] overflow-y-auto transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:hidden`}
    >
      <div className="sticky top-0 flex justify-between items-center bg-black px-4 py-3 border-b border-gray-800">
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="divide-y divide-gray-200">
        {NAV_LINKS.map((link, index) => (
          <MenuItem
            key={index}
            name={link.name}
            href={link.href || "#"}
            sublinks={link.sublinks}
            isExpanded={expandedItems.has(index)}
            onToggle={() => toggleItem(index)}
            onClose={onClose}
            isService={link.isService}
          />
        ))}

        <div className="pt-4">
          <Link
            href="/language/france"
            className="flex items-center px-5 py-3.5 hover:bg-gray-50 transition duration-150"
            onClick={onClose}
          >
            <Globe className="w-5 h-5 text-gray-700 mr-2" />
            <span className="text-base font-semibold text-gray-800">FR</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;