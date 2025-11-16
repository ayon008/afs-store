import axios from "axios";
import { NextResponse } from "next/server";

const WP_BASE = "https://staging.afs-foiling.com/wp-json/wp/v2";

// shared CORS headers
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
};

// axios instance with WP base
const api = axios.create({
  baseURL: WP_BASE,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // withCredentials: false // leave default unless you need cookies
});

/**
 * GET handler - list team members.
 * Supports optional query params: per_page, page, embed (if embed === 'false' we won't request _embed)
 */
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const per_page = url.searchParams.get("per_page") || "100"; // adjust default if needed
    const page = url.searchParams.get("page") || "1";
    const embedParam = url.searchParams.get("embed");
    const useEmbed = embedParam === null || embedParam.toLowerCase() !== "false"; // default true

    const params = {
      per_page,
      page,
      ...(useEmbed ? { _embed: true } : {}),
    };

    const response = await api.get("/afs-team", { params });

    const teamMembers = response.data.map((member) => {
      // find featured image from _embedded if available
      const embedded = member._embedded || {};
      const media = embedded["wp:featuredmedia"]?.[0];
      const imageUrl =
        media?.source_url ||
        // sometimes media details are nested in media.media_details.sizes (optional)
        media?.media_details?.sizes?.full?.source_url ||
        null;

      // gather role names if embedded wp:term exists
      const termGroups = embedded["wp:term"] || [];
      // wp:term is an array of arrays (taxonomies). Flatten and map names.
      const roles =
        Array.isArray(termGroups) && termGroups.length
          ? termGroups.flat().map((t) => t.name).filter(Boolean)
          : (Array.isArray(member["member-role"]) ? member["member-role"] : []);

      return {
        // keep original payload so consumers can still access unknown fields
        ...member,
        // normalized fields for frontend:
        url: member.guid?.rendered || member.link || null,
        image: imageUrl,
        roles,
      };
    });

    return NextResponse.json(teamMembers, {
      status: 200,
      headers: CORS_HEADERS,
    });
  } catch (error) {
    console.error("GET /afs-team error:", error?.response?.data || error.message || error);
    return NextResponse.json(
      { error: "Failed to fetch team members", details: error?.response?.data || error?.message },
      { status: error?.response?.status || 500, headers: CORS_HEADERS }
    );
  }
}

/**
 * POST handler - create a new team member.
 * For WP to accept creation you'll need valid authentication (application password, JWT, or cookie).
 * This handler forwards incoming Authorization header by default.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const incomingAuth = request.headers.get("authorization");

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      ...(incomingAuth ? { Authorization: incomingAuth } : {}),
    };

    const response = await api.post("/afs-team", body, { headers });

    const created = response.data;

    const embedded = created._embedded || {};
    const media = embedded["wp:featuredmedia"]?.[0];
    const imageUrl = media?.source_url || null;
    const termGroups = embedded["wp:term"] || [];
    const roles =
      Array.isArray(termGroups) && termGroups.length
        ? termGroups.flat().map((t) => t.name).filter(Boolean)
        : (Array.isArray(created["member-role"]) ? created["member-role"] : []);

    const newMember = {
      ...created,
      url: created.guid?.rendered || created.link || null,
      image: imageUrl,
      roles,
    };

    return NextResponse.json(newMember, {
      status: 201,
      headers: CORS_HEADERS,
    });
  } catch (error) {
    console.error("POST /afs-team error:", error?.response?.data || error?.message || error);
    return NextResponse.json(
      { error: "Failed to add team member", details: error?.response?.data || error?.message },
      { status: error?.response?.status || 500, headers: CORS_HEADERS }
    );
  }
}

/**
 * OPTIONS handler for CORS preflight requests
 */
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: CORS_HEADERS });
}
