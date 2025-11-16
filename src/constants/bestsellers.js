"use client";

import React from "react";
import ProjectCard from '../components/ProjectCard';

const products = [
  {
    id: 1,
    category: "PERFORMANCE ACCESSIBLE",
    name: "FULL FOIL EVO",
    price: "1355,00€",
    slug: "evo-foil-full-set",
    imageUrl: "https://afs-foiling.com/wp-content/uploads/2024/02/1_Evo1450HM80CruiserL_0024.png",
    hoverImageUrl: "https://afs-foiling.com/wp-content/uploads/2024/07/Foiling-Magazine_20_AFS-EVO-RANGE-_4-800x533-2.jpg",
  },
  {
    id: 2,
    category: "OFF-ROAD",
    name: "ENDURO FULL FOIL",
    price: "1596,67€",
    slug: "enduro-foil-full-set",
    imageUrl: "https://afs-foiling.com/wp-content/uploads/2024/10/Enduro1300_CF_UHM85_0006-1.png",
    hoverImageUrl: "https://afs-foiling.com/wp-content/uploads/2024/07/afs-enduro.jpg",
  },
  {
    id: 3,
    category: "ALLROUND",
    name: "BLACKBIRD MID LENGTH",
    price: "1665,83€",
    slug: "blackbird-mid-length",
    imageUrl: "https://afs-foiling.com/wp-content/uploads/2022/10/BBML-black_Plan-de-travail-1.png",
    hoverImageUrl: null,
  },
  {
    id: 4,
    category: "VERSATILITY",
    name: "D-LITE BOOM",
    price: "591,00€",
    slug: "d-lite-boom",
    imageUrl: "https://afs-foiling.com/wp-content/uploads/2024/02/afs-d-lite-1.png",
    hoverImageUrl: "https://afs-foiling.com/wp-content/uploads/2025/06/GWEN-WB-D-lite.png",
  },
];

function ProductCard({ product }) {
  return (
    <ProjectCard
      name={product.name}
      image={product.imageUrl}
      hoverImage={product.hoverImageUrl}
      slug={product.slug}
      price={product.price}
      category={product.category}
    />
  );
}

export default function BestSellers() {
  return (
    <section className="min-h-screen bg-white font-['Alliance No.2'] antialiased py-8 sm:py-12 px-3 sm:px-6 lg:px-4">
      <div className="max-w-[1600px] mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-black mb-8 sm:mb-10 leading-tight">
          Best Sellers
        </h1>

        {/* Adjust grid gaps and ensure proper alignment */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
