import { NextResponse } from "next/server";

function getSiteOrigin() {
  const base = process.env.WP_BASE_URL;
  if (!base) throw new Error("WP_BASE_URL is not set");
  return new URL(base).origin;
}

function wcBase() {
  const origin = getSiteOrigin();
  return `${origin}/wp-json/wc/v3`;
}

function withKeys(url) {
  const ck = process.env.WC_CONSUMER_KEY;
  const cs = process.env.WC_CONSUMER_SECRET;
  if (ck && cs) {
    url.searchParams.set("consumer_key", ck);
    url.searchParams.set("consumer_secret", cs);
  }
  return url;
}

export async function GET(req) {
  try {
    const handle = req.nextUrl.searchParams.get("handle") || "";
    if (!handle) return NextResponse.json({ error: "handle required" }, { status: 400 });

    // numeric id case
    const asNum = Number(handle);
    if (Number.isFinite(asNum) && String(asNum) === handle) {
      const url = withKeys(new URL(`${wcBase()}/products/${asNum}`));
      const r = await fetch(url, { cache: "no-store" });
      if (!r.ok) return NextResponse.json({ error: "Not found" }, { status: r.status });
      const prod = await r.json();
      return NextResponse.json(prod);
    }

    // slug case
    const url = withKeys(new URL(`${wcBase()}/products`));
    url.searchParams.set("slug", handle);
    url.searchParams.set("status", "publish");
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) return NextResponse.json({ error: "Fetch failed" }, { status: r.status });
    const list = await r.json();
    if (!Array.isArray(list) || list.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(list[0]);
  } catch (e) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}
