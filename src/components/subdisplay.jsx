"use client";
import React, { useState, useMemo, useEffect } from "react";
import NextLink from "next/link";
import productData from "../prodcutdata/product-data.json"; // ✅ Corrected import

// ✅ Utility: Validate and fix malformed URLs
const getValidUrl = (url) => {
  if (!url) return null;
  if (!url.startsWith("http"))
    return `https://${url.replace(/^https?/, "").replace(/^\/+/, "")}`;
  return url;
};

// ✅ Enhanced Image Component with loading state and better error handling
const Image = ({ src, alt, className, keyProp }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const validSrc = useMemo(() => {
    if (!src) return "https://placehold.co/600x400/CCCCCC/333333?text=Image+Missing";
    return getValidUrl(src);
  }, [src]);

  useEffect(() => {
    setIsVisible(false);
    setIsLoading(true);
    setHasError(false);
    const timeout = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timeout);
  }, [keyProp]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = (e) => {
    setHasError(true);
    setIsLoading(false);
    e.target.onerror = null;
    e.target.src = "https://placehold.co/600x400/CCCCCC/333333?text=Image+Missing";
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-pulse w-12 h-12 bg-gray-200 rounded-full"></div>
        </div>
      )}
      <img
        key={keyProp}
        src={validSrc}
        alt={alt}
        className={`
          transition-all duration-700 ease-out
          ${isVisible && !isLoading ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          ${hasError ? "filter grayscale" : ""}
          ${className}
        `}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

// ✅ Link wrapper with improved empty category and local URL handling
const Link = ({ href, children, className, onClick }) => {
  // Convert URLs to local project routes
  const cleanUrl = (url) => {
    if (!url) return "#";
    
    // If it's already a relative URL, return as is
    if (url.startsWith("/")) return url;

    try {
      // Try to parse the URL to check if it's external
      const urlObj = new URL(url);
      
      // If it's afs-foiling.com or contains product paths, convert to local route
      if (urlObj.hostname.includes('afs-foiling.com') || url.includes('/product-category/') || url.includes('/product/')) {
        const path = urlObj.pathname;
        
        if (path.includes('/product-category/')) {
          const parts = path.split('/product-category/')[1].split('/').filter(Boolean);
          const categoryPath = parts.join('/');
          
          // Handle special category redirects (used, second choice, accessories)
          const specialCategories = ['used', 'second-choice', 'accessories', 'end-of-line'];
          const lastPart = parts[parts.length - 1];
          
          if (specialCategories.includes(lastPart)) {
            // Keep the full path structure for special categories
            return `/category/${categoryPath}`;
          }
          
          return `/category/${categoryPath}`;
        }
        
        if (path.includes('/product/')) {
          const productPath = path.split('/product/')[1];
          return `/product/${productPath.replace(/\/+$/, '')}`;
        }
        
        if (path.includes('/whatsnew/')) {
          return '/whatsnew';
        }
      }
    } catch (e) {
      // If URL parsing fails, try direct string manipulation
      if (url.includes('/product-category/')) {
        const categoryPath = url.split('/product-category/')[1];
        return `/category/${categoryPath.replace(/\/+$/, '')}`;
      }
    }
    
    // For category and subcategory links, ensure they're local
    if (typeof window !== 'undefined' && url.includes('category')) {
      return `/${url.split('/').filter(Boolean).join('/')}`;
    }
    
    return url;
  };

  // Get the appropriate href for the current context
  const getValidHref = () => {
    if (typeof window === 'undefined') return cleanUrl(href);

    const path = window.location.pathname.toLowerCase();
    
    // Find current category and subcategory
    const category = productData.find(cat => {
      const catName = cat.category_level_1.toLowerCase();
      return path.includes(catName) || 
             (catName === 'prone foil' && path.includes('prone')) ||
             (catName === 'sup foil' && path.includes('sup'));
    });

    if (category) {
      const subcategory = category.sub_categories_level_2.find(sub => {
        const subName = sub.name.toLowerCase();
        return path.includes(subName) || href.toLowerCase().includes(subName);
      });

      // Priority order for URLs:
      // 1. Valid subcategory URL
      // 2. Category URL
      // 3. Constructed local path
      // 4. Default hash
      if (subcategory) {
        if (subcategory.category_url) {
          return cleanUrl(subcategory.category_url);
        }
        // Construct local path for empty categories
        return `/category/${category.category_level_1.toLowerCase()}/${subcategory.name.toLowerCase().replace(/\s+/g, '-')}`;
      }
      
      if (category.url_level_1) {
        return cleanUrl(category.url_level_1);
      }
      
      return `/category/${category.category_level_1.toLowerCase()}`;
    }

    return cleanUrl(href);
  };

  // Get the final URL and ensure it's properly formatted for internal routing
  const getFinalUrl = () => {
    const url = getValidHref();
    
    // Always treat URLs starting with "/" as internal
    if (url.startsWith('/')) {
      return url;
    }

    // Handle absolute URLs that should be internal
    if (url.includes('afs-foiling.com') || 
        url.includes('/product/') || 
        url.includes('/category/') ||
        url.includes('product-category')) {
      return cleanUrl(url);
    }

    return url;
  };

  const url = getFinalUrl();
  
  // Only external links (not starting with "/" and not our internal routes) should open in new tab
  const shouldOpenNewTab = url.includes('http') && !url.startsWith('/');

  return (
    <NextLink 
      href={url}
      className={className}
      onClick={onClick}
    >
      {children}
    </NextLink>
  );
};

// ✅ Enhanced Column Component with price formatting
const Column = ({ products, activeProductId, setActiveProductId, onProductClick }) => {
  const handleMouseEnter = (id) => setActiveProductId(id);

  // Format price helper
  const formatPrice = (price) => {
    if (!price) return null;
    const numPrice = parseFloat(price);
    if (isNaN(numPrice)) return price;
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(numPrice);
  };

  return (
    <div className="space-y-4 flex flex-col items-start w-full sm:w-[250px]">
      {products.map((product) => (
        <div
          key={product.productId}
          className="group cursor-pointer w-full"
          onMouseEnter={() => handleMouseEnter(product.productId)}
        >
          <Link 
            href={product.productUrl ? `/product/${product.productUrl.split('/').pop()}` : "#"} 
            className="block leading-tight"
            onClick={() => onProductClick && onProductClick()}
          >
            <span
              className={`font-["Alliance No.2"] text-[18px] leading-[21.6px] font-[500] transition-all duration-200 ${
                activeProductId === product.productId
                  ? "text-[#1d98ff] underline"
                  : "text-[#111111] hover:text-[#1d98ff] hover:underline"
              }`}
            >
              {product.title}
            </span>
          </Link>
          {product.price && (
            <div className="flex flex-col mt-1">
              <p className="text-sm text-gray-700 font-medium">
                {formatPrice(product.price)}
              </p>
              {product.old_price && (
                <p className="text-xs text-gray-500 line-through">
                  {formatPrice(product.old_price)}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ✅ Main Component
const FoilSubbar = ({ selectedSublinkId, onClose }) => {
  // Comprehensive category mapping and parsing
  const getCategoryAndSubcategory = (id) => {
    // Get the current path to determine the base category
    const getCurrentPath = () => {
      if (typeof window === 'undefined') return 'Wing Foil';
      const path = window.location.pathname.toLowerCase();
      const categoryMatches = {
        'downwind': 'Downwind',
        'prone': 'prone foil',
        'sup-foil': 'Sup foil',
        'wingfoil': 'Wingfoil',
        'dockstart': 'Dockstart',
        'parawing': 'Parawing',
        'wakefoil': 'Wakefoil',
        'windfoil': 'Windfoil',
        'windsurf': 'Windsurf'
      };
      
      for (const [pathPart, category] of Object.entries(categoryMatches)) {
        if (path.includes(pathPart)) return category;
      }
      return "Wing Foil"; // Default if no match
    };

    const baseCategory = getCurrentPath();
    if (!id) return { category: baseCategory, subcategory: "Foil" };
    
    // Complete category mapping table
    const categoryMappings = {
      // Main categories
      'wingfoil': 'Wingfoil',
      'wing': 'Wingfoil',
      'wingf': 'Wingfoil',
      'downwind': 'Downwind',
      'down': 'Downwind',
      'prone': 'prone foil',
      'pronefoil': 'prone foil',
      'sup': 'Sup foil',
      'supfoil': 'Sup foil',
      'dock': 'Dockstart',
      'dockstart': 'Dockstart',
      'para': 'Parawing',
      'parawing': 'Parawing',
      'wake': 'Wakefoil',
      'wakefoil': 'Wakefoil',
      'wind': 'Windfoil',
      'windfoil': 'Windfoil',
      'windsurf': 'Windsurf',
      'deals': 'Good deals',
      'gooddeals': 'Good deals',
      'whatsnew': 'Whatsnew'
    };

    // Common subcategories that appear across different main categories
    const commonSubcategories = {
      'foil': 'Foil',
      'mast': 'Mast',
      'frontw': 'Front wing',
      'front': 'Front wing',
      'frontwing': 'Front wing',
      'stab': 'Stabilizer',
      'stabilizer': 'Stabilizer',
      'board': 'Board',
      'fuse': 'Fuselage',
      'fuselage': 'Fuselage',
      'package': 'Package',
      'pack': 'Package',
      'access': 'Accessories',
      'accessories': 'Accessories',
      'used': 'Used',
      'second': 'Second choice',
      'tbar': 'Tbar'
    };

    const parts = id ? id.split('-') : [];
    let category;
    
    if (parts.length > 0) {
      category = parts[0].toLowerCase();
      parts.splice(0, 1);
      // Find the matching main category
      category = categoryMappings[category] || category;
    } else {
      // Use the category from the current path if no id is provided
      category = baseCategory;
    }
    
    // Handle special combined cases
    if (parts.length > 0) {
      const fullId = parts.join('').toLowerCase();
      if (fullId.includes('foil') || fullId.includes('wing')) {
        const specialKey = Object.keys(categoryMappings).find(key => fullId.includes(key));
        if (specialKey) {
          category = categoryMappings[specialKey];
        }
      }
    }

    // Process subcategory
    let subcategory = parts.join(' ');
    if (subcategory) {
      // Check for known subcategory mappings
      const subKey = subcategory.toLowerCase().replace(/[^a-z]/g, '');
      subcategory = commonSubcategories[subKey] || subcategory;
    } else {
      subcategory = 'Foil'; // Default subcategory
    }

    return {
      category: category,
      subcategory: subcategory.charAt(0).toUpperCase() + subcategory.slice(1)
    };
  };

  const { category, subcategory } = getCategoryAndSubcategory(selectedSublinkId);
  const categoryText = category.charAt(0).toUpperCase() + category.slice(1); // Capitalize
  const subcategoryText = subcategory.charAt(0).toUpperCase() + subcategory.slice(1); // Capitalize

  // ✅ Special sublinks that should redirect to their category pages
  const specialSublinks = {
    "used": (cat) => `/category/${cat.toLowerCase()}/used`,
    "second choice": (cat) => `/category/${cat.toLowerCase()}/second-choice`,
    "accessories": (cat) => `/category/${cat.toLowerCase()}/accessories`,
    "end of line": (cat) => `/category/${cat.toLowerCase()}/end-of-line`,
  };

  const normalizedSublink = subcategoryText
    ? subcategoryText.toLowerCase().trim()
    : null;

  // Check if current sublink is special and needs redirection
  if (normalizedSublink) {
    for (const [special, getUrl] of Object.entries(specialSublinks)) {
      if (normalizedSublink === special) {
        // Redirect to the appropriate category page
        if (typeof window !== 'undefined') {
          window.location.href = getUrl(categoryText);
        }
        return null;
      }
    }
  }

  // ✅ Excluded paths
  let normalizedPath = null;
  if (typeof window !== "undefined") {
    try {
      normalizedPath = window.location.pathname.replace(/\/+$|^\s+|\s+$/g, "").toLowerCase();
      console.log('Current path:', normalizedPath);
    } catch {
      normalizedPath = null;
    }
  }

  const isParawingFullset = normalizedPath && (
    normalizedPath.includes("/parawing/") && 
    (normalizedPath.includes("/foil-fullset") || normalizedPath.includes("fullset"))
  );

  const isWindfoilTBar = normalizedPath && (
    normalizedPath.includes("/windfoil/") && 
    normalizedPath.includes("/t-bar")
  );

  if (isParawingFullset || isWindfoilTBar) {
    return null;
  }

  // ✅ Comprehensive product filtering with complete category handling
  const filteredProducts = useMemo(() => {
    if (!productData || !Array.isArray(productData)) return [];
    
    // Advanced string normalization
    const normalizeString = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Category mapping for exact matches
    const categoryMappings = {
      'wingfoil': ['wingfoil', 'wing foil', 'wing'],
      'downwind': ['downwind', 'down wind'],
      'pronefoil': ['prone foil', 'prone', 'pronefoil'],
      'supfoil': ['sup foil', 'sup foil foiling', 'supfoil'],
      'dockstart': ['dockstart', 'dock start'],
      'parawing': ['parawing', 'para wing'],
      'wakefoil': ['wakefoil', 'wake foil'],
      'windfoil': ['windfoil', 'wind foil'],
      'windsurf': ['windsurf', 'wind surf'],
      'gooddeals': ['good deals', 'deals']
    };

    // Get all possible variations of the target category and maintain context
    const targetNormalized = normalizeString(categoryText);
    let possibleCategories;

    // Check if we're in a specific category context from the URL
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      Object.entries(categoryMappings).forEach(([key, values]) => {
        if (values.some(v => path.includes(normalizeString(v)))) {
          possibleCategories = values;
        }
      });
    }

    // If no context was found from URL, use the category mappings
    if (!possibleCategories) {
      possibleCategories = Object.entries(categoryMappings)
        .find(([key, values]) => 
          values.some(v => normalizeString(v) === targetNormalized)
        )?.[1] || [categoryText];
    }

    // Find the matching category with flexible matching
    const categoryData = productData.find(cat => {
      const catName = cat.category_level_1.toLowerCase();
      return possibleCategories.some(possible => 
        catName === possible.toLowerCase() ||
        normalizeString(catName) === normalizeString(possible)
      );
    });
    
    if (!categoryData) {
      console.log('Category match attempt failed for:', {
        searched: categoryText,
        normalized: targetNormalized,
        possibleMatches: possibleCategories
      });
      return [];
    }

    // Enhanced subcategory matching with complete mapping
    const subcategoryMappings = {
      'foil': ['foil', 'foil full set', 'foil-full-set'],
      'mast': ['mast', 'mast foil'],
      'frontwing': ['front wing', 'frontwing', 'front-wing'],
      'stabilizer': ['stabilizer', 'stab', 'stabiliser'],
      'fuselage': ['fuselage', 'fuse'],
      'board': ['board', 'boards'],
      'package': ['package', 'pack', 'packages'],
      'accessories': ['accessories', 'access'],
      'tbar': ['tbar', 't-bar', 't bar']
    };

    const normalizedSubcat = normalizeString(subcategoryText);
    const subcategoryData = categoryData.sub_categories_level_2.find(sub => {
      const subName = normalizeString(sub.name);
      
      // Direct match
      if (subName === normalizedSubcat) return true;
      
      // Check mapped variations
      return Object.values(subcategoryMappings).some(variations =>
        variations.some(v => normalizeString(v) === normalizedSubcat) &&
        variations.some(v => normalizeString(v) === subName)
      );
    });

    if (!subcategoryData) {
      console.log('Subcategory match attempt failed for:', {
        category: categoryText,
        subcategory: subcategoryText,
        normalized: normalizedSubcat,
        availableSubcategories: categoryData.sub_categories_level_2.map(sub => sub.name)
      });
    }

    if (!subcategoryData || !subcategoryData.products) return [];

    // Map the products to our desired format with improved field handling
    return subcategoryData.products.map(product => {
      // Generate a stable ID if none exists
      const generateId = () => {
        const base = product.title || product.name || product.image_url || '';
        return base ? 
          `${categoryText.toLowerCase()}-${base.toLowerCase().replace(/[^a-z0-9]/g, '-')}` :
          Math.random().toString(36).substr(2, 9);
      };

      return {
        productId: product.id || generateId(),
        title: product.title || product.name || 'Untitled Product',
        price: product.price || product.product_price,
        old_price: product.old_price || product.previous_price,
        productUrl: product.url || product.product_url || product.link,
        imageUrl: product.image_url || product.image || product.thumbnail,
        category: categoryText,
        subcategory: subcategoryText,
        description: product.description || product.short_description,
        inStock: product.in_stock !== undefined ? product.in_stock : true
      };
    });
  }, [categoryText, subcategoryText]);

  // Remove duplicates by productId
  const uniqueProducts = Array.from(
    new Map(filteredProducts.map(p => [p.productId, p])).values()
  );

  // ✅ Adaptive column logic
  let col1Products = [];
  let col2Products = [];

  if (uniqueProducts.length > 4) {
    const midIndex = Math.ceil(uniqueProducts.length / 2);
    col1Products = uniqueProducts.slice(0, midIndex);
    col2Products = uniqueProducts.slice(midIndex);
  } else {
    col1Products = uniqueProducts;
  }

  // ✅ Active product logic
  const firstProduct = uniqueProducts[0];
  const [activeProductId, setActiveProductId] = useState(firstProduct?.productId);
  const activeProduct =
    uniqueProducts.find((p) => p.productId === activeProductId) || firstProduct;

  return (
    <div 
      className="w-full bg-[#f9fafb] py-3" 
      style={{ fontFamily: "'Alliance No.2', sans-serif" }}
      onMouseLeave={onClose}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titles */}
        <div className="mb-5 px-4">
<p className="text-[16px] leading-[17.6px] font-semibold text-[rgba(17,17,17,0.75)] font-['Alliance No.2']">
  {categoryText}
</p>
<h2 className="text-[28px] leading-[28px] font-bold text-[rgba(17,17,17,0.75)] font-['Alliance No.2']">
  {subcategoryText}
</h2>
        </div>

        {/* ✅ Product Layout */}
        <div
          className={`w-full flex flex-col lg:flex-row justify-between items-start gap-8 px-4 ${
            col2Products.length === 0 ? "lg:justify-center" : ""
          }`}
        >
          {/* Columns */}
          <div
            className={`flex ${
              col2Products.length > 0
                ? "flex-col sm:flex-row gap-8 lg:gap-6"
                : "flex-col items-center"
            } w-full lg:w-auto`}
          >
            <Column
              products={col1Products}
              activeProductId={activeProductId}
              setActiveProductId={setActiveProductId}
              onProductClick={onClose}
            />
            {col2Products.length > 0 && (
              <Column
                products={col2Products}
                activeProductId={activeProductId}
                setActiveProductId={setActiveProductId}
                onProductClick={onClose}
              />
            )}
          </div>

          {/* ✅ Image */}
          <Image
            keyProp={activeProduct?.productId}
            src={activeProduct?.imageUrl || activeProduct?.image}
            alt={activeProduct?.title || "Product Image"}
            className="max-h-[340px] w-auto max-w-full mx-auto hover:scale-105"
          />
        </div>

        {/* ✅ Bottom Links with local URL handling */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10">
            {(() => {
              // Find the current category in product data
              const currentCategory = productData.find(
                cat => cat.category_level_1.toLowerCase() === categoryText.toLowerCase()
              );
              
              // Find the current subcategory
              const currentSubcategory = currentCategory?.sub_categories_level_2.find(
                sub => sub.name.toLowerCase() === subcategoryText.toLowerCase()
              );

              // Get link text
              const getLinkText = () => {
                if (currentSubcategory?.category_url_label) {
                  return currentSubcategory.category_url_label;
                }
                return `All ${categoryText.toLowerCase()} ${subcategoryText.toLowerCase()} sets`;
              };

              // Construct local URL
              const getLocalUrl = () => {
                const basePath = '/category';
                const categorySlug = categoryText.toLowerCase().replace(/\s+/g, '-');
                const subcategorySlug = subcategoryText.toLowerCase().replace(/\s+/g, '-');
                
                // Handle empty categories with specific URLs
                if (currentSubcategory?.category_url) {
                  const externalUrl = currentSubcategory.category_url;
                  if (externalUrl.includes('product-category')) {
                    const pathParts = externalUrl.split('product-category/')[1];
                    return `${basePath}/${pathParts}`.replace(/\/+$/, '');
                  }
                }
                
                // Handle category URLs for empty categories
                if (!currentSubcategory?.products?.length && currentCategory?.url_level_1) {
                  const url = currentCategory.url_level_1;
                  if (url.includes('product-category')) {
                    const pathParts = url.split('product-category/')[1];
                    return `${basePath}/${pathParts}`.replace(/\/+$/, '');
                  }
                }
                
                // Default local URL structure
                return `${basePath}/${categorySlug}/${subcategorySlug}`;
              };

              const finalUrl = getLocalUrl();

              return (
                <Link
                  href={finalUrl}
                  className="font-['Alliance No.2'] text-[18px] leading-[21.6px] font-[500] text-[#111111] hover:text-[#1d98ff] transition-colors"
                  onClick={onClose}
                >
                  {getLinkText()} &rsaquo;
                </Link>
              );
            })()}
            
            {categoryText.toLowerCase() === 'wing foil' && (
              <Link
                href="/foil-characteristics"
                className="font-['Alliance No.2'] text-[18px] leading-[21.6px] font-[500] text-[#111111] hover:text-[#1d98ff] transition-colors"
                onClick={onClose}
              >
                Complete foil search tool &rsaquo;
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoilSubbar;
