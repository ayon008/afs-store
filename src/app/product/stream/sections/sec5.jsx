// components/StructuredFluiditySection.js
import Image from 'next/image';

const StructuredFluiditySection = () => {
  // Using the high-resolution, cropped image source URL provided by the user
  const wingImageUrl = 'https://afs-foiling.com/wp-content/uploads/2025/09/pp_red0002@2x-scaled-1-scaled.png.webp';
  
  return (
    // min-h-[200vh] ensures the page is at least twice the viewport height, forcing 'two scrolls'
    <section className="relative w-full min-h-[200vh] bg-white overflow-hidden"> 
      
      {/* 1. Typography Element (Structured fluidity...) */}
      <div className="absolute top-20 left-4 md:top-40 md:left-20 z-20 p-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-black leading-snug max-w-lg">
  Structured fluidity and instinctive control

</h1>



      </div>

      <div 
        className="absolute 
                   // Positioning: Moves the image far down and to the right
                   -bottom-[10vh] -right-[50vw] 
                   md:-bottom-[10vh] md:-right-[30vw] 
                   lg:-bottom-[10vh] lg:-right-[10vw] 
                   xl:-bottom-[20vh] xl:-right-[5vw] 
                   
                   // Rotation: Gives the dynamic, ascending perspective
                   rotate-[15deg] 
                   
                   // Size: Making the container massive
                   w-[1500px] h-[1000px] 
                   md:w-[2500px] md:h-[1500px] 
                   lg:w-[3500px] lg:h-[2000px] 
                   z-10 opacity-95"
      >
        <Image
          src={wingImageUrl}
          alt="AFS Stream Wing - Massive Hero Section"
          // layout="fill" makes the image fill the massive container div
          layout="fill"
          // objectFit="contain" ensures the full wing shape is visible within the rotated container
          objectFit="contain" 
          // unoptimized is useful for extremely large, fixed-size hero images 
          // that are intentionally scaled beyond typical optimization bounds.
          unoptimized={true} 
          className="select-none"
        />
      </div>


    </section>
  );
};

export default StructuredFluiditySection;