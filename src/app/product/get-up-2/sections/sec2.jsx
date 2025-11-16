import Image from "next/image";

export default function OptimizedHull() {
  return (
    <section className="relative w-full flex justify-center bg-white py-10">
      <div className="relative max-w-6xl w-full flex justify-center items-start">
        {/* Dotted line graphic */}
        <div className="absolute right-0 top-14">
          <Image
            src="https://afs-foiling.com/wp-content/uploads/2023/06/Frame-1-1.png"
            alt="dotted line"
            width={600}
            height={20}
            className="object-contain"
          />
        </div>

        {/* Text block */}
        <div className="absolute right-[13%] top-[1%] max-w-[340px]">
          <h2 className="text-[#bf8b40] text-5xl font-semibold mb-3 whitespace-nowrap">
            Optimized Hull
          </h2>
          <p className="text-[13px] leading-snug text-black">
            A long V releases these large, wide floats. It adds curve to the rail
            line and amplifies the pivot.
          </p>
          <p className="text-[13px] leading-snug mt-3 text-black">
            To improve glide, a long double concave tightens the scoop and
            accelerates the Get Up.
          </p>
          <p className="text-[13px] leading-snug mt-3 text-[#bf8b40] font-semibold">
            Excellent handling and excellent glide in waves affordable to all.
          </p>
        </div>

        {/* Main surfboard image */}
        <div className="w-[900px] mt-20 ml-[-200px]">
          <Image
            src="https://afs-foiling.com/wp-content/uploads/2023/06/get-up-10-1.png"
            alt="board"
            width={900}
            height={400}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
