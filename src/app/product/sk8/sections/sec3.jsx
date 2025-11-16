import Image from 'next/image';

const frontImage = 'https://afs-foiling.com/wp-content/uploads/2023/10/SK8_0003-2-2.png';
const bgImage = 'https://afs-foiling.com/wp-content/uploads/2023/10/3.-U-shape-2.png';

const UShapeSection = () => {
  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Person holding foil board"
          layout="fill"
          objectFit="cover"
          quality={80}
          className="opacity-20" // Adjust opacity to match the dimmed look
          priority // Load this background image early
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 p-8 max-w-4xl mx-auto items-center">
        {/* Centered Content */}
        <div className="flex flex-col items-center text-center space-y-6">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4">
            U-shape
          </h2>

          {/* First Text Block */}
          <p className="text-sm md:text-base font-light max-w-2xl mx-auto">
            A COMPLETELY NEW DESIGN, THIS SHAPE INCREASES THE BOARD'S RIGIDITY AND LIMITS LOSSES IN THE TRANSMISSION OF FORCES FROM THE RIDER TO THE FOIL.
          </p>
          <p className="text-sm md:text-base font-light max-w-2xl mx-auto">
            In addition, the U-shape refines the board's central section to bring the foil closer to the rear foot, for direct control.
          </p>

          {/* Front Image */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md my-6">
            <Image
              src={frontImage}
              alt="Close-up of foil board U-shape design"
              width={600} // Original image aspect ratio is close to 600x600
              height={600} 
              objectFit="contain"
              className="rounded-lg shadow-lg" // Optional: add some styling to the image
            />
          </div>

          {/* Second Text Block */}
          <p className="text-sm md:text-base font-light max-w-2xl mx-auto">
            THESE TWO BARS INCREASE THE HULL'S MOMENT OF INERTIA IN THE LONGITUDINAL DIRECTION, STIFFENING THE BOARD WHILE MAINTAINING ITS CLASSIC CONSTRUCTION.
          </p>
          <p className="text-sm md:text-base font-light max-w-2xl mx-auto">
            It also distributes the volume across the rails, providing stability during touch-downs. The chamfered rails prevent the board from catching on the water during touch-downs, allowing you to continue flying over the water rather than coming to an abrupt stop.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UShapeSection;