import { NextResponse } from "next/server";
import { wcFetch } from "@/lib/wc.server";

export async function GET(_req, context) {
  const { params } = context;
  const { id } = await params;
  const product = await wcFetch(`products/${id}`);
  return NextResponse.json(product);
}
