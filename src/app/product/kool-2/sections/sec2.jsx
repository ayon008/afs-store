import Image from 'next/image';

const EasyWaves = () => {
  return (
    // Main section with a white background and overflow-hidden
    // overflow-hidden is crucial for clipping the board image
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Main grid: 1 column on mobile, 2 columns on desktop.
          'items-center' vertically aligns the text column with the image.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          
          {/* --- 1. Image Column --- */}
          <div>
            <Image
              src="https://afs-foiling.com/wp-content/uploads/2023/06/kool-12.png"
              alt="KOOL Paddleboard"
              width={1618}
              height={430}
              priority // Load this image first as it's likely high-priority
              className="w-auto max-w-none md:max-w-[1000px] transform -translate-x-1/4 md:-translate-x-1/3"
              // 'transform -translate-x-...' pulls the image to the left
              // to create the cut-off effect.
            />
          </div>

          {/* --- 2. Text Content Column --- */}
          <div className="flex flex-col space-y-5">
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Easy waves
            </h2>
            
            {/* Dotted Line Image */}
            <Image
              src="https://afs-foiling.com/wp-content/uploads/2023/06/Frame-1-1.png"
              alt="Dotted separator"
              width={453}
              height={12}
              className="w-72" // Set a fixed width so it doesn't stretch
            />

            {/* Two-column text block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-2">
              <p className="text-gray-600">
                The board is ideal for beginners who want to learn SUP on the flat 
                or easily in the waves.
              </p>
              <p className="text-gray-600">
                It's smooth on the take-off, easy to handle in the surf, 
                and its raised nose is reassuring on the slopes.
              </p>
            </div>

            {/* Highlighted Text */}
            <p className="text-amber-600 font-bold uppercase tracking-wider pt-4">
              SHE IS PLAYFUL AND LIVELY IN THE SMALL 
              CONDITIONS OFTEN ENCOUNTERED.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EasyWaves;