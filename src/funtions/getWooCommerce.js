"use server"

const consumerKey = process.env.WC_CONSUMER_KEY;
const consumerSecret = process.env.WC_CONSUMER_SECRET
const authHeader = Buffer
    .from(`${consumerKey}:${consumerSecret}`)
    .toString("base64");


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
    const url = `https://staging.afs-foiling.com/wp-json/wc/v3/products/categories?parent=${parentId}&per_page=100&lang=fr&_fields=id,name,slug`;
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


// // Recursively get all descendant category IDs
// const getAllDescendantCategoryIds = async (parentId) => {
//     let ids = [parentId];
//     const children = await getChildCategories(parentId);

//     for (const child of children) {
//         const childDescendants = await getAllDescendantCategoryIds(child.id);
//         ids = ids.concat(childDescendants);
//     }
//     return ids;
// };

// export const getProductsByCategoryIds = async (categoryIds) => {
//     const url = `https://staging.afs-foiling.com/wp-json/wc/v3/products?category=${categoryIds.join(',')}&per_page=100&lang=fr`;

//     const response = await fetch(url, {
//         headers: {
//             Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`,
//         },
//         next: { revalidate: 3600 },
//     });

//     if (!response.ok) throw new Error(`WooCommerce API error: ${response.statusText}`);
//     return response.json();
// };


// export const getAllProductsUnderParentCategory = async (parentSlug) => {
//     // Get parent category by slug
//     const parentCategoryUrl = `https://staging.afs-foiling.com/wp-json/wc/v3/products/categories?slug=${encodeURIComponent(parentSlug)}&lang=fr`;
//     const parentRes = await fetch(parentCategoryUrl, {
//         headers: {
//             Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`,
//         },
//         next: { revalidate: 3600 },
//     });
//     if (!parentRes.ok) throw new Error(`WooCommerce API error: ${parentRes.statusText}`);
//     const parentData = await parentRes.json();
//     if (!parentData.length) throw new Error(`Parent category '${parentSlug}' not found.`);

//     const parentId = parentData[0].id;

//     // Get all descendant category IDs
//     const allCategoryIds = await getAllDescendantCategoryIds(parentId);

//     // Get all products under all categories
//     const products = await getProductsByCategoryIds(allCategoryIds);

//     return products; // Only published products by default
// };


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
            let url = `https://staging.afs-foiling.com/wp-json/wc/v3/products?category=${firstCategory}&status=publish&_fields=id,name,acf,images,slug,categories,price,regular_price,sale_price,type&per_page=${per_page}&page=${i}&lang=fr`;


            console.log(url,'url');
            

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

            allProducts.push(...data);

            if (data.length < per_page) break;
        }

        return allProducts;

    } catch (error) {
        console.log(error);
        return [];
    }
};

