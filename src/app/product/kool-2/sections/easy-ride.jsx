import Image from 'next/image';

const EasyRide = () => {
  return (
    // Main section with a white background and overflow-hidden
    // overflow-hidden is crucial for clipping the board image
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Main grid: 1 column on mobile, 2 columns on desktop.
          'items-center' vertically aligns the text column with the image.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">

          {/* --- 1. Text Content Column (now first on desktop) --- */}
          <div className="order-2 md:order-1 flex flex-col space-y-5">
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Easy ride
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
                The board glides along smoothly and nimbly as you ride.
              </p>
              <p className="text-gray-600">
                If you want to accelerate, its streamlined nose will allow you to do so easily.
                When conditions become more difficult, the raised nose facilitates smooth passage through waves.
              </p>
              <p className="text-gray-600 sm:col-span-2">
                The board’s outline ends in a round tail, making it easy to maneuver and faster to row than other boards.
              </p>
            </div>

            {/* Highlighted Text */}
            <p className="text-amber-600 font-bold uppercase tracking-wider pt-4">
              SHE IS PLAYFUL AND LIVELY IN THE SMALL 
              CONDITIONS OFTEN ENCOUNTERED.
            </p>
          </div>

          {/* --- 2. Image Column (now on the right) --- */}
          <div className="order-1 md:order-2">
            <Image
              src="https://afs-foiling.com/wp-content/uploads/2023/06/Kool-11.png"
              alt="KOOL Paddleboard"
              width={1618}
              height={430}
              priority // Load this image first as it's likely high-priority
              className="w-auto max-w-none md:max-w-[1000px] transform translate-x-1/4 md:translate-x-1/3"
              // 'transform translate-x-...' pulls the image to the right
              // to create the cut-off effect.
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default EasyRide;
