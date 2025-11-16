"use client"

import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import Skeleton from '@/components/ui/skeleton';
import Breadcrumbs from '@/components/breadcrumb';
import { useCart } from "@/components/cart-provider";
import SizingGuideModal from '@/components/size';

const ProductDetails = ({ product, isLoading: parentLoading = false }) => {
  // selectedAttributes will hold selected option for each attribute slug, e.g. { pa_taille: '6.0*22*90L', pa_couleur: 'Black' }
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [matchedVariation, setMatchedVariation] = useState(null);
  const [variationData, setVariationData] = useState(null);
  const [variationLoading, setVariationLoading] = useState(false);
  const [isFindingVariation, setIsFindingVariation] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);

  // in-memory cache for variation details (id -> variation object)
  const variationCacheRef = useRef(new Map());
  const prefetchDoneRef = useRef(false);
  const findMatchAbortRef = useRef(null);

  // shimmer/loading state
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [contentLoaded, setContentLoaded] = useState(false);
  // if parentLoading (from useProductHandle) is true, treat content as not loaded
  const isLoading = parentLoading;

  // unified skeleton color for image and text placeholders
  const SKELETON_CLASS = 'bg-gray-100';

  // preview images (first 4) and whether they're all loaded
  const previewImages = product?.images ? product.images.slice(0, 4) : [];
  // If there are no preview images, treat images as not loaded so we keep showing skeletons
  const allImagesLoaded = previewImages.length === 0 ? false : previewImages.every((img) => loadedImages.has(img.src));

  // Debounce attribute changes so we don't run matching/fetches on every click
  const [debouncedAttributes, setDebouncedAttributes] = useState(selectedAttributes);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedAttributes(selectedAttributes), 250);
    return () => clearTimeout(t);
  }, [selectedAttributes]);

  

  // When selectedAttributes change, try to find a matching variation
  useEffect(() => {
    let mounted = true;

    const findMatch = async () => {
      setIsFindingVariation(true);
      setMatchedVariation(null);

      // If the product doesn't have variations, nothing to do
      if (!isVariable) {
        setIsFindingVariation(false);
        return;
      }

      // Ensure all attributes selected (use debounced attributes)
      const requiredSlugs = (product.attributes || []).map((a) => a.slug || a.name || a.id);
      const allSelected = requiredSlugs.every((s) => Boolean(debouncedAttributes[s]));
      if (!allSelected) {
        setIsFindingVariation(false);
        return;
      }

      // Abort any previous in-flight findMatch fetches
      if (findMatchAbortRef.current) {
        try { findMatchAbortRef.current.abort(); } catch (e) {}
      }
      const controller = new AbortController();
      findMatchAbortRef.current = controller;

      // Try local matching using server-provided variations array if it's an array of variation objects
      // Some WooCommerce responses only include variation IDs; in that case we'll fetch each variation and match.
      try {
        // If variations array contains objects with attributes and price, use that directly
        const variationsArray = product.variations || [];

        // Helper to normalize attributes for comparison
        const normalizeAttrs = (attrs) => {
          // attrs may be [{name, option}] or {slug: value}
          const out = {};
          if (Array.isArray(attrs)) {
            attrs.forEach((a) => {
              // WooCommerce variation attribute usually has "name" (e.g. "pa_taille") and "option"
              // Some APIs return "name" like "Taille"; prefer attribute name matching slug vs name is fragile.
              out[a.name || a.slug] = a.option || a.value || '';
            });
          } else if (attrs && typeof attrs === 'object') {
            Object.keys(attrs).forEach((k) => (out[k] = attrs[k]));
          }
          return out;
        };

  // If variationsArray contains only ids (numbers), we need to fetch them
  const needsFetch = variationsArray.length > 0 && typeof variationsArray[0] === 'number';

        if (!needsFetch) {
          // variationsArray likely contains variation objects
          for (const v of variationsArray) {
            const vAttrs = normalizeAttrs(v.attributes || v.attr || []);
            // match each required slug: WooCommerce attribute names in variation attributes often use "name": "pa_taille" or "Taille".
            const matches = requiredSlugs.every((slug) => {
              // try exact slug match first, then fallback to case-insensitive contains
              const sel = debouncedAttributes[slug] || debouncedAttributes[slug.replace('pa_', '')];
              const vval = vAttrs[slug] || vAttrs[slug.replace('pa_', '')] || Object.values(vAttrs).find(x => typeof x === 'string' && x.toLowerCase() === String(sel).toLowerCase());
              return Boolean(vval) && String(vval).toLowerCase() === String(sel).toLowerCase();
            });
            if (matches) {
              if (!mounted) return;
              setMatchedVariation(v);
              setIsFindingVariation(false);
              findMatchAbortRef.current = null;
              return;
            }
          }
        }

  // Fallback: fetch each variation id and compare attributes
  const idsToCheck = variationsArray.length > 0 ? variationsArray : [];
        const cache = variationCacheRef.current;
        // first check cache
        for (const vid of idsToCheck) {
          const cached = cache.get(vid);
          if (cached) {
            const vAttrs = normalizeAttrs(cached.attributes || []);
            const matches = requiredSlugs.every((slug) => {
              const sel = debouncedAttributes[slug] || debouncedAttributes[slug.replace('pa_', '')];
              const vval = vAttrs[slug] || vAttrs[slug.replace('pa_', '')] || Object.values(vAttrs).find(x => typeof x === 'string' && x.toLowerCase() === String(sel).toLowerCase());
              return Boolean(vval) && String(vval).toLowerCase() === String(sel).toLowerCase();
            });
            if (matches) {
              if (!mounted) return;
              setMatchedVariation(cached);
              setIsFindingVariation(false);
              return;
            }
          }
        }

        // fetch remaining ids in small batches for speed
        for (const vid of idsToCheck) {
          if (cache.has(vid)) continue; // already checked
          try {
            const res = await fetch(`/api/wc/products/${vid}`, { signal: controller.signal });
            if (!res.ok) continue;
            const v = await res.json();
            cache.set(vid, v);
            const vAttrs = normalizeAttrs(v.attributes || []);
            const matches = requiredSlugs.every((slug) => {
              const sel = debouncedAttributes[slug] || debouncedAttributes[slug.replace('pa_', '')];
              const vval = vAttrs[slug] || vAttrs[slug.replace('pa_', '')] || Object.values(vAttrs).find(x => typeof x === 'string' && x.toLowerCase() === String(sel).toLowerCase());
              return Boolean(vval) && String(vval).toLowerCase() === String(sel).toLowerCase();
            });
            if (matches) {
              if (!mounted) return;
              setMatchedVariation(v);
              setIsFindingVariation(false);
              findMatchAbortRef.current = null;
              return;
            }
          } catch (e) {
            if (e && e.name === 'AbortError') {
              // aborted due to new selection; stop processing
              return;
            }
            // ignore fetch errors
          }
        }

        // No match found
        if (mounted) setMatchedVariation(null);
      } catch (err) {
        console.error('Error finding variation', err);
        if (mounted) setMatchedVariation(null);
      }

      if (mounted) setIsFindingVariation(false);
    };

    findMatch();

    return () => {
      mounted = false;
      if (findMatchAbortRef.current) {
        try { findMatchAbortRef.current.abort(); } catch (e) {}
        findMatchAbortRef.current = null;
      }
    };
  }, [debouncedAttributes, product]);

  // Background prefetch of all variation details (to make subsequent matches fast)
  useEffect(() => {
    if (!product || !product.variations || prefetchDoneRef.current) return;
    const cache = variationCacheRef.current;
    const variationsArray = product.variations || [];
  const controller = new AbortController();

    // If the variationsArray already contains full objects, populate cache and return
    if (variationsArray.length > 0 && typeof variationsArray[0] === 'object') {
      variationsArray.forEach(v => {
        const vid = v.id || (v && v.id);
        if (vid) cache.set(vid, v);
      });
      prefetchDoneRef.current = true;
      return;
    }

    // Otherwise variationsArray contains ids; we will prefetch a small cap immediately
    // and schedule remaining fetches during idle time to avoid a burst of requests.
    const idsToFetch = variationsArray.slice();
    if (idsToFetch.length === 0) {
      prefetchDoneRef.current = true;
      return;
    }

    const concurrency = 6;
    const immediateCap = 12; // fetch up to this many IDs immediately (small)
    let cancelled = false;

    const fetchChunk = async (chunk) => {
      const promises = chunk.map(async (vid) => {
        try {
          if (cache.has(vid)) return cache.get(vid);
          const res = await fetch(`/api/wc/products/${vid}`, { signal: controller.signal });
          if (!res.ok) return null;
          const v = await res.json();
          if (v && v.id) cache.set(v.id, v);
          return v;
        } catch (e) {
          if (e && e.name === 'AbortError') return null;
          return null;
        }
      });
      await Promise.all(promises);
    };

    (async () => {
      // immediate fetch for a small cap to speed up typical selections
      const immediate = idsToFetch.slice(0, immediateCap);
      for (let i = 0; i < immediate.length; i += concurrency) {
        if (cancelled) return;
        const chunk = immediate.slice(i, i + concurrency);
        // no await between individual fetches inside fetchChunk; fetchChunk uses Promise.all
        await fetchChunk(chunk);
      }

      // schedule the remaining ids to fetch during idle time in small chunks
      const remaining = idsToFetch.slice(immediateCap);
      if (remaining.length === 0) {
        prefetchDoneRef.current = true;
        return;
      }

      const schedule = (fn) => {
        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
          return window.requestIdleCallback(fn, { timeout: 2000 });
        }
        return window.setTimeout(fn, 800);
      };

      let idx = 0;
      const runNext = () => {
        if (cancelled) return;
        const chunk = remaining.slice(idx, idx + concurrency);
        if (chunk.length === 0) {
          prefetchDoneRef.current = true;
          return;
        }
        fetchChunk(chunk).then(() => {
          idx += concurrency;
          schedule(runNext);
        }).catch(() => {
          idx += concurrency;
          schedule(runNext);
        });
      };

      schedule(runNext);
    })();

    return () => {
      cancelled = true;
      try { controller.abort(); } catch (e) {}
    };
  }, [product]);

  // When matchedVariation updates, fetch authoritative variation details (price, image) from server if needed
  useEffect(() => {
    let mounted = true;
    const loadVariation = async () => {
      setVariationData(null);
      if (!matchedVariation) return;
      // If matchedVariation is already an object that contains price/image, use it directly
      if (typeof matchedVariation === 'object') {
        const hasPrice = matchedVariation.price || matchedVariation.regular_price || matchedVariation.display_price;
        if (hasPrice) {
          setVariationData(matchedVariation);
          return;
        }
      }

      const vid = matchedVariation.id || matchedVariation;
      if (!vid) return;
      try {
        setVariationLoading(true);
        const res = await fetch(`/api/wc/products/${vid}`);
        if (!res.ok) {
          setVariationData(null);
          setVariationLoading(false);
          return;
        }
        const data = await res.json();
        if (!mounted) return;
        setVariationData(data);
      } catch (e) {
        console.error('Error fetching variation details', e);
        if (mounted) setVariationData(null);
      } finally {
        if (mounted) setVariationLoading(false);
      }
    };
    loadVariation();
    return () => { mounted = false; };
  }, [matchedVariation]);
  const { addItem } = useCart()

  const handleAttributeSelect = (slug, option) => {
    setSelectedAttributes((prev) => ({ ...prev, [slug]: option }));
  };

  // helper: check if product is variable (has attributes and variations)
  const isVariable = product?.type === 'variable' && Array.isArray(product?.attributes) && product?.variations?.length > 0;

  const ADD_TO_CART_COLOR = "bg-blue-500";
  const PRIMARY_BLUE = "bg-blue-600";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-gray-900 text-white p-4 flex justify-between items-center z-10 shadow-md">
        <h1 className="text-xl font-bold tracking-widest font-inter">
          FUSELINK FUSELAGE
        </h1>
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="text-sm hover:text-gray-300 transition duration-150"
          >
            Features
          </a>
          <button
            className={`${PRIMARY_BLUE} hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-sm transition duration-150`}
          >
            EN SAVOIR PLUS ?
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="pt-28 p-4 sm:p-10">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumbs 
            breadcrumbData={{
              main: "Products",
              mainHref: "/shop",
              sub: product?.name || "Product Details"
            }}
          />
        </div>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Product Images (show up to 4, toggle to show all below) */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {product?.images && product.images.length > 0 ? (
                product.images.slice(0, 4).map((img, idx) => (
                  <div
                    key={img.id || img.src}
                    className={`aspect-square rounded-xl overflow-hidden shadow-lg relative bg-black`}
                  >
                        {!loadedImages.has(img.src) && (
                          <div className="absolute inset-0"><Skeleton className="w-full h-full rounded" /></div>
                        )}
                    <Image
                      src={img.src}
                      alt={img.alt || product.name || 'product image'}
                      width={800}
                      height={800}
                      onLoadingComplete={() => {
                        setLoadedImages((s) => new Set(s).add(img.src));
                        if (idx === 0) setContentLoaded(true);
                      }}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${loadedImages.has(img.src) ? 'opacity-100' : 'opacity-0'}`}
                    />
                  </div>
                ))
              ) : (
                <>
                  <div className="aspect-square rounded-xl overflow-hidden shadow-lg relative bg-black">
                    {/* No placeholder image: show static skeleton */}
                    <div className="absolute inset-0"><Skeleton className="w-full h-full rounded" /></div>
                  </div>
                  <div className="aspect-square rounded-xl overflow-hidden shadow-lg relative bg-black">
                    {/* No placeholder image: show static skeleton */}
                    <div className="absolute inset-0"><Skeleton className="w-full h-full rounded" /></div>
                  </div>
                </>
              )}
              {/* View All Button Overlay */}
              {product?.images && product.images.length > 4 && !showAllImages && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="relative w-full h-full">
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
                      <button
  onClick={() => setShowAllImages(true)}
  className="bg-white text-black font-medium py-3 px-8 rounded-full shadow-lg flex items-center gap-2"
>
  View all
</button>

                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* All Images Grid (shown when View All is clicked) */}
            {showAllImages && product?.images && product.images.length > 4 && (
              <div className="grid grid-cols-2 gap-4 mt-6">
                {product.images.slice(4).map((img) => (
                  <div
                    key={img.id || img.src}
                    className="aspect-square rounded-xl overflow-hidden shadow-lg relative bg-black"
                  >
                    {!loadedImages.has(img.src) && (
                      <div className="absolute inset-0"><Skeleton className="w-full h-full rounded" /></div>
                    )}
                    <Image
                      src={img.src}
                      alt={img.alt || product.name || 'product image'}
                      width={800}
                      height={800}
                      onLoadingComplete={() => {
                        setLoadedImages((s) => new Set(s).add(img.src));
                      }}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${loadedImages.has(img.src) ? 'opacity-100' : 'opacity-0'}`}
                    />
                  </div>
                ))}
                
                {/* Show Less Button at the end */}
                <div className="col-span-2 flex justify-center mt-4">
                  <button
                    onClick={() => setShowAllImages(false)}
  className="bg-white text-black font-medium py-3 px-8 rounded-full shadow-lg flex items-center gap-2"
                  >
                    Show Less
                   
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col justify-start space-y-7 mt-4">
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              {!allImagesLoaded ? (
                  <Skeleton className="h-8 w-64" />
              ) : (
                product?.name || 'Fuselink Fuselage'
              )}
            </h2>

            {/* Description */}
            <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
              <p className="font-bold">
                {!allImagesLoaded ? (
              <Skeleton className="h-4 w-40" />
                ) : (
                  product?.short_description ? null : 'Performance and accessibility - Cover included'
                )}
              </p>
              <div className="font-bold">
                {!allImagesLoaded ? (
                    <div className="space-y-2">
                 <Skeleton className="h-3 w-3/4 block" />
                 <Skeleton className="h-3 w-5/6 block" />
                 <Skeleton className="h-3 w-2/3 block" />
                    </div>
                  ) : (
                  product?.short_description ? (
                    <div dangerouslySetInnerHTML={{ __html: product.short_description }} />
                  ) : (
                    <p>
                      This new Evo range replaces the Performer range, keeping its
                      smooth and accessible feel while improving speed and
                      maneuverability. Compatible with Fuselink, the short version
                      offers enhanced responsiveness and agility for experienced
                      riders, while the standard provides more control and stability.
                    </p>
                  )
                )}
              </div>
            </div>

            {/* Price */}
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {!allImagesLoaded ? (
                  <Skeleton className="h-6 w-28" />
                ) : variationLoading ? (
                  <span>Loading price...</span>
                ) : (
                  variationData?.price ? `$${Number(variationData.price).toFixed(2)}` : (product?.price ? `$${Number(product.price).toFixed(2)}` : 'From 1916,00€')
                )}
              </div>
              <button
                onClick={() => setShowSizeGuide(true)}
                className="flex items-center gap-1.5 mt-3 hover:opacity-80 transition-opacity"
                style={{ 
                  fontFamily: '"alliance no.2", sans-serif',
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: '16px',
                  color: 'rgb(29, 152, 255)'
                }}
              >
                Size guide
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none"><path d="M10.2857 4.71484L1.71429 13.2863M10.2857 4.71484H2.57144M10.2857 4.71484V12.4291" stroke="#1D98FF" stroke-width="1.5"></path></svg>
              </button>
              <SizingGuideModal 
                isOpen={showSizeGuide} 
                onClose={() => setShowSizeGuide(false)} 
                productId={product?.id}
              />
            </div>

            {/* Dynamic Attribute Selectors */}
            {isVariable && (
              product.attributes.map((attr, idx) => (
                <div key={attr.slug || attr.id || idx}>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    {attr.name}
                  </label>
                  <div className="flex space-x-3 flex-wrap">
                    {attr.options.map((option) => {
                      const slug = attr.slug;
                      const selected = selectedAttributes[slug] === option;
                      return (
                        <button
                          key={option}
                          onClick={() => handleAttributeSelect(slug, option)}
                          className={`border text-sm py-2 px-4 rounded-full transition duration-150 mb-2 ${
                            selected 
                              ? 'bg-black text-white border-black shadow-md' 
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}

            {/* Stock Status Message */}
            {product && (
              <>
                {(!product.purchasable || product.stock_status === "outofstock") && (
                  <div className="bg-red-50 border border-red-200  p-3 mb-4">
                    <p className="text-red-800 font-medium text-sm">
                      {product.stock_status === "outofstock" ? "This product is currently out of stock" : "This product cannot be ordered at the moment"}
                    </p>
                  </div>
                )}
                {product.stock_status === "onbackorder" && product.purchasable && (
                  <div className="bg-orange-50 border border-orange-200  p-3 mb-4">
                    <p className="text-orange-800 font-medium text-sm">
                      This product is available on backorder
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Add to Cart */}
            <div className="w-full">
              <button
                onClick={async () => {
                  if (!product) return;

                  // If variable, ensure we have a matched variation
                  if (isVariable) {
                    if (!matchedVariation) return;
                    // add variation id as productId and include selectedAttributes
                    const pid = variationData?.id || matchedVariation.id || product.id;
                    const price = Number(variationData?.price || matchedVariation.price || product.price || 0);
                    const img = variationData?.image?.src || matchedVariation.image?.src || product.images?.[0]?.src;
                    addItem({ productId: pid, name: product.name, price, image: img, attributes: selectedAttributes }, 1);
                  } else {
                    // simple product
                    addItem({ productId: product.id, name: product.name, price: Number(product.price || 0), image: product.images?.[0]?.src }, 1);
                  }
                }}
                disabled={
                  // Existing disabled conditions
                  (isVariable ? (!matchedVariation || isFindingVariation) : false) ||
                  // New stock-based disabled conditions
                  !product?.purchasable ||
                  product?.stock_status === "outofstock"
                }
                className={`w-full ${
                  !product?.purchasable || product?.stock_status === "outofstock"
                    ? 'bg-gray-400 cursor-not-allowed'
                    : ADD_TO_CART_COLOR + ' hover:bg-blue-600'
                } text-white font-bold py-3 text-lg uppercase tracking-wider transition duration-200 shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {!product?.purchasable || product?.stock_status === "outofstock"
                  ? 'UNAVAILABLE'
                  : product?.stock_status === "onbackorder"
                    ? 'PRE-ORDER'
                    : isVariable
                      ? (isFindingVariation ? 'Finding...' : (matchedVariation ? 'ADD TO CART' : 'ADD TO CART'))
                      : 'ADD TO CART'
                }
              </button>
            </div>

            {/* Info Sections */}
            <div className="space-y-5 pt-4 border-t border-gray-200 mt-4">
              <div>
                <h3 className="font-semibold text-gray-800">Warranty</h3>
                <p className="text-sm text-gray-600 mt-1">
                  All our products come with a 2-year guarantee.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  After-sales service
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Free return within 15 days.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Payment methods
                </h3>
                <p className="text-sm text-gray-600">
                  Secure payment: Quick and easy.
                </p>
                <div className="flex items-center space-x-3 mt-3">
                  <div className="h-8 w-auto relative">
                    {!loadedImages.has('visa') && <div className="absolute inset-0"><Skeleton className="w-full h-full rounded" /></div>}
                    <Image src="https://afs-foiling.com/wp-content/uploads/2025/05/Layer_1-1.svg" alt="Visa" width={48} height={32} onLoadingComplete={() => setLoadedImages(s => new Set(s).add('visa'))} className={`object-contain transition-opacity duration-300 ${loadedImages.has('visa') ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                  <div className="h-8 w-auto relative">
                    {!loadedImages.has('paypal') && <div className="absolute inset-0"><Skeleton className="w-full h-full rounded" /></div>}
                    <Image src="https://afs-foiling.com/wp-content/uploads/2025/05/Group-26.svg" alt="PayPal" width={48} height={32} onLoadingComplete={() => setLoadedImages(s => new Set(s).add('paypal'))} className={`object-contain transition-opacity duration-300 ${loadedImages.has('paypal') ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                  <div className="h-8 w-auto relative">
                    {!loadedImages.has('mastercard') && <div className="absolute inset-0"><Skeleton className="w-full h-full rounded" /></div>}
                    <Image src="https://afs-foiling.com/wp-content/uploads/2025/05/svg3409-1.svg" alt="Mastercard" width={48} height={32} onLoadingComplete={() => setLoadedImages(s => new Set(s).add('mastercard'))} className={`object-contain transition-opacity duration-300 ${loadedImages.has('mastercard') ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                  <div className="h-8 w-auto relative">
                    {!loadedImages.has('monetico') && <div className="absolute inset-0"><Skeleton className="w-full h-full rounded" /></div>}
                    <Image src="https://afs-foiling.com/wp-content/uploads/2025/05/image-7.svg" alt="Monetico" width={48} height={32} onLoadingComplete={() => setLoadedImages(s => new Set(s).add('monetico'))} className={`object-contain transition-opacity duration-300 ${loadedImages.has('monetico') ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                </div>
              </div>
            </div>

            {/* AFS Product Expert Section */}
            <div className="mt-8 bg-[#f5f5f5] rounded-lg p-6 flex flex-col md:flex-row items-start gap-6">
              <div className="flex-1 max-w-md">
                <p className="text-[15px] font-normal leading-4 text-[rgba(17,17,17,0.75)] mb-4" style={{ fontFamily: '"alliance no.2", sans-serif' }}>
                  AFS product expert
                </p>
                <h3 className="text-[16px] font-bold leading-6 text-[rgb(17,17,17)] mb-4" style={{ fontFamily: '"alliance no.2", sans-serif' }}>
                  Need help choosing your equipment?
                </h3>
                <p className="text-[15px] font-normal leading-4 text-[rgba(17,17,17,0.75)] mb-6" style={{ fontFamily: '"alliance no.2", sans-serif' }}>
                  We're here to provide you with comprehensive answers and advice to help you make the right choice.
                </p>
                <a 
                  href="/contact" 
                  className="inline-flex items-center text-[12px] font-medium leading-4 text-[rgb(29,152,255)] hover:text-blue-600 transition-colors uppercase"
                  style={{ fontFamily: '"alliance no.2", sans-serif' }}
                >
                  MAKE AN APPOINTMENT BY PHONE
                  <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              <div className="flex-shrink-0 w-full md:w-[280px] h-[180px] relative overflow-hidden">
                {!loadedImages.has('expert') && <div className="absolute inset-0"><Skeleton className="w-full h-full rounded-lg" /></div>}
                <Image 
                  src="https://afs-foiling.com/wp-content/uploads/2025/06/image-33-1.png.webp" 
                  alt="AFS Product Expert" 
                  fill
                  onLoadingComplete={() => setLoadedImages(s => new Set(s).add('expert'))} 
                  className={`object-contain object-right transition-opacity duration-300 ${loadedImages.has('expert') ? 'opacity-100' : 'opacity-0'}`} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Expanded gallery (shows all images when user clicks See more) */}
        {/* {product?.images && product.images.length > 4 && (
          <GalleryAll images={product.images} loadedImages={loadedImages} setLoadedImages={setLoadedImages} />
        )} */}
      </main>
    </div>
  );
};

export default ProductDetails;

function GalleryAll({ images = [], loadedImages = new Set(), setLoadedImages = () => {} }) {
  const [expanded, setExpanded] = useState(false);

  const list = expanded ? images : images.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto mt-6 px-4 sm:px-10">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-medium">Gallery</h4>
        <button
          className="text-sm text-blue-600 underline"
          onClick={() => setExpanded((s) => !s)}
        >
          {expanded ? 'See less' : 'See more'}
        </button>
      </div>

      <div className={`grid gap-4 ${expanded ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' : 'grid-cols-2'}`}>
        {list.map((img) => (
          <div key={img.id || img.src} className="rounded overflow-hidden bg-gray-100 shadow-sm relative">
            {!loadedImages.has(img.src) && <div className="absolute inset-0"><Skeleton className="w-full h-full rounded" /></div>}
            <Image src={img.src} alt={img.alt || ''} width={800} height={800} onLoadingComplete={() => setLoadedImages(s => new Set(s).add(img.src))} className={`w-full h-full object-cover transition-opacity duration-300 ${loadedImages.has(img.src) ? 'opacity-100' : 'opacity-0'}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
