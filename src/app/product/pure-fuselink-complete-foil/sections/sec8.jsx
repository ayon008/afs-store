import React from 'react';

// Data for the spec lists
const specs700 = [
  { label: 'Surface', value: '700 cm2' },
  { label: 'Span', value: '820 mm', bold: true },
  { label: 'Aspect Ratio', value: '9.6', bold: true },
  { label: 'Cord max', value: '112 mm' },
  { label: 'Thickness max', value: '11.5 mm' },
  { label: 'Fuselage length', value: '574 mm' },
  { label: 'Construction', value: 'UHM Carbon' },
];

const specs900 = [
  { label: 'Surface', value: '900 cm2' },
  { label: 'Span', value: '900 mm', bold: true },
  { label: 'Aspect Ratio', value: '9.2', bold: true },
  { label: 'Cord max', value: '137 mm' },
  { label: 'Thickness max', value: '14.1 mm' },
  { label: 'Fuselage length', value: '555 mm' },
  { label: 'Construction', value: 'UHM Carbon' },
];

const FoilSpecs = () => {
  return (
    <section className="bg-black text-white py-24">
      <div className="container mx-auto px-4">
        
        {/* Grid container for the two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-4xl mx-auto">
          
          {/* PURE 700 COLUMN */}
          <div>
            <h3 className="text-3xl font-bold text-center mb-8">
              Pure 700
            </h3>
            {/* Using <ul> for a semantic list of specs */}
            <ul>
              {specs700.map((spec) => (
                <li 
                  key={spec.label} 
                  // Each list item is a flex container
                  className="flex justify-between items-center border-b border-neutral-700 py-3"
                >
                  {/* Label (left) */}
                  <span className="text-neutral-300">{spec.label}</span>
                  
                  {/* Value (right) - conditionally bold */}
                  <span className={`text-lg ${spec.bold ? 'font-bold' : 'font-medium'}`}>
                    {spec.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* PURE 900 COLUMN */}
          <div>
            <h3 className="text-3xl font-bold text-center mb-8">
              Pure 900
            </h3>
            <ul>
              {specs900.map((spec) => (
                <li 
                  key={spec.label} 
                  className="flex justify-between items-center border-b border-neutral-700 py-3"
                >
                  <span className="text-neutral-300">{spec.label}</span>
                  <span className={`text-lg ${spec.bold ? 'font-bold' : 'font-medium'}`}>
                    {spec.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default FoilSpecs;