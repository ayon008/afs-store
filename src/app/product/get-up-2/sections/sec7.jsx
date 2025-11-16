import { useEffect, useState } from "react";
import Image from "next/image";

const BoardSection = () => {
  const images = [
    "https://afs-foiling.com/wp-content/uploads/2023/06/get-up-3.png",
    "https://afs-foiling.com/wp-content/uploads/2023/06/get-up-4.png",
    "https://afs-foiling.com/wp-content/uploads/2023/06/get-up-7.png",
    "https://afs-foiling.com/wp-content/uploads/2023/06/get-up-8.png",
    "https://afs-foiling.com/wp-content/uploads/2023/06/get-up-9.png",
    "https://afs-foiling.com/wp-content/uploads/2023/06/get-up-15.png",
    "https://afs-foiling.com/wp-content/uploads/2023/06/get-up-16.png",
    "https://afs-foiling.com/wp-content/uploads/2023/06/get-up-18-1.png",
    "https://afs-foiling.com/wp-content/uploads/2023/06/get-up-18.png",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="w-full bg-[#111111] flex justify-center items-center py-12 overflow-hidden">
      <Image
        key={images[currentImage]} // forces re-render for fade animation
        src={images[currentImage]}
        alt={`Foil board image ${currentImage + 1}`}
        width={1920}
        height={800}
        className="w-full h-auto transition-opacity duration-1000 ease-in-out"
        priority
      />
    </section>
  );
};

export default BoardSection;
