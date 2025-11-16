import Image from 'next/image';

const Sec4 = () => {
  const imageUrl = "https://afs-foiling.com/wp-content/uploads/2024/03/image-29.png";

  return (
    <section
      className="
        flex flex-col md:flex-row
        items-center                    // Keep this for overall vertical centering of the group
        justify-around
        w-full min-h-screen
        bg-black text-white
        p-8 md:p-16
      "
    >

      {/* Left Image - Slightly down */}
      <div 
        className="
          w-full md:w-1/4 hidden md:block
          self-end                        // Pushes this item to the end (bottom) of its flex line
          md:pr-4                         // Optional: Add some spacing from the center text
        "
      >
        <Image
          src={imageUrl}
          alt="Mast/Fuselage connection detail (left)"
          width={684}
          height={862}
          layout="responsive"
          className="object-contain"
        />
      </div>

      {/* Center Text Block */}
      <div
        className="
          flex flex-col w-full md:w-1/2
          max-w-lg text-center
          my-8 md:my-0 mx-4
        "
      >
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
          Rigid Mast/
          <br />
          Fuselage
          <br />
          connection
        </h2>
        <p className="text-base lg:text-lg mb-4">
          Tapered connection between mast and fuselage, preserving the inertia of the
          refined fuselage.
        </p>
        <p className="text-base lg:text-lg">
          The result is an ultra-rigid assembly optimized for perfect fluid
          circulation.
        </p>
      </div>

      {/* Right Image - Slightly up */}
      <div 
        className="
          w-full md:w-1/4 hidden md:block
          self-start                        // Pushes this item to the start (top) of its flex line
          md:pl-4                           // Optional: Add some spacing from the center text
        "
      >
        <Image
          src={imageUrl}
          alt="Mast/Fuselage connection detail (right)"
          width={684}
          height={862}
          layout="responsive"
          className="object-contain"
        />
      </div>

    </section>
  );
};

export default Sec4;