import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { category } = params;
    console.log(category);

    return NextResponse.json({ message: category });
}
