import Image from 'next/image';

const textureBgImage = 'https://afs-foiling.com/wp-content/uploads/2023/10/3d-geometric-weave-abstract-wallpaper-background-1.png';

const OssPvcConstruction = () => {
  return (
    // Main container for the section.
    // Relative for the absolute background, min-h for height, flex for centering content.
    <div className="relative min-h-screen bg-black text-white flex flex-col justify-between p-8 overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={textureBgImage}
          alt="3D geometric weave texture background"
          layout="fill"
          objectFit="cover" // Cover the entire area
          quality={80}
          className="opacity-40" // Adjust opacity to match the reference image's dark tone
          priority // Load this image early
        />
      </div>

      {/* Main Heading and Subtitle */}
      <div className="relative z-10 text-center pt-20 md:pt-28 lg:pt-36">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
          OSS Sandwich PVC<br />Construction
        </h2>
        <p className="text-base md:text-lg font-light max-w-2xl mx-auto">
          Its ultra-rigid construction gives the impression of being one with the foil, and makes it extraodinarily responsive.
        </p>
      </div>

      {/* Four-Column Text Blocks at the Bottom */}
      <div className="relative z-10 mt-auto pb-10 md:pb-16 lg:pb-20 max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-sm md:text-base font-light">
        
        {/* Column 1 */}
        <p className="max-w-xs sm:max-w-full mx-auto sm:mx-0 text-center sm:text-left">
          We follow a unique manufacturing process during which all layers of fabric, reinforcements and housings are applied in a double shell mold.
        </p>

        {/* Column 2 */}
        <p className="max-w-xs sm:max-w-full mx-auto sm:mx-0 text-center sm:text-left">
          Carbon reinforcements are also added at strategic points on the board.
        </p>

        {/* Column 3 */}
        <p className="max-w-xs sm:max-w-full mx-auto sm:mx-0 text-center sm:text-left">
          The resin used to build our boards is a biosourced SR GreenPoxy epoxy.
        </p>

        {/* Column 4 - Longer Text */}
        <p className="max-w-xs sm:max-w-full mx-auto sm:mx-0 text-center sm:text-left flex items-start">
          {/* Green dot for emphasis, mimicking the design if it's there */}
          {/* <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 mt-2"></span> */}
          <span>
            THE RESIN USED TO BUILD OUR BOARDS IS A BIOSOURCED SR GREENPOXY EPOXY.
            <br />
            <span className="text-xs italic opacity-80">(Over 33% of molecules come from plant sources)</span>
          </span>
        </p>

      </div>
    </div>
  );
};

export default OssPvcConstruction;