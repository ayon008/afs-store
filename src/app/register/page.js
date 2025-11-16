"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../hooks/use-auth";

export default function RegisterPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => {
        router.push("/account");
      }, 1500);
    } catch (err) {
      setError(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-[#f0f0f0] rounded-sm shadow-md p-8">
        <h1
          className="text-center mb-2"
          style={{
            fontFamily: '"Alliance No.2", sans-serif, serif',
            fontSize: "48px",
            fontWeight: 700,
            lineHeight: "52.8px",
            color: "rgb(17, 17, 17)",
          }}
        >
          Sign Up
        </h1>

        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <label htmlFor="firstName" className="text-sm">
                First Name
              </label>
              <input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                placeholder="John"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="lastName" className="text-sm">
                Last Name
              </label>
              <input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                placeholder="Doe"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="username" className="text-sm">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              id="username"
              value={formData.username}
              onChange={(e) => updateField("username", e.target.value)}
              placeholder="johndoe"
              required
              className="border rounded px-3 py-2"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="john@example.com"
              required
              className="border rounded px-3 py-2"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="password" className="text-sm">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => updateField("password", e.target.value)}
              placeholder="••••••••"
              required
              minLength={8}
              className="border rounded px-3 py-2"
            />
            <p className="text-xs text-muted-foreground">
              Must be at least 8 characters
            </p>
          </div>

          <div className="grid gap-2">
            <label htmlFor="confirmPassword" className="text-sm">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              placeholder="••••••••"
              required
              minLength={8}
              className="border rounded px-3 py-2"
            />
          </div>

          {error && (
            <div className="border border-red-300 bg-red-50 text-red-900 rounded p-2">
              {error}
            </div>
          )}

          {success && (
            <div className="border border-green-300 bg-green-50 text-green-900 rounded p-2">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center bg-black px-4 py-3 text-white font-semibold rounded-md hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Already have an account?</span>{" "}
          <Link
            href="/login"
            className="font-medium text-black hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
