import React from 'react';

// Card Component for the product features
const ProductCard = ({ imageUrl, description }) => {
  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
      {/* Feature Image */}
      {/* The image URLs provided already contain the red gradient and carbon texture, 
          so we just need to ensure the image covers the card area. */}
      <div className="aspect-[3/2] w-full bg-black">
        <img
          src={imageUrl}
          alt="Product Feature"
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/000000/FFFFFF?text=Image+Load+Error"; }}
        />
      </div>

      {/* Description Overlay at the bottom */}
      <div className="absolute inset-x-0 bottom-0 p-4 pt-8 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-sm text-gray-200 font-light leading-snug">
          {description}
        </p>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  // Background image URL provided by the user
  const BG_IMAGE_URL = 'https://afs-foiling.com/wp-content/uploads/2025/09/DSC00260-1.png';

  // Card data
  const cardData = [
    {
      imageUrl: 'https://afs-foiling.com/wp-content/uploads/2025/09/Rectangle-9.png',
      description: 'An ultra-thin profile to minimize drag.',
    },
    {
      imageUrl: 'https://afs-foiling.com/wp-content/uploads/2025/09/spec_card-3.png',
      description: 'A carefully tuned aspect ratio for glide and stability.',
    },
    {
      imageUrl: 'https://afs-foiling.com/wp-content/uploads/2025/09/spec_card-4.png',
      description: 'UHM carbon stiffness for instant power transfer and total feedback under foot.',
    },
  ];

  return (
    // Main Container with dark background and the large, moody background image
    <div
      className="min-h-screen bg-[#100000] text-white font-inter"
      style={{
        // Using a dark filter effect and the background image to replicate the original mood
        backgroundImage: `linear-gradient(rgba(10, 0, 0, 0.8), rgba(10, 0, 0, 0.8)), url('${BG_IMAGE_URL}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      
      {/* Content Wrapper for padding and centering */}
      <div className="max-w-7xl mx-auto py-16 px-6 lg:px-12">
        
        {/* Header and Description Section */}
        <header className="md:flex md:justify-end mb-16 pt-8">
          <div className="md:w-1/2 lg:w-5/12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-red-500">
              Technical edge
            </h1>
            
            {/* Main Descriptive Paragraphs */}
            <p className="text-gray-300 mb-4 text-lg leading-relaxed">
              At AFS, the PURE range represents performance at its most attained: a blend of <strong className="text-white font-semibold">speed, reactivity, precision</strong> and control built for riders pushing their limits.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              The <strong className="text-white font-semibold">PURE 600</strong> extends that DNA, delivering a new weapon dedicated to freestyle and speed.
            </p>
          </div>
        </header>

        {/* Feature Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {cardData.map((card, index) => (
            <ProductCard
              key={index}
              imageUrl={card.imageUrl}
              description={card.description}
            />
          ))}
        </section>

        {/* Bottom Text Block */}
        <footer className="pt-8">
          <p className="text-white text-2xl max-w-4xl tracking-wide leading-relaxed font-normal">
            This foil is tuned for modern freestyle – big spins, long glides, clean landings. Its ability to re-pop after a trick (even when the board briefly touches down – “flotte” in French) is a major scoring advantage in GWA events – and one of the PURE 600's biggest strengths.
          </p>
        </footer>
        
      </div>
    </div>
  );
};

export default App;