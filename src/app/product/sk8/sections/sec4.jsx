import Image from 'next/image';

const boardImage = 'https://afs-foiling.com/wp-content/uploads/2023/10/Frame-1.png';

const DoubleRailUSMount = () => {
  return (
    <div className="relative min-h-screen bg-black text-white flex items-center overflow-hidden">
      {/* Left Side - Text Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center text-center md:text-left px-8 md:pl-20">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
          Double rail US mount
        </h2>
        <p className="text-base md:text-lg font-light max-w-md mx-auto md:mx-0">
          The adjustable mounting allows you to slide your front and rear foil over your board to fine-tune feel and performance to suit your size, skill and personal preference.
        </p>
      </div>

      {/* Right Side - Image (independent of container width) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[50vw] max-w-none">
        <Image
          src={boardImage}
          alt="Foil board with double rail US mount"
          width={1000}
          height={600}
          className="object-contain w-full h-auto transform rotate-[2deg]"
          priority
        />
      </div>
    </div>
  );
};

export default DoubleRailUSMount;
