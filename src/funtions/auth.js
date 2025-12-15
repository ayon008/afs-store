"use server"
// app/actions/auth.ts
import { cookies } from "next/headers";


const consumerKey = process.env.WC_CONSUMER_KEY;
const consumerSecret = process.env.WC_CONSUMER_SECRET
const authHeader = Buffer
    .from(`${consumerKey}:${consumerSecret}`)
    .toString("base64");

// Get User
export const getAuthenticatedUser = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) return null;

        /* 1️⃣ Get WordPress user */
        const wpRes = await fetch(
            `${process.env.WP_BASE_URL}/wp-json/wp/v2/users/me?context=edit`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                cache: "no-store",
            }
        );

        if (!wpRes.ok) return null;
        const wpUser = await wpRes.json();

        /* 2️⃣ Get WooCommerce customer (billing + shipping) */
        const wcRes = await fetch(
            `${process.env.WP_BASE_URL}/wp-json/wc/v3/customers/${wpUser.id}`,
            {
                headers: {
                    Authorization: `Basic ${authHeader}`,
                },
                cache: "no-store",
            }
        );

        if (!wcRes.ok) {
            // fallback: return WP user if WC fails
            return wpUser;
        }

        const wcCustomer = await wcRes.json();

        /* 3️⃣ Merge & return */
        return {
            ...wpUser,
            billing: wcCustomer.billing || {},
            shipping: wcCustomer.shipping || {},
        };
    } catch (error) {
        console.error("Error fetching authenticated user:", error);
        return null;
    }
};

// logout
export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('auth_token');
    cookieStore.delete('user_data');
}


// private access
export async function wooCommerceApi(endpoint, options = {}) {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const url = `${process.env.WP_BASE_URL}${endpoint}`;

    return fetch(url, {
        ...options,
        headers,
    });
}


// verify token

export async function verifyToken(token) {
    try {
        const response = await fetch(`${process.env.WP_BASE_URL}/wp/v2/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.ok;
    } catch {
        return false;
    }
}


// update profile

export async function updateProfile(data) {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
        return { success: false, error: "Not authenticated" };
    }

    console.log(data, 'data');


    try {
        // 1️⃣ Get the WordPress user (to get the ID)
        const wpRes = await fetch(`${process.env.WP_BASE_URL}/wp-json/wp/v2/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        });

        if (!wpRes.ok) return { success: false, error: "Failed to fetch user" };

        const wpUser = await wpRes.json();

        // 2️⃣ Update WordPress user info (first_name, last_name, email, etc.)
        const wpUpdateRes = await fetch(`${process.env.WP_BASE_URL}/wp-json/wp/v2/users/me`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                display_name: data.display_name,
                nickname: data.nickname,
            }),
        });

        const wpResult = await wpUpdateRes.json();

        // console.log(wpResult);


        if (!wpUpdateRes.ok) {
            console.error("WP update error:", wpResult);
            return { success: false, error: "Failed to update WordPress user" };
        }

        // console.log(wpResult.id, 'wp user id');


        // 3️⃣ Update WooCommerce billing/shipping info
        if (data.billing || data.shipping) {
            console.log('ayon');

            const wcRes = await fetch(`${process.env.WP_BASE_URL}/wp-json/wc/v3/customers/${wpUser.id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Basic ${authHeader}`,
                },
                body: JSON.stringify({
                    billing: data.billing || {},
                    shipping: data.shipping || {},
                }),
            });

            // console.log(wcRes, 'wc response');


            const wcResult = await wcRes.json();

            if (!wcRes.ok) {
                console.error("WC update error:", wcResult);
                return { success: false, error: "Failed to update WooCommerce info" };
            }

            return { success: true, wpUser: wpResult, wcUser: wcResult };
        }

        return { success: true, wpUser: wpResult };

    } catch (error) {
        console.error("Error updating profile:", error);
        return { success: false, error: "Something went wrong" };
    }
}

export async function changePasswordAction(data) {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
        return { success: false, error: 'Not authenticated' };
    }

    const { currentPassword, newPassword } = data;

    console.log('currentPassword', currentPassword);


    try {
        // 1️⃣ Get current user (to obtain username/email)
        const user = await getAuthenticatedUser();

        const username = user.slug; // or user.email

        // 2️⃣ Verify current password
        const verifyRes = await fetch(
            `${process.env.WP_BASE_URL}/wp-json/jwt-auth/v1/token`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password: currentPassword,
                }),
            }
        );

        if (!verifyRes.ok) {
            return { success: false, error: 'Current password is incorrect' };
        }

        // 3️⃣ Change password
        const changeRes = await fetch(
            `${process.env.WP_BASE_URL}/wp-json/wp/v2/users/me`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    password: newPassword,
                }),
            }
        );

        if (!changeRes.ok) {
            return { success: false, error: 'Failed to change password' };
        }

        return { success: true };
    } catch (err) {
        console.error(err);
        return { success: false, error: 'Something went wrong' };
    }
}



export const updateBillingInfo = async (billingData) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;


    if (!token) {
        return { success: false, error: "Not authenticated" };
    }

    try {
        // 1️⃣ Get the WordPress user (to get the ID)
        const wpRes = await fetch(`${process.env.WP_BASE_URL}/wp-json/wp/v2/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        });
        if (!wpRes.ok) return { success: false, error: "Failed to fetch user" };
        const wpUser = await wpRes.json();

        // 2️⃣ Update WooCommerce billing info
        const wcRes = await fetch(`${process.env.WP_BASE_URL}/wp-json/wc/v3/customers/${wpUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${authHeader}`,
            },
            body: JSON.stringify({
                billing: {
                    first_name: billingData.billing_first_name || "",
                    last_name: billingData.billing_last_name || "",
                    company: billingData.billing_company || "",
                    address_1: billingData.billing_address_1 || "",
                    address_2: billingData.billing_address_2 || "", // optional
                    postcode: billingData.billing_postcode || "",
                    city: billingData.billing_city || "",
                    phone: billingData.billing_phone || "",
                    email: billingData.billing_email || "",
                    country: billingData.country || "FR",
                },
            }),
            cache: "no-store",
        });
        console.log(wcRes, 'wcRes');

        const wcResult = await wcRes.json();
        console.log(wcResult, 'wcResult');

        if (!wcRes.ok) {
            console.error("WC update error:", wcResult);
            return { success: false, error: "Failed to update WooCommerce billing info" };
        }
        return { success: true, wcUser: wcResult };
    } catch (error) {
        console.error("Error updating billing info:", error);
        return { success: false, error: "Something went wrong" };
    }
}



export const updateShippingInfo = async (shippingData) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
        return { success: false, error: "Not authenticated" };
    }

    try {
        // 1️⃣ Get the WordPress user (to get the ID)
        const wpRes = await fetch(`${process.env.WP_BASE_URL}/wp-json/wp/v2/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        });
        if (!wpRes.ok) return { success: false, error: "Failed to fetch user" };
        const wpUser = await wpRes.json();

        // 2️⃣ Update WooCommerce shipping info
        const wcRes = await fetch(`${process.env.WP_BASE_URL}/wp-json/wc/v3/customers/${wpUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${authHeader}`,
            },
            body: JSON.stringify({
                shipping: {
                    first_name: shippingData.shipping_first_name || "",
                    last_name: shippingData.shipping_last_name || "",
                    company: shippingData.entreprise || "",
                    address_1: shippingData.adresse || "",
                    address_2: shippingData.shipping_address_2 || "", // optional
                    postcode: shippingData.postal || "",
                    city: shippingData.ville || "",
                    phone: shippingData.shipping_phone || "",
                    email: shippingData.shipping_email || "",
                    country: shippingData.country || "FR",
                },
            }),
            cache: "no-store",
        });

        const wcResult = await wcRes.json();

        if (!wcRes.ok) {
            console.error("WC update error:", wcResult);
            return { success: false, error: "Failed to update WooCommerce Shipping info" };
        }
        return { success: true, wcUser: wcResult };
    } catch (error) {
        console.error("Error updating Shipping info:", error);
        return { success: false, error: "Something went wrong" };
    }
}



// change password without current password (e.g., password reset)

export async function lostPassword(email) {
    console.log(email, 'email');

    try {
        const formData = new FormData();
        formData.append('user_login', email);

        const res = await fetch(`${process.env.WP_BASE_URL}/wp-login.php?action=lostpassword`, {
            method: 'POST',
            body: formData,
        });

        console.log(res,'res');


        if (!res.ok) {
            throw new Error('Failed to send password reset email');
        }

        return {
            success: true,
            message: 'Password reset email sent successfully',
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}
