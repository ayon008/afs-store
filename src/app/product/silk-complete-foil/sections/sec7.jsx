import Image from 'next/image';

// Data for each wing to make rendering easier
const wingData = [
  {
    name: "Silk 650",
    imageUrl: "https://afs-foiling.com/wp-content/uploads/2024/03/Ren-650.png",
    specs: [
      { label: "Surface", value: "650 cm2" },
      { label: "Span", value: "720 mm" },
      { label: "Aspect Ratio", value: "8" },
      { label: "Chord", value: "115 mm" },
      { label: "Thickness", value: "13,7 mm" },
      { label: "Construction", value: "UHM Carbon" },
    ],
    description: "Ideal for advanced surf foilers and very small riders, but also for wing foiling in waves. Works in big surf and downwinders.",
  },
  {
    name: "Silk 850",
    imageUrl: "https://afs-foiling.com/wp-content/uploads/2024/03/Ren-850-2.png",
    specs: [
      { label: "Surface", value: "850 cm2" },
      { label: "Span", value: "824 mm" },
      { label: "Aspect Ratio", value: "8" },
      { label: "Chord", value: "134 mm" },
      { label: "Thickness", value: "16 mm" },
      { label: "Construction", value: "UHM Carbon" },
    ],
    description: "For excellent surf foiling and wing foiling in intermediate wind and wave conditions. Can be used as a freestyle kite foil.",
  },
  {
    name: "Silk 1050",
    imageUrl: "https://afs-foiling.com/wp-content/uploads/2024/03/Silk-1050.png",
    specs: [
      { label: "Surface", value: "1050 cm2" },
      { label: "Span", value: "916 mm" },
      { label: "Aspect Ratio", value: "8" },
      { label: "Chord", value: "150 mm" },
      { label: "Thickness", value: "17,9 mm" },
      { label: "Construction", value: "UHM Carbon" },
    ],
    description: "For advanced foilers looking to perform in lighter foil and wingsurf conditions.",
  },
];

const FrontWingCharacteristics = () => {
  return (
    <section 
      className="
        w-full min-h-screen
        bg-black text-white
        py-16 px-4 md:px-8 lg:px-16
        flex flex-col items-center
      "
    >
      {/* Section Title */}
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-20">
        Front wing <br /> characteristics
      </h2>

      {/* Wings Container */}
      <div 
        className="
          grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 // Responsive grid
          gap-8 md:gap-12 lg:gap-16                      // Spacing between cards
          max-w-7xl w-full                               // Max width for content
        "
      >
        {wingData.map((wing, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            {/* Wing Image */}
            <div className="relative w-full max-w-[300px] h-[200px] md:h-[250px] lg:h-[300px] mb-8">
              <Image
                src={wing.imageUrl}
                alt={wing.name}
                layout="fill"
                objectFit="contain" // Ensures the entire wing is visible
                objectPosition="center"
              />
            </div>

            {/* Wing Name */}
            <h3 className="text-2xl font-bold mb-6">{wing.name}</h3>

            {/* Specs Table */}
            <div className="w-full max-w-[280px] text-left mb-6">
              {wing.specs.map((spec, specIndex) => (
                <div key={specIndex} className="flex justify-between py-1 border-b border-gray-700 last:border-b-0">
                  <span className="text-sm text-gray-400">{spec.label}</span>
                  <span className="text-sm font-medium">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-sm text-gray-300 max-w-[280px]">
              {wing.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FrontWingCharacteristics;