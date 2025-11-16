import Image from 'next/image';

// --- Image URLs provided ---
const bottomBoardImage = 'https://afs-foiling.com/wp-content/uploads/2023/10/SK8_0002-1-1.png';
const topBoardImage = 'https://afs-foiling.com/wp-content/uploads/2023/10/SK8_0003-2-1.png';
const stickerImage = 'https://afs-foiling.com/wp-content/uploads/2023/10/sticker-03.png';

const FoilCrossSection = () => {
  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center p-8 overflow-hidden">
      <div className="relative grid grid-cols-1 grid-rows-1 place-items-center w-full max-w-5xl">
        
        {/* Image 1: Bottom Board (Hull) */}
        <div className="col-start-1 row-start-1 w-full max-w-lg md:max-w-xl">
          <Image
            src={bottomBoardImage}
            alt="Foil Board Hull"
            width={1000}
            height={1000}
            objectFit="contain"
            className="rotate-[60deg]"
            priority
          />
        </div>

        {/* Image 2: Top Board (Deck) */}
        <div className="col-start-1 row-start-1 w-full max-w-lg md:max-w-xl">
          <Image
            src={topBoardImage}
            alt="Foil Board Deck"
            width={1000}
            height={1000}
            objectFit="contain"
            className="-rotate-[30deg]"
            priority
          />
        </div>

        {/* Text Content */}
        <div className="col-start-1 row-start-1 relative z-10 p-4">
          <p className="text-4xl md:text-5xl lg:text-6xl font-light text-center text-white max-w-3xl leading-snug">
            With a compact design optimized for{' '}
            
            {/* This span wraps "pumping" and becomes the relative parent 
              for the absolute-positioned sticker.
            */}
            <span className="relative inline-block">
              
              {/* This is the sticker itself.
                - 'absolute inset-0' makes it the same size as the parent "pumping" span.
                - 'flex' centers the image inside.
              */}
              <span className="absolute inset-0 z-10 flex items-center justify-center">
                <Image
                  src={stickerImage}
                  alt="Pumping is not a crime"
                  width={160} // Use fixed width/height for aspect ratio
                  height={40}
                  objectFit="contain"
                  // This class controls the *actual* rendered size.
                  // It's wider than the word "pumping" to match the image.
                  className="-rotate-[6deg] w-32 md:w-40" 
                />
              </span>
              
              {/* This text "pumping" will now render *underneath* the sticker. */}
              pumping
            </span>

            , extended pontoon or beach start sessions, micro surfing, wake
            foiling behind passing boats or simply towing are all
            possible.
          </p>
        </div>

      </div>
    </div>
  );
};

export default FoilCrossSection;