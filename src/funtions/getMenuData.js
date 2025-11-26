export async function getMenuItems() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/menuItems`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            next: { revalidate: 3600 },
        });
        if (!res.ok) {
            if (process.env.NODE_ENV === "development") {
                console.error("Menu API Error:", res.status, res.statusText);
            }
            return [];
        }

        let json;
        try {
            json = await res.json();
        } catch (err) {
            if (process.env.NODE_ENV === "development") {
                console.error("Invalid JSON from Menu API:", err.message);
            }
            return [];
        }

        const items = json?.data || [];

        return items.map((item) => ({
            name: item?.title ?? "",
            href: item?.url ?? "#",
            button_one: item?.button_one ?? null,
            button_two: item?.button_two ?? null,
            sublinks: Array.isArray(item?.children)
                ? item.children.map((child) => ({
                    name: child?.title ?? "",
                    id: child?.id ?? null,
                    products: child?.menu_products ?? []
                }))
                : [],
        }));
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.error("Failed to fetch menu items:", error);
        }
        return [];
    }
}
