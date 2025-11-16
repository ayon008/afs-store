import Image from 'next/image';

export default function AfsMasthead() {
  return (
    <section className="relative w-full h-[720px] bg-black text-white overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://afs-foiling.com/wp-content/uploads/2025/09/UHM85-1-1536x720.png"
        alt="AFS UHM Carbon 85 Mast"
        width={1536}
        height={720}
        priority
        className="absolute inset-0 w-full h-full object-contain"
      />

      {/* Text Content Overlay */}
      {/* This container creates a "safe area" for text that matches the 
        image's 1536px max-width, allowing us to position text precisely.
      */}
      <div className="relative z-10 h-full max-w-[1536px] mx-auto px-8 sm:px-16 lg:px-24">
        
        {/* Main Heading & Subheading */}
        {/* Positioned vertically centered (top-1/2, -translate-y-1/2) 
          and set ~28% from the left edge to match the design.
        */}
        <div className="absolute top-1/2 left-[28%] -translate-y-1/2 max-w-md lg:max-w-lg">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-left">
            Better connection —
            <br />
            Better masts
          </h1>
          <p className="mt-5 text-lg lg:text-xl text-left">
            Boosted performance. Tenfold sensations. Total control
          </p>
        </div>

        {/* Footer Text */}
        {/* Positioned at the bottom right of the safe area.
          max-w-[280px] forces the text to wrap as it does in the design.
        */}
        <div className="absolute bottom-12 right-8 sm:right-16 lg:right-24 text-right">
          <p className="text-xs uppercase tracking-wider text-gray-300 max-w-[280px]">
            Based on the know-how of our Performer UHM masts, the aim of this
            new design was to push all the sliders to provide even greater
            gliding sensations. Each size is uniquely designed.
          </p>
        </div>
        
      </div>
    </section>
  );
}