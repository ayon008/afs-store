'use client';

export default function HeroSection() {
  return (
    <section
      className="relative h-[200vh] bg-cover bg-center bg-no-repeat flex items-center justify-start text-white"
      style={{
        backgroundImage:
          "url('https://afs-foiling.com/wp-content/uploads/2024/03/@arthurhabudzik-Chipri-board-RIDE-6.png')",
      }}
    >
      {/* Main text content (left middle) */}
      <div className="px-6 md:pl-24 text-left">
        <h1 className="text-5xl md:text-7xl font-bold drop-shadow-lg">
          Smooth as silk
        </h1>
        <p className="mt-6 text-lg md:text-2xl max-w-2xl drop-shadow-md">
          Great attention has been paid to the <br /> fluidity of transitions.
        </p>
      </div>

      {/* Bottom-left text */}
      <div
        className="absolute bottom-10 left-6 md:left-24 max-w-4xl"
        style={{
          fontFamily: '"alliance no.2", sans-serif',
          fontSize: '70px',
          fontWeight: 700,
          lineHeight: '70px',
          color: 'rgb(255, 255, 255)',
        }}
      >
        The ultimate in fluidity, from the most powerful carves to the smoothest lines.
      </div>
    </section>
  );
}
