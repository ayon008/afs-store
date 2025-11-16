"use client";

import Hero from "@/constants/servicepages/foilcharacteristics/hero.jsx";
import FeatureBar from "@/constants/FeatureBar";

export default function FoilCharacteristicsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <div className="mt-16">
        <FeatureBar />
      </div>
    </div>
  );
}