"use client";
import Image from "next/image";

export default function BoardSection() {
  return (
    <section className="relative w-full bg-white flex flex-col items-center justify-center py-20 overflow-hidden">
      {/* Top small description text */}
      <p className="text-center max-w-2xl text-sm text-black mb-10">
        Short turns, committed surfing: the AFS SNAP shape perfectly meets these criteria. 
        The board's compact shape and outline make for lively, radical surfing.
      </p>

      {/* Container for board and outline */}
      <div className="relative w-[1100px] max-w-[95vw]">
        {/* Dotted Outline */}
        <Image
          src="https://afs-foiling.com/wp-content/uploads/2023/06/Ellipse-1.png"
          alt="Board outline"
          width={1200}
          height={600}
          className="absolute top-0 left-0 w-full h-auto z-0"
        />

        {/* Board Image */}
        <Image
          src="https://afs-foiling.com/wp-content/uploads/2023/06/img-1.png"
          alt="Board"
          width={1200}
          height={600}
          className="relative z-10 w-full h-auto"
        />

        {/* Text: Radical maneuvers */}
        <div className="absolute top-[30%] left-[25%] text-[#00528b] font-bold text-3xl sm:text-4xl">
          Radical maneuvers
        </div>

        {/* Text: Easy ride */}
        <div className="absolute bottom-[5%] left-[55%] text-[#00528b] font-bold text-3xl sm:text-4xl">
          Easy ride
        </div>
      </div>

      {/* Bottom description */}
      <p className="text-center max-w-sm text-sm text-black mt-6">
        The width provides stability and comfortable balance for longer SUP sessions.
      </p>
    </section>
  );
}
