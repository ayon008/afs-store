'use server';

import { revalidatePath } from 'next/cache';
import { getWooCommerceCookies, setCookiesFromResponse } from './cookie-handler';

// Using your environment variables
const WP_URL = 'https://staging.afs-foiling.com/fr'; // From your WOO_URL
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