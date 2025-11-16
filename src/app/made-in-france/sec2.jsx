"use client";
import React from 'react';

// Data structure to easily manage and scale content blocks
const contentBlocks = [
  // --- Original Content from Image (Section 1) ---
  {
    id: 1,
    title: "The choice of carbon: an asset for the durability of foils",
    paragraphs: [
      "From the start, our ambition was to succeed in designing products that would last over time. Today we are able to say that our foils have an average life span of 10 years. As a comparison, the average life of an aluminum foil is 2 years.",
      "In addition to its competitive advantages, such as its lightness, which make it the most efficient material for designing a foil, carbon is above all extremely strong and has an impressive rigidity.",
      "This material is ideal for use in the nautical field. It is also very resistant to external aggressions (salt, sea, corrosion) and can be repaired and reconditioned very well, unlike aluminum.",
    ],
  },
  // --- Original Content from Image (Section 2) ---
  {
    id: 2,
    title: "Working in short circuits: the choice of made in France.",
    paragraphs: [
      "The choice of a 'made in France' production has been a driving force in the construction of the company. At first glance, we often think of the constraints that this entails for a company: high production costs, need for employees, management, storage, etc.",
      "But we decided to take it as an opportunity. Beyond the fact that local production considerably reduces the carbon footprint of our products and that we are proud to create jobs and know-how, there is another major advantage: producing in France allows us to reach a higher level of requirement concerning the quality of our products.",
      "Indeed, our product lines are constantly tested (by our team members, our team of riders, by our customers!). This proximity allows us to constantly improve our offer in a very short time.",
    ],
  },
  
  // ---------------------------------------------
  // --- PLACEHOLDERS (6 more sections)
  // ---------------------------------------------

  {
    id: 3,
    title: "Implement a responsible production cycle",
    paragraphs: [
      "Designing responsible products also means taking into account their manufacturing and production process.",
      "At foil and Co our most successful example is the reuse of prepreg carbon scrap. They are recovered to form the plates, i.e. the base of the foils. Therefore, there is no more than a 3% loss on raw materials during the production cycle.",
    
    ],
  },
  {
    id: 4,
    title: "Low tech: learn and know-how. ",
    paragraphs: [
      "In our approach, we place the employee at the heart of the company’s processes to develop our internal know-how and to be as autonomous as possible. We have managed to design some of the machines used in the manufacture of the foils ourselves, such as the presses, which allows us to be more autonomous.",
      "We also promote existing local know-how that we develop through the training of new employees, in particular by encouraging apprenticeship and work-study contracts.",
    ],
  },
  {
    id: 5,
    title: "Putting people at the heart of our operations",
    paragraphs: [
      "The well-being of our employees remains our main concern. In particular, we have closely studied the physical working conditions of the team members on the production line and have optimized and arranged each workstation in order to limit bad postures and repetitive gestures.",
      "We make the most of their know-how in the various core businesses within the company.",
    ],
  },
  {
    id: 6,
    title: "Living in space responsibly.",
    paragraphs: [
      "We settled in Pencran, in a rural area, in order to promote the development of the local employment basin, rather than in a large metropolis where the industrial zones are already saturated. Our workshops are installed in an eco-designed building, we are 90% self-sufficient in energy thanks to the installation of solar panels and we encourage carpooling between employees.",
      "For us, it is all these commitments that will enable us to build tomorrow’s business world: committed to the environment and responsible.",
    ],
  },
];

const ContentLayout = () => {
  return (
    // Main container uses a minimal, clean background
    <div className="min-h-screen bg-white text-gray-800 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
        {contentBlocks.map((block) => (
          // Individual Content Block
          <div
            key={block.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 border-t border-gray-200 pt-8 md:pt-12"
          >
            {/* Left Column: Title/Heading */}
            <div className="md:sticky md:top-8 self-start">
              <h2 className="text-3xl lg:text-4xl font-black leading-tight text-black">
                {block.title}
              </h2>
            </div>

            {/* Right Column: Paragraphs */}
            <div className="space-y-6">
              {block.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-base text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentLayout;
