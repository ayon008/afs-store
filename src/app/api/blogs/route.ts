import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const WP_BASE_URL = process.env.WP_BASE_URL;

    // Validate required environment variable
    if (!WP_BASE_URL) {
        return NextResponse.json(
            { error: "WP_BASE_URL is not configured" },
            { status: 500 }
        );
    }

    try {
        const url = `${WP_BASE_URL.replace(/\/$/, "")}/wp-json/wp/v2/posts?_embed`;

        const response = await fetch(url, {
            method: "GET",
            cache: "no-store",
            headers: { "Content-Type": "application/json" },
        });

        // If WordPress returns an error status
        if (!response.ok) {
            const errorText = await response.text().catch(() => "");
            console.error(`[WP API Error] ${response.status}: ${errorText}`);

            return NextResponse.json(
                {
                    error: "Failed to fetch WordPress posts",
                    status: response.status,
                    details: errorText || "Unknown error",
                },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });

    } catch (error: any) {
        console.error("[API /blogs] Unhandled error:", error);

        return NextResponse.json(
            {
                error: "Internal server error",
                details: error?.message || "Unknown error",
            },
            { status: 500 }
        );
    }
}
