import Image from 'next/image';

const ProductFeature = () => {
  return (
    <section className="bg-black text-white">
      <div className="container mx-auto flex min-h-[70vh] flex-col md:flex-row">
        
        {/* Left Column: Image */}
        <div className="flex items-center justify-center p-4 md:w-1/2">
          <Image
            src="https://afs-foiling.com/wp-content/uploads/2023/04/Capture-de%CC%81cra-13.png"
            alt="AFS SLS Cut Out"
            width={700}
            height={467}
            className="h-auto w-full max-w-lg object-contain"
          />
        </div>

        {/* Right Column: Text Content */}
        <div className="flex items-center justify-center p-8 md:w-1/2 md:p-12">
          <div className="flex max-w-sm flex-col items-center text-center">
            {/* Icon */}
            <Image
              src="https://afs-foiling.com/wp-content/uploads/2023/04/Plan_de_travail_1_copie_4.png"
              alt="Double Sharp Cut Out Icon"
              width={96}
              height={96}
              className="mb-6"
            />
            
            {/* Heading */}
            
            
            {/* Description */}
            <p className="text-base text-gray-300">
              These cut-outs reduce the wetted surface to avoid saturation at
              high speeds.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductFeature;