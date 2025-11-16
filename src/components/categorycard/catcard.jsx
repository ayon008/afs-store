'use client';

export default function ProjectCard({ 
  image = "https://placehold.co/600x600/E0E0E0/000000?text=Category+Image", 
  link = "#", 
  category = "CATEGORY",
}) {
  return (
    <div className="group w-full max-w-sm bg-white overflow-hidden rounded-none shadow-sm flex flex-col">

      {/* Image with hover scale and category label */}
      <a href={link} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/5' }}>
          <img
            src={image}
            alt={category}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src="https://placehold.co/600x600/E0E0E0/000000?text=Image+Load+Error";
            }}
          />
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-block px-3 py-1 bg-white text-black text-xs font-semibold uppercase tracking-wider">
              {category}
            </span>
          </div>
        </div>
      </a>

    </div>
  );
}
