/**
 * Enhanced Category Filter Utilities
 * Handles category ID determination for price filtering across all three category page levels
 */

import { FILTER_CATEGORIES, getAllCategoryIdsForSlug } from "../constants/categories";

/**
 * Determines the appropriate category IDs for price filtering based on page context
 * @param {Object} context - The page context object
 * @param {string} context.pageType - 'category' | 'subcategory' | 'subcategory2'
 * @param {string} context.categorySlug - Main category slug
 * @param {string} context.subcategorySlug - Subcategory slug (optional)
 * @param {string} context.subcategory2Slug - Subcategory2 slug (optional)
 * @param {Array} context.filterSelectedCategories - Currently selected filter categories
 * @param {number|null} context.currentCategoryId - Current category ID (for category page)
 * @param {number|null} context.matchedSubcategoryId - Matched subcategory ID (for subcategory page)
 * @param {number|null} context.matchedSubcategory2Id - Matched subcategory2 ID (for subcategory2 page)
 * @param {Array} context.subcategories - Available subcategories (for category page)
 * @returns {string} - Comma-separated category IDs for API call
 */
export function getPricingFilterCategoryIds(context) {
  const {
    pageType,
    categorySlug,
    subcategorySlug,
    subcategory2Slug,
    filterSelectedCategories = [],
    currentCategoryId,
    matchedSubcategoryId,
    matchedSubcategory2Id,
    subcategories = []
  } = context;

  // Priority 1: If filter categories are selected, use those
  if (filterSelectedCategories.length > 0) {
    return filterSelectedCategories.join(',');
  }

  // Priority 2: Determine appropriate fallback based on page type and available data
  switch (pageType) {
    case 'category':
      return getCategoryPagePricingIds({
        categorySlug,
        currentCategoryId,
        subcategories
      });

    case 'subcategory':
      return getSubcategoryPagePricingIds({
        subcategorySlug,
        matchedSubcategoryId,
        categorySlug,
        currentCategoryId
      });

    case 'subcategory2':
      return getSubcategory2PagePricingIds({
        subcategory2Slug,
        matchedSubcategory2Id,
        subcategorySlug,
        matchedSubcategoryId
      });

    default:
      return '';
  }
}

/**
 * Get category IDs for price filtering on category page
 */
function getCategoryPagePricingIds({ categorySlug, currentCategoryId, subcategories }) {
  // Check if this category has filter categories defined
  const filterCategoryIds = getAllCategoryIdsForSlug(categorySlug);
  
  if (filterCategoryIds.length > 0) {
    // Use filter categories if available
    return filterCategoryIds.join(',');
  }

  // Prefer subcategory IDs over main category ID for more specific filtering
  if (subcategories && subcategories.length > 0) {
    const subcategoryIds = subcategories.map(sub => sub.id).filter(id => id);
    if (subcategoryIds.length > 0) {
      return subcategoryIds.join(',');
    }
  }

  // Fallback to main category ID
  return currentCategoryId ? String(currentCategoryId) : '';
}

/**
 * Get category IDs for price filtering on subcategory page
 */
function getSubcategoryPagePricingIds({ 
  subcategorySlug, 
  matchedSubcategoryId, 
  categorySlug, 
  currentCategoryId 
}) {
  // Check if this subcategory has filter categories defined
  const filterCategoryIds = getAllCategoryIdsForSlug(subcategorySlug);
  
  if (filterCategoryIds.length > 0) {
    // Use filter categories if available
    return filterCategoryIds.join(',');
  }

  // Use the matched subcategory ID (most specific)
  if (matchedSubcategoryId) {
    return String(matchedSubcategoryId);
  }

  // Fallback to parent category filter categories
  const parentFilterIds = getAllCategoryIdsForSlug(categorySlug);
  if (parentFilterIds.length > 0) {
    return parentFilterIds.join(',');
  }

  // Last resort: use parent category ID
  return currentCategoryId ? String(currentCategoryId) : '';
}

/**
 * Get category IDs for price filtering on subcategory2 page
 */
function getSubcategory2PagePricingIds({ 
  subcategory2Slug, 
  matchedSubcategory2Id, 
  subcategorySlug, 
  matchedSubcategoryId 
}) {
  // Check if this subcategory2 has filter categories defined
  const filterCategoryIds = getAllCategoryIdsForSlug(subcategory2Slug);
  
  if (filterCategoryIds.length > 0) {
    // Use filter categories if available
    return filterCategoryIds.join(',');
  }

  // Use the matched subcategory2 ID (most specific)
  if (matchedSubcategory2Id) {
    return String(matchedSubcategory2Id);
  }

  // Fallback to parent subcategory filter categories
  const parentFilterIds = getAllCategoryIdsForSlug(subcategorySlug);
  if (parentFilterIds.length > 0) {
    return parentFilterIds.join(',');
  }

  // Last resort: use parent subcategory ID
  return matchedSubcategoryId ? String(matchedSubcategoryId) : '';
}

/**
 * Build the complete product API URL with price filtering and category context
 * @param {Object} params - API parameters
 * @param {string} params.categoryIds - Comma-separated category IDs
 * @param {number|null} params.minPrice - Minimum price
 * @param {number|null} params.maxPrice - Maximum price
 * @param {number} params.page - Page number
 * @param {number} params.perPage - Items per page
 * @returns {string} - Complete API URL
 */
export function buildPricingFilterApiUrl({ categoryIds, minPrice, maxPrice, page = 1, perPage = 12 }) {
  let url = `/api/wc/products?page=${page}&per_page=${perPage}`;
  
  if (categoryIds) {
    url += `&category=${encodeURIComponent(categoryIds)}`;
  }
  
  if (minPrice !== null && minPrice !== undefined) {
    url += `&min_price=${minPrice}`;
  }
  
  if (maxPrice !== null && maxPrice !== undefined) {
    url += `&max_price=${maxPrice}`;
  }
  
  return url;
}

/**
 * Enhanced price filter handler that can be used across all three page types
 * @param {Object} context - Page context (same as getPricingFilterCategoryIds)
 * @param {Object} priceRange - Price range { min, max }
 * @param {Function} setLoading - Loading state setter
 * @param {Function} setError - Error state setter
 * @param {Function} setProducts - Products state setter
 * @param {Function} setTotalPages - Total pages setter
 * @param {Function} setTotalProductCount - Total product count setter
 * @param {Function} setPage - Current page setter
 * @param {Array} allProducts - All products for fallback
 * @param {number} perPage - Items per page
 */
export async function handleEnhancedPriceFilter(
  context,
  priceRange,
  {
    setLoading,
    setError,
    setProducts,
    setTotalPages,
    setTotalProductCount,
    setPage,
    allProducts,
    perPage
  }
) {
  setError(null);
  setPage(1);
  
  // If no price filter and no category filter, show all products
  if (!priceRange.min && !priceRange.max && context.filterSelectedCategories.length === 0) {
    setProducts(allProducts);
    setTotalPages(Math.ceil(allProducts.length / perPage) || 1);
    setTotalProductCount(allProducts.length);
    return;
  }
  
  setLoading(true);
  
  try {
    const categoryIds = getPricingFilterCategoryIds(context);
    const url = buildPricingFilterApiUrl({
      categoryIds,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      page: 1,
      perPage
    });
    
    console.log(`[${context.pageType}] Price filter API call:`, url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch filtered products: ${response.status} ${errorText}`);
    }

    const json = await response.json();
    const filteredProducts = Array.isArray(json?.data) ? json.data : [];
    const meta = json?.meta || {};
    
    // Deduplicate products
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
    console.error(`[${context.pageType}] Error fetching price filtered products:`, error);
    setError(error.message || 'Failed to load price filtered products');
    setProducts([]);
    setTotalPages(1);
  } finally {
    setLoading(false);
  }
}