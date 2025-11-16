// components/FrontWingFeatures.js

import Image from 'next/image';

const featuresData = [
  {
    model: 'PURE HA800',
    imageSrc: 'https://afs-foiling.com/wp-content/uploads/2023/07/Avion_800_1.png.webp',
    stats: [
      { label: 'Surface', value: '800 cm2' },
      { label: 'Span', value: '1000 mm' },
      { label: 'Aspect Ratio', value: '13' },
      { label: 'Cord', value: '100 mm' },
      { label: 'Thickness', value: '11,6 mm' },
      { label: 'Fuselage', value: '572 mm' },
      { label: 'Construction', value: 'UHM Carbon' },
      { label: 'Weight', value: '1,6 kg' },
    ],
  },
  {
    model: 'PURE HA1100',
    imageSrc: 'https://afs-foiling.com/wp-content/uploads/2023/07/Avion_1100_1.png.webp',
    stats: [
      { label: 'Surface', value: '1100 cm2' },
      { label: 'Span', value: '1100 mm' },
      { label: 'Aspect Ratio', value: '11' },
      { label: 'Cord', value: '125 mm' },
      { label: 'Thickness', value: '14,5 mm' },
      { label: 'Fuselage', value: '553 mm' },
      { label: 'Construction', value: 'UHM Carbon' },
      { label: 'Weight', value: '1,85 kg' },
    ],
  },
];

// Component for a single stat row (Label | Value)
const StatRow = ({ label, value }) => (
  <div className="flex justify-between py-1 border-b border-gray-700">
    <span className="text-gray-400">{label}</span>
    <span className="font-medium text-white">{value}</span>
  </div>
);

// Component for an individual wing's features (left or right column)
const WingFeatureCard = ({ model, imageSrc, stats }) => (
  <div className="flex flex-col items-center">
    {/* Image */}
    <div className="mb-8 w-full max-w-[400px]">
      <Image
        src={imageSrc}
        alt={`${model} Front Wing`}
        width={400} // Set a fixed width/height for Next/Image to prevent layout shift
        height={200} // Adjust aspect ratio as needed
        layout="responsive"
        objectFit="contain"
      />
    </div>

    {/* Model Name */}
    <h3 className="text-2xl font-bold text-white mb-6 tracking-wider">{model}</h3>

    {/* Stats List (Table-like structure) */}
    <div className="w-full max-w-xs md:max-w-sm px-4">
      {stats.map((stat) => (
        <StatRow key={stat.label} label={stat.label} value={stat.value} />
      ))}
    </div>
  </div>
);


export default function FrontWingFeatures() {
  return (
    // Main Container: Black background, centered content, responsive padding
    <div className="bg-black py-16 px-4 min-h-screen">
      
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-16">
        Front wing features
      </h1>
      
      {/* Two-Column Grid for Features */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
        
        {/* Left Wing Feature */}
        <WingFeatureCard
          model={featuresData[0].model}
          imageSrc={featuresData[0].imageSrc}
          stats={featuresData[0].stats}
        />
        
        {/* Right Wing Feature */}
        <WingFeatureCard
          model={featuresData[1].model}
          imageSrc={featuresData[1].imageSrc}
          stats={featuresData[1].stats}
        />
      </div>
    </div>
  );
}