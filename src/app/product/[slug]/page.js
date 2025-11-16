"use client";

import { useParams } from 'next/navigation';
import ProductDetails from '../../../constants/product/productdetails';
import { useProductHandle } from '@/hooks/use-wc';
import Features from '../../../constants/product/features';
import FAQ from '../../../constants/productfaq';

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug;
  const { product, isLoading } = useProductHandle(slug);
  // Let ProductDetails handle the shimmer while loading. Only show "Not found" when loading finished and no product.
  if (!product && !isLoading) return <p className="text-sm text-muted-foreground">Not found</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Product Details Section */}
      <section className="mb-12">
        <ProductDetails product={product} isLoading={isLoading} />
      </section>

      {/* Features Section */}
      <section className="mb-12 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
<Features product={product} isLoading={isLoading} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#f7f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <FAQ />
        </div>
      </section>
    </div>
  );
}