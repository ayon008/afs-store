"use server"
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
        console.log(response.status, data);
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
        return data;
    } catch (error) {
        console.log(error);

    }
}