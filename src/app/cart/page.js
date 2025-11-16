"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  // This is where you'll fetch your cart data
  const isCartEmpty = true; // Replace this with your actual cart check logic

  useEffect(() => {
    if (isCartEmpty) {
      router.push('/cart/emptycart');
    }
  }, [isCartEmpty, router]);

  return <div>Loading cart...</div>;
}
