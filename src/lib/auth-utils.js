import { generateAuthUrl, getOAuth1Header } from "@/lib/wc";

/**
 * Generate WooCommerce Application Authentication URL
 */
export function createWooCommerceAuthUrl(options = {}) {
  return generateAuthUrl({
    app_name: options.appName || "My Ecommerce App",
    scope: options.scope || "read_write",
    user_id: options.userId,
    return_url: options.returnUrl,
    callback_url: options.callbackUrl,
  });
}

/**
 * Handle API key callback from WooCommerce
 */
export async function handleApiKeyCallback(apiKeys) {
  console.log("API Keys received:", {
    userId: apiKeys.user_id,
    keyId: apiKeys.key_id,
    permissions: apiKeys.key_permissions,
  });

  return {
    success: true,
    userId: apiKeys.user_id,
    keyId: apiKeys.key_id,
    permissions: apiKeys.key_permissions,
  };
}

/**
 * Notes on authentication methods are retained in comments from the TS file.
 */
