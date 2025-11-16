import React from 'react';

// Image URLs provided by the user
const BACKGROUND_IMG = 'https://afs-foiling.com/wp-content/uploads/2025/09/DSC00269-1.png';
const ACTION_SHOT_IMG = 'https://afs-foiling.com/wp-content/uploads/2025/09/Rectangle-5.png';
const LOGO_IN_TEXT_IMG = 'https://afs-foiling.com/wp-content/uploads/2025/09/Capture-decran-2025-09-16-a-11.33.26.png';
const PLACEHOLDER_IMG_404 = 'https://placehold.co/600x400/1e293b/ffffff?text=Image+Load+Error';

const App = () => {
  return (
    // Outer container now explicitly sets full width (w-full) and full viewport height (h-screen)
    <div className="w-full h-screen bg-black">
      {/*
        Main Container: Relative for absolute positioning of the action shot image.
        It now takes the full height and width of its parent (the viewport).
      */}
      <div
        className="relative w-full h-full overflow-hidden" 
        style={{
          backgroundImage: `url(${BACKGROUND_IMG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark Overlay for contrast (matching the source image's mood) 
            ACTION: Opacity reduced to 50% (bg-black/50) and gradient removed to eliminate the fade.
        */}
        <div className="absolute inset-0 bg-black/50 mix-blend-multiply"></div>
        {/* The Dark Gradient Overlay was removed entirely. */}

        {/* Text Content Area (Bottom Left) */}
        <div className="absolute bottom-0 left-0 p-8 md:p-16 lg:pl-48 text-white z-10">
          {/* Subheader Text */}
          <p className="text-xs tracking-widest uppercase font-sans mb-4 text-red-500">
            STEP UP TO THE NEXT EXPERIENCE
          </p>

          {/* Main Title Text with Embedded Image */}
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase leading-none font-sans">
            PURE 600
            <br />
            BY AXEL
            {/* The small red logo/image between names */}
            <span className="inline-block mx-2 align-baseline translate-y-[-0.1em] w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16">
              <img
                src={LOGO_IN_TEXT_IMG}
                alt="AFS Logo Icon"
                className="w-full h-full object-contain"
                onError={(e) => { e.target.onerror = null; e.target.src=PLACEHOLDER_IMG_404 }}
              />
            </span>
            GÉRARD
          </h1>
        </div>

        {/* Action Shot Image (Right, Slanted, Overlapping) */}
        <div className="absolute right-4 md:right-16 lg:right-32 top-1/3 w-3/5 md:w-2/5 lg:w-[450px] h-auto aspect-[4/3] z-20">
          <img
            src={ACTION_SHOT_IMG}
            alt="Wing foiling action shot, by Axel Gérard"
            className="w-full h-full object-contain transform rotate-[-4deg]"
            onError={(e) => { e.target.onerror = null; e.target.src=PLACEHOLDER_IMG_404 }}
          />
        </div>
        
        

      </div>
    </div>
  );
};

export default App;