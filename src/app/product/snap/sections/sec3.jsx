// components/SurfboardFeature.jsx

import Image from "next/image";

const SurfboardFeature = () => {
  // Images
  const boardImageUrl =
    "https://afs-foiling.com/wp-content/uploads/2023/06/1M7A0558-%D0%A3%D0%BB%D1%83%D1%87%D1%88%D0%B5%D0%BD%D0%BE-NR.png";

  const coverImageUrl =
    "https://afs-foiling.com/wp-content/uploads/2023/06/1M7A0558-%D0%A3%D0%BB%D1%83%D1%87%D1%88%D0%B5%D0%BD%D0%BE-NR-1.png";

  return (
    <div className="flex justify-center items-start min-h-screen p-4 bg-white">
      {/* Outer container for layout */}
      <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg">

        {/* Surfboard Image with transparent background */}
        <div className="w-full h-auto">
          <Image
            src={boardImageUrl}
            alt="Surfboard with transparent background"
            width={400}
            height={1200}
            layout="responsive"
            priority
          />
        </div>

        {/* Cover image on top */}
<div className="absolute top-50 w-[200%] h-[200%] z-10 -left-1/2">
  <Image
    src={coverImageUrl}
    alt="Cover"
    width={24000}  // Massively increased width
    height={48000} // Massively increased height
    layout="responsive"
    priority
    className="object-cover"
  />
</div>


        {/* Text Overlay */}
        <div className="absolute top-[25%] left-1/2 transform -translate-x-1/2 text-center select-none pointer-events-none">
          <p className="text-6xl font-extrabold text-blue-800 tracking-tighter mb-1">
            5
          </p>
          <h2 className="text-3xl font-bold text-blue-800 tracking-tight mb-2">
            stalls
          </h2>
          <p className="text-sm text-gray-700 max-w-xs mx-auto leading-tight">
            5 FCS boxes for
            <br />
            greater versatility.
          </p>
        </div>

      </div>
    </div>
  );
};

export default SurfboardFeature;
