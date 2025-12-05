'use client';
import Image from 'next/image';
import Link from 'next/link';
import FormButton from "../Shared/Button/FormButton"

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
  price = 1000,
  bestseller = "",
  alt,
  type = "simple"
}) {
  const productLink = `/product/${slug || name.toLowerCase().replace(/\s+/g, '-')}`;
    
  return (
    <div className="group w-full max-w-[24rem] bg-[#F7F7F7] shadow-sm flex flex-col justify-between mx-auto rounded-[4px] overflow-hidden h-auto">
      {/* Image Section */}
      <Link href={productLink} className="block lg:h-[351px] h-[200px]">
        <div
          className="relative w-full aspect-[4/5] h-full overflow-hidden flex items-center justify-center"
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
            alt={alt || name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover absolute inset-0 transition-transform duration-500 ease-in-out pt-8"
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
              alt={`${alt || name} - hover`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
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
              <span className="inline-block px-2 py-1 bg-[#E6E6E6] text-black lg:text-xs text-[10px] font-semibold uppercase tracking-wider">
                {bestseller}
              </span>
            </div>
          )}
        </div>
      </Link>
      {/* Text Section */}
      <div className="flex flex-col flex-1 px-4 lg:mt-10 mt-4 gap-5 pb-4 text-center">
        <div className="flex-1">
          <h2 className="text-base uppercase lg:leading-[20px] leading-[100%] font-bold">
            {name}
          </h2>
          <p className="text-base leading-[100%] text-[#111111bf] font-bold mt-1">
            {
              type === "simple" ? (price ? formatPrice(price) : "") : "From" + " " + (price ? formatPrice(price) : "")
            }
          </p>
        </div>
        <div className="">
          <FormButton label={'DISCOVER'} />
        </div>
      </div>
    </div >
  );
}