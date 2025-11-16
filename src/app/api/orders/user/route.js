import { NextResponse } from "next/server";
import { wcFetch } from "@/lib/wc.server";

function siteOrigin() {
  const base = process.env.WP_BASE_URL;
  if (!base) throw new Error("WP_BASE_URL is not set");
  return new URL(base).origin;
}

export async function GET(req) {
  try {
    console.log("=== /api/orders/user GET Request ===");
    console.log("Request URL:", req.url);
    console.log("Request method:", req.method);
    
    // Log all cookies for debugging
    const allCookies = {};
    req.cookies.getAll().forEach(cookie => {
      allCookies[cookie.name] = cookie.value ? `${cookie.value.substring(0, 20)}...` : cookie.value;
    });
    console.log("All cookies:", allCookies);
    
    // Try WooCommerce session first (this is what /api/auth/me uses)
    const wcSessionToken = req.cookies.get("wc_session")?.value;
    const jwtToken = req.cookies.get("wp_jwt")?.value;
    
    console.log("WC Session token found:", !!wcSessionToken);
    console.log("JWT token found:", !!jwtToken);
    
    let userId, userEmail, authMethod;
    
    // Try WooCommerce session authentication first
    if (wcSessionToken) {
      try {
        console.log("🔍 Trying WooCommerce session authentication...");
        const sessionData = JSON.parse(Buffer.from(wcSessionToken, 'base64').toString('utf-8'));
        const customerId = sessionData.id;
        console.log("WC Session customer ID:", customerId);
        
        // Get customer data from WooCommerce API
        const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
        const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;
        
        if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
          throw new Error("WooCommerce keys not configured");
        }

        const wcAuth = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');
        const customerUrl = `${siteOrigin()}/wp-json/wc/v3/customers/${customerId}`;
        console.log("Fetching customer from:", customerUrl);
        
        const customerResponse = await fetch(customerUrl, {
          headers: { 
            Authorization: `Basic ${wcAuth}`,
            "Content-Type": "application/json"
          },
          cache: "no-store",
        });
        
        if (customerResponse.ok) {
          const customer = await customerResponse.json();
          userId = customer.id;
          userEmail = customer.email;
          authMethod = "wc_session";
          console.log("✅ WC Session auth successful:", { id: userId, email: userEmail });
        } else {
          throw new Error("Customer fetch failed");
        }
      } catch (e) {
        console.log("❌ WC Session auth failed:", e.message);
      }
    }
    
    // Fallback to JWT authentication if WC session failed
    if (!userId && jwtToken) {
      try {
        console.log("🔍 Trying JWT authentication...");

        // Validate token and get user info
        const validateUrl = `${siteOrigin()}/wp-json/jwt-auth/v1/token/validate`;
        console.log("🔍 Validating JWT token at:", validateUrl);
        
        const validateRes = await fetch(validateUrl, {
          method: "POST",
          headers: { Authorization: `Bearer ${jwtToken}` },
          cache: "no-store",
        });

        console.log("JWT validation response status:", validateRes.status);
        
        if (!validateRes.ok) {
          const errorText = await validateRes.text().catch(() => "Could not read response");
          console.log("❌ JWT validation failed:");
          console.log("Response status:", validateRes.status);
          console.log("Response text:", errorText);
          throw new Error("JWT validation failed");
        }

        const validateData = await validateRes.json().catch(() => ({}));
        console.log("✅ JWT validation successful:", validateData);

        // Get user data to extract customer_id
        const meUrl = `${siteOrigin()}/wp-json/wp/v2/users/me`;
        console.log("🔍 Fetching user data from:", meUrl);
        
        const meRes = await fetch(meUrl, {
          headers: { Authorization: `Bearer ${jwtToken}` },
          cache: "no-store",
        });

        console.log("User data response status:", meRes.status);

        if (!meRes.ok) {
          const userErrorText = await meRes.text().catch(() => "Could not read response");
          console.log("❌ Failed to fetch user data:");
          console.log("Response status:", meRes.status);
          console.log("Response text:", userErrorText);
          throw new Error("User data fetch failed");
        }

        const userData = await meRes.json();
        userId = userData.id;
        userEmail = userData.email;
        authMethod = "jwt";

        console.log("✅ JWT auth successful:");
        console.log("User ID:", userId);
        console.log("User Email:", userEmail);
        console.log("User Name:", userData.name);
        console.log("User Roles:", userData.roles);
      } catch (e) {
        console.log("❌ JWT auth failed:", e.message);
      }
    }
    
    // If neither authentication method worked
    if (!userId) {
      console.log("❌ No valid authentication found");
      return NextResponse.json({ 
        message: "Unauthorized - No valid authentication method",
        attempted: { wc_session: !!wcSessionToken, jwt: !!jwtToken }
      }, { status: 401 });
    }
    
    console.log("🛒 Starting order fetch process:");
    console.log("Auth method:", authMethod);
    console.log("User ID:", userId);
    console.log("User Email:", userEmail);

    // Try multiple approaches to find orders for this user
    let orders = [];
    
    try {
      // First try by customer ID
      console.log("🔍 Attempting to fetch orders by customer ID:", userId);
      const searchParams = {
        customer: userId,
        per_page: 100,
        orderby: "date",
        order: "desc",
      };
      console.log("Search parameters:", searchParams);
      
      orders = await wcFetch("/orders", { searchParams });
      console.log("✅ Found orders by customer ID:", orders.length);
      
      if (orders.length > 0) {
        console.log("Sample order data:", JSON.stringify(orders[0], null, 2));
      }
    } catch (error) {
      console.error("❌ Error fetching by customer ID:");
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    // If no orders found by customer ID, try by email
    if (orders.length === 0 && userEmail) {
      try {
        console.log("🔍 No orders found by customer ID, trying by email:", userEmail);
        const allOrdersParams = {
          per_page: 100,
          orderby: "date",
          order: "desc",
        };
        console.log("Fetching all orders with params:", allOrdersParams);
        
        const allOrders = await wcFetch("/orders", { searchParams: allOrdersParams });
        console.log("✅ Retrieved all orders count:", allOrders.length);
        
        // Filter orders by billing email
        orders = allOrders.filter(order => 
          order.billing && order.billing.email && 
          order.billing.email.toLowerCase() === userEmail.toLowerCase()
        );
        console.log("✅ Found orders matching email:", orders.length);
        
        if (allOrders.length > 0) {
          console.log("Sample all order billing emails:", 
            allOrders.slice(0, 5).map(o => o.billing?.email || 'no email')
          );
        }
      } catch (error) {
        console.error("❌ Error fetching all orders:");
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
    }

    console.log("Total orders found:", orders.length);
    if (orders.length > 0) {
      console.log("Order details:", orders.map(o => ({ 
        id: o.id, 
        status: o.status, 
        customer_id: o.customer_id,
        billing_email: o.billing?.email 
      })));
    }

    // Transform orders to a simpler format
    const transformedOrders = orders.map((order) => ({
      id: order.id,
      order_key: order.order_key, // Keep snake_case to match frontend expectation
      status: order.status,
      total: order.total,
      date_created: order.date_created, // Keep snake_case to match frontend expectation
      billing: order.billing,
      items: order.line_items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        total: item.total,
        productId: item.product_id,
      })),
      paymentMethod: order.payment_method_title,
    }));

    console.log("🎉 Returning orders to client:", {
      ordersCount: transformedOrders.length,
      orderIds: transformedOrders.map(o => o.id)
    });
    
    return NextResponse.json({ orders: transformedOrders });
    
  } catch (e) {
    console.error("💥 [User Orders Error] Unexpected error:");
    console.error("Error message:", e?.message);
    console.error("Error stack:", e?.stack);
    console.error("Full error object:", e);
    
    return NextResponse.json(
      { 
        message: e?.message || "Failed to fetch orders",
        error: e?.stack || "No stack trace available"
      },
      { status: 500 }
    );
  }
}