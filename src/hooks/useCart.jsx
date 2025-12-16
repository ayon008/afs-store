'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import {
    getCart as getCartAction, addToCart as addToCartAction, updateCartItem,
    removeCartItem,
    clearCart,
    applyCoupon,
    removeCoupon
} from '../funtions/StoreApi/cart';

// Create the Cart Context
const CartContext = createContext(null);

// Cart Provider Component
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load cart data
    const loadCart = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await getCartAction();

            if (result.success) {
                setCart(result.data);
            } else {
                setError(result.error);
                console.error('Failed to load cart:', result.error);
            }
        } catch (err) {
            setError(err.message);
            console.error('Cart loading error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Initial cart load
    useEffect(() => {
        loadCart();
    }, []);

    // Add item to cart
    const handleAddToCart = async (productId, quantity = 1, variationId = null, attributes = {}) => {
        try {
            setLoading(true);
            const result = await addToCartAction(productId, quantity, variationId, attributes);
            if (result.success) {
                // Update items_count immediately for better UX
                setCart(prev => {
                    if (!prev) return prev;
                    return {
                        ...prev,
                        items_count: (prev.items_count || 0) + quantity
                    };
                });

                // Then refresh full cart data
                await loadCart();
            } else {
                setError(result.error);
                console.error('Add to cart error:', result.error);
            }

            return result;
        } catch (err) {
            setError(err.message);
            console.error('Add to cart error:', err);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    // Update cart item quantity
    const handleUpdateCartItem = async (itemKey, quantity) => {
        try {
            const result = await updateCartItem(itemKey, quantity);

            if (result.success) {
                // Update local cart state immediately for better UX
                setCart(prev => {
                    if (!prev || !prev.items) return prev;

                    return {
                        ...prev,
                        items: prev.items.map(item =>
                            item.key === itemKey
                                ? { ...item, quantity: quantity }
                                : item
                        )
                    };
                });

                // Then refresh full cart data
                await loadCart();
            }

            return result;
        } catch (err) {
            console.error('Update cart error:', err);
            return { success: false, error: err.message };
        }
    };

    // Remove item from cart
    const handleRemoveCartItem = async (itemKey) => {
        try {
            const result = await removeCartItem(itemKey);

            if (result.success) {
                // Update local cart state immediately
                setCart(prev => {
                    if (!prev || !prev.items) return prev;

                    const removedItem = prev.items.find(item => item.key === itemKey);
                    const removedQty = removedItem?.quantity || 1;

                    return {
                        ...prev,
                        items: prev.items.filter(item => item.key !== itemKey),
                        items_count: (prev.items_count || 0) - removedQty
                    };
                });

                await loadCart();
            }

            return result;
        } catch (err) {
            console.error('Remove from cart error:', err);
            return { success: false, error: err.message };
        }
    };

    // Clear entire cart
    const handleClearCart = async () => {
        try {
            const result = await clearCart();

            if (result.success) {
                setCart(null);
            }

            return result;
        } catch (err) {
            console.error('Clear cart error:', err);
            return { success: false, error: err.message };
        }
    };

    // Apply coupon code
    const handleApplyCoupon = async (couponCode) => {
        try {
            setError(null);
            const result = await applyCoupon(couponCode);

            if (result.success) {
                await loadCart();
            } else {
                setError(result.error);
            }

            return result;
        } catch (err) {
            console.error('Apply coupon error:', err);
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    // Remove coupon code
    const handleRemoveCoupon = async (couponCode) => {
        try {
            setError(null);
            const result = await removeCoupon(couponCode);

            if (result.success) {
                await loadCart();
            } else {
                setError(result.error);
            }

            return result;
        } catch (err) {
            console.error('Remove coupon error:', err);
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    // Get applied coupons
    const getAppliedCoupons = () => {
        return cart?.coupons || [];
    };

    // Get discount total
    const getDiscountTotal = () => {
        if (!cart || !cart.totals || !cart.totals.total_discount) return 0;
        return (cart.totals.total_discount / 100).toFixed(2);
    };

    // Get total price
    const getTotalPrice = () => {
        if (!cart || !cart.totals || !cart.totals.total_price) return 0;
        return (cart.totals.total_price / 100).toFixed(2);
    };

    // Get item count
    const getItemCount = () => {
        return cart?.items_count || 0;
    };

    // Check if item is in cart
    const isInCart = (productId, variationId = null) => {
        if (!cart || !cart.items) return false;

        return cart.items.some(item => {
            const matchesProduct = item.id === productId;
            const matchesVariation = variationId
                ? item.variation_id === variationId
                : true;

            return matchesProduct && matchesVariation;
        });
    };

    // Get item quantity in cart
    const getItemQuantity = (productId, variationId = null) => {
        if (!cart || !cart.items) return 0;

        const item = cart.items.find(item => {
            const matchesProduct = item.id === productId;
            const matchesVariation = variationId
                ? item.variation_id === variationId
                : true;

            return matchesProduct && matchesVariation;
        });

        return item ? item.quantity : 0;
    };

    const value = {
        cart,
        loading,
        error,
        handleAddToCart,
        handleUpdateCartItem,
        handleRemoveCartItem,
        handleClearCart,
        handleApplyCoupon,
        handleRemoveCoupon,
        loadCart,
        getTotalPrice,
        getItemCount,
        isInCart,
        getItemQuantity,
        getAppliedCoupons,
        getDiscountTotal
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// Hook to use the cart context
const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export default useCart;
