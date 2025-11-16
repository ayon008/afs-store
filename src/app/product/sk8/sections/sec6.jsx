import Image from 'next/image';

// --- Sticker URLs provided ---
const stickerOnO = 'https://afs-foiling.com/wp-content/uploads/2023/10/sticker-05.svg';
const stickerOnE = 'https://afs-foiling.com/wp-content/uploads/2023/10/Mask-group.svg';

const KitefoilFriendlySection = () => {
  return (
    // Main container: black background, centered content
    <div className="min-h-[70vh] bg-black text-white flex items-center justify-center p-8 overflow-hidden">
      
      {/* Text container: very large, bold, and tight tracking */}
      <div className="text-center font-black text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] text-white tracking-tighter md:tracking-[-0.05em] leading-none">
        
        {/* Line 1: KITEFOIL */}
        {/* We use flex to keep the letters together */}
        <div className="flex justify-center items-center">
          <span>K</span>
          <span>I</span>
          <span>T</span>
          
          {/* Letter 'E' with sticker */}
          {/* 'relative' makes this span the positioning parent for the sticker */}
          <span className="relative">
            E
            {/* The sticker is placed absolutely within the 'E' span */}
            <span className="absolute inset-0 flex items-center justify-center">
              <Image
                src={stickerOnE}
                alt="Kitefoiler sticker"
                width={100} // Aspect ratio
                height={100} // Aspect ratio
                objectFit="contain"
                className="w-full h-full" // Make image fill the span
              />
            </span>
          </span>
          
          <span>F</span>
          
          {/* Letter 'O' with sticker */}
          {/* 'relative' makes this span the positioning parent for the sticker */}
          <span className="relative">
            O
            {/* The sticker is placed absolutely within the 'O' span */}
            {/* 'p-2' or 'p-4' can be used to add a little padding if the sticker touches the 'O' edges */}
            <span className="absolute inset-0 flex items-center justify-center p-2 md:p-4">
              <Image
                src={stickerOnO}
                alt="AFS SK8 sticker"
                width={100} // Aspect ratio
                height={100} // Aspect ratio
                objectFit="contain"
                className="w-full h-full" // Make image fill the span
              />
            </span>
          </span>
          
          <span>I</span>
          <span>L</span>
        </div>

        {/* Line 2: FRIENDLY */}
        {/* This line is simpler as it has no stickers */}
        <div>
          <span>FRIENDLY</span>
        </div>
        
      </div>
    </div>
  );
};

export default KitefoilFriendlySection;