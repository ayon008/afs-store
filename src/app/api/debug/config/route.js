import { NextResponse } from "next/server";

export async function GET() {
  const config = {
    WP_BASE_URL: process.env.WP_BASE_URL ? "configured" : "missing",
    WC_CONSUMER_KEY: process.env.WC_CONSUMER_KEY ? "configured" : "missing",
    WC_CONSUMER_SECRET: process.env.WC_CONSUMER_SECRET ? "configured" : "missing",
    WP_JWT_LOGIN_URL: process.env.WP_JWT_LOGIN_URL ? "configured" : "missing",
    NODE_ENV: process.env.NODE_ENV
  };

  return NextResponse.json({
    config,
    timestamp: new Date().toISOString()
  });
}