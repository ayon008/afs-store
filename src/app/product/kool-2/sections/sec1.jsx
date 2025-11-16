import Image from "next/image";

// components/KoolHero.jsx
export default function KoolHero() {
  return (
    <section className="flex flex-col items-center justify-center bg-white py-16 md:py-24 px-4 text-center">
      {/* Subheading */}
      <p
        className="mb-4 uppercase tracking-wide"
        style={{
          fontFamily: '"alliance no.2", sans-serif',
          fontSize: "22px",
          fontWeight: 700,
          lineHeight: "26.4px",
          color: "rgb(191, 139, 64)",
        }}
      >
        Stable, high-performance, rigid and durable.
      </p>

      {/* Main Heading */}
      <h1
        className="max-w-5xl mb-12"
        style={{
          fontFamily: '"alliance no.2", sans-serif',
          fontSize: "70px",
          fontWeight: 700,
          lineHeight: 1.1, // 👈 tighter line spacing
          color: "rgb(17, 17, 17)",
        }}
      >
        The Kool is THE board that makes SUP accessible to everyone.
      </h1>

      {/* Board Image */}
      <div className="w-full flex justify-center">
        <Image
          src="https://afs-foiling.com/wp-content/uploads/2023/06/kool-3-5.png"
          alt="The Kool SUP board"
          width={2000} // 👈 larger image
          height={1000}
          className="w-full max-w-[2000px] mx-auto" // 👈 expanded max width
          priority
        />
      </div>
    </section>
  );
}
