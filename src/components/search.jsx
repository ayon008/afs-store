"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

// --- SVG Icons ---
const SearchIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChevronLeftIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// --- Skeleton Component ---
const SkeletonCard = () => (
  <div className="flex-shrink-0 w-48 h-60 border border-gray-200 rounded-lg p-3 animate-pulse snap-center">
    <div className="relative mb-2 h-32 flex items-center justify-center bg-gray-200 rounded"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
  </div>
);

// --- Main Component ---
export default function SearchOverlay({ isOpen, onClose }) {
  const [latestSearches, setLatestSearches] = useState(["silk"]);
  const [searchInput, setSearchInput] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const scrollContainerRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Fetch recommended products on mount
  const fetchRecommendedProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/wc/products?per_page=15');
      const data = await response.json();
      if (data.data && Array.isArray(data.data)) {
        const formattedProducts = data.data.map(product => ({
          id: product.id,
          name: product.name,
          price: parseFloat(product.price) || 0,
          imageUrl: product.images && product.images.length > 0 
            ? product.images[0].src 
            : `https://placehold.co/300x200/f0f0f0/333?text=${encodeURIComponent(product.name.substring(0, 10))}`,
          slug: product.slug,
        }));
        setRecommendedProducts(formattedProducts);
      }
    } catch (error) {
      console.error('Error fetching recommended products:', error);
      setRecommendedProducts(Array.from({ length: 15 }).map((_, i) => ({
        id: i + 1,
        name: `Placeholder Product ${i + 1}`,
        price: 0,
        imageUrl: `https://placehold.co/300x200/f0f0f0/333?text=Product+${i + 1}`,
        slug: `product-${i + 1}`,
      })));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Search function with debouncing
  const searchProducts = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    try {
      setIsSearching(true);
      const response = await fetch(`/api/wc/products?search=${encodeURIComponent(query)}&per_page=15`);
      const data = await response.json();
      
      if (data.data && Array.isArray(data.data)) {
        const formattedResults = data.data.map(product => ({
          id: product.id,
          name: product.name,
          price: parseFloat(product.price) || 0,
          imageUrl: product.images && product.images.length > 0 
            ? product.images[0].src 
            : `https://placehold.co/300x200/f0f0f0/333?text=${encodeURIComponent(product.name.substring(0, 10))}`,
          slug: product.slug,
        }));
        setSearchResults(formattedResults);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching products:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Handle search input with debouncing
  const handleSearchInput = useCallback((value) => {
    setSearchInput(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchProducts(value);
    }, 300);
  }, [searchProducts]);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      fetchRecommendedProducts();
      const inputElement = document.querySelector("input[type='text']");
      if (inputElement) inputElement.focus();
    } else {
      setIsAnimating(false);
      setSearchInput("");
      setSearchResults([]);
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    }
  }, [isOpen, fetchRecommendedProducts]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const removeSearch = (termToRemove) => setLatestSearches(latestSearches.filter((t) => t !== termToRemove));
  const clearAllSearches = () => setLatestSearches([]);
  const clearSearchInput = () => {
    setSearchInput("");
    setSearchResults([]);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  };

  const handleSearchSubmit = (query) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery && !latestSearches.includes(trimmedQuery)) {
      setLatestSearches(prev => [trimmedQuery, ...prev.slice(0, 4)]);
    }
  };

  const scroll = (dir) => {
    if (scrollContainerRef.current) {
      // Calculate scroll distance based on card width (48rem) + spacing (1rem)
      const cardWidth = 208; // 48 (w-48) + 16 (space-x-4 converted to pixels)
      const cardsToScroll = 3; // Scroll 3 cards at a time for smoother navigation
      const scrollAmount = cardWidth * cardsToScroll;
      scrollContainerRef.current.scrollBy({
        left: dir === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-md z-[998] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Search Overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-auto min-h-[50%] bg-white font-sans p-4 md:p-6 shadow-2xl transform transition-transform duration-300 ease-in-out z-[999] overflow-hidden ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Header */}
        <header className="flex items-center space-x-4 mb-3">
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 flex items-center space-x-2 text-sm">
            <CloseIcon className="w-5 h-5" />
            <span>Close</span>
          </button>
          <div className="relative flex-grow">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => handleSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit(searchInput);
                }
              }}
              className="w-full pl-10 pr-10 py-2 border-b-2 border-blue-500 focus:outline-none"
            />
            {searchInput && (
              <button
                type="button"
                onClick={clearSearchInput}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        </header>

        {/* Latest Searches */}
        {latestSearches.length > 0 && (
          <div className="flex items-center flex-wrap gap-2 mb-6 text-sm text-gray-600">
            <span className="font-medium">Latest searches:</span>
            {latestSearches.map((term) => (
              <div key={term} className="flex items-center bg-gray-100 rounded-md px-2 py-1">
                <button 
                  onClick={() => {
                    setSearchInput(term);
                    handleSearchInput(term);
                    handleSearchSubmit(term);
                  }}
                  className="hover:text-blue-500"
                >
                  {term}
                </button>
                <button onClick={() => removeSearch(term)} className="ml-2 text-gray-400 hover:text-gray-700">
                  <CloseIcon className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button onClick={clearAllSearches} className="text-blue-500 hover:underline">
              Delete all
            </button>
          </div>
        )}

        {/* Content */}
        <main className="overflow-hidden m-0 p-0">
          {/* Search Results or Recommended Products */}
          <section className="relative overflow-visible m-0 p-0">
            {/* Loading State */}
            {isSearching && (
              <div className="relative">
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100 transition-opacity duration-300"
                >
                  <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
                </button>
                <div
                  ref={scrollContainerRef}
                  className="flex space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                  style={{ scrollBehavior: "smooth", marginBottom: 0 }}
                >
                  {Array.from({ length: 15 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
                <button
                  onClick={() => scroll("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100 transition-opacity duration-300"
                >
                  <ChevronRightIcon className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            )}

            {/* Search Results */}
            {searchInput.trim() && !isSearching && (
              <>
                <h2 className="font-semibold text-gray-800 m-0 p-0 text-sm mb-3">
                  Search results for "{searchInput}" ({searchResults.length} found)
                </h2>
                {searchResults.length > 0 ? (
                  <div className="relative">
                    <button
                      onClick={() => scroll("left")}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100 transition-opacity duration-300"
                    >
                      <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
                    </button>
                    <div
                      ref={scrollContainerRef}
                      className="flex space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                      style={{ scrollBehavior: "smooth", marginBottom: 0 }}
                    >
                      {searchResults.map((product) => (
                        <a
                          key={product.id}
                          href={`/product/${product.slug}`}
                          className="flex-shrink-0 w-48 h-60 border border-gray-200 rounded-lg p-3 group text-center hover:shadow-lg transition-all duration-300 ease-in-out snap-center"
                        >
                          <div className="relative mb-2 h-32 flex items-center justify-center bg-gray-50 rounded overflow-hidden transition-transform duration-300 group-hover:scale-105">
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              width={300}
                              height={200}
                              className="w-full h-full object-contain transition-opacity duration-300"
                            />
                          </div>
                          <h3 className="text-sm font-medium text-gray-800 h-10 line-clamp-2 transition-colors duration-300 group-hover:text-blue-500">
                            {product.name}
                          </h3>
                          <div className="mt-1 text-base font-semibold text-gray-700 transition-colors duration-300">
                            ${product.price.toFixed(2)}
                          </div>
                        </a>
                      ))}
                    </div>
                    <button
                      onClick={() => scroll("right")}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100 transition-opacity duration-300"
                    >
                      <ChevronRightIcon className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No products found for "{searchInput}"</p>
                    <p className="text-sm mt-2">Try different keywords.</p>
                  </div>
                )}
              </>
            )}

            {/* Recommended Products (shown when no search) */}
            {!searchInput.trim() && !isSearching && (
              <>
                <h2 className="font-semibold text-gray-800 m-0 p-0 text-sm">
                  Recommended products
                </h2>
                {isLoading ? (
                  <div className="relative">
                    <button
                      onClick={() => scroll("left")}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100 transition-opacity duration-300"
                    >
                      <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
                    </button>
                    <div
                      ref={scrollContainerRef}
                      className="flex space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                      style={{ scrollBehavior: "smooth", marginBottom: 0 }}
                    >
                      {Array.from({ length: 15 }).map((_, i) => (
                        <SkeletonCard key={i} />
                      ))}
                    </div>
                    <button
                      onClick={() => scroll("right")}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100 transition-opacity duration-300"
                    >
                      <ChevronRightIcon className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <button
                      onClick={() => scroll("left")}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100 transition-opacity duration-300"
                    >
                      <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
                    </button>
                    <div
                      ref={scrollContainerRef}
                      className="flex space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                      style={{ scrollBehavior: "smooth", marginBottom: 0 }}
                    >
                      {recommendedProducts.map((product) => (
                        <a
                          key={product.id}
                          href={`/product/${product.slug}`}
                          className="flex-shrink-0 w-48 h-60 border border-gray-200 rounded-lg p-3 group text-center hover:shadow-lg transition-all duration-300 ease-in-out snap-center"
                        >
                          <div className="relative mb-2 h-32 flex items-center justify-center bg-gray-50 rounded overflow-hidden transition-transform duration-300 group-hover:scale-105">
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              width={300}
                              height={200}
                              className="w-full h-full object-contain transition-opacity duration-300"
                            />
                          </div>
                          <h3 className="text-sm font-medium text-gray-800 h-10 line-clamp-2 transition-colors duration-300 group-hover:text-blue-500">
                            {product.name}
                          </h3>
                          <div className="mt-1 text-base font-semibold text-gray-700 transition-colors duration-300">
                            ${product.price.toFixed(2)}
                          </div>
                        </a>
                      ))}
                    </div>
                    <button
                      onClick={() => scroll("right")}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100 transition-opacity duration-300"
                    >
                      <ChevronRightIcon className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </main>

        {/* Footer */}

        {/* Hide Scrollbars and Enhance Carousel */}
        <style jsx global>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .snap-x {
            scroll-snap-type: x mandatory;
          }
          .snap-center {
            scroll-snap-align: center;
          }
          .scroll-container {
            scroll-behavior: smooth;
            transition: scroll-left 0.3s ease-in-out;
          }
        `}</style>
      </div>
    </>
  );
}