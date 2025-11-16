/**
 * User management utilities for WordPress and WooCommerce integration
 */

import { wcFetch } from "./wc";

function siteOrigin() {
  const base = process.env.WP_BASE_URL;
  if (!base) throw new Error("WP_BASE_URL is not set");
  return new URL(base).origin;
}

/**
 * Get authentication headers for WordPress/WooCommerce API calls
 */
function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Basic ${Buffer.from(
      `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
    ).toString("base64")}`,
  };
}

/**
 * Create a WordPress user via REST API
 */
export async function createWordPressUser({
  username,
  email,
  password,
  firstName = "",
  lastName = "",
  role = "customer"
}) {
  const registerUrl = `${siteOrigin()}/wp-json/wp/v2/users`;
  
  const payload = {
    username,
    email,
    password,
    first_name: firstName,
    last_name: lastName,
    roles: [role],
  };

  console.log("Creating WordPress user:", { username, email, firstName, lastName });

  const response = await fetch(registerUrl, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({}));
  
  if (!response.ok) {
    console.error("WordPress user creation failed:", response.status, data);
    
    // Handle specific errors
    if (data?.code === "existing_user_login") {
      throw new Error("Username already exists");
    }
    if (data?.code === "existing_user_email") {
      throw new Error("Email already exists");
    }
    if (data?.code === "rest_cannot_create_user") {
      throw new Error("Insufficient permissions to create user");
    }
    
    throw new Error(data?.message || `WordPress user creation failed: ${response.status}`);
  }

  console.log("WordPress user created successfully:", { id: data.id, username: data.username });
  return data;
}

/**
 * Create a WooCommerce customer via REST API
 */
export async function createWooCommerceCustomer({
  username,
  email,
  password,
  firstName = "",
  lastName = ""
}) {
  const payload = {
    email,
    first_name: firstName,
    last_name: lastName,
    username,
    password,
    billing: {
      first_name: firstName,
      last_name: lastName,
      email,
    },
    shipping: {
      first_name: firstName,
      last_name: lastName,
      email,
    },
  };

  console.log("Creating WooCommerce customer:", { username, email, firstName, lastName });

  try {
    const customer = await wcFetch("/customers", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    
    console.log("WooCommerce customer created successfully:", { id: customer.id, username: customer.username });
    return customer;
  } catch (error) {
    console.error("WooCommerce customer creation failed:", error.message);
    
    // Handle specific errors
    if (error.message.includes("registration-error-email-exists") || error.message.includes("email_exists")) {
      throw new Error("Email already exists");
    }
    if (error.message.includes("registration-error-username-exists") || error.message.includes("username_exists")) {
      throw new Error("Username already exists");
    }
    
    throw error;
  }
}

/**
 * Get WordPress user by email or username
 */
export async function getWordPressUser(identifier) {
  try {
    // Try to get user by username first
    const usersUrl = `${siteOrigin()}/wp-json/wp/v2/users?search=${encodeURIComponent(identifier)}`;
    
    const response = await fetch(usersUrl, {
      method: "GET",
      headers: getAuthHeaders(),
      cache: "no-store",
    });

    if (response.ok) {
      const users = await response.json();
      const user = users.find(u => u.username === identifier || u.email === identifier);
      return user || null;
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching WordPress user:", error);
    return null;
  }
}

/**
 * Get WooCommerce customer by email
 */
export async function getWooCommerceCustomer(email) {
  try {
    const customers = await wcFetch("/customers", {
      searchParams: { email }
    });
    
    return customers.length > 0 ? customers[0] : null;
  } catch (error) {
    console.error("Error fetching WooCommerce customer:", error);
    return null;
  }
}

/**
 * Create user in both WordPress and WooCommerce
 * This function ensures proper synchronization between the two systems
 */
export async function createUserInBothSystems({
  username,
  email,
  password,
  firstName = "",
  lastName = ""
}) {
  const userData = { username, email, password, firstName, lastName };
  let wpUser = null;
  let wcCustomer = null;
  let errors = [];

  console.log("Creating user in both WordPress and WooCommerce systems:", { username, email });

  // Step 1: Try to create WordPress user first
  try {
    wpUser = await createWordPressUser(userData);
  } catch (error) {
    console.error("WordPress user creation failed:", error.message);
    errors.push({ system: "wordpress", error: error.message });
    
    // If it's a duplicate error, check if the user already exists
    if (error.message.includes("already exists")) {
      wpUser = await getWordPressUser(username) || await getWordPressUser(email);
    }
  }

  // Step 2: Try to create WooCommerce customer
  try {
    wcCustomer = await createWooCommerceCustomer(userData);
  } catch (error) {
    console.error("WooCommerce customer creation failed:", error.message);
    errors.push({ system: "woocommerce", error: error.message });
    
    // If it's a duplicate error, check if the customer already exists
    if (error.message.includes("already exists")) {
      wcCustomer = await getWooCommerceCustomer(email);
    }
  }

  // Ensure we have at least one account created
  if (!wpUser && !wcCustomer) {
    throw new Error("Failed to create user in either WordPress or WooCommerce");
  }

  const result = {
    success: true,
    wpUser,
    wcCustomer,
    errors,
    created: {
      wordpress: !!wpUser && !errors.some(e => e.system === "wordpress"),
      woocommerce: !!wcCustomer && !errors.some(e => e.system === "woocommerce")
    }
  };

  console.log("User creation result:", {
    wpUserId: wpUser?.id,
    wcCustomerId: wcCustomer?.id,
    createdWP: result.created.wordpress,
    createdWC: result.created.woocommerce,
    errorCount: errors.length
  });

  return result;
}

/**
 * Update user information in both systems
 */
export async function updateUserInBothSystems(userId, updates) {
  const results = { wordpress: null, woocommerce: null, errors: [] };

  // Update WordPress user
  try {
    const wpUrl = `${siteOrigin()}/wp-json/wp/v2/users/${userId}`;
    const wpResponse = await fetch(wpUrl, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
      cache: "no-store",
    });

    if (wpResponse.ok) {
      results.wordpress = await wpResponse.json();
    } else {
      const error = await wpResponse.json().catch(() => ({}));
      results.errors.push({ system: "wordpress", error: error.message || "Update failed" });
    }
  } catch (error) {
    results.errors.push({ system: "wordpress", error: error.message });
  }

  // Update WooCommerce customer (find by email)
  try {
    if (updates.email) {
      const customer = await getWooCommerceCustomer(updates.email);
      if (customer) {
        const wcCustomer = await wcFetch(`/customers/${customer.id}`, {
          method: "PUT",
          body: JSON.stringify({
            first_name: updates.first_name,
            last_name: updates.last_name,
            email: updates.email,
          }),
        });
        results.woocommerce = wcCustomer;
      }
    }
  } catch (error) {
    results.errors.push({ system: "woocommerce", error: error.message });
  }

  return results;
}