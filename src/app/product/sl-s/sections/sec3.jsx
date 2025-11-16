import Image from 'next/image';

const PowerfulShape = () => {
  return (
    <section className="bg-black text-white">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-10 py-16 lg:py-24 px-4">
        
        {/* Left Column: Text Content */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="https://afs-foiling.com/wp-content/uploads/2023/04/Powerful-shape-svg@1x.svg"
            alt="Powerful Shape Icon"
            width={70}
            height={70}
          />

          <p className="mt-5 text-lg text-gray-300 max-w-md">
            Every shape has been optimized to ensure radical acceleration while
            retaining control and comfort. Triggering and driving the jibe is easy,
            so you can always stay ahead.
          </p>
        </div>

        {/* Right Column: Image */}
        <div className="flex items-center justify-center">
          <Image
            src="https://afs-foiling.com/wp-content/uploads/2023/04/ahd-powerfull-shape.jpg"
            alt="AFS Foil Board"
            width={1000}
            height={667} // Using an approximate 3:2 aspect ratio
            className="w-full h-auto"
          />
        </div>
        
      </div>
    </section>
  );
};

export default PowerfulShape;