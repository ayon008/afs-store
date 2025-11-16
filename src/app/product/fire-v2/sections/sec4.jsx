import Image from 'next/image';

export default function OSSCarbon() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* PVC Layer - Left */}
      <div className="absolute inset-y-0 left-[-10%] w-[45%] -skew-x-12 origin-bottom-left">
        <Image
          src="https://afs-foiling.com/wp-content/uploads/2023/12/PVC-e1701461119765.png"
          alt="PVC"
          fill
          className="object-cover"
        />
      </div>

      {/* Carbon Layer - Center */}
      <div className="absolute inset-y-0 left-[25%] w-[50%] -skew-x-12">
        <Image
          src="https://afs-foiling.com/wp-content/uploads/2023/12/Carbon-e1701461197820.png"
          alt="Carbon"
          fill
          className="object-cover"
        />
      </div>

      {/* Polymeric Foam - Right */}
      <div className="absolute inset-y-0 right-[-10%] w-[45%] -skew-x-12 origin-bottom-right">
        <Image
          src="https://afs-foiling.com/wp-content/uploads/2023/12/Polymeric-foam.png"
          alt="Polymeric foam"
          fill
          className="object-cover"
        />
      </div>

      {/* Text Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full max-w-lg mx-auto text-center text-white px-8 pt-16">
        <h2 className="text-5xl font-bold mb-6">OSS Carbon Construction</h2>
        <p className="text-xs uppercase tracking-widest leading-tight mb-4">
          The PVC sandwich carbon construction combined with an inlaid deck provides a finer, more direct feel when riding the board in free-flight and at high revs. This proven construction allows you to land the biggest jumps without damaging your board.
        </p>
        <p className="text-sm italic">The best weight/strength ratio on the market.</p>
      </div>
    </div>
  );
}