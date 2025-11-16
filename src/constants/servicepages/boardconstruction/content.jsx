'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

// Content Section Component
// ----------------------------------------------------------------------

const HeroSection = () => {
  // Mock data for the breadcrumb navigation
  const breadcrumb = [
    { label: 'HOME', href: '#' },
    { label: 'DOWNWIND', href: '#' },
    { label: 'AFS AND AFS ADVANCED BOARD CONSTRUCTION', href: '#' },
  ];

  return (
    <div className="relative h-screen w-full bg-black font-['Inter'] overflow-hidden">
      {/* VISUAL SIMULATION OF STACKED BOARDS (Pure CSS/Tailwind) */}
      <div className="absolute inset-0 z-0">
        {/* Main Background Light/Shadow Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-black/90"></div>
        
        {/* Simulated Board Shapes - Layer 1 (Backmost/Blurred) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[150%] h-[350px] bg-gray-900 rounded-[50%] blur-3xl opacity-30 rotate-20" />
        
        {/* Simulated Board Shapes - Layer 2 (Middle) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[130%] h-[300px] bg-white rounded-[50%] opacity-10 blur-xl rotate-12" />

        {/* Simulated Board Shapes - Layer 3 (Foreground/Sharpest) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] w-[110%] h-[250px] bg-gray-800 rounded-[50%] opacity-20 blur-md rotate-6" />

      </div>

      {/* CONTENT LAYER (Text, Navigation, and Button) */}
      <div className="absolute inset-0 z-10 flex flex-col p-4 sm:p-8 lg:p-12 text-white">
        
        {/* Top Navigation / Breadcrumb */}
        <div className="flex text-xs uppercase tracking-widest text-gray-400 mb-auto">
          {breadcrumb.map((item, index) => (
            <React.Fragment key={index}>
              <a 
                href={item.href} 
                className="hover:text-white transition duration-200 whitespace-nowrap"
              >
                {item.label}
              </a>
              {index < breadcrumb.length - 1 && (
                <ChevronRight size={12} className="mx-2 mt-[2px]" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Main Title Section */}
        <div className="mb-16">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            AFS and AFS Advanced board construction
          </h1>
        </div>

      </div>

      {/* Floating Red Notification/Chat Button (Bottom Right) */}
      <button 
        className="absolute bottom-8 right-8 z-20 
                   p-4 sm:p-5 
                   bg-red-600 hover:bg-red-700 
                   rounded-full shadow-2xl 
                   transition duration-300 
                   transform hover:scale-105"
        aria-label="Open chat or notification window"
      >
        <MessageSquare size={24} className="text-white fill-white" />
      </button>

    </div>
  );
};


// ----------------------------------------------------------------------
// 2. Dynamic Content Navigation Component
// ----------------------------------------------------------------------

const BoardContentNavigation = () => {
  // Items for the table of contents. The href attributes make them dynamic links 
  // ready for Next.js or page anchor linking.
  const navItems = [
    // The active item is styled with the arrow and bold white text.
    { label: 'THE MATERIALS', href: '#materials', active: true },
    { label: 'THE BASICS OF CONSTRUCTION', href: '#basics', active: false },
    { label: 'SANDWICH-BAUWEISE', href: '#sandwich', active: false },
    { label: 'TRIAXIAL CARBON CONSTRUCTION', href: '#triaxial', active: false },
  ];

  return (
    <div className="w-full bg-black text-white px-4 py-16 sm:px-8 lg:px-12 font-['Inter']">
      <div className="max-w-6xl mx-auto space-y-3 sm:space-y-4">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            // Use group for hover effects on the entire link
            className={`block group py-2 sm:py-3 transition-colors duration-200 uppercase tracking-wide
                        ${item.active 
                          ? 'text-white text-xl sm:text-2xl font-extrabold flex items-center'
                          : 'text-gray-500 text-lg sm:text-xl font-bold hover:text-gray-300'
                        }`}
          >
            {item.active && (
              // Arrow icon for the active section
              <ChevronRight size={20} className="transform rotate-0 mr-3 text-white transition duration-200 group-hover:translate-x-1" />
            )}
            <span className="hover:underline hover:decoration-red-600 hover:underline-offset-4">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// 3. Content Section: The Materials (Cloned Content)
// ----------------------------------------------------------------------

const ContentSectionMaterials = () => {
  return (
    // The ID 'materials' links this section to the navigation item.
    <div id="materials" className="w-full bg-white text-black px-4 py-20 sm:px-8 lg:px-12 font-['Inter']">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Manufacturing Process Intro */}
        <p className="text-base text-gray-700 leading-relaxed">
          The manufacturing process is essentially the same: a core of low-density foam (EPS) is created, which is then encased in a rigid shell. This is often a sandwich composite, combining fiberglass or carbon with a high-density foam several millimeters thick.
        </p>

        {/* Section Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter">
          The materials
        </h1>

        {/* Materials Description */}
        <p className="text-lg leading-relaxed">
          What modifies the board's properties are the materials used and the order in which they are positioned. Here are the different materials that can be found in a board:
        </p>

        {/* Sub-section: EPS Foam */}
        <div className="space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold mt-8">
            EPS foam
          </h3>
          <p className="text-base leading-relaxed">
            A foam of variable density forms the core of the board, also known as the <span className="font-semibold">foam block</span>. It ensures the board's <span className="font-semibold">rigidity</span> and <span className="font-semibold">buoyancy</span>, while remaining lightweight. The density of the foam block has a major impact on the board's final weight.
          </p>
          
          {/* Placeholder for the EPS Foam Image (simulating the texture) */}
          <div className="w-full h-72 rounded-lg overflow-hidden shadow-xl border border-gray-100">
            <img 
              src="https://placehold.co/800x288/E5E7EB/4B5563?text=EPS+Foam+Texture+(Honeycomb+Effect)" 
              alt="Close-up of EPS foam texture"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x288/E5E7EB/4B5563?text=EPS+Foam+Texture"; }}
            />
          </div>

          {/* Next Sub-section Title */}
          <h3 className="text-2xl sm:text-3xl font-extrabold mt-12">
            Fibres de verre / Glass Fiber
          </h3>
        </div>

{/* Fibres de verre / Glass Fiber */}
<div className="space-y-6">
  <h3 className="text-2xl sm:text-3xl font-extrabold mt-8">
    Fibres de verre / Glass Fiber
  </h3>
  <p className="text-base leading-relaxed">
    Fiberglass is a solid material that makes for robust board construction. It has a higher density than carbon and is less rigid, but is nonetheless far more affordable, making it an asset in rigid and affordable board construction.
  </p>

  {/* Placeholder for the Glass Fiber Image */}
  <div className="w-full h-72 rounded-lg overflow-hidden shadow-xl border border-gray-100">
    <img 
      src="https://placehold.co/800x288/F3F4F6/1F2937?text=Fiberglass+Texture" 
      alt="Close-up of fiberglass texture"
      className="w-full h-full object-cover"
      onError={(e) => { 
        e.target.onerror = null; 
        e.target.src = "https://placehold.co/800x288/F3F4F6/1F2937?text=Glass+Fiber"; 
      }}
    />
  </div>
</div>


        
      </div>
    </div>
  );
};


// ----------------------------------------------------------------------
// 4. Main Page Layout Component
// ----------------------------------------------------------------------

// The main component that renders the full page content.
const BoardPageLayout = () => {
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      <BoardContentNavigation />
      <ContentSectionMaterials /> 
      {/* Additional content sections will be placed here (e.g., #basics, #sandwich, #triaxial) */}
    </div>
  );
};

// Export the main layout component
export default BoardPageLayout;
