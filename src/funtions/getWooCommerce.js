"use server"

const consumerKey = process.env.WC_CONSUMER_KEY;
const consumerSecret = process.env.WC_CONSUMER_SECRET
const authHeader = Buffer
    .from(`${consumerKey}:${consumerSecret}`)
    .toString("base64");



export const calculatePriceWithTax = async (basePrice, tax_class = "standard", country = "fr") => {
    try {
        const per_page = 100;
        let page = 1;
        let allTaxes = [];
        const authHeader = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

        // Fetch all pages
        while (true) {
            const response = await fetch(`https://staging.afs-foiling.com/fr/wp-json/wc/v3/taxes?per_page=${per_page}&page=${page}`, {
                headers: {
                    Authorization: `Basic ${authHeader}`,
                    'Content-Type': 'application/json',
                },
                cache: "no-cache"
            });

            if (!response.ok) throw new Error('Failed to fetch tax rates');

            const taxes = await response.json();

            if (!Array.isArray(taxes) || taxes.length === 0) break;

            allTaxes.push(...taxes);

            if (taxes.length < per_page) break; // last page
            page++;
        }

        // Find the correct tax for country & class
        const standardTax = allTaxes.find(t => t?.country?.toLowerCase() === country.toLowerCase());

        if (!standardTax) return basePrice;

        const taxRate = parseFloat(standardTax.rate);
        const priceWithTax = basePrice + (basePrice * taxRate) / 100;

        return parseFloat(priceWithTax.toFixed(2));
    } catch (error) {
        console.error('Error calculating tax:', error);
        return basePrice; // fallback
    }
};



// get All the parent Categories
export const getParentCategory = async (slug) => {
    if (!slug || typeof slug !== "string") {
        throw new Error("A valid category slug must be provided.");
    }

    const url = `https://staging.afs-foiling.com/fr/wp-json/wc/v3/products/categories?slug=${encodeURIComponent(slug)}`;

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
    const url = `https://staging.afs-foiling.com/fr/wp-json/wc/v3/products/categories?parent=${parentId}&per_page=100&_fields=id,name,slug`;
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
            let url = `https://staging.afs-foiling.com/fr/wp-json/wc/v3/products?category=${firstCategory}&status=publish&_fields=id,name,acf,images,slug,categories,price,regular_price,sale_price,price_html,type&per_page=${per_page}&page=${i}&taxes=1`;
            // let url = `https://afs-foiling.com/fr/wp-json/wc/v3/products?category=${firstCategory}&status=publish&_fields=id,name,acf,images,slug,categories,price,regular_price,sale_price,price_html,type&per_page=${per_page}&page=${i}&taxes=1`;

            console.log(url, 'url');


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
                    const priceWithTax = await calculatePriceWithTax(basePrice);
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
    const url = `https://staging.afs-foiling.com/fr/wp-json/wc/v3/products?slug=${slug}`;
    // const url = `https://afs-foiling.com/fr/wp-json/wc/v3/products?slug=${slug}`;
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Basic ${authHeader}`
            },
            next: { revalidate: 3600 },
        })
        const data = await response.json();
        return data[0];
    } catch (error) {
        console.log(error);
        return { error: true }
    }
}

export const getPrice = async (productId, selectedVariation) => {
    // const url = `https://afs-foiling.com/fr/wp-json/wc/v3/products/${productId}/variations?per_page=100`;
    const url = `https://staging.afs-foiling.com/fr/wp-json/wc/v3/products/${productId}/variations?per_page=100`;

    try {
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

        const price = await calculatePriceWithTax(matchedVariation?.price, matchedVariation?.tax_class);
        // console.log(price);

        return price || null;

    } catch (error) {
        console.log(error);
        return null;
    }
};


