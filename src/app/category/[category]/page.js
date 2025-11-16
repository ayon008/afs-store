"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ProjectCard from "../../../components/ProjectCard";
import FilterNavigation from "../../../components/FilterNavigation";
import NAV_LINKS from "../../../constants/navlinks";
import HeroImage from "../../../assets/images/GWEN-WB-D-lite-1024x573.png.webp";
import { unSlugify } from "../../../utils/slugUtils";
import { FILTER_CATEGORIES, getAllCategoryIdsForSlug } from "../../../constants/categories";
import { handleEnhancedPriceFilter } from "../../../utils/categoryFilterUtils";
import ServiceSubbar from "../../../components/ServiceSubbar";
import FAQ from "../../../constants/productfaq";
import Article from "../../../constants/Article";
import FeatureBar from "../../../constants/FeatureBar";

// Helper functions (unchanged)
const getBestsellerValue = (product) => {
  if (!product?.meta_data || !Array.isArray(product.meta_data)) return null;
  const bestsellerMeta = product.meta_data.find(meta => meta.key === "bestseller");
  return bestsellerMeta?.value || null;
};

const getStockInfo = (product) => {
  return {
    stockStatus: product?.stock_status || "instock",
    purchasable: product?.purchasable !== false,
    stockQuantity: product?.stock_quantity || 0,
    manageStock: product?.manage_stock || false
  };
};

export default function CategoryPage() {
  const params = useParams();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentCategorySlug = params.category;
  const currentCategory = unSlugify(currentCategorySlug);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState([]);
  const [categoryImage, setCategoryImage] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [filterSelectedCategories, setFilterSelectedCategories] = useState([]);
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [priceFilter, setPriceFilter] = useState({ min: null, max: null });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hasFilterCategories, setHasFilterCategories] = useState(true); // Always show filters initially

  // Breadcrumb data (unchanged)
  const breadcrumbData = (() => {
    const mainCategory = NAV_LINKS.find(link => {
      if (!link.sublinks) return false;
      if (link.isService) {
        // For service pages, check the ID instead of href
        return link.sublinks.some(sub => sub.id === currentCategorySlug);
      }
      // For regular category pages, check href
      return link.sublinks.some(sub => sub.href && sub.href.includes(currentCategorySlug));
    });

    if (!mainCategory) {
      const isMainCategory = NAV_LINKS.find(
        link => link.name.toLowerCase() === currentCategory.toLowerCase()
      );
      if (isMainCategory) {
        return {
          main: isMainCategory.name,
          mainHref: isMainCategory.href,
          sub: null
        };
      }
      return {
        main: currentCategory,
        mainHref: `/category/${currentCategorySlug}`,
        sub: null
      };
    }

    const subCategory = mainCategory.sublinks.find(
      sub => sub.href.includes(currentCategorySlug)
    );
    return {
      main: mainCategory.name,
      mainHref: mainCategory.href,
      sub: subCategory ? subCategory.name : null
    };
  })();

  // Handle filter category changes (unchanged)
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
      const categoryParam = selectedCategoryIds.length > 0 ? selectedCategoryIds.join(",") : '';
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
      if (!response.ok) throw new Error(`Failed to fetch filtered products: ${response.status}`);
      const json = await response.json();
      const filteredProducts = Array.isArray(json?.data) ? json.data : [];
      const meta = json?.meta || {};
      const productMap = new Map();
      filteredProducts.forEach(product => {
        if (product && product.id) productMap.set(product.id, product);
      });
      const uniqueProducts = Array.from(productMap.values());
      setProducts(uniqueProducts);
      setTotalPages(meta.totalPages || Math.ceil((meta.total || uniqueProducts.length) / perPage) || 1);
      setTotalProductCount(meta.total || uniqueProducts.length);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      setError(error.message || "Failed to load filtered products");
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
      pageType: 'category',
      categorySlug: currentCategorySlug,
      filterSelectedCategories,
      currentCategoryId,
      subcategories
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

  // Client-side filtering (unchanged)
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
        if (typeof c === "number") return selectedSubcategoryIds.includes(c);
        if (typeof c === "object" && c.id) return selectedSubcategoryIds.includes(c.id);
        return false;
      });
    });
    setProducts(filtered);
  }, [selectedSubcategoryIds, allProducts, filterSelectedCategories]);

  // Data fetching (unchanged)
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const cRes = await fetch(`/api/wc/categories?slug=${encodeURIComponent(currentCategorySlug)}`);
        if (!cRes.ok) throw new Error("Failed to load category");
        const cjson = await cRes.json();
        if (cancelled) return;
        const matched = (cjson || [])[0];
        const categoryId = matched ? matched.id : null;
        setCurrentCategoryId(categoryId);
        setCategoryImage(matched?.image?.src || HeroImage);

        let subcats = [];
        if (categoryId) {
          const subRes = await fetch(`/api/wc/categories?parent=${encodeURIComponent(categoryId)}`);
          if (!subRes.ok) throw new Error("Failed to load subcategories");
          subcats = await subRes.json();
        }
        setSubcategories(subcats);

        const filterCategoryIds = getAllCategoryIdsForSlug(currentCategorySlug);
        
        // If filter categories exist, use them; otherwise, fetch products from the WooCommerce category by slug
        if (filterCategoryIds.length > 0) {
          // Use filter categories from FILTER_CATEGORIES
          const categoryParam = filterCategoryIds.join(",");
          const productsRes = await fetch(`/api/wc/products?category=${encodeURIComponent(categoryParam)}&page=${page}&per_page=${perPage}`);
          if (!productsRes.ok) throw new Error("Failed to load products for categories");
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
        } else if (categoryId) {
          // No filter categories defined, fetch products directly from the WooCommerce category ID
          const productsRes = await fetch(`/api/wc/products?category=${encodeURIComponent(categoryId)}&page=${page}&per_page=${perPage}`);
          if (!productsRes.ok) throw new Error("Failed to load products for category slug");
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
          // No filter categories and no category ID found
          setAllProducts([]);
          setProducts([]);
          setTotalPages(1);
          setTotalProductCount(0);
        }
      } catch (e) {
        console.error("[CategoryPage] Error loading data:", e);
        if (!cancelled) setError(e.message || "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [currentCategorySlug, page, perPage]);

  // Navbar height handling (unchanged)
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

  const heroProduct = products.length > 0
    ? products[0]
    : { name: currentCategory, image: "/images/placeholder.webp" };

  return (
    <div className="flex flex-col pl-2 sm:pl-4 md:pl-6 lg:pl-8 pr-4 sm:pr-6 md:pr-8 lg:pr-10 gap-6 overflow-x-hidden max-w-full">
      {/* Hero Section */}
      <div
        className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden"
      >
        <Image
          src={categoryImage || heroProduct.image}
          alt={currentCategory}
          fill
          priority
          className="object-cover"
        />
        {/* Breadcrumbs */}

        <div
          className="absolute left-4 sm:left-6 top-[calc(var(--navbar-height)+1rem)] px-3 py-2 z-30"
          style={{
            fontFamily: '"alliance no.2", sans-serif',
            fontSize: "clamp(14px, 4vw, 16px)",
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <div className="flex items-center gap-1">
            <Link href="/" className="hover:no-underline">Home</Link>
            <span className="mx-1">/</span>
            <Link href={breadcrumbData.mainHref} className="hover:no-underline capitalize">
              {breadcrumbData.main}
            </Link>
            {breadcrumbData.sub && (
              <>
                <span className="mx-1">/</span>
                <span className="font-semibold capitalize">{breadcrumbData.sub}</span>
              </>
            )}
          </div>
        </div>
        {/* Category Title */}
        <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-6 text-white px-4 py-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold capitalize tracking-wide">
            {currentCategory}
          </h1>
        </div>
      </div>

      {/* Service Subbar - Only shown for service categories */}
      {currentCategorySlug.startsWith('service-') && (
        <ServiceSubbar 
          topOffset={navbarHeight} 
          onMouseEnter={() => {}} 
          onMouseLeave={() => {}}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar: Filter Navigation */}
        {hasFilterCategories && (
          <aside className="w-full lg:w-auto lg:min-w-[240px] lg:max-w-[280px] flex-shrink-0 z-10">
            <FilterNavigation
              onCategoryChange={handleCategoryFilterChange}
              selectedCategories={filterSelectedCategories}
              categorySlug={currentCategorySlug}
              onPriceChange={handlePriceFilterChange}
              className="w-full"
            />
          </aside>
        )}

        {/* Main Content */}
        <div className="w-full min-w-0 flex-1">
          {/* Filters: clear / apply */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
            <div className="text-sm text-gray-600">
              {filterSelectedCategories.length > 0 && (
                <span className="text-blue-600 font-medium">
                  Filtered by {filterSelectedCategories.length} categor{filterSelectedCategories.length === 1 ? "y" : "ies"}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {(selectedSubcategoryIds.length > 0 || filterSelectedCategories.length > 0 || priceFilter.min || priceFilter.max) && (
                <button
                  type="button"
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
          <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse w-full bg-white rounded-lg shadow-sm flex flex-col">
                  <div className="relative w-full aspect-[4/5] bg-gray-200 rounded-lg"></div>
                  <div className="flex flex-col justify-between flex-1 px-3 py-4 text-center">
                    <div>
                      <div className="bg-gray-200 h-6 rounded mb-1"></div>
                      <div className="bg-gray-200 h-4 rounded mb-2"></div>
                    </div>
                    <div className="mt-2">
                      <div className="bg-gray-200 h-8 rounded"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : error ? (
              <p className="text-red-500 text-center col-span-full">Error: {error}</p>
            ) : products.length === 0 ? (
              <p className="text-gray-400 text-center col-span-full">No products found.</p>
            ) : (
              products.map((p) => {
                const bestsellerValue = getBestsellerValue(p);
                const stockInfo = getStockInfo(p);
                return (
                  <ProjectCard
                    key={p.id}
                    name={p.name}
                    image={p.images?.[0]?.src || p.image || "/images/placeholder.webp"}
                    link={`/product/${p.id}`}
                    bestseller={bestsellerValue}
                    stockStatus={stockInfo.stockStatus}
                    purchasable={stockInfo.purchasable}
                  />
                );
              })
            )}
          </main>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 py-6 col-span-full">
            <button
              type="button"
              className="px-3 sm:px-4 py-2 bg-white border rounded disabled:opacity-50 hover:bg-gray-50 text-sm sm:text-base"
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
              className="px-3 sm:px-4 py-2 bg-white border rounded disabled:opacity-50 hover:bg-gray-50 text-sm sm:text-base"
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

      {/* FAQ Section */}
      <section className="bg-[#f7f7f7] mt-6 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQ />
        </div>
      </section>

      {/* Article and FeatureBar */}
      <div className="space-y-6 sm:space-y-8">
        <section className="w-full">
          <Article />
        </section>
        <section className="w-full">
          <FeatureBar />
        </section>
      </div>
    </div>
  );
}