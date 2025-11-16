"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import FilterNavigation from "@/components/FilterNavigation";
import CategoriesFilter from "@/components/categoriesFilter";
import { unSlugify, createSlug } from "@/utils/slugUtils";
import HeroImage from "@/assets/images/GWEN-WB-D-lite-1024x573.png.webp";
import NAV_LINKS from "@/constants/navlinks";
import { FILTER_CATEGORIES, getAllCategoryIdsForSlug } from "@/constants/categories";
import { handleEnhancedPriceFilter } from "@/utils/categoryFilterUtils";
import Article from "@/constants/Article";
import FeatureBar from "@/constants/FeatureBar";

// Helper function to extract bestseller value from product metadata
const getBestsellerValue = (product) => {
  if (!product?.meta_data || !Array.isArray(product.meta_data)) {
    return null;
  }
  
  const bestsellerMeta = product.meta_data.find(meta => meta.key === "bestseller");
  return bestsellerMeta?.value || null;
};

// Helper function to get stock status information
const getStockInfo = (product) => {
  return {
    stockStatus: product?.stock_status || "instock",
    purchasable: product?.purchasable !== false,
    stockQuantity: product?.stock_quantity || 0,
    manageStock: product?.manage_stock || false
  };
};

export default function SubCategoryPage() {
  const params = useParams();
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [parentCategoryId, setParentCategoryId] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState([]);
  const [categoryImage, setCategoryImage] = useState(null);
  const [filterSelectedCategories, setFilterSelectedCategories] = useState([]);
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState({ min: null, max: null });
  const [matchedSubcategory2Id, setMatchedSubcategory2Id] = useState(null);

  // Handle filter category changes and fetch products
  const handleCategoryFilterChange = async (selectedCategoryIds, currentPage = 1) => {
    setFilterSelectedCategories(selectedCategoryIds);
    setError(null);
    setPage(currentPage);
    
    if (selectedCategoryIds.length === 0 && !priceFilter.min && !priceFilter.max) {
      setProducts(allProducts);
      setPage(1);
      setTotalPages(Math.ceil(allProducts.length / perPage) || 1);
      setTotalProductCount(allProducts.length);
      return;
    }
    setLoading(true);
    try {
      const categoryParam = selectedCategoryIds.length > 0 ? selectedCategoryIds.join(',') : '';
      let url = `/api/wc/products?page=${currentPage}&per_page=${perPage}`;
      
      if (categoryParam) {
        url += `&category=${encodeURIComponent(categoryParam)}`;
      }
      if (priceFilter.min !== null) {
        url += `&min_price=${priceFilter.min}`;
      }
      if (priceFilter.max !== null) {
        url += `&max_price=${priceFilter.max}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch filtered products: ${response.status} ${errorText}`);
      }

      const json = await response.json();
      const filteredProducts = Array.isArray(json?.data) ? json.data : [];
      const meta = json?.meta || {};
      
      const productMap = new Map();
      filteredProducts.forEach(product => {
        if (product && product.id) {
          productMap.set(product.id, product);
        }
      });
      
      const uniqueProducts = Array.from(productMap.values());
      setProducts(uniqueProducts);
      setTotalPages(meta.totalPages || Math.ceil((meta.total || uniqueProducts.length) / perPage) || 1);
      setTotalProductCount(meta.total || uniqueProducts.length);
    } catch (error) {
      console.error('Error fetching filtered products:', error);
      setError(error.message || 'Failed to load filtered products');
      setProducts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Handle price filter changes
  const handlePriceFilterChange = async (priceRange) => {
    setPriceFilter(priceRange);
    
    const context = {
      pageType: 'subcategory2',
      categorySlug: params.category,
      subcategorySlug: params.subcategory,
      subcategory2Slug: params.subcategory2,
      filterSelectedCategories,
      matchedSubcategory2Id
    };
    
    await handleEnhancedPriceFilter(context, priceRange, {
      setLoading,
      setError,
      setProducts,
      setTotalPages,
      setTotalProductCount,
      setPage,
      allProducts,
      perPage
    });
  };

  // Apply client-side filtering when subcategory selection changes
  useEffect(() => {
    if (filterSelectedCategories.length > 0) return;

    if (!selectedSubcategoryIds || selectedSubcategoryIds.length === 0) {
      setProducts(allProducts);
      return;
    }

    const filtered = allProducts.filter((p) => {
      const cats = p.categories || [];
      return cats.some((c) => {
        if (!c) return false;
        if (typeof c === 'number') return selectedSubcategoryIds.includes(c);
        if (typeof c === 'object' && c.id) return selectedSubcategoryIds.includes(c.id);
        return false;
      });
    });

    setProducts(filtered);
  }, [selectedSubcategoryIds, allProducts, filterSelectedCategories]);

  // Get the current category, subcategory, and subcategory2 from the URL
  const category = params.category;
  const subcategory = params.subcategory;
  const subcategory2 = params.subcategory2;
  const categoryDisplay = unSlugify(category);
  const subcategoryDisplay = unSlugify(subcategory);
  const subcategory2Display = unSlugify(subcategory2);

  // Check if categories exist for this subcategory2. Treat special listing
  // slugs as having filters so the sidebar is shown (we fallback to parent filters
  // when loading data if needed).
  const specialSlugs = ["used", "second-choice", "accessories", "end-of-line"];
  const hasFilterCategories =
    (FILTER_CATEGORIES[subcategory2] && FILTER_CATEGORIES[subcategory2].length > 0) ||
    specialSlugs.includes(String(subcategory2).toLowerCase());

  // Generate breadcrumb data (robust to sublink objects that don't include `href`)
  const breadcrumbData = (() => {
    const mainCategory = NAV_LINKS.find((link) =>
      link.sublinks?.some((sub) => {
        if (!sub) return false;
        // Match by explicit href if present
        if (typeof sub.href === "string" && sub.href.includes(category)) return true;
        // Match by id if present
        if (typeof sub.id === "string" && sub.id.includes(category)) return true;
        // Match by slugified name
        if (typeof sub.name === "string" && createSlug(sub.name) === category) return true;
        return false;
      })
    );

    if (!mainCategory) {
      return {
        main: categoryDisplay,
        mainHref: `/category/${category}`,
        sub: subcategoryDisplay,
        subHref: `/category/${category}/${subcategory}`,
        sub2: subcategory2Display,
      };
    }

    const subCategory = mainCategory.sublinks.find((sub) => {
      if (!sub) return false;
      if (typeof sub.href === "string" && sub.href.includes(subcategory)) return true;
      if (typeof sub.id === "string" && sub.id.includes(subcategory)) return true;
      if (typeof sub.name === "string" && createSlug(sub.name) === subcategory) return true;
      return false;
    });

    return {
      main: mainCategory.name,
      mainHref: `/category/${category}`,
      sub: subCategory ? subCategory.name : subcategoryDisplay,
      subHref: `/category/${category}/${subcategory}`,
      sub2: subcategory2Display,
    };
  })();

  // Fetch categories and products
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        // Check if filter categories exist for subcategory2
        // Try to get filter categories for this subcategory2. If none are defined and
        // the slug matches a special listing page (used, second-choice, accessories, end-of-line),
        // fall back to parent subcategory or main category filters so the sidebar shows.
        let filterCategoryIds = getAllCategoryIdsForSlug(subcategory2);
        const specialSlugs = ["used", "second-choice", "accessories", "end-of-line"];
        if ((!filterCategoryIds || filterCategoryIds.length === 0) && specialSlugs.includes(String(subcategory2).toLowerCase())) {
          // Prefer the immediate parent subcategory first
          filterCategoryIds = getAllCategoryIdsForSlug(subcategory) || getAllCategoryIdsForSlug(category);
        }
        
        if (filterCategoryIds.length > 0) {
          // subcategory2 exists in FILTER_CATEGORIES - use those filter categories
          console.log(`Using filter categories for ${subcategory2}:`, filterCategoryIds);
          
          // Fetch category image from WooCommerce for display
          const cRes = await fetch(`/api/wc/categories?slug=${encodeURIComponent(subcategory2)}`);
          if (cRes.ok) {
            const cjson = await cRes.json();
            const cat = (cjson || [])[0];
            if (cat?.image?.src) {
              setCategoryImage(cat.image.src);
            }
          }
          
          // Fetch products using filter category IDs
          const categoryParam = filterCategoryIds.join(',');
          const productsRes = await fetch(`/api/wc/products?category=${encodeURIComponent(categoryParam)}&page=${page}&per_page=${perPage}`);
          if (!productsRes.ok) throw new Error('Failed to load products for categories');
          const json = await productsRes.json();
          const allFetchedProducts = Array.isArray(json?.data) ? json.data : [];
          const meta = json?.meta || {};
          if (cancelled) return;
          const map = new Map();
          allFetchedProducts.forEach(prod => { map.set(prod.id, prod); });
          const aggregated = Array.from(map.values());
          setAllProducts(aggregated);
          setProducts(aggregated);
          setTotalPages(meta.totalPages || 1);
          setTotalProductCount(meta.total || aggregated.length);
        } else {
          // subcategory2 does NOT exist in FILTER_CATEGORIES - fetch by slug
          console.log(`No filter categories for ${subcategory2}, fetching by slug`);
          
          // Fetch the WooCommerce category by subcategory2 slug
          const cRes = await fetch(`/api/wc/categories?slug=${encodeURIComponent(subcategory2)}`);
          if (!cRes.ok) throw new Error('Failed to load category');
          const cjson = await cRes.json();
          if (cancelled) return;
          const subcategory2Cat = (cjson || [])[0];
          
          if (subcategory2Cat && subcategory2Cat.id) {
            // Track the matched subcategory2 ID for price filtering
            setMatchedSubcategory2Id(subcategory2Cat.id);
            // Set category image
            setCategoryImage(subcategory2Cat?.image?.src || HeroImage);
            
            // Fetch products using only this category's ID
            console.log(`Fetching products for category ID: ${subcategory2Cat.id}`);
            const productsRes = await fetch(`/api/wc/products?category=${encodeURIComponent(subcategory2Cat.id)}&page=${page}&per_page=${perPage}`);
            if (!productsRes.ok) throw new Error('Failed to load products for category');
            const json = await productsRes.json();
            const allFetchedProducts = Array.isArray(json?.data) ? json.data : [];
            const meta = json?.meta || {};
            if (cancelled) return;
            const map = new Map();
            allFetchedProducts.forEach(prod => { map.set(prod.id, prod); });
            const aggregated = Array.from(map.values());
            setAllProducts(aggregated);
            setProducts(aggregated);
            setTotalPages(meta.totalPages || 1);
            setTotalProductCount(meta.total || aggregated.length);
          } else {
            // Category not found
            setCategoryImage(HeroImage);
            setAllProducts([]);
            setProducts([]);
            setTotalPages(1);
            setTotalProductCount(0);
          }
        }
      } catch (e) {
        if (!cancelled) setError(e.message || 'Unknown error');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [category, subcategory, subcategory2, categoryDisplay, subcategoryDisplay, subcategory2Display, page, perPage]);

  // Sync navbar height
  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (navbar) setNavbarHeight(navbar.offsetHeight);

    const handleResize = () => {
      const nav = document.querySelector("nav");
      if (nav) setNavbarHeight(nav.offsetHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col px-4 sm:px-6 md:px-10 gap-6">
      {/* Hero Section */}
      <div
        className="relative w-screen h-[60vh] sm:h-[80vh] overflow-hidden -mx-[calc((100vw-100%)/2)] mb-16 sm:mb-24"
        style={{ marginTop: `-${navbarHeight}px` }}
      >
        <Image
          src={categoryImage || HeroImage}
          alt={`${categoryDisplay} - ${subcategoryDisplay} - ${subcategory2Display}`}
          fill
          priority
          className="object-cover"
        />
        {/* Breadcrumbs */}
        <div
          className="absolute left-4 sm:left-6 px-2 sm:px-3 py-2 z-30"
          style={{
            top: `${navbarHeight + 16}px`,
            fontFamily: '"alliance no.2", sans-serif',
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "18px",
            color: "rgba(255, 255, 255, 0.6)",
          }}
        >
          <div className="flex items-center gap-1 opacity-90 flex-wrap">
            <Link href="/" className="hover:no-underline">
              Home
            </Link>
            <span className="mx-0.5">/</span>
            <Link
              href={breadcrumbData.mainHref}
              className="hover:no-underline capitalize"
            >
              {breadcrumbData.main}
            </Link>
            {breadcrumbData.sub && (
              <>
                <span className="mx-0.5">/</span>
                <Link
                  href={breadcrumbData.subHref}
                  className="hover:no-underline capitalize"
                >
                  {breadcrumbData.sub}
                </Link>
              </>
            )}
            {breadcrumbData.sub2 && (
              <>
                <span className="mx-0.5">/</span>
                <span className="font-semibold capitalize">
                  {breadcrumbData.sub2}
                </span>
              </>
            )}
          </div>
        </div>
        {/* Category Title */}
        <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-6 text-white px-3 sm:px-5 py-2 sm:py-3">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold capitalize tracking-wide">
            {subcategory2Display}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Button for Mobile */}
        {hasFilterCategories && (
          <div className="md:hidden">
            <button
              className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded-md mb-4"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              {isFilterOpen ? "Close Filters" : "Filters"}
            </button>
            {isFilterOpen && (
              <aside className="w-full mb-6">
                {["used", "second-choice", "accessories", "end-of-line"].includes(String(subcategory2).toLowerCase()) ? (
                  <CategoriesFilter onChange={handleCategoryFilterChange} />
                ) : (
                  <FilterNavigation
                    onCategoryChange={handleCategoryFilterChange}
                    selectedCategories={filterSelectedCategories}
                    categorySlug={subcategory2}
                    onPriceChange={handlePriceFilterChange}
                    className="w-full"
                  />
                )}
              </aside>
            )}
          </div>
        )}

        {/* Sidebar for Desktop */}
        {hasFilterCategories && (
          <aside
            className="hidden md:block w-56 min-w-[180px] max-w-xs sticky top-[100px] self-start h-[calc(100vh-120px)] overflow-y-auto z-20"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#ccc transparent",
            }}
          >
            {["used", "second-choice", "accessories", "end-of-line"].includes(String(subcategory2).toLowerCase()) ? (
              <CategoriesFilter onChange={handleCategoryFilterChange} />
            ) : (
              <FilterNavigation
                onCategoryChange={handleCategoryFilterChange}
                selectedCategories={filterSelectedCategories}
                categorySlug={subcategory2}
                onPriceChange={handlePriceFilterChange}
                className="max-w-none w-full"
              />
            )}
          </aside>
        )}

        {/* Main Content Area */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-600">
              {filterSelectedCategories.length > 0 && (
                <span className="text-blue-600 font-medium">
                  Filtered by {filterSelectedCategories.length} categor{filterSelectedCategories.length === 1 ? 'y' : 'ies'}
                </span>
              )}
            </div>
            <div>
              {(selectedSubcategoryIds.length > 0 || filterSelectedCategories.length > 0 || priceFilter.min || priceFilter.max) && (
                <button
                  className="text-sm text-blue-600 underline hover:text-blue-800"
                  onClick={() => {
                    setSelectedSubcategoryIds([]);
                    setFilterSelectedCategories([]);
                    setPriceFilter({ min: null, max: null });
                    setProducts(allProducts);
                    setError(null);
                    setPage(1);
                    setTotalPages(Math.ceil(allProducts.length / perPage) || 1);
                    setTotalProductCount(allProducts.length);
                  }}
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Product Grid */}
          <main className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {loading ? (
              Array.from({length: 8}).map((_, i) => (
                <div key={i} className="animate-pulse group w-full max-w-sm bg-white overflow-hidden rounded-none shadow-sm flex flex-col">
                  <div className="relative w-full aspect-[4/5] bg-gray-200 rounded-lg"></div>
                  <div className="flex flex-col justify-between flex-1 px-3 sm:px-4 pt-3 sm:pt-4 pb-4 text-center">
                    <div>
                      <div className="bg-gray-200 h-6 rounded mb-1 mt-2"></div>
                      <div className="bg-gray-200 h-4 rounded mb-2"></div>
                    </div>
                    <div className="mt-2 mb-4">
                      <div className="bg-gray-200 h-8 rounded"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : error ? (
              <p className="text-red-500 text-center w-full col-span-full">{error}</p>
            ) : products.length === 0 ? (
              <p className="text-gray-400 text-center w-full col-span-full">No products found in this subcategory.</p>
            ) : (
              products.map((product) => {
                const bestsellerValue = getBestsellerValue(product);
                const stockInfo = getStockInfo(product);
                return (
                  <ProjectCard
                    key={product.id}
                    name={product.name}
                    image={product.images?.[0]?.src || product.image || '/images/placeholder.webp'}
                    link={`/product/${product.id}`}
                    bestseller={bestsellerValue}
                    stockStatus={stockInfo.stockStatus}
                    purchasable={stockInfo.purchasable}
                  />
                );
              })
            )}
          </main>

          {/* Pagination */}
          <div className="w-full flex items-center justify-center gap-4 py-6 col-span-full">
            <button
              type="button"
              className="px-3 sm:px-4 py-2 bg-white border rounded disabled:opacity-50 hover:bg-gray-50"
              onClick={() => {
                const newPage = Math.max(1, page - 1);
                if (filterSelectedCategories.length > 0) {
                  handleCategoryFilterChange(filterSelectedCategories, newPage);
                } else {
                  setPage(newPage);
                }
              }}
              disabled={page <= 1 || loading}
            >
              Previous
            </button>
            <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>
            <button
              type="button"
              className="px-3 sm:px-4 py-2 bg-white border rounded disabled:opacity-50 hover:bg-gray-50"
              onClick={() => {
                const newPage = Math.min(totalPages, page + 1);
                if (filterSelectedCategories.length > 0) {
                  handleCategoryFilterChange(filterSelectedCategories, newPage);
                } else {
                  setPage(newPage);
                }
              }}
              disabled={page >= totalPages || loading}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="-mx-[calc((100vw-100%)/2)]">
        <Article />
        <FeatureBar />
      </div>
    </div>
  );
}