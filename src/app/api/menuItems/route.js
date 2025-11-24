import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const response = await fetch(
            `${process.env.WP_BASE_URL}/wp-json/custom/v1/menus/2118`,
            {
                next: { revalidate: 3600 } // 1 hour cache
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                { success: false, message: "Failed to fetch menu" },
                { status: response.status }
            );
        }

        const data = await response.json();
        console.log(data);
        

        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { success: false, message: err.message },
            { status: 500 }
        );
    }
}
