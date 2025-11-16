"use client";

import { useState, useEffect, useRef } from "react";

export default function FilterNavigation({
  onCategoryChange,
  selectedCategories = [],
  className = "",
  categorySlug = "wingfoil",
  onPriceChange,
}) {
  const [selected, setSelected] = useState(selectedCategories);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [tempMinPrice, setTempMinPrice] = useState(0);
  const [tempMaxPrice, setTempMaxPrice] = useState(10000);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        // Map common URL slugs to WooCommerce slugs
        // These mappings handle cases where URL structure differs from WooCommerce
        const slugMapping = {
          'wingfoil': 'wing-foil',
          'pronefoil': 'prone-foil',
          'supfoil': 'sup-foil',
          'wakefoil': 'wakefoil',  // Keep as-is
          'windfoil': 'windfoil',  // Keep as-is
          'kitefoil': 'kite-foil',
          'dockstart': 'dockstart',
          'downwind': 'downwind',
          'parawing': 'parawing',
          // Already correct formats
          'wing-foil': 'wing-foil',
          'prone-foil': 'prone-foil',
          'sup-foil': 'sup-foil',
          'kite-foil': 'kite-foil',
        };
        
        const rawSlug = categorySlug || "wing-foil";
        const slugToUse = slugMapping[rawSlug.toLowerCase()] || rawSlug;
        
        const response = await fetch(`/api/category-tree?slug=${encodeURIComponent(slugToUse)}`);
        
        if (!response.ok) {
          // Category not found or error - this is normal for categories without subcategories
          setCurrentCategories([]);
          setLoading(false);
          return;
        }
        
        const data = await response.json();
        
        // Transform API data to match the existing structure
        const transformedCategories = (data.tree || []).map(cat => ({
          id: cat.id,
          label: cat.name,
          value: cat.id,
          children: (cat.children || []).map(child => ({
            id: child.id,
            label: child.name,
            value: child.id,
          }))
        }));
        
        setCurrentCategories(transformedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCurrentCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [categorySlug]);

  useEffect(() => {
    setSelected(selectedCategories);
  }, [selectedCategories]);

  const toggleCategory = (categoryId) => {
    const newSelected = selected.includes(categoryId)
      ? selected.filter((id) => id !== categoryId)
      : [...selected, categoryId];

    setSelected(newSelected);
    if (onCategoryChange) onCategoryChange(newSelected);
  };

  const handlePriceFilter = () => {
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);

    if (onPriceChange) {
      onPriceChange({
        min: tempMinPrice > 0 ? tempMinPrice : null,
        max: tempMaxPrice < 10000 ? tempMaxPrice : null,
      });
    }
  };

  const clearPriceFilter = () => {
    setMinPrice(0);
    setMaxPrice(10000);
    setTempMinPrice(0);
    setTempMaxPrice(10000);
    if (onPriceChange) onPriceChange({ min: null, max: null });
  };

  const renderCategoryItem = (category, isChild = false) => (
    <div key={category.id} className={`${isChild ? "ml-6" : ""} mb-4`}>
      <label
        htmlFor={`cat-${category.id}`}
        className="flex items-center space-x-3 cursor-pointer group"
      >
        <input
          type="checkbox"
          id={`cat-${category.id}`}
          name="product_cat"
          value={category.value}
          checked={selected.includes(category.id)}
          onChange={() => toggleCategory(category.id)}
          className="appearance-none h-3.5 w-3.5 border border-gray-400 rounded-sm checked:bg-black checked:border-black transition-all duration-200 cursor-pointer"
        />

        <span
          className="uppercase"
          style={{
            fontFamily: '"Alliance No.2", sans-serif',
            fontSize: "15px",
            fontWeight: 600,
            lineHeight: "18px",
            color: "rgb(153, 153, 153)",
          }}
        >
          {category.label}
        </span>
      </label>
    </div>
  );

  const renderCategory = (category) => (
    <div key={category.id}>
      {renderCategoryItem(category)}
      {category.children && (
        <div className="space-y-2 mt-2">
          {category.children.map((child) => renderCategoryItem(child, true))}
        </div>
      )}
    </div>
  );

  // Draggable logic
  const trackRef = useRef(null);
  const draggingRef = useRef(null);

  const getPriceFromPosition = (pos) => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    const percentage = (pos - rect.left) / rect.width;
    return Math.round((percentage * 10000) / 10) * 10;
  };

  const handleStart = (e, type) => {
    e.preventDefault();
    draggingRef.current = type;
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleMove, { passive: false });
    document.addEventListener("touchend", handleEnd);
  };

  const handleMove = (e) => {
    if (!draggingRef.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let newPrice = getPriceFromPosition(clientX);
    newPrice = Math.max(0, Math.min(10000, newPrice));

    if (draggingRef.current === "min") {
      setTempMinPrice(Math.min(newPrice, tempMaxPrice - 10));
    } else {
      setTempMaxPrice(Math.max(newPrice, tempMinPrice + 10));
    }
  };

  const handleEnd = () => {
    draggingRef.current = null;
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("mouseup", handleEnd);
    document.removeEventListener("touchmove", handleMove);
    document.removeEventListener("touchend", handleEnd);
  };

  return (
    <nav className={`w-full overflow-x-hidden ${className}`}>
      {/* Categories */}
      <h3
        className="mb-8 uppercase tracking-wider text-black font-bold"
        style={{
          fontFamily: '"Alliance No.2", sans-serif',
          fontSize: "18px",
          lineHeight: "20px",
        }}
      >
        Categories
      </h3>

      <div className="space-y-1 mb-12">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-5 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : currentCategories.length > 0 ? (
          currentCategories.map((category) => renderCategory(category))
        ) : (
          <div className="text-gray-500 text-sm">
            No filters available for &ldquo;{categorySlug}&rdquo;
          </div>
        )}
      </div>

  {/* Price Filter Section */}
  <div>
        <div className="text-black font-bold tracking-wider uppercase mb-8" style={{
          fontFamily: '"Alliance No.2", sans-serif',
          fontSize: "18px",
          lineHeight: "20px",
        }}>
          PRICE
        </div>

  {/* Range Track */}
  <div className="relative h-1 mb-8 px-5" ref={trackRef}>
          <div className="absolute left-0 right-0 border-t-2 border-dashed border-gray-400 top-1/2 -translate-y-1/2"></div>

          {/* Min Bubble */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full shadow-md cursor-pointer z-20"
            style={{ left: `${(tempMinPrice / 10000) * 100}%` }}
            onMouseDown={(e) => handleStart(e, "min")}
            onTouchStart={(e) => handleStart(e, "min")}
          ></div>

          {/* Max Bubble */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full shadow-md cursor-pointer z-20"
            style={{ left: `${(tempMaxPrice / 10000) * 100}%` }}
            onMouseDown={(e) => handleStart(e, "max")}
            onTouchStart={(e) => handleStart(e, "max")}
          ></div>
        </div>

        {/* Price Labels */}
        <div className="text-black text-sm font-medium text-left mb-6">
          €{tempMinPrice.toFixed(2)} – €{tempMaxPrice.toFixed(2)}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handlePriceFilter}
            className="flex-1 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            style={{
              fontFamily: '"Alliance No.2", sans-serif',
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Apply
          </button>

          {(minPrice > 0 || maxPrice < 10000) && (
            <button
              onClick={clearPriceFilter}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              style={{
                fontFamily: '"Alliance No.2", sans-serif',
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
