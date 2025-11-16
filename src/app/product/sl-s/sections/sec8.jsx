import Image from 'next/image';

const PowerfulShape = () => {
  return (
    <section className="bg-black text-white">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-10 py-16 lg:py-24 px-4">
        
        {/* Left Column: Text Content */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="https://afs-foiling.com/wp-content/uploads/2023/04/Plan_de_travail_1_copie_3.png"
            alt="Powerful Shape Icon"
            width={70}
            height={70}
          />

          <p className="mt-5 text-lg text-gray-300 max-w-md">
            We follow a unique manufacturing process during which all layers of fabrics, reinforcements and housings are applied in a double-shell mold, then baked using a process that allows ideal polymerization of resins for perfect reproduction and an optimal weight/solidity ratio. The resin used to build our boards is a biosourced SR GreenPoxy epoxy (over 33% of molecules come from plant sources).
          </p>
        </div>

        {/* Right Column: Image */}
        <div className="flex items-center justify-center">
          <Image
            src="https://afs-foiling.com/wp-content/uploads/2023/04/Capture-de%CC%81cra-12.png"
            alt="AFS Foil Board"
            width={1000}
            height={667} // Using an approximate 3:2 aspect ratio
            className="w-full h-auto"
          />
        </div>
        
      </div>
    </section>
  );
};

export default PowerfulShape;