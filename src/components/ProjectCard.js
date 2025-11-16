'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Helper function to format price
const formatPrice = (price) => {
  // Return default price format if no price is provided
  if (!price && price !== 0) return '';

  // Convert the price to a clean string first
  let cleanPrice = price;
  
  // If it's HTML content, clean it up
  if (typeof price === 'string') {
    // Remove HTML tags
    cleanPrice = cleanPrice.replace(/<\/?[^>]+(>|$)/g, '');
    // Replace HTML entities
    cleanPrice = cleanPrice.replace(/&euro;/g, '');
    cleanPrice = cleanPrice.replace(/&nbsp;/g, ' ');
    // Remove 'From' if present
    cleanPrice = cleanPrice.replace(/From\s+/i, '');
    // Remove currency symbols
    cleanPrice = cleanPrice.replace(/[€$£]/g, '');
    // Clean up any extra spaces
    cleanPrice = cleanPrice.trim();
  }

  // Handle numeric input
  if (typeof price === 'number') {
    return price.toFixed(2).replace('.', ',') + '€';
  }

  // Convert to number if possible
  const numPrice = parseFloat(cleanPrice.replace(',', '.'));
  if (isNaN(numPrice)) return '0,00€';

  // Format the price with comma as decimal separator
  return numPrice.toFixed(2).replace('.', ',') + '€';
};

export default function ProjectCard({
  name = 'D-LITE',
  image = 'https://placehold.co/600x600/E0E0E0/000000?text=Product+Image',
  hoverImage = null,
  slug,
  category = 'VERSATILITY',
  price = null,
  bestseller = null,
}) {
  const productLink = `/product/${slug || name.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div className="group w-full max-w-[24rem] bg-white overflow-hidden rounded-none shadow-sm flex flex-col mx-auto">
      {/* Image Section */}
      <Link href={productLink} className="block">
        <div
          className="relative w-full aspect-[4/5] overflow-hidden flex items-center justify-center bg-white"
          onFocus={(e) => {
            const hoverImg = e.currentTarget.querySelector('[data-hover-img]');
            if (hoverImg) hoverImg.classList.remove('opacity-0');
          }}
          onBlur={(e) => {
            const hoverImg = e.currentTarget.querySelector('[data-hover-img]');
            if (hoverImg) hoverImg.classList.add('opacity-0');
          }}
        >
          {/* Base Image */}
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain absolute inset-0 transition-transform duration-500 ease-in-out"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/600x600/E0E0E0/000000?text=Image+Load+Error';
            }}
          />

          {/* Hover Image */}
          {hoverImage && (
            <Image
              src={hoverImage}
              data-hover-img
              alt={`${name} - hover`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
              onError={(e) => {
                e.target.onerror = null;
                e.target.classList.add('opacity-0');
              }}
              aria-hidden={true}
            />
          )}

          {/* Label (Bestseller / Category) */}
          {bestseller && (
            <div className="absolute top-2 left-2 z-10">
              <span className="inline-block px-2 py-1 bg-gray-100 text-black text-xs font-semibold uppercase tracking-wider">
                {bestseller}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Text Section */}
      <div className="flex flex-col justify-between flex-1 px-4 pt-3 pb-4 text-center min-h-[200px]">
        <div className="flex-1">
          <p className="text-xs sm:text-sm font-semibold uppercase text-gray-500 mb-1 tracking-wider">
            {category}
          </p>
          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold uppercase text-black mb-1 mt-2 tracking-tight break-words min-h-[3rem] flex items-center justify-center">
            {name}
          </h2>
          <p className="text-sm sm:text-base md:text-lg font-medium text-black mb-2 break-words min-h-[1.5rem] flex items-center justify-center">
            {price ? formatPrice(price) : ""}
          </p>
        </div>

        <div className="mt-auto pt-4">
          <Link href={productLink}>
            <button
              className="px-4 py-1.5 sm:px-6 sm:py-2 bg-black text-white font-bold uppercase text-xs sm:text-sm tracking-widest transition-colors duration-200 hover:bg-gray-800 rounded-md w-full sm:w-auto min-w-[120px]"
              aria-label={`Discover ${name}`}
            >
              Discover
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}