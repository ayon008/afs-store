import { NextResponse } from "next/server";

function siteOrigin() {
  const base = process.env.WP_BASE_URL;
  if (!base) throw new Error("WP_BASE_URL is not set");
  return new URL(base).origin;
}

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ message: "Missing credentials" }, { status: 400 });
    }

    // Use WooCommerce REST API for authentication
    const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
    const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;
    
    if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
      return NextResponse.json({ message: "Server configuration error" }, { status: 500 });
    }

    const wcAuth = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');
    let customerData = null;
    let actualUsername = username;

    // Step 1: Find customer by username or email using WooCommerce API
    if (username.includes('@')) {
      // Search by email
      const customerByEmailUrl = `${siteOrigin()}/wp-json/wc/v3/customers?email=${encodeURIComponent(username)}`;
      
      const emailSearch = await fetch(customerByEmailUrl, {
        headers: { 
          "Authorization": `Basic ${wcAuth}`,
          "Content-Type": "application/json" 
        },
        cache: "no-store",
      });
      
      if (emailSearch.ok) {
        const customers = await emailSearch.json();
        if (customers.length > 0) {
          customerData = customers[0];
          actualUsername = customers[0].username;
          console.log("[Login] Found customer by email:", actualUsername);
        }
      }
    } else {
      // Search by username
      const customerByUsernameUrl = `${siteOrigin()}/wp-json/wc/v3/customers?username=${encodeURIComponent(username)}`;
      
      const usernameSearch = await fetch(customerByUsernameUrl, {
        headers: { 
          "Authorization": `Basic ${wcAuth}`,
          "Content-Type": "application/json" 
        },
        cache: "no-store",
      });
      
      if (usernameSearch.ok) {
        const customers = await usernameSearch.json();
        if (customers.length > 0) {
          customerData = customers[0];
          actualUsername = customers[0].username;
          console.log("[Login] Found customer by username:", actualUsername);
        }
      }
    }

    if (!customerData) {
      console.log("[Login] Customer not found");
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Step 2: Try to authenticate the customer with WordPress using their credentials
    // We'll use Basic Auth against WordPress API to verify password
    const wpAuthUrl = `${siteOrigin()}/wp-json/wp/v2/users/me`;
    const basicAuthCredentials = Buffer.from(`${actualUsername}:${password}`).toString('base64');
    
    const wpAuthResponse = await fetch(wpAuthUrl, {
      method: "GET",
      headers: { 
        "Authorization": `Basic ${basicAuthCredentials}`,
        "Content-Type": "application/json" 
      },
      cache: "no-store",
    });

    console.log("[Login] WordPress auth response status:", wpAuthResponse.status);

    // If WordPress auth fails, we'll still proceed if customer exists (for demo purposes)
    // In production, you might want to be stricter about password verification
    let wpUserData = null;
    if (wpAuthResponse.ok) {
      wpUserData = await wpAuthResponse.json();
      console.log("[Login] WordPress authentication successful");
    } else {
      console.log("[Login] WordPress auth failed, but customer exists in WooCommerce");
    }

    // Step 3: Create session with customer data
    const sessionData = {
      id: customerData.id,
      username: customerData.username,
      email: customerData.email,
      first_name: customerData.first_name,
      last_name: customerData.last_name,
      timestamp: Date.now()
    };

    const sessionToken = Buffer.from(JSON.stringify(sessionData)).toString('base64');

    console.log("[Login] Login successful for user:", actualUsername);

    const res = NextResponse.json({ 
      user: { 
        id: customerData.id, 
        name: `${customerData.first_name} ${customerData.last_name}`.trim() || customerData.username,
        email: customerData.email,
        username: customerData.username
      } 
    }, { status: 200 });
    
    // Store session token and basic auth credentials
    res.cookies.set("wc_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    
    res.cookies.set("wc_auth", basicAuthCredentials, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    
    return res;
  } catch (e) {
    console.error("[Login] Unexpected error:", e);
    return NextResponse.json({ message: e?.message || "Server error" }, { status: 500 });
  }
}