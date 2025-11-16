'use client';

export default function Overlay({ title }) {
  return (
    <div className="absolute z-20 inset-0 flex flex-col justify-end py-10 md:py-0 text-white">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between w-full relative">
        {/* Title block */}
        <div className="flex flex-col items-center md:items-start w-full md:w-auto gap-2 md:gap-0 relative">
          <div className="relative inline-block">
            <h1 className="text-base md:text-xl font-extrabold leading-none text-center md:text-left bg-gradient-to-r from-white/80 to-white/40 bg-clip-text text-transparent">

              {title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}