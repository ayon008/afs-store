import Image from 'next/image';

export default function DynamicFeeling() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background Image with Blur */}
      <Image
        src="https://afs-foiling.com/wp-content/uploads/2023/12/image-7.png"
        alt="Background"
        fill
        className="object-cover blur-sm opacity-60"
      />

      {/* Center Image - Smaller */}
      <div className="absolute inset-0 flex items-center justify-center px-20">
        <div className="relative w-full max-w-md">
          <Image
            src="https://afs-foiling.com/wp-content/uploads/2023/12/image-5-2.png"
            alt="Dynamic feeling board"
            width={500}
            height={350}
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 max-w-2xl text-center text-white px-8">
        <h2 className="text-5xl font-bold mb-4">Dynamic feeling</h2>
        <p className="text-sm uppercase tracking-widest mb-3">
          The foil housing is integrated into the step to reduce the distance between the foil and the feet, guaranteeing unrivalled control and responsiveness.
        </p>
        <p className="text-xs italic opacity-90">
          The sensation of being one with the foil is multiplied tenfold. Steering is dynamic and responsive.
        </p>
      </div>
    </div>
  );
}