"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../hooks/use-auth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(username, password);
      router.push("/account");
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 font-sans text-black">
      <div className="w-full max-w-sm bg-[#f0f0f0] p-10 md:p-12 rounded-md shadow-sm">
        {/* Logo / Home Link */}
        <div className="flex items-center justify-center mb-6">
          <Link href="/" className="text-xl font-bold hover:opacity-80 transition">
            AFS Foiling
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-extrabold text-center mb-10">Log in</h1>

        {/* Form */}
        <form onSubmit={onSubmit} className="grid gap-4">
          {/* Username */}
          <div>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              placeholder="USERNAME OR EMAIL"
              className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-gray-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="PASSWORD"
              className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-gray-500"
            />
          </div>

          {/* Lost Password */}
          <div className="text-center mt-1 mb-2">
            <Link href="/forgot-password" className="text-sm text-gray-700 hover:underline">
              Lost your password?
            </Link>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-center mb-4">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-black border-gray-300 focus:ring-0 rounded-sm"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-md bg-red-50 p-3">
              <p className="text-sm text-red-700 text-center">{error}</p>
            </div>
          )}

          {/* Log In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center bg-black px-4 py-3 text-white font-semibold rounded-md hover:opacity-80 disabled:opacity-50 transition-opacity"
          >
            {loading ? "LOGGING IN..." : "LOG IN"}
          </button>
        </form>

        {/* Register Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-700 mb-4">New to AFS?</p>
          <Link
            href="/register"
            className="w-full inline-flex items-center justify-center bg-black px-4 py-3 text-white font-semibold rounded-md hover:opacity-80 transition-opacity"
          >
            REGISTER
          </Link>
        </div>
      </div>
    </div>
  );
}
