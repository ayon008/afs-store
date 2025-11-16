import React from 'react';
import Image from 'next/image';

const boardSpecs = [
  {
    title: "Whitebird 6'6",
    image: "https://afs-foiling.com/wp-content/uploads/2024/04/wb_58.png",
    specs: [
      { label: "Length", value: "6'6" },
      { label: "Width", value: "21”" },
      { label: "Volume", value: "100L" },
      { label: "Weight", value: "6.0kg" }
    ]
  },
  {
    title: "Whitebird 6'8",
    image: "https://afs-foiling.com/wp-content/uploads/2024/04/wb_58.png",
    specs: [
      { label: "Length", value: "6'8" },
      { label: "Width", value: "23”" },
      { label: "Volume", value: "115L" },
      { label: "Weight", value: "6.5kg" }
    ]
  }
];

export default function Section11() {
  return (
    <section className="bg-black text-white py-20 flex justify-center items-center min-h-screen">
      <div className="flex flex-col md:flex-row gap-20 justify-center items-end w-full max-w-7xl mx-auto">
        {/* Left board/specs */}
        <div className="flex flex-col items-center flex-1">
          <div className="mb-8">
            <Image
              src={boardSpecs[0].image}
              alt={boardSpecs[0].title}
              width={400}
              height={800}
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center w-full">{boardSpecs[0].title}</h2>
          <table className="text-left w-96 text-xl">
            <tbody>
              {boardSpecs[0].specs.map((spec, i) => (
                <tr key={i} className="border-b border-gray-600 last:border-b-0">
                  <td className="font-bold py-4 pr-8 w-1/2">{spec.label}</td>
                  <td className="py-4 w-1/2 text-right">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Right board/specs */}
        <div className="flex flex-col items-center flex-1">
          <div className="mb-8">
            <Image
              src={boardSpecs[1].image}
              alt={boardSpecs[1].title}
              width={400}
              height={800}
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center w-full">{boardSpecs[1].title}</h2>
          <table className="text-left w-96 text-xl">
            <tbody>
              {boardSpecs[1].specs.map((spec, i) => (
                <tr key={i} className="border-b border-gray-600 last:border-b-0">
                  <td className="font-bold py-4 pr-8 w-1/2">{spec.label}</td>
                  <td className="py-4 w-1/2 text-right">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}