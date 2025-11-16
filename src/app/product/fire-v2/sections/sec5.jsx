import Image from 'next/image';

export default function StabilityKey() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <Image
        src="https://afs-foiling.com/wp-content/uploads/2023/12/image-5-1-1.png"
        alt="Fire V2 board"
        width={1200}
        height={800}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] object-contain"
      />
      <div className="absolute top-20 right-20 max-w-md text-right text-white">
        <h2 className="text-5xl font-bold mb-4">Stability is the key</h2>
        <p className="text-sm uppercase tracking-widest">
          We've kept the width at the rear of the board for maximum stability.
        </p>
      </div>
      <div className="absolute bottom-20 left-20 max-w-sm text-left text-white">
        <p className="text-lg font-bold text-red-500 mb-2">
          NO MORE HESITATION BEFORE TAKING TO THE WATER IN DIFFICULT CONDITIONS
        </p>
        <p className="text-sm uppercase tracking-wider">
          Fire V2 will always bring you home. This square tail will also help the board glide faster on take-off, allowing you to use smaller foils.
        </p>
      </div>
    </div>
  );
}