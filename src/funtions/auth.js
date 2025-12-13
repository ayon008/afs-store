"use server"

// app/actions/auth.ts
import { cookies } from "next/headers";

export const getAuthenticatedUser = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) return null;

        const res = await fetch(`${process.env.WP_BASE_URL}/wp-json/wp/v2/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: 'no-store',
        });

        if (!res.ok) return null;

        return await res.json();
    } catch (error) {
        console.error('Error fetching user:', error);
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