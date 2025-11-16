"use client";

import Link from "next/link";

export default function Breadcrumbs({ breadcrumbData, navbarHeight = 0 }) {
  if (!breadcrumbData) return null;

  return (
    <div
      className="w-full px-3 py-2"
      style={{
        fontFamily: '"alliance no.2", sans-serif',
        fontSize: "14px",
        fontWeight: 500,
        lineHeight: "18px",
      }}
    >
      <div className="flex items-center gap-2 text-gray-500">
        <Link href="/" className="hover:text-gray-700 transition-colors">
          Home
        </Link>
        <span className="text-gray-400">/</span>

        <Link
          href={breadcrumbData.mainHref}
          className="hover:text-gray-700 transition-colors capitalize"
        >
          {breadcrumbData.main}
        </Link>

        {breadcrumbData.sub && (
          <>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium capitalize">
              {breadcrumbData.sub}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
