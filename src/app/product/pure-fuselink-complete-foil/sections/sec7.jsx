import Image from 'next/image';

const WindRange = () => {
  const leftImageUrl = "https://afs-foiling.com/wp-content/uploads/2024/03/F_PureV2700_0001-2-1-1.png";
  const rightImageUrl = "https://afs-foiling.com/wp-content/uploads/2024/03/F_PureV2900_0004-2.png";

  return (
    <section className="bg-black text-white py-24">
      <div className="container mx-auto px-4">
        
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Wind range
        </h2>

        {/* Table */}
        <div className="max-w-lg mx-auto">
          <table className="w-full">
            <thead>
              {/* Use a neutral color for the borders, 700 or 800 works well on black */}
              <tr className="border-b border-neutral-700">
                <th className="text-left font-medium text-neutral-400 py-3 pr-4">
                  Wind range
                </th>
                <th className="text-center font-medium text-neutral-400 py-3 px-4">
                  &le;75kg
                </th>
                <th className="text-center font-medium text-neutral-400 py-3 pl-4">
                  &gt;75kg
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-neutral-700">
                <td className="text-left py-3 pr-4">
                  10-20 noeuds
                </td>
                <td className="text-center font-bold py-3 px-4">
                  Pure 700
                </td>
                <td className="text-center font-bold py-3 pl-4">
                  Pure 900
                </td>
              </tr>
              {/* No bottom border on the last row */}
              <tr>
                <td className="text-left py-3 pr-4">
                  &gt;20 noeuds
                </td>
                <td className="text-center font-bold py-3 px-4">
                  Pure 700
                </td>
                <td className="text-center font-bold py-3 pl-4">
                  Pure 700
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Images */}
        {/* Using grid for easy responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
          <div className="flex justify-center md:justify-end">
            <Image
              src={leftImageUrl}
              alt="AFS Pure 700 Foil"
              width={600}
              height={600}
              priority // Preload if it's above the fold
            />
          </div>
          <div className="flex justify-center md:justify-start">
            <Image
              src={rightImageUrl}
              alt="AFS Pure 900 Foil"
              width={600}
              height={600}
              priority
            />
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default WindRange;