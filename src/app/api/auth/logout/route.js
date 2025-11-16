import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  
  // Clear WooCommerce session cookies
  res.cookies.set("wc_session", "", { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    sameSite: "lax", 
    path: "/", 
    maxAge: 0 
  });
  
  res.cookies.set("wc_auth", "", { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    sameSite: "lax", 
    path: "/", 
    maxAge: 0 
  });
  
  return res;
}