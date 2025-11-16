import { NextResponse } from "next/server";

function siteOrigin() {
  const base = process.env.WP_BASE_URL;
  if (!base) throw new Error("WP_BASE_URL is not set");
  return new URL(base).origin;
}

export async function GET(req) {
  try {
    const sessionToken = req.cookies.get("wc_session")?.value;
    
    if (!sessionToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse session data
    try {
      const sessionData = JSON.parse(Buffer.from(sessionToken, 'base64').toString('utf-8'));
      const customerId = sessionData.id;
      
      // Get fresh customer data from WooCommerce API
      const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
      const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;
      
      if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
        return NextResponse.json({ message: "Server configuration error" }, { status: 500 });
      }

      const wcAuth = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');
      const customerUrl = `${siteOrigin()}/wp-json/wc/v3/customers/${customerId}`;
      
      const customerResponse = await fetch(customerUrl, {
        headers: { 
          Authorization: `Basic ${wcAuth}`,
          "Content-Type": "application/json"
        },
        cache: "no-store",
      });
      
      if (!customerResponse.ok) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      
      const customer = await customerResponse.json();
      return NextResponse.json({
        id: customer.id,
        name: `${customer.first_name} ${customer.last_name}`.trim() || customer.username,
        email: customer.email,
        username: customer.username,
        avatar: customer.avatar_url || null,
        first_name: customer.first_name,
        last_name: customer.last_name,
        billing: customer.billing,
        shipping: customer.shipping
      });
    } catch (e) {
      console.log("[Me] Session parsing failed:", e);
      return NextResponse.json({ message: "Invalid session" }, { status: 401 });
    }
  } catch (e) {
    return NextResponse.json({ message: e?.message || "Server error" }, { status: 500 });
  }
}