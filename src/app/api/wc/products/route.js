import { NextResponse } from "next/server";
import { wcFetchWithMeta } from "@/lib/wc.server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const per_page = Number(searchParams.get("per_page") || 100);
  const category = searchParams.get("category") || undefined;
  const search = searchParams.get("search") || undefined;
  const min_price = searchParams.get("min_price") || undefined;
  const max_price = searchParams.get("max_price") || undefined;

  const { data, total, totalPages } = await wcFetchWithMeta("products", {
    searchParams: {
      page,
      per_page,
      category,
      search,
      min_price,
      max_price,
    },
  });

  return NextResponse.json({ data, meta: { total, totalPages, page, per_page } });
}
