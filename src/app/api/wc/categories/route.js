import { NextResponse } from "next/server";
import { wcFetch } from "@/lib/wc.server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const parent = searchParams.get("parent");

  const searchParamsObj = { per_page: 100, hide_empty: true };
  if (slug) searchParamsObj.slug = slug;
  if (parent) searchParamsObj.parent = parent;

  const cats = await wcFetch("products/categories", {
    searchParams: searchParamsObj,
  });
  return NextResponse.json(cats);
}
