"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ProjectCard from "../../../../components/ProjectCard";
import FilterNavigation from "../../../../components/FilterNavigation";
import CategoriesFilter from "../../../../components/categoriesFilter";
import { unSlugify } from "../../../../utils/slugUtils";
import HeroImage from "../../../../assets/images/GWEN-WB-D-lite-1024x573.png.webp";
import NAV_LINKS from "../../../../constants/navlinks";
import { FILTER_CATEGORIES, getAllCategoryIdsForSlug } from "../../../../constants/categories";
import { handleEnhancedPriceFilter } from "../../../../utils/categoryFilterUtils";
import Article from "../../../../constants/Article";
import FeatureBar from "../../../../constants/FeatureBar";

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
  const [matchedSubcategoryId, setMatchedSubcategoryId] = useState(null);
  const [filterSelectedCategories, setFilterSelectedCategories] = useState([]);
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState({ min: null, max: null });
  const [hasFilterCategories, setHasFilterCategories] = useState(true); // Always show filters initially

  // Get the current category and subcategory from the URL
  const category = params.category;
  const subcategory = params.subcategory;
  const categoryDisplay = unSlugify(category);
  const subcategoryDisplay = unSlugify(subcategory);

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
      pageType: 'subcategory',
      categorySlug: params.category,
      subcategorySlug: params.subcategory,
      filterSelectedCategories,
      currentCategoryId: parentCategoryId,
      matchedSubcategoryId
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

  // Generate breadcrumb data
  const breadcrumbData = (() => {
    const mainCategory = NAV_LINKS.find(link => {
      // First check if the category matches the main link's href
      if (link.href && link.href.includes(category)) return true;
      // Then check sublinks if they exist
      return link.sublinks?.some(sub => sub.id && sub.id.split('-')[0] === category);
    });

    if (!mainCategory) {
      return {
        main: categoryDisplay,
        mainHref: `/category/${category}`,
        sub: subcategoryDisplay
      };
    }

    const subCategory = mainCategory.sublinks?.find(sub => 
      sub.id && (
        sub.id.includes(subcategory) || 
        sub.name.toLowerCase().includes(subcategory.toLowerCase())
      )
    );

    return {
      main: mainCategory.name,
      mainHref: `/category/${category}`,
      sub: subCategory ? subCategory.name : subcategoryDisplay
    };
  })();

  // Fetch categories and products
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const cRes = await fetch(`/api/wc/categories?slug=${encodeURIComponent(category)}`);
        if (!cRes.ok) throw new Error('Failed to load parent category');
        const cjson = await cRes.json();
        if (cancelled) return;
        const parentCat = (cjson || [])[0];
        const parentId = parentCat ? parentCat.id : null;
        setParentCategoryId(parentId);

        let subcats = [];
        if (parentId) {
          const subRes = await fetch(`/api/wc/categories?parent=${encodeURIComponent(parentId)}`);
          if (!subRes.ok) throw new Error('Failed to load subcategories');
          subcats = await subRes.json();
        }
        setSubcategories(subcats);

        const matched = subcats.find(cat => String(cat.slug).toLowerCase() === String(subcategory).toLowerCase() || String(cat.name).toLowerCase() === String(subcategoryDisplay).toLowerCase());
        setMatchedSubcategoryId(matched?.id || null);
        const imageSource = matched?.image?.src || parentCat?.image?.src || null;
        setCategoryImage(imageSource && imageSource.trim() !== '' ? imageSource : HeroImage);

        // Try to get filter categories for this subcategory. If none are defined and
        // the subcategory is one of the special listing pages (used, second-choice,
        // accessories, end-of-line), fall back to the parent category filters so the
        // sidebar still appears.
        let filterCategoryIds = getAllCategoryIdsForSlug(subcategory);
        const specialSlugs = ["used", "second-choice", "accessories", "end-of-line", "end-of-line"];
        if ((!filterCategoryIds || filterCategoryIds.length === 0) && specialSlugs.includes(String(subcategory).toLowerCase())) {
          // Fallback to parent category filters
          filterCategoryIds = getAllCategoryIdsForSlug(category);
        }
        
        // If filter categories exist, use them; otherwise, fetch products from the WooCommerce category by slug
        if (filterCategoryIds.length > 0) {
          // Use filter categories from FILTER_CATEGORIES
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
        } else if (matched && matched.id) {
          // No filter categories defined, fetch products directly from the WooCommerce category ID
          const productsRes = await fetch(`/api/wc/products?category=${encodeURIComponent(matched.id)}&page=${page}&per_page=${perPage}`);
          if (!productsRes.ok) throw new Error('Failed to load products for category slug');
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
          // No filter categories and no matched category found
          setAllProducts([]);
          setProducts([]);
          setTotalPages(1);
          setTotalProductCount(0);
        }
      } catch (e) {
        if (!cancelled) setError(e.message || 'Unknown error');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [category, subcategory, categoryDisplay, subcategoryDisplay, page, perPage]);

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
          alt={`${categoryDisplay} - ${subcategoryDisplay}`}
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
                <span className="font-semibold capitalize">
                  {breadcrumbData.sub}
                </span>
              </>
            )}
          </div>
        </div>
        {/* Category Title */}
        <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-6 text-white px-3 sm:px-5 py-2 sm:py-3">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold capitalize tracking-wide">
            {subcategoryDisplay}
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
                {["used", "second-choice", "accessories", "end-of-line"].includes(String(subcategory).toLowerCase()) ? (
                  <CategoriesFilter onChange={handleCategoryFilterChange} />
                ) : (
                  <FilterNavigation
                    onCategoryChange={handleCategoryFilterChange}
                    selectedCategories={filterSelectedCategories}
                    categorySlug={subcategory}
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
            {["used", "second-choice", "accessories", "end-of-line"].includes(String(subcategory).toLowerCase()) ? (
              <CategoriesFilter onChange={handleCategoryFilterChange} />
            ) : (
              <FilterNavigation
                onCategoryChange={handleCategoryFilterChange}
                selectedCategories={filterSelectedCategories}
                categorySlug={subcategory}
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
                    price={product.price || product.regular_price || product.sale_price}
                    category={product.categories?.[0]?.name || ''}
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