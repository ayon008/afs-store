"use server"

import { cookies } from "next/headers";
import { getAuthenticatedUser } from "./auth";
import { getCart } from "./StoreApi/cart";

const consumerKey = process.env.WC_CONSUMER_KEY;
const consumerSecret = process.env.WC_CONSUMER_SECRET
const authHeader = Buffer
    .from(`${consumerKey}:${consumerSecret}`)
    .toString("base64");

// Get tax rate for user based on their country
export const getUserTaxRate = async (tax_class = "standard", country = null) => {
    try {
        // Get user country: param > shipping > billing > France (default)
        let userCountry = country;

        const cart = await getCart();
        const defaultCountry = cart?.data?.shipping_address?.country || cart?.data?.billing_address?.country;


        if (!userCountry) {
            const user = await getAuthenticatedUser();
            if (user) {
                userCountry = user.shipping?.country || user.billing?.country || defaultCountry;
            } else {
                userCountry = defaultCountry;
            }
        }

        // Fetch all tax rates (paginated)
        const per_page = 100;
        let page = 1;
        let allTaxRates = [];

        while (true) {
            const response = await fetch(
                `https://staging.afs-foiling.com/wp-json/wc/v3/taxes?per_page=${per_page}&page=${page}&lang=fr`,
                {
                    headers: {
                        Authorization: `Basic ${authHeader}`,
                        'Content-Type': 'application/json',
                    },
                    cache: "no-cache"
                }
            );

            if (!response.ok) throw new Error('Failed to fetch tax rates');

            const taxes = await response.json();
            if (!Array.isArray(taxes) || taxes.length === 0) break;

            allTaxRates.push(...taxes);
            if (taxes.length < per_page) break;
            page++;
        }

        // Normalize tax_class (same logic as calculatePriceWithTax)
        const normalizedTaxClass = (!tax_class || tax_class === "" || tax_class === "standard")
            ? "standard"
            : tax_class.toLowerCase();

        // Find matching tax rate by country AND tax_class
        const matchingTax = allTaxRates.find(rate => {
            const rateCountry = rate?.country?.toLowerCase() || "";
            const rateClass = rate?.class?.toLowerCase() || "standard";

            // Match country (case-insensitive)
            const countryMatch = rateCountry === userCountry.toLowerCase();

            // Match tax class (WooCommerce stores standard class as empty string)
            const classMatch = (normalizedTaxClass === "standard" && (rateClass === "" || rateClass === "standard"))
                || rateClass === normalizedTaxClass;

            return countryMatch && classMatch;
        });

        return {
            rate: parseFloat(matchingTax?.rate) || 0,
            country: userCountry,
            tax_class: matchingTax?.class || "standard"
        };

    } catch (error) {
        console.error('Error getting user tax rate:', error);
        return { rate: 20, country: 'FR', tax_class: 'standard' };
    }
};



export const calculatePriceWithTax = async (basePrice, tax_class = "standard", country = null) => {
    try {
        // Get user country from shipping/billing address, default to France
        let userCountry = country;
        const cart = await getCart();
        const defaultCountry = cart?.data?.shipping_address?.country || cart?.data?.billing_address?.country || "FR";

        if (!userCountry) {
            const user = await getAuthenticatedUser();
            if (user) {
                userCountry = user.shipping?.country || user.billing?.country || defaultCountry;
            } else {
                userCountry = defaultCountry;
            }
        }

        // Fetch all tax rates (paginated)
        const per_page = 100;
        let page = 1;
        let allTaxRates = [];

        while (true) {
            const response = await fetch(
                `https://staging.afs-foiling.com/wp-json/wc/v3/taxes?per_page=${per_page}&page=${page}&lang=fr`,
                {
                    headers: {
                        Authorization: `Basic ${authHeader}`,
                        'Content-Type': 'application/json',
                    },
                    cache: "no-cache"
                }
            );

            if (!response.ok) throw new Error('Failed to fetch tax rates');

            const taxes = await response.json();
            if (!Array.isArray(taxes) || taxes.length === 0) break;

            allTaxRates.push(...taxes);
            if (taxes.length < per_page) break;
            page++;
        }

        // Normalize tax_class (same logic as getUserTaxRate)
        const normalizedTaxClass = (!tax_class || tax_class === "" || tax_class === "standard")
            ? "standard"
            : tax_class.toLowerCase();

        // Find matching tax rate by country AND tax_class
        const matchingTax = allTaxRates.find(rate => {
            const rateCountry = rate?.country?.toLowerCase() || "";
            const rateClass = rate?.class?.toLowerCase() || "standard";

            // Match country (case-insensitive)
            const countryMatch = rateCountry === userCountry.toLowerCase();

            // Match tax class (WooCommerce stores standard class as empty string)
            const classMatch = (normalizedTaxClass === "standard" && (rateClass === "" || rateClass === "standard"))
                || rateClass === normalizedTaxClass;

            return countryMatch && classMatch;
        });

        // Calculate and apply tax
        const taxRate = parseFloat(matchingTax?.rate) || 0;
        const priceWithTax = basePrice + (basePrice * taxRate) / 100;

        return parseFloat(priceWithTax?.toFixed(2));
    } catch (error) {
        console.error('Error calculating tax:', error);
        return basePrice; // fallback to base price on error
    }
};



// get All the parent Categories
export const getParentCategory = async (slug) => {
    if (!slug || typeof slug !== "string") {
        throw new Error("A valid category slug must be provided.");
    }

    const url = `https://staging.afs-foiling.com/wp-json/wc/v3/products/categories?slug=${encodeURIComponent(slug)}&lang=fr`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Basic ${authHeader}`
            },
            // Next.js cache
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            const errorText = await response.text().catch(() => "");
            throw new Error(
                `WooCommerce API error: ${response.status} ${response.statusText} — ${errorText}`
            );
        }

        const data = await response.json().catch(() => {
            throw new Error("Invalid JSON response received from WooCommerce API.");
        });

        return data[0];
    } catch (error) {
        console.error("getParentCategory() failed:", error);
        throw new Error("Unable to fetch parent category. Please try again later.");
    }
};


// Child Categories
export const getChildCategories = async (parentId) => {
    const url = `https://staging.afs-foiling.com/wp-json/wc/v3/products/categories?parent=${parentId}&per_page=100&_fields=id,name,slug&lang=fr`;
    // const url = `https://afs-foiling.com/fr/wp-json/wc/v3/products/categories?parent=${parentId}&per_page=100&_fields=id,name,slug`;
    const response = await fetch(url, {
        headers: {
            Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`,
        },
        next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error(`WooCommerce API error: ${response.statusText}`);
    const data = await response.json();

    const categoriesWithChildren = await Promise.all(
        data.map(async (singleData) => ({
            ...singleData,
            children: await getChildCategories(singleData.id), // recursive
        }))
    );

    return categoriesWithChildren;
}


// Get all the products by category Id
export const getProductsByCategoryId = async (ids, max, min) => {
    try {
        // Convert "12,40" or [12,40] or 12 → always array
        let categories = Array.isArray(ids)
            ? ids.map(Number)
            : String(ids).split(",").map(Number);

        if (categories.length === 0) return [];

        const firstCategory = categories.join(",");
        let allProducts = [];
        const per_page = 100;

        // 1️⃣ Fetch products only from first category
        for (let i = 1; ; i++) {
            let url = `https://staging.afs-foiling.com/wp-json/wc/v3/products?category=${firstCategory}&status=publish&_fields=id,name,acf,images,slug,categories,price,regular_price,sale_price,price_html,type&per_page=${per_page}&page=${i}&taxes=1&lang=fr`;


            if (min != null) url += `&min_price=${Number(min)}`;
            if (max != null) url += `&max_price=${Number(max)}`;

            const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

            const response = await fetch(url, {
                headers: {
                    Authorization: `Basic ${auth}`,
                },
                cache: "force-cache",
                next: { revalidate: 3600 }
            });

            if (!response.ok) break;

            const data = await response.json();
            if (!Array.isArray(data) || data.length === 0) break;

            const dataWithTax = await Promise.all(
                data.map(async (product) => {
                    const basePrice = parseFloat(product.price) || 0;
                    const priceWithTax = await calculatePriceWithTax(basePrice, product.tax_class);
                    return { ...product, price_with_tax: priceWithTax };
                })
            );

            allProducts.push(...dataWithTax);

            if (data.length < per_page) break;
        }

        return allProducts;

    } catch (error) {
        console.log(error);
        return [];
    }
};



// Get single product by their slug

export const getProductBySlug = async (slug) => {
    const url = `https://staging.afs-foiling.com/wp-json/wc/v3/products?slug=${slug}&lang=fr`;
    // const url = `https://afs-foiling.com/fr/wp-json/wc/v3/products?slug=${slug}`;
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Basic ${authHeader}`
            },
            cache: "no-cache",
        })
        const data = await response.json();
        const product = data[0];

        if (product) {
            const basePrice = parseFloat(product.price) || 0;
            const priceWithTax = await calculatePriceWithTax(basePrice, product.tax_class);
            return { ...product, price_with_tax: priceWithTax };
        }
        return product;
    } catch (error) {
        console.log(error);
        return { error: true }
    }
}

export const getPrice = async (productId, selectedVariation) => {
    // const url = `https://afs-foiling.com/fr/wp-json/wc/v3/products/${productId}/variations?per_page=100`;
    const url = `https://staging.afs-foiling.com/wp-json/wc/v3/products/${productId}/variations?per_page=100&lang=fr`;

    try {
        // Get user country for tax calculation
        // If logged in: use shipping country, then billing country
        // If not logged in: default to France (FR)
        let userCountry = "FR"; // Default to France

        const user = await getAuthenticatedUser();
        if (user) {
            // Priority: shipping country > billing country > default FR
            userCountry = user.shipping?.country || user.billing?.country || "FR";
        }

        const response = await fetch(url, {
            headers: {
                Authorization: `Basic ${authHeader}`,
            },
            cache: "no-cache",
        });

        const variations = await response.json();

        const matchedVariation = variations.find((variation) => {

            return variation.attributes.every((attr) => {
                // WooCommerce provides english slug → convert to readable name
                const attrName = attr.name
                    .replace("attribute_", "")
                    .toLowerCase()
                    .trim();

                // Convert selectedVariation keys to lower-case comparison form
                const selectedEntry = Object.entries(selectedVariation).find(
                    ([key]) => key.toLowerCase().trim() === attrName
                );

                if (!selectedEntry) {
                    return true;
                }

                const selectedValue = selectedEntry[1];

                if (!selectedValue) return false;

                // Compare values
                return (
                    selectedValue.toLowerCase().trim() ===
                    attr.option.toLowerCase().trim()
                );
            });
        });

        const basePrice = parseFloat(matchedVariation?.price) || 0;
        const priceWithTax = await calculatePriceWithTax(basePrice, matchedVariation?.tax_class, userCountry);
        const taxAmount = parseFloat((priceWithTax - basePrice).toFixed(2));

        return {
            price: priceWithTax,
            priceExcludingTax: basePrice,
            taxAmount: taxAmount,
            userCountry: userCountry, // Return the country used for tax calculation
            id: matchedVariation?.id,
            attributes: matchedVariation
        } || null;

    } catch (error) {
        console.log(error);
        return null;
    }
};



// get woo-commerce orders 

export const getOrders = async () => {
    const authHeader =
        "Basic " +
        Buffer.from(
            `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
        ).toString("base64");

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    const user = await getAuthenticatedUser();

    if (!token || !user?.id) {
        return [];
    }

    const userId = user.id;
    const perPage = 100;

    let allOrders = [];

    // 1️⃣ First request (to know total pages)
    const firstRes = await fetch(
        `${process.env.WP_BASE_URL}/wp-json/wc/v3/orders?customer=${userId}&page=1&per_page=${perPage}&orderby=date&order=desc`,
        {
            headers: { Authorization: authHeader },
            cache: "no-store",
        }
    );

    if (!firstRes.ok) {
        throw new Error("Failed to fetch orders");
    }

    const totalPages = Number(firstRes.headers.get("X-WP-TotalPages")) || 1;
    const firstOrders = await firstRes.json();

    allOrders.push(...firstOrders);

    // 2️⃣ Fetch remaining pages
    for (let page = 2; page <= totalPages; page++) {
        const res = await fetch(
            `${process.env.WP_BASE_URL}/wp-json/wc/v3/orders?customer=${userId}&page=${page}&per_page=${perPage}&orderby=date&order=desc`,
            {
                headers: { Authorization: authHeader },
                cache: "no-store",
            }
        );

        if (!res.ok) {
            throw new Error(`Failed to fetch orders on page ${page}`);
        }

        const orders = await res.json();
        allOrders.push(...orders);
    }

    return allOrders;
};



export const getRecentProducts = async () => {
    const url = `${process.env.WP_BASE_URL}/wp-json/wc/v2/products?orderby=date&order=desc&per_page=20`;
    try {
        const response = await fetch(url, {
            headers: { Authorization: authHeader },
            cache: "no-store",
        });
        const data = await response.json();
        return data || [];
    }
    catch (error) {
        console.log(error);
        return error;
    }
}


export async function searchProducts(query) {
    if (!query) return [];

    const res = await fetch(
        `${process.env.WP_BASE_URL}/wp-json/wc/v3/products?search=${encodeURIComponent(query)}&per_page=100&_fields=name`,
        {
            headers: { Authorization: authHeader },
            cache: "no-store",
        }
    );

    if (!res.ok) return [];
    return await res.json();
}

// Get coupon by code
export async function getCouponByCode(code) {
    try {
        if (!code) {
            return { success: false, error: 'Code promo requis' };
        }

        const res = await fetch(
            `${process.env.WP_BASE_URL}/wp-json/wc/v3/coupons?code=${encodeURIComponent(code)}`,
            {
                headers: {
                    Authorization: `Basic ${authHeader}`,
                    'Content-Type': 'application/json'
                },
                cache: "no-store",
            }
        );

        if (!res.ok) {
            return { success: false, error: 'Erreur lors de la recherche du coupon' };
        }

        const coupons = await res.json();

        if (!coupons || coupons.length === 0) {
            return { success: false, error: 'Code promo invalide' };
        }

        const coupon = coupons[0];

        // Check if coupon is expired
        if (coupon.date_expires) {
            const expiryDate = new Date(coupon.date_expires);
            if (expiryDate < new Date()) {
                return { success: false, error: 'Ce code promo a expiré' };
            }
        }

        // Check usage limit
        if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) {
            return { success: false, error: 'Ce code promo a atteint sa limite d\'utilisation' };
        }

        return {
            success: true,
            data: {
                id: coupon.id,
                code: coupon.code,
                discount_type: coupon.discount_type, // percent, fixed_cart, fixed_product
                amount: coupon.amount,
                description: coupon.description,
                date_expires: coupon.date_expires,
                usage_count: coupon.usage_count,
                usage_limit: coupon.usage_limit,
                individual_use: coupon.individual_use,
                minimum_amount: coupon.minimum_amount,
                maximum_amount: coupon.maximum_amount,
                free_shipping: coupon.free_shipping,
                product_ids: coupon.product_ids,
                excluded_product_ids: coupon.excluded_product_ids,
                product_categories: coupon.product_categories,
                excluded_product_categories: coupon.excluded_product_categories
            }
        };
    } catch (error) {
        console.error('Error fetching coupon:', error);
        return { success: false, error: 'Erreur serveur' };
    }
}

// Validate coupon for cart
export async function validateCoupon(code, cartTotal = 0, productIds = []) {
    try {
        const couponResult = await getCouponByCode(code);

        if (!couponResult.success) {
            return couponResult;
        }

        const coupon = couponResult.data;

        // Check minimum amount
        if (coupon.minimum_amount && parseFloat(coupon.minimum_amount) > cartTotal) {
            return {
                success: false,
                error: `Montant minimum requis: ${coupon.minimum_amount}€`
            };
        }

        // Check maximum amount
        if (coupon.maximum_amount && parseFloat(coupon.maximum_amount) > 0 && cartTotal > parseFloat(coupon.maximum_amount)) {
            return {
                success: false,
                error: `Montant maximum autorisé: ${coupon.maximum_amount}€`
            };
        }

        // Check product restrictions
        if (coupon.product_ids && coupon.product_ids.length > 0) {
            const hasValidProduct = productIds.some(id => coupon.product_ids.includes(id));
            if (!hasValidProduct) {
                return {
                    success: false,
                    error: 'Ce coupon n\'est pas valide pour les produits de votre panier'
                };
            }
        }

        // Check excluded products
        if (coupon.excluded_product_ids && coupon.excluded_product_ids.length > 0) {
            const hasExcludedProduct = productIds.every(id => coupon.excluded_product_ids.includes(id));
            if (hasExcludedProduct) {
                return {
                    success: false,
                    error: 'Ce coupon n\'est pas valide pour les produits de votre panier'
                };
            }
        }

        // Calculate discount
        let discountAmount = 0;
        if (coupon.discount_type === 'percent') {
            discountAmount = (cartTotal * parseFloat(coupon.amount)) / 100;
        } else if (coupon.discount_type === 'fixed_cart') {
            discountAmount = parseFloat(coupon.amount);
        }

        return {
            success: true,
            data: {
                ...coupon,
                discount_amount: discountAmount.toFixed(2)
            }
        };
    } catch (error) {
        console.error('Error validating coupon:', error);
        return { success: false, error: 'Erreur serveur' };
    }
}


export const getCountryDetails = async (country) => {
    const url = `https://staging.afs-foiling.com/wp-json/wc/v3/data/countries/${country}`;
    try {
        const response = await fetch(url, {
            headers: { Authorization: `Basic ${authHeader}` },
            cache: "no-store",
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}


export const getPaymentMethods = async () => {
    const url = `https://staging.afs-foiling.com/wp-json/wc/v3/payment_methods`;
    try {
        const response = await fetch(url, {
            headers: { Authorization: `Basic ${authHeader}` },
            cache: "no-store",
        });

        console.log(response, 'response');
        

        if (!response.ok) {
            throw new Error(`Failed to fetch payment methods: ${response.status}`);
        }
        const data = await response.json();
        const enabledMethods = data.filter((method) => method.enabled);
        return enabledMethods;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}