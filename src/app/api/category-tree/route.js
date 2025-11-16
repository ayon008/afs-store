import { NextResponse } from "next/server";

const BASE = process.env.WP_BASE_URL || process.env.WC_BASE_URL;
const CK = process.env.WC_CONSUMER_KEY;
const CS = process.env.WC_CONSUMER_SECRET;

async function wcGet(path, params = {}) {
  const url = new URL(`${BASE}/wp-json/wc/v3/${path}`);
  url.searchParams.set("consumer_key", CK);
  url.searchParams.set("consumer_secret", CS);
  url.searchParams.set("_fields", "id,name,slug,parent,image");

  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error(`WooCommerce ${res.status}: ${await res.text()}`);
  return res.json();
}

async function fetchAllChildren(parentId) {
  const perPage = 100;
  let page = 1;
  const out = [];

  while (true) {
    const batch = await wcGet("products/categories", {
      parent: parentId,
      per_page: perPage,
      page,
      hide_empty: false,
    });
    out.push(...batch);
    if (batch.length < perPage) break;
    page++;
  }
  return out;
}

async function fetchBySlug(slug) {
  const arr = await wcGet("products/categories", { slug });
  return arr[0] || null;
}

async function buildTree(parentId) {
  const cats = await fetchAllChildren(parentId);
  const nodes = await Promise.all(
    cats.map(async (c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      image: c.image?.src || null, // banner
      children: await buildTree(c.id),
    }))
  );
  return nodes;
}

// GET /api/category-tree
//     ?slug=wing-foil          -> subtree by slug
//     ?parentId=2390           -> subtree by id
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const parentIdParam = searchParams.get("parentId");

    let parentId = 0;
    if (slug) {
      const cat = await fetchBySlug(slug);
      if (!cat) return NextResponse.json({ error: `Slug '${slug}' not found` }, { status: 404 });
      parentId = cat.id;
    } else if (parentIdParam) {
      parentId = Number(parentIdParam);
      if (Number.isNaN(parentId)) return NextResponse.json({ error: "Invalid parentId" }, { status: 400 });
    }

    const tree = await buildTree(parentId);
    return NextResponse.json({ parentId, tree });
  } catch (e) {
    return NextResponse.json({ error: e.message || "Unknown error" }, { status: 500 });
  }
}