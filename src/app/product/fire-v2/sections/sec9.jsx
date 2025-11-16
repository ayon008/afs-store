import React from 'react';

export default function BoardFeatures() {
  const boards = [
    {
      name: "Fire 5'2",
      specs: {
        Length: "5'2 / 157.4 cm",
        Width: '23.5" / 59.6 cm',
        Volume: '80L',
        Construction: 'PVC Sandwich Carbon',
        Weight: '5.7 kg'
      }
    },
    {
      name: "Fire 5'5",
      specs: {
        Length: "5'5 / 165.1 cm",
        Width: '24.5" / 62.2 cm',
        Volume: '90L',
        Construction: 'PVC Sandwich Carbon',
        Weight: '6.0 kg'
      }
    },
    {
      name: "Fire 5'8",
      specs: {
        Length: "5'8 / 172.7 cm",
        Width: '25.5" / 64.7 cm',
        Volume: '100L',
        Construction: 'PVC Sandwich Carbon',
        Weight: '6.4 kg'
      }
    }
  ];

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center px-8 py-16">
      <h2 className="text-5xl font-bold mb-12">Board features</h2>
      
      <div className="flex gap-16 max-w-6xl">
        {boards.map((board) => (
          <div key={board.name} className="text-center">
            <h3 className="text-2xl font-semibold mb-6">{board.name}</h3>
            <div className="space-y-3 text-sm">
              {Object.entries(board.specs).map(([label, value]) => (
                <div key={label} className="flex justify-between gap-8 border-b border-gray-800 pb-1">
                  <span className="text-gray-400">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}