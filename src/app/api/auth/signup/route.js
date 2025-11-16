import { NextResponse } from "next/server";
import { createUserInBothSystems } from "@/lib/user-utils";

function siteOrigin() {
  const base = process.env.WP_BASE_URL;
  if (!base) throw new Error("WP_BASE_URL is not set");
  return new URL(base).origin;
}

export async function POST(req) {
  try {
    const { username, email, password, firstName, lastName } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Username, email, and password are required" },
        { status: 400 }
      );
    }

    console.log("Attempting user registration for:", { username, email, firstName, lastName });

    // Create user in both WordPress and WooCommerce systems
    let userResult;
    try {
      userResult = await createUserInBothSystems({
        username,
        email,
        password,
        firstName,
        lastName
      });
    } catch (error) {
      console.error("User creation failed:", error.message);
      
      // Handle specific errors
      if (error.message.includes("already exists")) {
        return NextResponse.json(
          { message: error.message },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { message: error.message || "Failed to create user account" },
        { status: 500 }
      );
    }

    const { wpUser, wcCustomer, created, errors } = userResult;
    const createdUser = wpUser || wcCustomer;

    console.log("User creation completed:", {
      wpCreated: created.wordpress,
      wcCreated: created.woocommerce,
      errors: errors.length
    });

    // Try JWT login with the credentials
    const loginUrl = process.env.WP_JWT_LOGIN_URL || `${siteOrigin()}/wp-json/jwt-auth/v1/token`;
    console.log("Attempting JWT login for:", username);

    const loginResponse = await fetch(loginUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
    });

    const loginData = await loginResponse.json().catch(() => ({}));
    console.log("JWT login response:", loginResponse.status, loginData);

    if (!loginResponse.ok) {
      console.error("JWT login failed:", loginData);
      // User created but JWT login failed - still return success
      return NextResponse.json(
        {
          message: "Account created successfully. Please login with your credentials.",
          user: { 
            id: createdUser.id, 
            username: createdUser.username || username,
            email: createdUser.email || email
          },
          created,
          errors: errors.length > 0 ? errors : undefined
        },
        { status: 201 }
      );
    }

    const token = loginData?.token;
    if (!token) {
      console.error("No token in JWT response:", loginData);
      return NextResponse.json(
        {
          message: "Account created successfully. Please login with your credentials.",
          user: { 
            id: createdUser.id, 
            username: createdUser.username || username,
            email: createdUser.email || email
          },
          created,
          errors: errors.length > 0 ? errors : undefined
        },
        { status: 201 }
      );
    }

    console.log("Registration and login successful");

    // Return success with JWT cookie
    const res = NextResponse.json(
      {
        message: "Account created successfully",
        user: { 
          id: loginData?.user_id || createdUser.id, 
          name: loginData?.user_display_name || `${firstName} ${lastName}`.trim() || username,
          email: email
        },
        created,
        errors: errors.length > 0 ? errors : undefined
      },
      { status: 201 }
    );

    res.cookies.set("wp_jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return res;

  } catch (e) {
    console.error("[Signup Error]", e);
    return NextResponse.json(
      { message: e?.message || "Server error" },
      { status: 500 }
    );
  }
}