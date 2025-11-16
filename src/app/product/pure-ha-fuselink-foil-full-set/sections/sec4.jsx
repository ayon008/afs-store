import Image from 'next/image';

const CarbonSection = () => {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black p-8 text-white"
      // Use a style tag for the background image URL for reliability
      style={{
        backgroundImage: "url('https://afs-foiling.com/wp-content/uploads/2024/02/image-15-2.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Content Wrapper */}
      <div className="z-10 flex max-w-3xl flex-col items-center gap-6 text-center">
        
        {/* Made in France Block */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium uppercase tracking-widest">
            Made in France
          </span>
          <Image
            src="https://afs-foiling.com/wp-content/uploads/2024/02/Frame-23.svg"
            alt="French flag"
            width={20}
            height={16}
          />
        </div>

        {/* Heading */}
        <h2 className="text-5xl font-bold leading-tight md:text-6xl">
          Combination Carbon Construction
        </h2>

        {/* Paragraph */}
        <p className="text-lg leading-relaxed">
          The foil is built from a combination of UHM and HM carbon, resulting in
          thin, light, fast, stiff and robust sections, offering the rider
          the best riding sensations.
        </p>
      </div>
    </section>
  );
};

export default CarbonSection;