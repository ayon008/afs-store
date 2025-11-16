import Image from 'next/image';

const ClipSystemSection = () => {
  // Use the provided image link directly
  const backgroundImageUrl = 'https://afs-foiling.com/wp-content/uploads/2025/01/focus_texture_handle-2.png';

  return (
    // Main container: full width, dark background, tall height for impact
    <section className="relative w-full h-[600px] md:h-[800px] bg-black overflow-hidden">
      
      {/* 1. Background Image (Next.js Image for optimization) */}
      <Image
        src={backgroundImageUrl}
        alt="Close-up of a dark foil wing clip system against a white surface"
        layout="fill" // Stretches to fill the parent container
        objectFit="cover" // Ensures the image covers the area without distortion
        priority // Load this image as a priority since it's above the fold
        quality={100} // High quality to prevent artifacts
        className="opacity-70" // Slightly reduce opacity on the image itself
      />

      {/* 2. Content Container (Center and Max Width) */}
      <div className="absolute inset-0 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start pt-28">
        
        {/* Grid for two-column text layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-8">
          
          {/* --- Left Column: Title and Description --- */}
          <div className="text-white self-start space-y-4 max-w-md">
            <p className="text-red-500 uppercase tracking-widest text-[10px] font-semibold">
              EVEN MORE ADVANTAGES
            </p>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              The New Clip System
            </h1>
            <p className="text-gray-300 max-w-sm text-base pt-2">
              This new product is the ideal solution for those looking for a high performance, modular wing.
            </p>
          </div>
          
          {/* --- Right Column: Quote and Attribution (Aligned to the right) --- */}
          <div className="text-white self-end flex flex-col items-end pt-20 lg:pt-0">
            <div className="max-w-xs space-y-4 text-right">
              
              {/* Quote Block */}
              <div className="relative">
                {/* Large quote mark */}
                <span className="absolute -left-5 top-0 text-3xl font-serif text-gray-500 opacity-80 leading-none lg:-left-6">
                  “
                </span>
                <p className="text-sm italic pl-4 lg:pl-0">
                  Our teams are constantly working on innovations to improve the user experience. With the launch of the FIND-LITE, we are developing an accessory that will allow a paddle to be fitted in place of the boom, for ultimate practice. This system will provide an interesting advantage, lightening the sail when folded, making it easier to transport and store.
                </p>
              </div>
              
              {/* Attribution */}
              <div className="text-xs font-semibold pt-2">
                <p className="text-white">Quentin Riou</p>
                <p className="text-gray-400 font-light">R&D Manager at F-One and Ora.</p>
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default ClipSystemSection;