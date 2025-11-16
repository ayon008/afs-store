import Image from 'next/image';

const SnapBoardSpec = () => {
  // Dimensions and specifications from the image
  const specifications = [
    { label: 'Length', value: "8'5" },
    { label: 'Width', value: '32' },
    { label: 'Thickness', value: '4' },
    { label: 'Volume', value: '125L' },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-8 bg-white min-h-screen">
      {/* --- Board Image Section --- */}
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <div className="w-3/4 max-w-sm">
          {/* Using next/image for optimized images */}
          <Image
            src="https://afs-foiling.com/wp-content/uploads/2023/06/1M7A0547-%D0%A3%D0%BB%D1%83%D1%87%D1%88%D0%B5%D0%BD%D0%BE-NR.png"
            alt="AFS Snap 8'5 Board"
            layout="responsive"
            width={500} // Approximate aspect ratio
            height={1100} // Approximate aspect ratio
            objectFit="contain"
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
      
      {/* --- Specifications Section --- */}
      <div className="w-full md:w-1/2 md:pl-12 max-w-lg">
        <p className="text-gray-500 text-sm mb-1 font-semibold tracking-wider">Specifications</p>
        <h1 className="text-4xl font-bold mb-8">Snap 8'5</h1>

        {/* Dynamic Specifications List */}
        <div className="space-y-2 mb-8">
          {specifications.map((spec) => (
            <div key={spec.label} className="flex justify-between items-center border-b border-dashed border-gray-300 pb-1">
              <span className="font-medium text-gray-700">{spec.label}</span>
              <span className="font-semibold text-gray-900">{spec.value}</span>
            </div>
          ))}
        </div>
        
        {/* Fixed Specifications List */}
        <div className="space-y-2 mb-10">
            <div className="flex justify-between items-center border-b border-dashed border-gray-300 pb-1">
                <span className="font-medium text-gray-700">Box</span>
                <span className="font-semibold text-gray-900">Thruster FCS (Quad Option)</span>
            </div>
            <div className="flex justify-between items-center border-b border-dashed border-gray-300 pb-1">
                <span className="font-medium text-gray-700">Construction</span>
                <span className="font-semibold text-gray-900">One Shoot Sandwich PVC</span>
            </div>
            <div className="flex justify-between items-center border-b border-dashed border-gray-300 pb-1">
                <span className="font-medium text-gray-700">Weight</span>
                <span className="font-semibold text-gray-900">7.8kg</span>
            </div>
        </div>

        {/* Description/Note */}
        <div className="flex items-start text-sm text-blue-700">
            <span className="mr-2 text-xl italic font-serif">⇗</span>
            <p>
                THE SNAP COMES WITH A QUAD SET THAT COMBINES GRIP AND REACTIVITY FOR A SERIES OF CURVES.
            </p>
        </div>
      </div>
    </div>
  );
};

export default SnapBoardSpec;