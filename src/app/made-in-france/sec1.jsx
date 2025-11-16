"use client";

import React from 'react';
import { LayoutGrid, Factory, CircuitBoard, Plug, Recycle, User, Building } from 'lucide-react';

// Data structure for the seven pillars/features
const features = [
  {
    title: "Choice of carbon",
    description: "We have privileged the use of a durable material, resistant to external aggressions and capable of being restored and repaired, to maximize the life of our foils.",
    // Icon chosen for visual similarity to a grid/pattern
    Icon: LayoutGrid, 
  },
  {
    title: "Short circuit",
    description: "We have established our workshops in France to considerably reduce the carbon footprint of our products and to control their quality and performance on an ongoing basis.",
    // Icon chosen for visual similarity to a circuit-related component
    Icon: CircuitBoard,
  },
  {
    title: "Responsible production",
    description: "At Foil & Co there is no loss of raw material. All carbon off-cuts are reused to be reintegrated into the production cycle.",
    // Icon chosen for visual similarity to a factory/production line
    Icon: Factory,
  },
  {
    title: "Low tech approach",
    description: "We manufacture some of our own production machines.",
    // Icon chosen for visual similarity to a simple connection/plug
    Icon: Plug,
  },
  {
    title: "Circular economy",
    description: "Since this year we propose a buy-back - reconditioning - resale offer for our foils. The creation and mastery of a fleet of second-hand equipment allows us to significantly extend the life of our foils.",
    // Icon chosen for visual similarity to the circular arrows
    Icon: Recycle,
  },
  {
    title: "The human",
    description: "The well-being of our employees is our top priority. In particular, we use pricing carbon because it is much less volatile than conventional resins.",
    // Icon chosen for visual similarity to the human profile
    Icon: User,
  },
  {
    title: "Living space",
    description: "Our activity takes place in an eco-designed building, allowing us to be 80% autonomous in energy.",
    // Icon chosen for visual similarity to a simple structure/building
    Icon: Building,
  },
];

/**
 * Renders a single feature card within the grid.
 */
const FeatureCard = ({ title, description, Icon }) => (
  <div className="flex flex-col space-y-3">
    {/* Icon Section - Darker gray background for the icon circle/shape */}
    <div className="flex items-center space-x-4 mb-4">
      {/* The original icons are complex; we use Lucide for semantic and visual approximation */}
      <Icon className="text-white w-10 h-10" />
    </div>

    {/* Title - Bold and slightly larger, matching the image */}
    <h3 className="text-white text-xl font-medium tracking-wide">
      {title}
    </h3>

    {/* Description - Smaller, lighter gray text */}
    <p className="text-[#a0a0a0] text-sm leading-relaxed font-light">
      {description}
    </p>
  </div>
);


/**
 * The main App component which renders the entire section.
 */
export default function App() {
  // The background color is a deep charcoal/dark gray, closely matched to the image
  return (
    <div className="min-h-screen bg-[#333333] flex items-start py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        {/*
          The layout uses a 3-column grid for the first two rows (desktop)
          and then the 7th item naturally starts a new row.
          On smaller screens, it collapses to 1 column.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              Icon={feature.Icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
