// app/components/Banner.js
import Image from 'next/image';

const Banner = () => {
  return (
    <div className="w-full bg-black">
      <Image
        src="https://afs-foiling.com/wp-content/uploads/2023/04/Group-45.png"
        alt="Abstract banner"
        width={1920}
        height={200}
        className="w-full h-32 object-cover" // ↓ sets a smaller height
      />
    </div>
  );
};

export default Banner;
