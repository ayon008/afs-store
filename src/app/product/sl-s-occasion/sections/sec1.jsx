// /components/HeroSection.jsx

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-black text-white flex items-center overflow-hidden">
      {/* 1. Faint Background Image (from your provided bg link) */}
      <img
        src="https://afs-foiling.com/wp-content/uploads/2023/04/Group-45.png"
        alt="Abstract background pattern"
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
      />

      {/* 2. Gradient Overlay (creates the dark left panel) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/90 to-transparent" />

      {/* 3. Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-8 sm:px-12 lg:px-24 py-24">
        <div className="max-w-xl">
          {/* Logo (from your provided logo link) */}
          <img
            src="https://afs-foiling.com/wp-content/uploads/2023/04/ahdblue-1.png"
            alt="AHD - Advanced Hull Dynamics"
            className="w-48 md:w-56 mb-20"
          />

          {/* Headline */}
          <h1 className="text-7xl lg:text-9xl font-light tracking-[0.2em] text-white mb-10">
            SL-S
          </h1>

          {/* Body Text */}
          <div className="space-y-5 text-gray-300 max-w-lg text-base leading-relaxed">
            <p>
              The AHD SL-S range has been designed to give you total control in
              all situations and conditions; so you can stay focused on your
              speed and trajectory.
            </p>
            <p>
              A compact board with a finely crafted hull for maximum speed and
              comfort. Its shape has been optimized for easy jibe, release and
              control, allowing you to stay ahead at all times.
            </p>
            <p>
              For demanding sailors, the AHD SL-S range is built to maximize
              your sensations, but also for long, comfortable rides with
              friends or in competition.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}