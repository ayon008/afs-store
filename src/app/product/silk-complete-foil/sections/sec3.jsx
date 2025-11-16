import Image from 'next/image';

// Data for the three columns
const foilData = [
  {
    title: 'Adaptive design',
    description:
      'The aspect ratio, sweep, dihedral and fuselage length have been developed specifically for each aircraft.',
    imageSrc: 'https://afs-foiling.com/wp-content/uploads/2024/03/image-24.png',
    alt: 'AFS SILK 650 Foil',
  },
  {
    title: 'Adaptive design', // This title is hidden but provides spacing
    description:
      "We've chosen to add longitudinal stability and high-speed control to the small foils by lengthening the fuselage.",
    imageSrc: 'https://afs-foiling.com/wp-content/uploads/2024/03/image-25-1.png',
    alt: 'AFS SILK 850 Foil',
    isHiddenTitle: true, // Flag to make the title invisible
  },
  {
    title: 'Adaptive design', // This title is hidden but provides spacing
    description:
      'Similarly, a perfectly matched stabilizer has been developed for each front foil to achieve a totally balanced configuration.',
    imageSrc: 'https://afs-foiling.com/wp-content/uploads/2024/03/image-25-1.png',
    alt: 'AFS SILK 1050 Foil',
    isHiddenTitle: true, // Flag to make the title invisible
  },
];

export default function AdaptiveDesign() {
  return (
    <section className="bg-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Grid container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          {foilData.map((item, index) => (
            <div key={index} className="flex flex-col text-left">
              {/* Image */}
              <div className="w-full">
                <Image
                  src={item.imageSrc}
                  alt={item.alt}
                  width={1000}
                  height={1000}
                  className="w-full h-auto"
                />
              </div>

              {/* Text Content */}
              <div className="mt-6">
                {/* The title is rendered in all columns to ensure the descriptions
                  below align horizontally, but it's made invisible 
                  in the 2nd and 3rd columns.
                */}
                <h2
                  className={`text-2xl font-bold mb-3 ${
                    item.isHiddenTitle ? 'invisible' : ''
                  }`}
                >
                  {item.title}
                </h2>
                <p className="text-sm max-w-xs">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}