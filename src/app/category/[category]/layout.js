"use client";

import { useParams } from "next/navigation";
import NAV_LINKS from "@/constants/navlinks";
import ComingSoon from "@/components/ComingSoon";

export default function CategoryLayout({ children }) {
  const params = useParams();
  const param = params;
  const category = param.category;
  const subcategory = param.subcategory;
  console.log("Category param:", category);
  console.log("Subcategory param:", subcategory);

  // Find the category in NAV_LINKS
  const categoryData = NAV_LINKS.find(
    link => link.href.toLowerCase() === `/category/${subcategory ? subcategory.toLowerCase() : category.toLowerCase()}`
  );
  console.log("Checking category link:", category, categoryData);

  // If category exists but has no content, show ComingSoon
  if (categoryData?.hasContent === false) {
    console.log(`Category "${category}" has no content. Redirecting to Coming Soon page.`);
    return <ComingSoon />;
  }

  // If it's a service category, redirect to services page
  if (categoryData?.isService) {
    if (typeof window !== 'undefined') {
      window.location.href = '/services';
      return null;
    }
  }

  // Otherwise, render the category page
  return children;
}