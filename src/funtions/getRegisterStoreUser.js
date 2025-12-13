"use server"



import { cookies } from "next/headers";

export const registerStoreUser = async (userInfo) => {
    try {
        const token = btoa("upwork13:@W*JmA7%5jz0w^wP9hs2ROjy"); // username:password

        const response = await fetch(`${process.env.WP_BASE_URL}/wp-json/wc/v3/customers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + token,
            },
            body: JSON.stringify({
                ...userInfo, meta: {
                    preferred_language: "fr"  // optional
                },
                role: "customer",
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};


export const loginUser = async (userInfo) => {
    try {
        const response = await fetch(`${process.env.WP_BASE_URL}/wp-json/jwt-auth/v1/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo)
        })

        const data = await response.json();
        const cookieStore = await cookies();

        if (data && data?.token) {
            cookieStore.set({
                name: "auth_token",
                value: data.token,
                httpOnly: true,       // Secure: cannot access from client JS
                path: "/",            // Cookie available on all pages
                maxAge: 60 * 60 * 24 * 14, // 14 days
                sameSite: "strict",   // CSRF protection
                priority: "high",
                secure: process.env.NODE_ENV === "production",
            });
        }
        return data;
    } catch (error) {
        console.log(error);
        return
    }
}