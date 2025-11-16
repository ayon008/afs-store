import Image from "next/image";

// Data for the specifications list
const specs = [
  { label: "Length", value: "10'5" },
  { label: "Width", value: "32′ 3/4" },
  { label: "Volume", value: "190L" },
  { label: "Box", value: "US Box" },
  { label: "Construction", value: "One Shot Sandwich Wood" },
  { label: "Weight", value: "13.5 kg" },
];

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-8">
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center">
          
          {/* Column 1: Image */}
          <div className="flex justify-center">
            <Image
              src="https://afs-foiling.com/wp-content/uploads/2023/06/kool-19.png"
              alt="Get Up 9'5 Paddleboard"
              width={1366}
              height={643}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          {/* Column 2: Specifications */}
          <div className="w-full max-w-md md:max-w-none mx-auto">
            <p className="text-sm font-medium text-[#bf8b40] uppercase tracking-wider">
              Specifications
            </p>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
              Kool 10'5
            </h1>

            <div className="space-y-3">
              {specs.map((spec) => (
                <div 
                  key={spec.label} 
                  className="flex items-baseline text-base md:text-lg"
                >
                  {/* Label */}
                  <span className="text-gray-700">{spec.label}</span>
                  
                  {/* Dotted line */}
                  <span className="flex-grow border-b border-dotted border-gray-400 mx-3 mb-1.5"></span>
                  
                  {/* Value */}
                  <span className="font-semibold text-gray-900">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}