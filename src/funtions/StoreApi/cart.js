'use server';

import { revalidatePath } from 'next/cache';
import { getWooCommerceCookies, setCookiesFromResponse } from './cookie-handler';
import { getAuthenticatedUser } from '../auth';

// Using your environment variables
const WP_URL = process.env.WP_BASE_URL || 'https://staging.afs-foiling.com/fr';
const WC_STORE_URL = `${WP_URL}/wp-json/wc/store/v1`;

// Get cart
export async function getCart() {
    try {
        const cookieHeader = await getWooCommerceCookies();

        const response = await fetch(`${WC_STORE_URL}/cart`, {
            method: 'GET',
            headers: {
                'Cookie': cookieHeader,
                'Accept': 'application/json',
            },
            cache: 'no-store',
        });

        await setCookiesFromResponse(response);

        if (!response.ok) {
            throw new Error(`Failed to get cart: ${response.status}`);
        }

        const cartData = await response.json();

        console.log(cartData, 'cartData');
        

        return { success: true, data: cartData };

    } catch (error) {
        console.error('Get cart error:', error);
        return { success: false, error: error.message };
    }
}

// Add to cart
export async function addToCart(productId, quantity = 1, variationId = null, variation = {}) {

    try {
        const cookieHeader = await getWooCommerceCookies();

        const payload = {
            id: parseInt(productId),
            quantity: parseInt(quantity),
        };

        if (variationId) {
            payload.variation_id = parseInt(variationId);
        }

        if (variation && typeof variation === 'object' && Object.keys(variation).length > 0) {
            payload.variation = Object.entries(variation).map(([attribute, value]) => ({
                attribute: attribute,
                value: value
            }));
        }

        console.log(payload, 'payload');


        const response = await fetch(`${WC_STORE_URL}/cart/add-item`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookieHeader,
                'Accept': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        console.log(response, 'response');



        await setCookiesFromResponse(response);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `Failed to add to cart: ${response.status}`);
        }

        // Revalidate paths that show cart data
        revalidatePath('/');
        revalidatePath('/cart');
        revalidatePath('/products');

        return {
            success: true,
            message: 'Added to cart successfully',
            data
        };

    } catch (error) {
        console.error('Add to cart error:', error);
        return { success: false, error: error.message };
    }
}

// Update cart item
export async function updateCartItem(itemKey, quantity) {

    try {
        if (quantity < 1) {
            return { success: false, error: 'Quantity must be at least 1' };
        }

        const cookieHeader = await getWooCommerceCookies();

        const response = await fetch(`${WC_STORE_URL}/cart/update-item`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookieHeader,
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                key: itemKey,
                quantity: parseInt(quantity),
            }),
        });

        await setCookiesFromResponse(response);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `Failed to update cart: ${response.status}`);
        }

        revalidatePath('/cart');
        revalidatePath('/');

        return {
            success: true,
            message: 'Cart updated successfully',
            data
        };

    } catch (error) {
        console.error('Update cart error:', error);
        return { success: false, error: error.message };
    }
}

// Remove item from cart
export async function removeCartItem(itemKey) {

    try {
        const cookieHeader = await getWooCommerceCookies();

        const response = await fetch(`${WC_STORE_URL}/cart/remove-item`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookieHeader,
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                key: itemKey,
            }),
        });

        await setCookiesFromResponse(response);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `Failed to remove item: ${response.status}`);
        }

        revalidatePath('/cart');
        revalidatePath('/');

        return {
            success: true,
            message: 'Item removed from cart',
            data
        };

    } catch (error) {
        console.error('Remove from cart error:', error);
        return { success: false, error: error.message };
    }
}

// Clear entire cart
export async function clearCart() {

    try {
        const cookieHeader = await getWooCommerceCookies();

        const response = await fetch(`${WC_STORE_URL}/cart/items`, {
            method: 'DELETE',
            headers: {
                'Cookie': cookieHeader,
                'Accept': 'application/json',
            },
        });

        await setCookiesFromResponse(response);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `Failed to clear cart: ${response.status}`);
        }

        revalidatePath('/cart');
        revalidatePath('/');

        return {
            success: true,
            message: 'Cart cleared successfully',
            data
        };

    } catch (error) {
        console.error('Clear cart error:', error);
        return { success: false, error: error.message };
    }
}

// // Default France location
// const DEFAULT_LOCATION = {
//     country: 'FR',
//     state: '',
//     city: 'Paris',
//     postcode: '75001'
// };

// Get shipping methods based on location
export async function getShippingMethods() {
    try {
        const cookieHeader = await getWooCommerceCookies();

        // First, get the cart to check for existing addresses
        const cartResponse = await fetch(`${WC_STORE_URL}/cart`, {
            method: 'GET',
            headers: {
                'Cookie': cookieHeader,
                'Accept': 'application/json',
            },
            cache: 'no-store',
        });

        await setCookiesFromResponse(cartResponse);

        if (!cartResponse.ok) {
            throw new Error(`Failed to get cart: ${cartResponse.status}`);
        }

        const cartData = await cartResponse.json();

        // Get authenticated user for their saved addresses
        const user = await getAuthenticatedUser();

        // Determine the location:
        // 1. If user is logged in → use their shipping address
        // 2. If user is logged in but no shipping → use their billing address
        // 3. If user is NOT logged in → default to France
        let location;

        if (user) {
            // User is logged in - use their saved addresses
            const userShippingAddress = user.shipping;
            const userBillingAddress = user.billing;

            if (userShippingAddress?.country) {
                location = {
                    country: userShippingAddress.country,
                    state: userShippingAddress.state || '',
                    city: userShippingAddress.city || '',
                    postcode: userShippingAddress.postcode || ''
                };
            } else if (userBillingAddress?.country) {
                location = {
                    country: userBillingAddress.country,
                    state: userBillingAddress.state || '',
                    city: userBillingAddress.city || '',
                    postcode: userBillingAddress.postcode || ''
                };
            } else {
                // User logged in but no address saved - use France
                location = DEFAULT_LOCATION;
            }
        } else {
            // User NOT logged in - use France by default
            location = DEFAULT_LOCATION;
        }

        // Update shipping address to get accurate shipping rates
        const updateResponse = await fetch(`${WC_STORE_URL}/cart/update-customer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookieHeader,
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                shipping_address: location
            }),
        });

        await setCookiesFromResponse(updateResponse);

        if (!updateResponse.ok) {
            const errorData = await updateResponse.json();
            throw new Error(errorData.message || `Failed to update customer: ${updateResponse.status}`);
        }

        const updatedCart = await updateResponse.json();

        // Extract shipping rates from the cart
        const shippingRates = updatedCart?.shipping_rates || [];

        return {
            success: true,
            data: {
                location,
                shipping_rates: shippingRates,
                selected_rate: shippingRates?.[0]?.shipping_rates?.find(rate => rate.selected) || null
            }
        };

    } catch (error) {
        console.error('Get shipping methods error:', error);
        return { success: false, error: error.message };
    }
}



// export async function getShippingMethods() {
//     try {
//         const cookieHeader = await getWooCommerceCookies();

//         const response = await fetch(`${WC_STORE_URL}/shipping-options`, {
//             method: 'GET',
//             headers: {
//                 'Cookie': cookieHeader,
//                 'Accept': 'application/json',
//             },
//         });
//         const shippingMethods = await response.json();
//         console.log(shippingMethods, 'shippingMethods');
//         return {
//             success: true,
//             data: shippingMethods
//         };
//     } catch (error) {
//         console.error('Get shipping methods error:', error);
//         return { success: false, error: error.message };
//     }
// }

// Update shipping location and get new rates
export async function updateShippingLocation(country, state = '', city = '', postcode = '') {
    try {
        const cookieHeader = await getWooCommerceCookies();

        const location = {
            country: country || DEFAULT_LOCATION.country,
            state: state,
            city: city,
            postcode: postcode
        };

        const response = await fetch(`${WC_STORE_URL}/cart/update-customer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookieHeader,
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                shipping_address: location
            }),
        });

        await setCookiesFromResponse(response);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `Failed to update shipping location: ${response.status}`);
        }

        const shippingRates = data?.shipping_rates || [];

        return {
            success: true,
            data: {
                location,
                shipping_rates: shippingRates,
                selected_rate: shippingRates?.[0]?.shipping_rates?.find(rate => rate.selected) || null
            }
        };

    } catch (error) {
        console.error('Update shipping location error:', error);
        return { success: false, error: error.message };
    }
}

// Select a shipping rate
export async function selectShippingRate(rateId, packageId = 0) {
    console.log(rateId, packageId, 'rateId, packageId');
    try {
        const cookieHeader = await getWooCommerceCookies();

        const response = await fetch(`${WC_STORE_URL}/cart/select-shipping-rate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookieHeader,
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                rate_id: rateId,
                package_id: packageId
            }),
        });

        await setCookiesFromResponse(response);

        const data = await response.json();
        console.log(data,'shipping_rate_data');
        

        if (!response.ok) {
            throw new Error(data.message || `Failed to select shipping rate: ${response.status}`);
        }

        revalidatePath('/cart');

        return {
            success: true,
            message: 'Shipping rate selected',
            data
        };

    } catch (error) {
        console.error('Select shipping rate error:', error);
        return { success: false, error: error.message };
    }
}

// Apply coupon code
export async function applyCoupon(couponCode) {
    try {
        if (!couponCode || couponCode.trim() === '') {
            return { success: false, error: 'Please enter a coupon code' };
        }

        const cookieHeader = await getWooCommerceCookies();

        const response = await fetch(`${WC_STORE_URL}/cart/apply-coupon`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookieHeader,
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                code: couponCode.trim()
            }),
        });

        await setCookiesFromResponse(response);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `Failed to apply coupon: ${response.status}`);
        }

        revalidatePath('/cart');

        return {
            success: true,
            message: 'Coupon applied successfully',
            data
        };

    } catch (error) {
        console.error('Apply coupon error:', error);
        return { success: false, error: error.message };
    }
}

// Remove coupon code
export async function removeCoupon(couponCode) {
    try {
        if (!couponCode || couponCode.trim() === '') {
            return { success: false, error: 'Invalid coupon code' };
        }

        const cookieHeader = await getWooCommerceCookies();

        const response = await fetch(`${WC_STORE_URL}/cart/remove-coupon`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookieHeader,
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                code: couponCode.trim()
            }),
        });

        await setCookiesFromResponse(response);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `Failed to remove coupon: ${response.status}`);
        }

        revalidatePath('/cart');

        return {
            success: true,
            message: 'Coupon removed successfully',
            data
        };

    } catch (error) {
        console.error('Remove coupon error:', error);
        return { success: false, error: error.message };
    }
}
