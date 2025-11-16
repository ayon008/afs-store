// components/OnWaterFoilSection.js

const FeatureItem = ({ number, title, description }) => (
  <div className="pt-8 border-b border-gray-700 pb-4">
    <span className="text-xl font-bold text-gray-400">{number}</span>
    <h3 className="text-lg font-semibold mt-2">{title}</h3>
    <p className="text-gray-400 text-sm mt-1">{description}</p>
  </div>
);

const OnWaterFoilSection = () => {
  // Define your feature data here
  const features = [
    { number: '01', title: 'Explosive acceleration', description: 'Every pump is instantly translated into lift and drive...' },
    { number: '02', title: 'Full high-speed control', description: 'At full throttle, the PURE 600 stays locked-in and predictable...' },
    // ... add all 6 features
    { number: '03', title: 'Freestyle & freeride versatility', description: 'Whether cruising calmly or chasing GPS records, this foil adapts...' },
    // ...
  ];

  return (
    <section className="bg-black text-white py-16 md:py-24 px-4 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl md:text-6xl font-extrabold mb-12">
          On-water fell
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          {features.map((feature) => (
            <FeatureItem key={feature.number} {...feature} />
          ))}
        </div>

        <hr className="border-gray-700 my-16" />

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          
          {/* Image */}
          <div className="w-full lg:w-1/3">
            <img 
              src="https://afs-foiling.com/wp-content/uploads/2025/09/Capture-decran-2025-09-16-a-11.34.28.png" 
              alt="Foil board in water" 
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Main Text */}
          <div className="w-full lg:w-2/3">
            <p className="text-3xl md:text-5xl font-extrabold leading-tight">
              Ride it, and you're literally standing on the same hardware as the pros – the missing link to feeling what **pro-level foiling** is all about.
            </p>
            <p className="text-lg mt-8 text-gray-300">
              More than a foil, the PURE 600 is a pure experience: uncompromising riding, every acceleration, every trick, every flight delivered with raw intensity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnWaterFoilSection;