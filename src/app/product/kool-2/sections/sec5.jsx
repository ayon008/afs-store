import Image from 'next/image';
import { Sprout } from 'lucide-react'; // Icon library

/**
 * A component replicating the "One Shot Sandwich Wood" section.
 */
const OneShotSandwich = () => {
  // I've approximated the gold/brown color from the image.
  // You can change this to your project's exact brand color.
  const primaryColorClass = "text-[#b48c3a]";

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Main flex container to center all content */}
        <div className="flex flex-col items-center text-center">

          {/* 1. Heading */}
          <h2 
            className={`text-3xl md:text-4xl font-semibold ${primaryColorClass} mb-5`}
          >
            One Shot Sandwich Wood
          </h2>

          {/* 2. Main Paragraph */}
          <p className="text-gray-800 text-base md:text-lg leading-relaxed max-w-3xl mb-12">
            The AFS Get Up is built on a Woord sandwich base. A unique manufacturing 
            process in which all layers of fabrics, reinforcements and housings are 
            applied in a double shell mold, then baked in a process that ensures ideal 
            polymerization of the resins for perfect reproduction and an optimal 
            weight/solidity ratio.
          </p>

          {/* 3. Main Image */}
          <div className="w-full max-w-4xl">
            <Image
              src="https://afs-foiling.com/wp-content/uploads/2023/06/image.png"
              alt="Cross-section of One Shot Sandwich Wood board"
              width={911}
              height={340}
              layout="responsive"
              priority // Load this image first if it's above the fold
            />
          </div>

          {/* 4. Icon */}
          <div className="mt-12 mb-4">
            <Sprout 
              className={`h-8 w-8 ${primaryColorClass}`} 
              strokeWidth={1.5} 
            />
          </div>

          {/* 5. Secondary Paragraph */}
          <p className={`text-sm ${primaryColorClass} max-w-md`}>
            The resin used to build our boards is a 
            bio-sourced SR GreenPoxy epoxy (over 
            33% of molecules come from plant 
            sources).
          </p>

        </div>
      </div>
    </section>
  );
};

export default OneShotSandwich;