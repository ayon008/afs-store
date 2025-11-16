import Image from 'next/image';

export default function ThreeDHull() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <Image
        src="https://afs-foiling.com/wp-content/uploads/2023/11/image-4-2.png.webp"
        alt="3D Hull board"
        width={1200}
        height={800}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] object-contain"
      />
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 max-w-5xl text-center text-white px-8">
        <h2 className="text-5xl font-bold mb-6">3D Hull</h2>
        <p className="text-sm uppercase tracking-widest mb-8">
          We've evolved the previous cutouts of the Fire into a lighter and more straightforward step.
        </p>
        <div className="grid grid-cols-3 gap-6 text-xs uppercase tracking-wider mb-8">
          <p>
            The step hull is a principle that originated in racing boats seeking to glide fast. The step creates a low-pressure area behind it, which sucks in air from the edges of the hull.
          </p>
          <p>
            An air cushion is created, thereby reducing friction. As the board accelerates, its wetted surface decreases drastically, reducing drag.
          </p>
          <p>
            The curved hull absorbs impacts by distributing water run-off during touchdowns, saving you from unnecessary falls.
          </p>
        </div>
        <p className="text-lg font-bold uppercase tracking-widest">
          The Fire V2 will give you an unrivalled feeling of smoothness without penalizing your piloting errors.
        </p>
      </div>
    </div>
  );
}