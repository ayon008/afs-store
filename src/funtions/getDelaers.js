"use server"
export const getDealers = async () => {
    try {
        const baseUrl = process.env.WP_BASE_URL;

        if (!baseUrl) {
            console.error("❌ Missing WP_BASE_URL in environment variables.");
            return [];
        }

        const response = await fetch(
            `${baseUrl}/wp-json/wp/v2/dealer?per_page=100&_embed`,
            {
                next: { revalidate: 3600 },
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "force-cache"
            }
        );

        if (!response.ok) {
            console.error(
                `❌ WordPress API Error: ${response.status} ${response.statusText}`
            );
            return [];
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            console.error("❌ Unexpected response format from WP API:", data);
            return [];
        }

        return data;
    } catch (error) {
        console.error("❌ getDealers(): Unexpected Error", error);
        return [];
    }
};
