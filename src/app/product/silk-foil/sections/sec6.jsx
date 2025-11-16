import Image from 'next/image';

const Sec6 = () => {
  const backgroundImageUrl = "https://afs-foiling.com/wp-content/uploads/2024/03/17820231_SL-092619-23740-39-1-5.png";

  return (
    <section 
      className="
        relative                      // Parent for absolute positioning
        w-full 
        h-[60vh] md:h-[70vh]           // A set height, shorter than full-screen
        overflow-hidden
      "
    >
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0"> {/* Inset-0 makes it fill the parent */}
        <Image
          src={backgroundImageUrl}
          alt="Carbon fiber weave background"
          layout="fill"             // Fills the parent div
          objectFit="cover"        // Covers the entire area, cropping if needed
          quality={90}             // High quality for a large background
        />
        {/* Optional: Dark overlay to make text pop more */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
      
      {/* Text Content */}
      <div 
        className="
          relative z-10               // Sits on top of the background
          h-full                        // Takes full height of the section
          flex flex-col items-center  // Centers content horizontally
          justify-center              // Centers content vertically
          text-white text-center
          p-8                           // Padding for small screens
        "
      >
        
        {/* Made in France */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm font-semibold tracking-widest uppercase">
            MADE IN FRANCE
          </span>
          <span className="text-lg">🇫🇷</span> {/* French flag emoji */}
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          UHM Carbon
          <br />
          Construction
        </h2>

        {/* Paragraph */}
        <p className="text-base md:text-lg max-w-lg">
          Use of carbon in UHM (Ultra High Modulus).
          This optimizes the foil's cross-section, giving
          it strength, rigidity and lightness all at the
          same time.
        </p>

      </div>

    </section>
  );
};

export default Sec6;