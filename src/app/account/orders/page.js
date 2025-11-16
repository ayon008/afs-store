"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoading && !user) router.push("/login");
  }, [isLoading, user, router]);

  useEffect(() => {
    if (!user) return;
    let mounted = true;
    setLoading(true);

    (async () => {
      try {
        const res = await fetch("/api/orders/user", { credentials: "include" });
        if (!mounted) return;
        if (res.ok) {
          const json = await res.json();
          setOrders(json.orders || []);
        } else if (res.status === 404) {
          setOrders([]);
        } else {
          const j = await res.json().catch(() => ({}));
          setError(j.message || "Failed to load orders");
        }
      } catch (e) {
        if (!mounted) return;
        setError("Network error");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [user]);

  const SkeletonCard = () => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse space-y-4 shadow-sm">
      <div className="h-6 bg-gray-300 rounded w-1/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      <div className="h-8 bg-gray-300 rounded w-24 ml-auto"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-6">
      <div className="w-full max-w-5xl flex flex-col">
        {/* Header */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Your Orders
          </h1>
          <p className="text-gray-600 text-sm">
            Review all your past orders and track their status in one place.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="text-red-600 font-medium mb-4">{error}</div>
        )}

        {/* Skeleton */}
        {loading ? (
          <div className="space-y-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : !orders || orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-500 mb-4">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-500 mb-6">
              When you place your first order, it will appear here.
            </p>
            <Link href="/shop">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((o) => (
              <div
                key={o.id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="font-semibold text-lg text-gray-800">
                      Order #{o.id}
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        o.status === "completed"
                          ? "text-green-700 bg-green-100"
                          : o.status === "processing"
                          ? "text-blue-700 bg-blue-100"
                          : o.status === "pending"
                          ? "text-yellow-700 bg-yellow-100"
                          : o.status === "cancelled"
                          ? "text-red-700 bg-red-100"
                          : "text-gray-700 bg-gray-100"
                      }`}
                    >
                      {o.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    Placed on{" "}
                    {new Date(o.date_created).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  {o.items && o.items.length > 0 && (
                    <div className="text-sm text-gray-500">
                      {o.items.length} item{o.items.length > 1 ? "s" : ""}
                    </div>
                  )}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="font-semibold text-lg text-gray-800">
                    ${parseFloat(o.total).toFixed(2)}
                  </div>
                  <Link
                    href={`/account/orders/${o.id}?order_key=${o.order_key || ""}`}
                  >
                    <Button size="sm">View Details</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
