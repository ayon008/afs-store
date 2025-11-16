import Image from 'next/image';

const Sec5 = () => {
  const imageUrl = "https://afs-foiling.com/wp-content/uploads/2024/03/image-23.png";

  return (
    <section 
      className="
        relative
        flex items-center
        w-full 
        min-h-[140vh]
        bg-black text-white
        overflow-hidden
        py-32
      "
    >
      <div className="absolute top-0 left-0 w-full md:w-3/4 h-full opacity-80 md:opacity-100">
        <Image
          src={imageUrl}
          alt="Monoblock structure hydrofoil"
          layout="fill"
          objectFit="cover"
          objectPosition="30% 50%"
        />
      </div>

      <div className="block md:hidden w-full p-8">
        <Image
          src={imageUrl}
          alt="Monoblock structure hydrofoil"
          width={1920}
          height={800}
          layout="responsive"
        />
      </div>

      <div 
        className="
          relative z-10
          flex flex-col justify-center
          w-full max-w-xl
          md:w-2/5
          ml-auto
          p-8 md:p-16
        "
      >
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
          Monoblock structure
        </h2>
        <p className="text-base lg:text-lg mb-4">
          The foils are molded directly with the fuselage
          in a single piece, allowing for continuity of the
          structural carbon fibers while maintaining
          perfect hydrodynamic flow to maximize glide.
        </p>
        <p className="text-base lg:text-lg">
          This process provides the rigidity necessary
          for perfect transmission of the rider's efforts,
          unmatched control, and ultra-precise
          handling of the foil for simply the best
          performance.
        </p>
      </div>
    </section>
  );
};

export default Sec5;
