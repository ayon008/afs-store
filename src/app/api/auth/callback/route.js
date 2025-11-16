import { NextResponse } from "next/server";

// This endpoint receives API keys from WooCommerce after user authentication
export async function POST(req) {
  try {
    const apiKeys = await req.json();

    // Here you would typically:
    // 1. Validate the API keys
    // 2. Store them securely (database, encrypted storage, etc.)
    // 3. Associate them with the user
    // 4. Return a success response

    console.log("[Auth Callback] Received API keys for user:", apiKeys.user_id);
    console.log("[Auth Callback] Key ID:", apiKeys.key_id);
    console.log("[Auth Callback] Permissions:", apiKeys.key_permissions);

    // For now, just return success
    // In production, you'd store these keys securely
    return NextResponse.json({
      success: true,
      message: "API keys received successfully",
      user_id: apiKeys.user_id,
      key_id: apiKeys.key_id,
      permissions: apiKeys.key_permissions
    });
  } catch (e) {
    console.error("[Auth Callback] Error:", e);
    return NextResponse.json({ error: "Failed to process API keys" }, { status: 500 });
  }
}

// GET endpoint to generate authentication URLs
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const app_name = searchParams.get('app_name') || 'My Ecommerce App';
    const scope = searchParams.get('scope') || 'read_write';
    const user_id = searchParams.get('user_id');
    const return_url = searchParams.get('return_url');
    const callback_url = searchParams.get('callback_url');

    if (!user_id || !return_url || !callback_url) {
      return NextResponse.json({
        error: "Missing required parameters: user_id, return_url, callback_url"
      }, { status: 400 });
    }

    // Import the function here to avoid server/client issues
    const { generateAuthUrl } = await import("@/lib/wc");
    const authUrl = generateAuthUrl({
      app_name,
      scope,
      user_id,
      return_url,
      callback_url
    });

    return NextResponse.json({
      auth_url: authUrl,
      instructions: "Redirect user to this URL to authenticate and generate API keys"
    });
  } catch (e) {
    console.error("[Auth URL Generation] Error:", e);
    return NextResponse.json({ error: "Failed to generate auth URL" }, { status: 500 });
  }
}