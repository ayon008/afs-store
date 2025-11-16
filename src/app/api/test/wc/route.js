import { NextResponse } from "next/server";
import { wcFetch } from "@/lib/wc.server";

export async function GET() {
  try {
    console.log("Testing WooCommerce connection...");
    
    // Test basic WC connection
    const customers = await wcFetch("/customers", {
      searchParams: { per_page: 5 }
    });
    
    const orders = await wcFetch("/orders", {
      searchParams: { per_page: 5 }
    });

    return NextResponse.json({
      success: true,
      connection: "working",
      customersCount: customers.length,
      ordersCount: orders.length,
      sampleCustomers: customers.map(c => ({ id: c.id, email: c.email, username: c.username })),
      sampleOrders: orders.map(o => ({ id: o.id, status: o.status, customer_id: o.customer_id, billing_email: o.billing?.email }))
    });
  } catch (error) {
    console.error("WooCommerce test error:", error);
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}