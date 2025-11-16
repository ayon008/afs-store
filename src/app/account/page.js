"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
// --- Icons Added ---
import {
  User as UserIcon,
  Mail,
  AtSign,
  Hash,
  Activity,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function Page() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) router.push("/login");
  }, [isLoading, user, router]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600 text-lg font-medium">Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-20 px-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        {/* Avatar */}
        <div className="mt-6">
          <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center shadow-md">
            <UserIcon size={48} className="text-gray-600" />
          </div>
        </div>

        {/* Name */}
        <h1 className="text-2xl font-bold text-gray-800 mt-4">
          {user?.name || "User"}
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-6">
          {/* --- Email Card --- */}
          <div className="border border-gray-200 rounded-xl p-6 text-gray-800 flex flex-col space-y-2">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-500">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </div>
            <div className="text-lg font-semibold">{user?.email || "-"}</div>
          </div>

          {/* --- Username Card --- */}
          <div className="border border-gray-200 rounded-xl p-6 text-gray-800 flex flex-col space-y-2">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-500">
              <AtSign className="h-4 w-4" />
              <span>Username</span>
            </div>
            <div className="text-lg font-semibold">{user?.username || "-"}</div>
          </div>

          {/* --- User ID Card --- */}
          <div className="border border-gray-200 rounded-xl p-6 text-gray-800 flex flex-col space-y-2">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-500">
              <Hash className="h-4 w-4" />
              <span>User ID</span>
            </div>
            <div className="text-lg font-semibold">{user?.id}</div>
          </div>

          {/* --- Status Card --- */}
          <div className="border border-gray-200 rounded-xl p-6 text-gray-800 flex flex-col space-y-2">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-500">
              <Activity className="h-4 w-4" />
              <span>Status</span>
            </div>
            <div>
              {user ? (
                <span className="inline-flex items-center space-x-1 rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Active</span>
                </span>
              ) : (
                <span className="inline-flex items-center space-x-1 rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-800">
                  <XCircle className="h-3.5 w-3.5" />
                  <span>Not Found</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}