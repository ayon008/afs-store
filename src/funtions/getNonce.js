// export async function getNonce() {
//     try {
//         const response = await fetch(`${process.env.WP_BASE_URL}/wp-json/wc/store/v1/cart`, {
//             method: 'GET',
//             credentials: 'include',
//         });

//         const nonce = response.headers.get('Nonce') || response.headers.get('X-WC-Store-API-Nonce');
//         return nonce;
//     } catch (error) {
//         console.error('Failed to get nonce:', error);
//         return null;
//     }
// }

// // Helper to create auth header
// const getAuthHeader = () => {
//     const consumerKey = process.env.WC_CONSUMER_KEY;
//     const consumerSecret = process.env.WC_CONSUMER_SECRET
//     const credentials = Buffer
//         .from(`${consumerKey}:${consumerSecret}`)
//         .toString("base64");
//     return `Basic ${credentials}`;
// };



// // Store API requests (for cart operations) - with nonce support
// export async function storeApiFetch(endpoint, options = {}) {
//     const url = `${process.env.WP_BASE_URL}/wp-json/wc/store/v1${endpoint}`;

//     const response = await fetch(url, {
//         ...options,
//         credentials: 'include',
//         headers: {
//             'Content-Type': 'application/json',
//             ...options.headers,
//         },
//     });

//     if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || 'API request failed');
//     }

//     return response.json();
// }



// // REST API requests (for products and variations)
// export async function restApiFetch(endpoint, options = {}) {
//     const url = `${process.env.WP_BASE_URL}/wp-json/wc/v3${endpoint}`;

//     const response = await fetch(url, {
//         ...options,
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': getAuthHeader(),
//             ...options.headers,
//         },
//     });

//     if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || 'API request failed');
//     }

//     return response.json();
// }