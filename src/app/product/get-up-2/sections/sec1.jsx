import Image from 'next/image';

const WavePaddlingSection = () => {
  const waveImageUrl = "https://afs-foiling.com/wp-content/uploads/2023/06/wave-1.png";

  return (
    <section 
      className="
        w-full h-screen
        bg-[#ffffff] text-[#222222]
        flex flex-col items-center
        justify-center
        py-12 px-4 md:px-8
        m-0
      "
      style={{ marginTop: 0, paddingTop: 0 }}
    >
      {/* Wave Image */}
      <div className="relative w-full max-w-3xl h-[200px]"> 
        <Image
          src={waveImageUrl}
          alt="Decorative wave line"
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
      </div>

      {/* Text Content */}
      <h2 
        className="
          text-3xl md:text-5xl lg:text-6xl
          font-bold text-center
          max-w-3xl
          leading-tight md:leading-tight
        "
      >
        Discover the sensations
        <br />
        of <span className="text-[#a46a36]">stand-up paddling in</span>
        <br />
        <span className="text-[#a46a36]">the waves</span> and get the
        <br />
        most out of it.
      </h2>
    </section>
  );
};

export default WavePaddlingSection;
