import Image from 'next/image';

const textureImage = 'https://afs-foiling.com/wp-content/uploads/2023/10/SK8_0004-2.png';

const TexturedEvaSection = () => {
  return (
    // This container holds the background image and the text content.
    // 'relative' is needed for the 'absolute' background image.
    // 'flex justify-end items-end' pushes the text block to the bottom right.
    // 'min-h-[60vh]' gives it a good height, but you can adjust this.
    <div className="relative min-h-[60vh] bg-black text-white p-8 md:p-16 flex justify-end items-end overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={textureImage}
          alt="Textured EVA grip with orange dots"
          layout="fill"
          objectFit="cover"
          quality={80}
          priority
        />
      </div>

      {/* Text Content */}
      {/* 'relative z-10' ensures this text stays on top of the background. */}
      <div className="relative z-10 text-left max-w-xs md:max-w-sm">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Textured EVA
        </h2>
        <p className="text-base md:text-lg font-light">
          Super-soft EVA has a grippy texture that provides exceptional traction (and feels great on your feet).
        </p>
      </div>
      
    </div>
  );
};

export default TexturedEvaSection;